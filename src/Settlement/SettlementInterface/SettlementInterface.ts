import { newArchivist } from "../../Clans/ClanInterface/Archivists";
import { baseProductivity, calcDevelopment, calcEfficency, calcLoyalty, calcTaxedProductivity, clanGoodsConsumed, ClanInterface, clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { newClerics } from "../../Clans/ClanInterface/Clerics";
import { newCraftsmen } from "../../Clans/ClanInterface/Craftsmen";
import { newCriminals } from "../../Clans/ClanInterface/Criminals";
import { newEngineers } from "../../Clans/ClanInterface/Engineers";
import { newFarmers } from "../../Clans/ClanInterface/Farmers";
import { newForesters } from "../../Clans/ClanInterface/Foresters";
import { newMerchants } from "../../Clans/ClanInterface/Merchants";
import { newMiners } from "../../Clans/ClanInterface/Miners";
import { newRulers } from "../../Clans/ClanInterface/Rulers";
import { newRuneSmiths } from "../../Clans/ClanInterface/RuneSmiths";
import { newWarriors } from "../../Clans/ClanInterface/Warriors";
import { LoanInterface } from "../../Economics/loans/loanInterface";
import { initial_prices } from "../../Economics/pricing/prices";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { addGoods, empty_goodsdist, goodsdist, roundGoods, scaleGoods, subtractGoods } from "../../Goods/GoodsDist";
import { ensureNumber } from "../../utilities/SimpleFunctions";
import { TerrainData, TerrainType } from "./TerrainInterface";
import { RegimentInterface } from "../../Military/units/RegimentInterface";
export enum SettlementTier {
    Hamlet = 1,
    Village,
    Town,
    City,
    Metropolis,
}

export interface SettlementInterface {
    name: string;
    visible_name: string;
    terrain_type: TerrainType;
    pop_cap: number;
    tier: SettlementTier;
    projected_pop: number;
    settlement_tax: number;
    production_quota: number;

    production_cap: goodsdist;
    stock: goodsdist;
    deficet: goodsdist;
    consumption_rate: goodsdist;

    clans: ClanInterface[]

    efficency_bonus: clanTypes
    loyalty_bonus: clanTypes
    corvee_bonus: clanTypes
    development_growth_bonus: clanTypes
    population_growth_bonus: clanTypes

    prices: goodsdist
    price_history: goodsdist[]
    merchant_capacity: number;

    months_stored: number;
    interest_rate: number;
    available_loan: number;
    loans: LoanInterface[];

    garrison: RegimentInterface[]
}


export const empty_settlement: SettlementInterface = {
    name: "",
    visible_name: "",
    terrain_type: TerrainType.Mountain,
    pop_cap: 0,
    tier: SettlementTier.Hamlet,
    projected_pop: 0,
    settlement_tax: 0,
    production_quota: 0,
    production_cap: {...empty_goodsdist},
    stock: {...empty_goodsdist},
    deficet: {...empty_goodsdist},
    consumption_rate: {...empty_goodsdist},
    clans: [],
    efficency_bonus: clanTypes.rulers,
    loyalty_bonus: clanTypes.rulers,
    corvee_bonus: clanTypes.rulers,
    development_growth_bonus: clanTypes.rulers,
    population_growth_bonus: clanTypes.rulers,
    prices: {...initial_prices},
    price_history: [],
    merchant_capacity: 0,
    months_stored: 1,
    interest_rate: 0.05,
    loans: [],
    available_loan: 0,
    garrison: [],
}

export const newSettlement = (name: string, terrain_type: TerrainType, visable_name?: string) => {
    let settlement = {...empty_settlement}
    settlement.name = name
    settlement.visible_name = visable_name ? visable_name : name
    settlement.terrain_type = terrain_type
    settlement.pop_cap = Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].reference_pop_cap)
    settlement.production_cap = {
        money: -1,
        food: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].food_and_water_balancing),
        beer: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].beer_balancing),
        leather: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].leather_and_textiles_balancing),
        artisinal: -1,
        livestock: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
        ornamental: -1,
        enchanted: -1,
        timber: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].timber_balancing),
        tools: -1,
        common_ores: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].common_ores_balancing),
        medical: -1,
        rare_ores: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].rare_ores_balancing),
        gems: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].gems_balancing),
        runes: -1,
        arms: -1,
        books: -1,
        enchanted_arms: -1,
        charcoal: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].enchanted_charcoal_balancing)
    }
    settlement.clans = [newRulers(),newArchivist(),newEngineers(),newRuneSmiths(),newCraftsmen(),newMerchants(),newClerics(),newMiners(),newFarmers(),newWarriors(),newForesters(),newCriminals()]
    return settlement
}

export const SettlementTierDetails = {
    [SettlementTier.Hamlet]: { name: 'Hamlet', value: SettlementTier.Hamlet },
    [SettlementTier.Village]: { name: 'Village', value: SettlementTier.Village },
    [SettlementTier.Town]: { name: 'Town', value: SettlementTier.Town },
    [SettlementTier.City]: { name: 'City', value: SettlementTier.City },
    [SettlementTier.Metropolis]: { name: 'Metropolis', value: SettlementTier.Metropolis },
};

export const updateGoodsProduction = (settlement: SettlementInterface) => {
    setConsumptionRates(settlement)
    setLoyalties(settlement)
    setEfficencies(settlement)
    setTaxedProductivities(settlement)
    setDevelopments(settlement)
}

const setConsumptionRates = (settlement: SettlementInterface) => {
    let consumption: goodsdist = {...empty_goodsdist}
    settlement.clans.forEach(clan => {
        consumption = addGoods(consumption,clanGoodsConsumed(clan))
    })
    settlement.consumption_rate = consumption
}

const setLoyalties = (settlement: SettlementInterface) => {
    settlement.clans.forEach(clan => {
        clan.loyalty = calcLoyalty(clan,settlement)
    })
}

const setEfficencies = (settlement: SettlementInterface) => {
    settlement.clans.forEach(clan => {
        clan.efficency = calcEfficency(clan,settlement)
    })
}

const setTaxedProductivities = (settlement: SettlementInterface) => {
    settlement.clans.forEach(clan => {
        clan.taxed_productivity = calcTaxedProductivity(clan,settlement)
        clan.goods_produced = Math.round(clan.taxed_productivity * 0.25)
        clan.total_productivity = baseProductivity(clan)
    })
}

const setDevelopments = (settlement: SettlementInterface) => settlement.clans.forEach(clan => clan.development += calcDevelopment(clan,settlement))

export const tierModifier = (tier: SettlementTier) => (2 ** (tier - 1))

export const updateSettlmentStock = (settlement: SettlementInterface) => {
    if (settlement.stock.food < 0) {
        settlement.deficet.food = Math.abs(settlement.stock.food)
        settlement.stock.food = 0
    }
    if (settlement.stock.beer < 0) {
        settlement.deficet.beer = Math.abs(settlement.stock.beer)
        settlement.stock.beer = 0
    }
    if (settlement.stock.leather < 0) {
        settlement.deficet.leather = Math.abs(settlement.stock.leather)
        settlement.stock.leather = 0
    }
    if (settlement.stock.artisinal < 0) {
        settlement.deficet.artisinal = Math.abs(settlement.stock.artisinal)
        settlement.stock.artisinal = 0
    }
    if (settlement.stock.livestock < 0) {
        settlement.deficet.livestock = Math.abs(settlement.stock.livestock)
        settlement.stock.livestock = 0
    }
    if (settlement.stock.ornamental < 0) {
        settlement.deficet.ornamental = Math.abs(settlement.stock.ornamental)
        settlement.stock.ornamental = 0
    }
    if (settlement.stock.enchanted < 0) {
        settlement.deficet.enchanted = Math.abs(settlement.stock.enchanted)
        settlement.stock.enchanted = 0
    }
    if (settlement.stock.timber < 0) {
        settlement.deficet.timber = Math.abs(settlement.stock.timber)
        settlement.stock.timber = 0
    }
    if (settlement.stock.tools < 0) {
        settlement.deficet.tools = Math.abs(settlement.stock.tools)
        settlement.stock.tools = 0
    }
    if (settlement.stock.common_ores < 0) {
        settlement.deficet.common_ores = Math.abs(settlement.stock.common_ores)
        settlement.stock.common_ores = 0
    }
    if (settlement.stock.medical < 0) {
        settlement.deficet.medical = Math.abs(settlement.stock.medical)
        settlement.stock.medical = 0
    }
    if (settlement.stock.rare_ores < 0) {
        settlement.deficet.rare_ores = Math.abs(settlement.stock.rare_ores)
        settlement.stock.rare_ores = 0
    }
    if (settlement.stock.gems < 0) {
        settlement.deficet.gems = Math.abs(settlement.stock.gems)
        settlement.stock.gems = 0
    }
    if (settlement.stock.runes < 0) {
        settlement.deficet.runes = Math.abs(settlement.stock.runes)
        settlement.stock.runes = 0
    }
    if (settlement.stock.arms < 0) {
        settlement.deficet.arms = Math.abs(settlement.stock.arms)
        settlement.stock.arms = 0
    }
    if (settlement.stock.charcoal < 0) {
        settlement.deficet.charcoal = Math.abs(settlement.stock.charcoal)
        settlement.stock.charcoal = 0
    }
    if (settlement.stock.books < 0) {
        settlement.deficet.books = Math.abs(settlement.stock.books)
        settlement.stock.books = 0
    }
}

export const popGrowth = (settlement: SettlementInterface, foreign_nations: ForeignPowerInterface[]) => {
    const K = settlement.projected_pop
    let P0 = 0
    let bonus = 0.00007 * settlement.clans.filter(clan => clan.id === clanTypes.clerics)[0].taxed_productivity
    let gained_pg = 0
    settlement.clans.forEach(clan => {
        P0 += clan.population
        if(settlement.population_growth_bonus === clan.id) { gained_pg += (clan.total_productivity - clan.taxed_productivity) * 0.7 * bonus }
        else { gained_pg += (clan.total_productivity - clan.taxed_productivity) * 0.7 }
    })
    gained_pg *= 0.7
    // shower growth from starving Civilians
    gained_pg *= Math.max(0, 1 - ensureNumber(settlement.deficet.food/settlement.consumption_rate.food))
    gained_pg -= Math.round(0.1 * ensureNumber(settlement.deficet.food/settlement.consumption_rate.food) / 75 * P0)
    // Immigration
    let MGM = 0
    foreign_nations.forEach(nation => { MGM += nation.immigrationRate * nation.dwarfPopulation })
    const avg_growth = P0 * 17.5226452905812 - 113.226452905812
    const pop_final = (settlement.pop_cap * K * Math.exp(MGM*gained_pg/avg_growth))/(settlement.pop_cap + K * (Math.exp(MGM * gained_pg/avg_growth)-1))
    return pop_final
}

export const settlementChange = (settlement: SettlementInterface): goodsdist => {
    let change = {...settlement.clans.map(clan => subtractGoods(
        roundGoods(
            scaleGoods(
                clan.production,
                1-settlement.production_quota
        )),
        scaleGoods(clan.consumption_rate,clan.population))
        ).reduce((sum,val) => addGoods(sum,val)),
        money: settlement.clans.map(
            clan => Math.round(clan.tax_rate * clan.taxed_productivity * (1 - settlement.settlement_tax))
        ).reduce((sum,val) => sum + val)
    }
    if (settlement.loans.length > 0) {
        change.money -= settlement.loans.map(
            loan => Math.round(loan.amount / loan.months_left)
        ).reduce((sum,val) => sum + val)
    }
    // Cost of Military
    change = subtractGoods(change,settlement.garrison.reduce((sum,val) => addGoods(sum,val.consumption_rate),{...empty_goodsdist}))
    return change
}

export const monthsStored = (s: SettlementInterface): goodsdist => {
    const change_per_turn = settlementChange(s)

    return scaleGoods(MonthsStoreGetChange(change_per_turn),s.months_stored)
}

export const MonthsStoreGetChange = (g: goodsdist): goodsdist => {
    return {
        money: g.money < 0 ? Math.abs(g.money) : 0,
        food: g.food < 0 ? Math.abs(g.food) : 0,
        beer: g.beer < 0 ? Math.abs(g.beer) : 0,
        leather: g.leather < 0 ? Math.abs(g.leather) : 0,
        artisinal: g.artisinal < 0 ? Math.abs(g.artisinal) : 0,
        livestock: g.livestock < 0 ? Math.abs(g.livestock) : 0,
        ornamental: g.ornamental < 0 ? Math.abs(g.ornamental) : 0,
        enchanted: g.enchanted < 0 ? Math.abs(g.enchanted) : 0,
        timber: g.timber < 0 ? Math.abs(g.timber) : 0,
        tools: g.tools < 0 ? Math.abs(g.tools) : 0,
        common_ores: g.common_ores < 0 ? Math.abs(g.common_ores) : 0,
        medical: g.medical < 0 ? Math.abs(g.medical) : 0,
        rare_ores: g.rare_ores < 0 ? Math.abs(g.rare_ores) : 0,
        gems: g.gems < 0 ? Math.abs(g.gems) : 0,
        runes: g.runes < 0 ? Math.abs(g.runes) : 0,
        arms: g.arms < 0 ? Math.abs(g.arms) : 0,
        books: g.books < 0 ? Math.abs(g.books) : 0,
        enchanted_arms: g.enchanted_arms < 0 ? Math.abs(g.enchanted_arms) : 0,
        charcoal: g.charcoal < 0 ? Math.abs(g.charcoal) : 0,
    }
}
