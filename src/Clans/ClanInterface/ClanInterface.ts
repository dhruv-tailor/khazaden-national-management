import { empty_goodsdist, goodsdist, scaleGoods } from "../../Goods/GoodsDist";
import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { modifier } from "../../utilities/Modifiers";
import { clampValue, ensureNumber } from "../../utilities/SimpleFunctions";

export enum clanTypes {
    rulers,
    archivists,
    engineers,
    runeSmiths,
    craftsmen,
    merchants,
    clerics,
    miners,
    farmers,
    warriors,
    foresters,
    criminals,
    none
}

export interface ClanInterface {
    name: string;
    population: number;
    id: clanTypes;

    consumption_rate: goodsdist;
    isProduced: goodsdist;
    production: goodsdist

    tax_rate: number;
    loyalty: number;
    loyalty_modifiers: modifier[]
    efficency: number;
    taxed_productivity: number;
    goods_produced: number;
    productivity_rate: number;
    total_productivity: number;

    development: number;
}

export const empty_clan = {
    name: "",
    population: 0,
    id: clanTypes.none,
    consumption_rate: {...empty_goodsdist},
    isProduced: {...empty_goodsdist},
    production: {...empty_goodsdist},
    tax_rate: 0.6,
    loyalty: 0,
    loyalty_modifiers: [],
    efficency: 0,
    taxed_productivity: 0,
    goods_produced: 0,
    productivity_rate: 0,
    total_productivity: 0,
    development: 0
}

export const clanGoodsConsumed = (clan: ClanInterface) => scaleGoods(clan.consumption_rate,clan.population)
const taxationModifier = (tax_rate: number) => 3.24 + (1.23 * tax_rate) - (12.40 * (tax_rate ** 2))
export const baseProductivity = (clan: ClanInterface) => ensureNumber((clan.loyalty + clan.efficency)/20) * 40 * clan.productivity_rate * clan.population
export const developmentBonus = (clan: ClanInterface) : number =>  Math.floor(
    Math.max(
        0,
        Math.floor(
            (ensureNumber(clan.development/(8 * clan.population))) ** (1/3)
        )-2
    )+1
);

const deficetRatio = (deficet: number, consumption_rate: number) => {
    let values = [0,0]
    if(consumption_rate > 0) {
        values[0] = 1 - ensureNumber(deficet / consumption_rate)
        values[1] = 1
    }
    return values
}

export const calcLoyalty = (clan: ClanInterface, settlement: SettlementInterface) => {
    const taxation_modifier = taxationModifier(clan.tax_rate)
    let total_goods_counter = 3
    let loyalty = 0
    loyalty += 1 - ensureNumber(settlement.deficet.beer / settlement.consumption_rate.beer)
    loyalty += 1 - ensureNumber(settlement.deficet.leather / settlement.consumption_rate.leather)
    loyalty += 1 - ensureNumber(settlement.deficet.artisanal / settlement.consumption_rate.artisanal)
    
    let val = deficetRatio(settlement.deficet.livestock,settlement.consumption_rate.livestock)
    loyalty += val[0]
    total_goods_counter += val[1]
    
    val = deficetRatio(settlement.deficet.ornamental,settlement.consumption_rate.ornamental)
    loyalty += val[0]
    total_goods_counter += val[1]
    
    val = deficetRatio(settlement.deficet.enchanted,settlement.consumption_rate.enchanted)
    loyalty += val[0]
    total_goods_counter += val[1]
    
    loyalty = ensureNumber(loyalty/total_goods_counter)
    loyalty *= 6
    clan.loyalty_modifiers.forEach(modifier => {loyalty += modifier.value})
    let bonus = 0
    if (settlement.loyalty_bonus === clan.id) {
        bonus = settlement.clans.filter(clan => clan.id === clanTypes.archivists)[0].taxed_productivity * 0.00017
        const base_productivity = baseProductivity(clan)
        bonus = ensureNumber(bonus/base_productivity)
        bonus = ensureNumber(Math.floor(bonus))
    }
    loyalty = Math.floor(Math.max(0,taxation_modifier + loyalty))
    loyalty = clampValue(taxation_modifier + loyalty + bonus,0,10)
    return loyalty
}

export const calcEfficency = (clan: ClanInterface, settlement: SettlementInterface) => {
    let efficency = 0
    let total_goods_counted = 0

    let val = deficetRatio(settlement.deficet.timber,settlement.consumption_rate.timber)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.tools,settlement.consumption_rate.tools)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.common_ores,settlement.consumption_rate.common_ores)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.medical,settlement.consumption_rate.medical)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.rare_ores,settlement.consumption_rate.rare_ores)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.gems,settlement.consumption_rate.gems)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.livestock,settlement.consumption_rate.livestock)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.runes,settlement.consumption_rate.runes)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.arms,settlement.consumption_rate.arms)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.books,settlement.consumption_rate.books)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.enchanted_arms,settlement.consumption_rate.enchanted_arms)
    efficency += val[0]
    total_goods_counted += val[1]

    val = deficetRatio(settlement.deficet.charcoal,settlement.consumption_rate.charcoal)
    efficency += val[0]
    total_goods_counted += val[1]

    let bonus = 1
    if (settlement.efficency_bonus === clan.id) {
        bonus = settlement.clans.filter(clan => clan.id === clanTypes.rulers)[0].taxed_productivity * 0.00013
        const base_productivity = baseProductivity(clan)
        bonus = ensureNumber(bonus/base_productivity)
        bonus = ensureNumber(Math.sqrt(bonus))
    }
    efficency = ensureNumber(efficency/total_goods_counted)
    efficency *= 5
    efficency = Math.max(efficency + developmentBonus(clan),0)
    efficency = Math.floor(efficency * bonus)
    return efficency
}

export const calcTaxedProductivity = (clan: ClanInterface, settlement: SettlementInterface) : number => {
    const productivity_modifier = (1 - ensureNumber(settlement.deficet.food / settlement.consumption_rate.food)) * clan.productivity_rate
    return ((clan.efficency + clan.loyalty) / 20) * 40 * productivity_modifier * clan.population * clan.tax_rate
}

export const calcDevelopment = (clan: ClanInterface, settlement: SettlementInterface) => {
    // Natural Development Growth
    let bonus = 1;
    if(clan.id === settlement.development_growth_bonus) {
       bonus = settlement.clans.filter(clan => clan.id === clanTypes.merchants)[0].total_productivity * (clan.total_productivity - clan.taxed_productivity) * 0.00008
       bonus += 1
    }
    return (clan.total_productivity - clan.taxed_productivity) * 0.3 * bonus
}