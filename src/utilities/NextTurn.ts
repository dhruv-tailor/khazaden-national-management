import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./SaveData";
import { popGrowth, tierModifier, updateGoodsProduction, updateSettlmentStock } from "../Settlement/SettlementInterface/SettlementInterface";
import { goodsdist, empty_goodsdist, addGoods, subtractGoods, scaleGoods, roundGoods, totalGoods, scaleDownGoods, floorGoods, multiplyGoods, inverseGoodPercentages } from "../Goods/GoodsDist";
import { calcPriceGoods } from "../Economics/pricing/prices";
import { clanTypes } from "../Clans/ClanInterface/ClanInterface";
import { TerrainData } from "../Settlement/SettlementInterface/TerrainInterface";
import { LoanInterface, takeLoan } from "../Economics/loans/loanInterface";
import { ensureNumber } from "./SimpleFunctions";
import { FederalInterface } from "./FederalInterface";
import { empty_federal_interface } from "./FederalInterface";
import { getRandomEventId } from "../Events/RandomEvents";

export const NextTurn = async (game: string) => {
    const store = await load(await saveLocation(game), {autoSave: false});
    const federal_interface = await store.get<FederalInterface>('Federal') ?? {...empty_federal_interface};
    const settlements = federal_interface.settlements;
    const current_goodsdist = federal_interface.reserve;
    let next_goodsdist = {...empty_goodsdist};
    const foreign_nations = federal_interface.foreign_powers;
    // Market Data
    const osc_months = await store.get<number>('Osc Period') ?? 0
    const osc_months_passed = await store.get<number>('Osc Months Passed')?? 0
    const market_trajectory = await store.get<number>('Market Trajectory')?? 0
    const global_market_trend = await store.get<boolean>('Positive Global Market Trend')?? true
    const market_modifier = (Math.random() * ((2 * market_trajectory) + market_trajectory) - market_trajectory * (global_market_trend ? 1 : -1)) + 1
    const turns_passed = await store.get<number>('Turns Passed') ?? 0;
    let federal_prices = federal_interface.prices
    const price_history = federal_interface.price_history
    let loans = federal_interface.loans
    let armies = federal_interface.armies
    let trade_deals = federal_interface.trade_deals

    const current_year = await store.get<number>('Current Year') ?? 0
    const current_month = await store.get<number>('Current Month') ?? 0

    // Federal Merchant Capacity
    let merchant_capacity: number = 0

    // Determine if a random event should occur 1 in 10 chance
    if (Math.random() < 0.1) {
        federal_interface.random_events.push(getRandomEventId(federal_interface))
    }

    settlements?.forEach(settlement => {
        const market_health = randMarketHealth()
        // First update Taxation
        let base_tax = 0
        let produced: goodsdist = {...empty_goodsdist}
        settlement.clans.forEach(clan => {
            base_tax += clan.tax_rate * clan.taxed_productivity
            produced = addGoods(produced,clan.production)
        })
        base_tax = Math.round(base_tax)
        settlement.stock.money += Math.round(base_tax * (1 - settlement.taxation.money))
        next_goodsdist.money += Math.round(base_tax * settlement.taxation.money)
        settlement.price_history = [...settlement.price_history,settlement.prices]

        // Update Settlement Stock
        next_goodsdist = roundGoods(addGoods(multiplyGoods(produced,settlement.taxation),next_goodsdist))
        produced = roundGoods(multiplyGoods(produced,inverseGoodPercentages(settlement.taxation)))
        const old_stock = {...settlement.stock}
        settlement.stock = addGoods(settlement.stock,subtractGoods(produced,settlement.consumption_rate))
        // Garrison Consumption
        settlement.stock = subtractGoods(settlement.stock,settlement.garrison.reduce((sum,val) => addGoods(sum,val.consumption_rate),{...empty_goodsdist}))
        settlement.stock = roundGoods(settlement.stock)
        // Trade Deals
        settlement.trade_deals.forEach(deal => {
            if(deal.active === 'active') {
                settlement.stock = subtractGoods(settlement.stock,deal.outgoing)
                settlement.stock = addGoods(settlement.stock,deal.incoming)
                deal.duration -= 1
            }
        })
        updateSettlmentStock(settlement)
        settlement.prices = calcPriceGoods(settlement.prices,old_stock,settlement.stock)
        settlement.prices = scaleGoods(settlement.prices,market_health * randMarketHealth() * market_modifier)
        
        // Calculate popGrowth
        settlement.projected_pop = popGrowth(settlement,foreign_nations??[])

        const p0 = settlement.clans.map(clan => clan.population).reduce((sum,val) => sum + val)
        if(Math.floor(settlement.projected_pop) !== p0) {
            const delta_pop = Math.floor(settlement.projected_pop) - p0
            if (delta_pop > 0) {
                // Population growth
                for(let i = 0; i < delta_pop; i++) {
                    const newPop = Math.floor(Math.random() * 12)
                    settlement.clans.forEach(clan => { if (newPop == clan.id) { clan.population += 1 } })
                }
            } else {
                // Population decline
                const popToRemove = Math.abs(delta_pop)
                for(let i = 0; i < popToRemove; i++) {
                    // Find clans with population > 0
                    const populatedClans = settlement.clans.filter(clan => clan.population > 0)
                    if (populatedClans.length === 0) break // Stop if no population left
                    
                    // Randomly select a clan to lose population
                    const clanToAffect = populatedClans[Math.floor(Math.random() * populatedClans.length)]
                    clanToAffect.population -= 1
                }
            }
        }
        updateGoodsProduction(settlement)

        //Validate No over Production
        settlement.clans.forEach(clan => {
            const clan_produced = totalGoods(clan.production)
            clan.production = floorGoods(scaleGoods(scaleDownGoods(clan.production,clan_produced),clan.goods_produced))
        })

        // Filter out expired trade deals
        settlement.trade_deals = settlement.trade_deals.filter(deal => deal.duration > 0)

        // Merchant Capacity
        const merchants = settlement.clans.filter(clan => clan.id === clanTypes.merchants)[0]
        const merchant_cap = merchants.taxed_productivity
        settlement.merchant_capacity = Math.round(merchant_cap * (1 - settlement.merchant_tax))
        merchant_capacity += Math.round(merchant_cap * settlement.merchant_tax)
        // Remove merchant capacity used by trade deals
        settlement.trade_deals.forEach(deal => {
            if(deal.active === 'active') {
                settlement.merchant_capacity -= totalGoods(deal.outgoing) 
                settlement.merchant_capacity -= totalGoods(deal.incoming)
            }
        })

        // Ensure merchant capacity is not negative
        settlement.merchant_capacity = Math.max(settlement.merchant_capacity,0)

        //Reset available natural resource
        settlement.production_cap = {
            money: -1,
            food: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].food_and_water_balancing),
            beer: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].beer_balancing),
            leather: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].leather_and_textiles_balancing),
            artisanal: -1,
            livestock: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].livestock_balancing),
            ornamental: -1,
            enchanted: -1,
            timber: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].timber_balancing),
            tools: -1,
            common_ores: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].common_ores_balancing),
            medical: -1,
            rare_ores: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].rare_ores_balancing),
            gems: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].gems_balancing),
            runes: -1,
            arms: -1,
            books: -1,
            enchanted_arms: -1,
            charcoal: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].enchanted_charcoal_balancing)
        }

        // Update available loan
        settlement.available_loan += Math.abs(Math.round(merchants.total_productivity - merchants.taxed_productivity))
        settlement.available_loan = Math.max(settlement.available_loan,0)

        // Take Interest on Loans
        settlement.loans.forEach(loan => {
            settlement.stock.money -= Math.round(ensureNumber(loan.amount / loan.months_left))
            loan.months_left -= 1
        })

        // Remove loans that have been paid off
        settlement.loans = settlement.loans.filter(loan => loan.months_left > 0)

        // Take out loans if needed
        if (settlement.stock.money < 0) {
            let desired_loan = Math.round(Math.abs(settlement.stock.money) * 1.20)
            let new_loans: LoanInterface[] = []

            settlements.sort((a,b) => b.available_loan - a.available_loan).forEach(s => {
                if (s.available_loan > 0 && desired_loan > 0) {
                    const loan = takeLoan(
                        Math.min(desired_loan,s.available_loan),
                        s.visible_name,
                        s.name
                    )
                    new_loans.push(loan)
                    desired_loan -= loan.amount
                }
            })
            settlements.forEach(s => {
                new_loans.forEach(loan => {
                    if (loan.owner === s.name) {s.available_loan -= loan.amount}
                })
            })
            new_loans.forEach(loan => {
                settlement.stock.money += loan.amount
            })
            settlement.loans = [...settlement.loans,...new_loans]
        }

        // Recruitment Queue
        settlement.garrison.forEach(regiment => {
            if (regiment.turns_to_levy > 0) {regiment.turns_to_levy -= 1}
        })

        // Bankruptcy
        if (settlement.stock.money < 0) {
            settlement.garrison = []
            settlement.loans = []
            settlement.stock = {...empty_goodsdist}
        }

        // Remove expired modifiers
        settlement.clans.forEach(clan => {
            clan.efficency_modifiers.forEach(modifier => {modifier.duration -= 1})
            clan.loyalty_modifiers.forEach(modifier => {modifier.duration -= 1})
            clan.pop_growth_modifiers.forEach(modifier => {modifier.duration -= 1})
            clan.productivity_modifiers.forEach(modifier => {modifier.duration -= 1})
            clan.efficency_modifiers = clan.efficency_modifiers.filter(modifier => modifier.duration > 0)
            clan.loyalty_modifiers = clan.loyalty_modifiers.filter(modifier => modifier.duration > 0)
            clan.pop_growth_modifiers = clan.pop_growth_modifiers.filter(modifier => modifier.duration > 0)
            clan.productivity_modifiers = clan.productivity_modifiers.filter(modifier => modifier.duration > 0)
        })
    })

    foreign_nations?.forEach(nation => {
        const market_health = randMarketHealth()
        const old_supply = {...nation.supply}
        nation.supply = scaleGoods(nation.supply, market_health * randMarketHealth() * market_modifier)
        nation.demand = scaleGoods(nation.demand, market_health * randMarketHealth() * market_modifier)
        nation.price_history = [...nation.price_history,nation.prices]
        nation.prices = calcPriceGoods(nation.prices,old_supply,nation.supply)
        nation.available_supply = roundGoods(scaleGoods(nation.supply,nation.market_access))
        nation.available_demand = roundGoods(scaleGoods(nation.demand,nation.market_access))

        // Take into account trade deals
        nation.trade_deals.forEach(deal => {
            if(deal.active === 'active') {
                nation.available_demand = subtractGoods(nation.available_demand,deal.incoming)
                nation.available_supply = addGoods(nation.available_supply,deal.outgoing)
                deal.duration -= 1
            }
        })

        // Diplomat Sent
        if (nation.diplomat_sent) {
            nation.relations += 1
        }

        nation.relations = Math.max(nation.relations,-100)
        nation.relations = Math.min(nation.relations,100)
    })

    // Calculate federal military expenses
    const military_expenses = armies.reduce((sum,army) => addGoods(sum,army.units.reduce((ssum,unit) => addGoods(ssum,unit.consumption_rate),{...empty_goodsdist})),{...empty_goodsdist})
    next_goodsdist = subtractGoods(next_goodsdist,military_expenses)

    // Take into account trade deals
    trade_deals.forEach(deal => {
        if(deal.active === 'active') {
            next_goodsdist = subtractGoods(next_goodsdist,deal.outgoing)
            next_goodsdist = addGoods(next_goodsdist,deal.incoming)
            deal.duration -= 1
        }
        merchant_capacity = Math.max(merchant_capacity - totalGoods(deal.outgoing) - totalGoods(deal.incoming),0)
    })

    // Filter out expired trade deals
    trade_deals = trade_deals.filter(deal => deal.duration > 0)

    if(osc_months_passed > osc_months) {
        store.set('Osc Period',Math.floor(Math.random() * 28) + 48)
        store.set('Osc Months Passed',0)
        store.set('Market Trajectory',Math.random() * 0.005)
        store.set('Positive Global Market Trend',!global_market_trend)
    } else { store.set('Osc Months Passed',osc_months_passed + 1) }
    federal_interface.settlements = settlements
    federal_interface.foreign_powers = foreign_nations
    federal_interface.price_history = [...price_history,federal_prices]
    federal_prices = calcPriceGoods(federal_prices,current_goodsdist,addGoods(current_goodsdist,next_goodsdist))
    federal_interface.prices = scaleGoods(federal_prices,randMarketHealth() * randMarketHealth() * market_modifier)
    next_goodsdist = addGoods(current_goodsdist,next_goodsdist)

    // Take Interest on Loans
    loans.forEach(loan => {
        next_goodsdist.money -= Math.round(ensureNumber(loan.amount / loan.months_left))
        settlements.forEach(settlement => {
            if (settlement.name === loan.owner) {
                settlement.available_loan += Math.round(ensureNumber(loan.amount / loan.months_left))
            }
        })
        loan.months_left -= 1
    })

    // Remove loans that have been paid off
    loans = loans.filter(loan => loan.months_left > 0)

    // Take out loans if needed
    if (next_goodsdist.money < 0) {
        let desired_loan = Math.round(Math.abs(next_goodsdist.money) * 1.20)
        let new_loans: LoanInterface[] = []

        settlements.sort((a,b) => b.available_loan - a.available_loan).forEach(settlement => {
            if (settlement.available_loan > 0 && desired_loan > 0) {
                const loan = takeLoan(
                    Math.min(desired_loan,settlement.available_loan),
                    settlement.visible_name,
                    settlement.name
                )
                new_loans.push(loan)
                desired_loan -= loan.amount
            }
        })
        settlements.forEach(settlement => {
            new_loans.forEach(loan => {
                if (loan.owner === settlement.name) {settlement.available_loan -= loan.amount}
            })
        })
        new_loans.forEach(loan => {
            next_goodsdist.money += loan.amount
        })
        loans = [...loans,...new_loans]
    }

    next_goodsdist = roundGoods(next_goodsdist)

    // Make sure next_goodsdist is not negative
    next_goodsdist = {
        money: next_goodsdist.money,
        food: Math.max(next_goodsdist.food,0),
        beer: Math.max(next_goodsdist.beer,0),
        leather: Math.max(next_goodsdist.leather,0),
        artisanal: Math.max(next_goodsdist.artisanal,0),
        livestock: Math.max(next_goodsdist.livestock,0),
        ornamental: Math.max(next_goodsdist.ornamental,0),
        enchanted: Math.max(next_goodsdist.enchanted,0),
        timber: Math.max(next_goodsdist.timber,0),
        tools: Math.max(next_goodsdist.tools,0),
        common_ores: Math.max(next_goodsdist.common_ores,0),
        medical: Math.max(next_goodsdist.medical,0),
        rare_ores: Math.max(next_goodsdist.rare_ores,0),
        gems: Math.max(next_goodsdist.gems,0),
        runes: Math.max(next_goodsdist.runes,0),
        arms: Math.max(next_goodsdist.arms,0),
        books: Math.max(next_goodsdist.books,0),
        enchanted_arms: Math.max(next_goodsdist.enchanted_arms,0),
        charcoal: Math.max(next_goodsdist.charcoal,0)
    }

    // Bankruptcy
    if (next_goodsdist.money < 0) {
        next_goodsdist = {...empty_goodsdist}
        loans = []
        armies = []
    }
    store.set('Federal',{
        ...federal_interface,
        reserve: next_goodsdist,
        loans: loans,
        armies: armies,
        trade_deals: trade_deals
    })
    store.set('Turns Passed',turns_passed + 1)
    store.set('Merchant Capacity',Math.round(merchant_capacity))
    store.set('Current Month',(current_month + 1) % 12)
    store.set('Current Year',current_year + Math.floor((current_month + 1) / 12))
    store.save()
}

const randMarketHealth = () => ((Math.floor(Math.random() * 101) - 26)/(10 ** 5)) + 1
