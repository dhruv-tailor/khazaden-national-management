import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./SaveData";
import { popGrowth, SettlementInterface, tierModifier, updateGoodsProduction, updateSettlmentStock } from "../Settlement/SettlementInterface/SettlementInterface";
import { ForeignPowerInterface } from "../ForeignPowers/Interface/ForeignPowerInterface";
import { goodsdist, empty_goodsdist, addGoods, subtractGoods, scaleGoods, roundGoods, totalGoods, scaleDownGoods, floorGoods } from "../Goods/GoodsDist";
import { calcPriceGoods } from "../Economics/pricing/prices";
import { clanTypes } from "../Clans/ClanInterface/ClanInterface";
import { TerrainData } from "../Settlement/SettlementInterface/TerrainInterface";


export const NextTurn = async (game: string) => {
    const store = await load(await saveLocation(game), {autoSave: false});
    const settlements = await store.get<SettlementInterface[]>('settlements');
    const current_goodsdist = await store.get<goodsdist>('Federal Reserve') ?? {...empty_goodsdist};
    let next_goodsdist = {...empty_goodsdist};
    const foreign_nations = await store.get<ForeignPowerInterface[]>('Foreign Powers');
    // Market Data
    const osc_months = await store.get<number>('Osc Period') ?? 0
    const osc_months_passed = await store.get<number>('Osc Months Passed')?? 0
    const market_trajectory = await store.get<number>('Market Trajectory')?? 0
    const global_market_trend = await store.get<boolean>('Positive Global Market Trend')?? true
    const market_modifier = (Math.random() * ((2 * market_trajectory) + market_trajectory) - market_trajectory * (global_market_trend ? 1 : -1)) + 1
    const turns_passed = await store.get<number>('Turns Passed') ?? 0;
    let federal_prices = await store.get<goodsdist>('Federal Prices') ?? {...empty_goodsdist}
    const price_history = await store.get<goodsdist[]>('Price History') ?? []

    // Federal Merchant Capacity
    let merchant_capacity: number = 0

    settlements?.forEach(settlement => {
        // First update Taxation
        let base_tax = 0
        let produced: goodsdist = {...empty_goodsdist}
        settlement.clans.forEach(clan => {
            base_tax += clan.tax_rate * clan.taxed_productivity
            produced = addGoods(produced,clan.production)
        })
        base_tax = Math.round(base_tax)
        settlement.stock.money += Math.round(base_tax * (1 - settlement.settlement_tax))
        next_goodsdist.money += Math.round(base_tax * settlement.settlement_tax)
        settlement.price_history = [...settlement.price_history,settlement.prices]

        // Update Settlement Stock
        next_goodsdist = roundGoods(addGoods(scaleGoods(produced,settlement.production_quota),next_goodsdist))
        produced = roundGoods(scaleGoods(produced,1-settlement.production_quota))
        const old_stock = {...settlement.stock}
        settlement.stock = addGoods(settlement.stock,subtractGoods(produced,settlement.consumption_rate) )
        updateSettlmentStock(settlement)
        settlement.prices = calcPriceGoods(settlement.prices,old_stock,settlement.stock)
        
        // Calculate popGrowth
        popGrowth(settlement,foreign_nations??[])

        const p0 = settlement.clans.map(clan => clan.population).reduce((sum,val) => sum + val)
        if(Math.floor(settlement.projected_pop) > p0) {
            const delta_pop = Math.floor(settlement.projected_pop) - p0
            for(let i = 0; i < delta_pop; i++) {
                const newPop = Math.floor(Math.random() * 12)
                settlement.clans.forEach(clan => { if (newPop == clan.id) { clan.population += 1 } })
            }
        }
        updateGoodsProduction(settlement)

        //Validate No over Production
        settlement.clans.forEach(clan => {
            const clan_produced = totalGoods(clan.production)
            clan.production = floorGoods(scaleGoods(scaleDownGoods(clan.production,clan_produced),clan.goods_produced))
        })

        // Merchant Capacity
        const merchant_cap = settlement.clans.filter(clan => clan.id === clanTypes.merchants)[0].taxed_productivity
        settlement.merchant_capacity = Math.round(merchant_cap * (1 - settlement.settlement_tax))
        merchant_capacity += Math.round(merchant_cap * settlement.settlement_tax)

        //Reset available natural resource
        settlement.production_cap = {
            money: -1,
            food: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].food_and_water_balancing),
            beer: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].beer_balancing),
            leather: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].leather_and_textiles_balancing),
            artisinal: -1,
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
    })

    foreign_nations?.forEach(nation => {
        const market_health = randMarketHealth()
        const old_supply = {...nation.supply}
        nation.supply = scaleGoods(nation.supply, market_health * randMarketHealth() * market_modifier)
        nation.demand = scaleGoods(nation.demand, market_health * randMarketHealth() * market_modifier)
        nation.price_history = [...nation.price_history,nation.prices]
        nation.prices = calcPriceGoods(nation.prices,old_supply,nation.supply)
        nation.available_supply = roundGoods(scaleGoods(nation.supply,0.05))
        nation.available_demand = roundGoods(scaleGoods(nation.demand,0.05))

        // Adjust tariffs
        // If Player is taxing more, then match the new tarriff rate
        if (nation.tarriffs > nation.retlaitory_tariffs) {
            nation.relations -= 1
            nation.retlaitory_tariffs = nation.tarriffs
            if (nation.relations < 0) {
                nation.retlaitory_tariffs *= 1 + (Math.abs(nation.recognition) / 10 )
            }
        }
        else if (nation.retlaitory_tariffs > 0) {
            nation.retlaitory_tariffs -= (nation.tarriffs - nation.retlaitory_tariffs) / 100
            nation.retlaitory_tariffs = Math.max(nation.retlaitory_tariffs,0)
        }
    })

    if(osc_months_passed > osc_months) {
        store.set('Osc Period',Math.floor(Math.random() * 28) + 48)
        store.set('Osc Months Passed',0)
        store.set('Market Trajectory',Math.random() * 0.005)
        store.set('Positive Global Market Trend',!global_market_trend)
    } else {
        store.set('Osc Months Passed',osc_months_passed + 1)
    }
    store.set('settlements',settlements)
    store.set('Foreign Powers',foreign_nations)
    store.set('Price History',[...price_history,federal_prices])
    federal_prices = calcPriceGoods(federal_prices,current_goodsdist,addGoods(current_goodsdist,next_goodsdist))
    store.set('Federal Prices', federal_prices)

    next_goodsdist = addGoods(current_goodsdist,next_goodsdist)

    store.set('Federal Reserve', next_goodsdist)
    store.set('Turns Passed',turns_passed + 1)
    store.set('Merchant Capacity',Math.round(merchant_capacity))
    store.save()
}

const randMarketHealth = () => ((Math.floor(Math.random() * 101) - 26)/(10 ** 5)) + 1