import { ClanInterface, emptyClanInterface } from "../Clans/ClanInterface";
import { TerrainData, TerrainType } from "./TerrainInterface";
import { newRulerClan } from "../Clans/Rulers";
import { newArchivists } from "../Clans/Archivists";
import { newEngineers } from "../Clans/Engineers";
import { newRuneSmiths } from "../Clans/RuneSmiths";
import { newCraftsmen } from "../Clans/Craftsmen";
import { newMerchants } from "../Clans/Merchants";
import { newClerics } from "../Clans/Clerics";
import { newMiners } from "../Clans/Miners";
import { newFarmers } from "../Clans/Farmers";
import { newWarriors } from "../Clans/Warriors";
import { newForesters } from "../Clans/Foresters";
import { newCriminals } from "../Clans/Criminals";
import { setConsumptionRates } from "./ConsumptionRate";

export interface SettlementInterface {
    name: string;
    terrain_type: TerrainType;
    pop_cap: number;
    tier: SettlementTier;

    food_and_water: settlementGoodsInfo;
    beer: settlementGoodsInfo;
    leather_and_textiles: settlementGoodsInfo;
    artisinal_goods: settlementGoodsInfo;
    livestock: settlementGoodsInfo;
    ornamental_luxuries: settlementGoodsInfo;
    enchanted_luxuries: settlementGoodsInfo;
    timber: settlementGoodsInfo;
    tools: settlementGoodsInfo
    enchanted_charcoal: settlementGoodsInfo;
    common_ores: settlementGoodsInfo;
    medical_supplies: settlementGoodsInfo;
    gems: settlementGoodsInfo;
    runes: settlementGoodsInfo;
    armaments: settlementGoodsInfo;
    books: settlementGoodsInfo;
    enchanted_armaments: settlementGoodsInfo;
    rare_ores: settlementGoodsInfo;

    rulers: ClanInterface;
    archivists: ClanInterface;
    engineers: ClanInterface;
    rune_smiths: ClanInterface;
    craftsmen: ClanInterface;
    merchants: ClanInterface;
    clerics: ClanInterface;
    miners: ClanInterface;
    farmers: ClanInterface;
    warriors: ClanInterface;
    foresters: ClanInterface;
    criminals: ClanInterface;
}

export enum SettlementTier {
    Hamlet = 1,
    Village,
    Town,
    City,
    Metropolis,
}

interface settlementGoodsInfo {
    production_cap: number;
    stock: number;
    consumption_rate: number;
    deficit: number;
}

const emptySettlementGoodsInfo: settlementGoodsInfo = {
    production_cap: 0,
    stock: 0,
    consumption_rate: 0,
    deficit: 0
}

export const emptySettlement: SettlementInterface = {
    name: '',
    terrain_type: TerrainType.Enchanted_Forest,
    pop_cap: 0,
    tier: SettlementTier.City,

    food_and_water: emptySettlementGoodsInfo,
    beer: emptySettlementGoodsInfo,
    leather_and_textiles: emptySettlementGoodsInfo,
    artisinal_goods: emptySettlementGoodsInfo,
    livestock: emptySettlementGoodsInfo,
    ornamental_luxuries: emptySettlementGoodsInfo,
    enchanted_luxuries: emptySettlementGoodsInfo,
    timber: emptySettlementGoodsInfo,
    tools: emptySettlementGoodsInfo,
    enchanted_charcoal: emptySettlementGoodsInfo,
    common_ores: emptySettlementGoodsInfo,
    medical_supplies: emptySettlementGoodsInfo,
    gems: emptySettlementGoodsInfo,
    runes: emptySettlementGoodsInfo,
    armaments: emptySettlementGoodsInfo,
    books: emptySettlementGoodsInfo,
    enchanted_armaments: emptySettlementGoodsInfo,
    rare_ores: emptySettlementGoodsInfo,

    rulers: emptyClanInterface,
    archivists: emptyClanInterface,
    engineers: emptyClanInterface,
    rune_smiths: emptyClanInterface,
    craftsmen: emptyClanInterface,
    merchants: emptyClanInterface,
    clerics: emptyClanInterface,
    miners: emptyClanInterface,
    farmers: emptyClanInterface,
    warriors: emptyClanInterface,
    foresters: emptyClanInterface,
    criminals: emptyClanInterface,
}



export const SettlementTierDetails = {
    [SettlementTier.Hamlet]: { name: 'Hamlet', value: SettlementTier.Hamlet },
    [SettlementTier.Village]: { name: 'Village', value: SettlementTier.Village },
    [SettlementTier.Town]: { name: 'Town', value: SettlementTier.Town },
    [SettlementTier.City]: { name: 'City', value: SettlementTier.City },
    [SettlementTier.Metropolis]: { name: 'Metropolis', value: SettlementTier.Metropolis },
};

export const newSettlement = (name: string, terrain_type: TerrainType) => {
    let settlement: SettlementInterface = {
        name: name,
        terrain_type: terrain_type,
        tier: SettlementTier.Hamlet,
        pop_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].reference_pop_cap),
        food_and_water: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].food_and_water_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        beer: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].beer_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        leather_and_textiles: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].leather_and_textiles_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        artisinal_goods: {
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },

        livestock: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        ornamental_luxuries:{
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        enchanted_luxuries: {
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        timber: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].timber_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        tools: {
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        enchanted_charcoal: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].enchanted_charcoal_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        common_ores: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].common_ores_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        medical_supplies: {
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        gems: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].gems_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        rare_ores: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].rare_ores_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        books: {
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        runes: {
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        armaments: {
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        enchanted_armaments: {
            production_cap: -1,
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        
        rulers: newRulerClan(),
        archivists: newArchivists(),
        engineers: newEngineers(),
        rune_smiths: newRuneSmiths(),
        craftsmen: newCraftsmen(),
        merchants: newMerchants(),
        clerics: newClerics(),
        miners: newMiners(),
        farmers: newFarmers(),
        warriors: newWarriors(),
        foresters: newForesters(),
        criminals: newCriminals(),
    }
    return settlement;
}

export const updateGoodsProduction = (settlement: SettlementInterface) => {
    setConsumptionRates(settlement)
    setLoyalties(settlement)
    setEfficency(settlement)
    setTaxedProductivity(settlement)
}

const setTaxedProductivity = (settlement: SettlementInterface) => {
    settlement.rulers.taxed_productivity = calcTaxedProductivity(settlement.rulers,settlement)
    settlement.archivists.taxed_productivity = calcTaxedProductivity(settlement.archivists,settlement)
    settlement.engineers.taxed_productivity = calcTaxedProductivity(settlement.engineers,settlement)
    settlement.rune_smiths.taxed_productivity = calcTaxedProductivity(settlement.rune_smiths,settlement)
    settlement.craftsmen.taxed_productivity = calcTaxedProductivity(settlement.craftsmen,settlement)
    settlement.merchants.taxed_productivity = calcTaxedProductivity(settlement.merchants,settlement)
    settlement.clerics.taxed_productivity = calcTaxedProductivity(settlement.clerics,settlement)
    settlement.miners.taxed_productivity = calcTaxedProductivity(settlement.miners,settlement)
    settlement.farmers.taxed_productivity = calcTaxedProductivity(settlement.farmers,settlement)
    settlement.warriors.taxed_productivity = calcTaxedProductivity(settlement.warriors,settlement)
    settlement.foresters.taxed_productivity = calcTaxedProductivity(settlement.foresters,settlement)
    settlement.criminals.taxed_productivity = calcTaxedProductivity(settlement.criminals,settlement)
    
    settlement.rulers.goods_produced = Math.round(settlement.rulers.taxed_productivity * 0.25)
    settlement.archivists.goods_produced = Math.round(settlement.archivists.taxed_productivity * 0.25)
    settlement.engineers.goods_produced = Math.round(settlement.engineers.taxed_productivity * 0.25)
    settlement.rune_smiths.goods_produced = Math.round(settlement.rune_smiths.taxed_productivity * 0.25)
    settlement.craftsmen.goods_produced = Math.round(settlement.craftsmen.taxed_productivity * 0.25)
    settlement.merchants.goods_produced = Math.round(settlement.merchants.taxed_productivity * 0.25)
    settlement.clerics.goods_produced = Math.round(settlement.clerics.taxed_productivity * 0.25)
    settlement.miners.goods_produced = Math.round(settlement.miners.taxed_productivity * 0.25)
    settlement.farmers.goods_produced = Math.round(settlement.farmers.taxed_productivity * 0.25)
    settlement.warriors.goods_produced = Math.round(settlement.warriors.taxed_productivity * 0.25)
    settlement.foresters.goods_produced = Math.round(settlement.foresters.taxed_productivity * 0.25)
    settlement.criminals.goods_produced = Math.round(settlement.criminals.taxed_productivity * 0.25)
}

const calcTaxedProductivity = (clan: ClanInterface, settlement: SettlementInterface) : number => {
    const productivity_modifier = (1 - ensureNumber(settlement.food_and_water.deficit / settlement.food_and_water.consumption_rate)) * clan.productivity_rate
    return ((clan.efficency + clan.loyalty) / 20) * 40 * productivity_modifier * clan.population * clan.tax_rate
}


const setLoyalties = (settlement: SettlementInterface) => {
    settlement.rulers.loyalty = calcLoylaty(settlement.rulers,settlement)
    settlement.archivists.loyalty = calcLoylaty(settlement.archivists,settlement)
    settlement.engineers.loyalty = calcLoylaty(settlement.engineers,settlement)
    settlement.rune_smiths.loyalty = calcLoylaty(settlement.rune_smiths,settlement)
    settlement.craftsmen.loyalty = calcLoylaty(settlement.craftsmen,settlement)
    settlement.merchants.loyalty = calcLoylaty(settlement.merchants,settlement)
    settlement.clerics.loyalty = calcLoylaty(settlement.clerics,settlement)
    settlement.miners.loyalty = calcLoylaty(settlement.miners,settlement)
    settlement.farmers.loyalty = calcLoylaty(settlement.farmers,settlement)
    settlement.warriors.loyalty = calcLoylaty(settlement.warriors,settlement)
    settlement.foresters.loyalty = calcLoylaty(settlement.foresters,settlement)
    settlement.criminals.loyalty = calcLoylaty(settlement.criminals,settlement)
}

// R^2 of 0.96 compared to the table
const taxationModifier = (tax_rate: number) => 3.24 + (1.23 * tax_rate) - (12.40 * (tax_rate ** 2))

// Loyalty is a function of goods and taxrate. goes from 0-10
const calcLoylaty = (clan: ClanInterface, settlement: SettlementInterface): number => {
    const taxation_modifier = taxationModifier(clan.tax_rate)
    let total_goods_counted = 3
    let loyalty = 0
    loyalty += 1 - ensureNumber(settlement.beer.deficit / settlement.beer.consumption_rate)
    loyalty += 1 - ensureNumber(settlement.leather_and_textiles.deficit / settlement.leather_and_textiles.consumption_rate)
    loyalty += 1 - ensureNumber(settlement.artisinal_goods.deficit / settlement.leather_and_textiles.consumption_rate)
    if(clan.livestock.is_consumed) {
        loyalty += 1 - ensureNumber(settlement.ornamental_luxuries.deficit / settlement.ornamental_luxuries.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.livestock.is_consumed) {
        loyalty += 1 - ensureNumber(settlement.livestock.deficit / settlement.livestock.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.enchanted_luxuries.is_consumed) {
        loyalty += 1 - ensureNumber(settlement.enchanted_luxuries.deficit / settlement.enchanted_luxuries.consumption_rate)
        total_goods_counted += 1
    }
    loyalty = ensureNumber(loyalty / total_goods_counted)
    loyalty *= 6
    clan.loyalty_modifiers.forEach(modifier => {
        loyalty += modifier.value
    })
    loyalty = Math.floor(Math.max(0,taxation_modifier + loyalty))
    loyalty = Math.min(10,loyalty)
    return loyalty;
}

const ensureNumber = (value: number): number => isNaN(value) ? 0 : value

// development + goods consumption
const setEfficency = (settlement: SettlementInterface) => {
    settlement.rulers.efficency = calcEfficency(settlement.rulers,settlement)
    settlement.archivists.efficency = calcEfficency(settlement.archivists,settlement)
    settlement.engineers.efficency = calcEfficency(settlement.engineers,settlement)
    settlement.rune_smiths.efficency = calcEfficency(settlement.rune_smiths,settlement)
    settlement.craftsmen.efficency = calcEfficency(settlement.craftsmen,settlement)
    settlement.merchants.efficency = calcEfficency(settlement.merchants,settlement)
    settlement.clerics.efficency = calcEfficency(settlement.clerics,settlement)
    settlement.miners.efficency = calcEfficency(settlement.miners,settlement)
    settlement.farmers.efficency = calcEfficency(settlement.farmers,settlement)
    settlement.warriors.efficency = calcEfficency(settlement.warriors,settlement)
    settlement.foresters.efficency = calcEfficency(settlement.foresters,settlement)
    settlement.criminals.efficency = calcEfficency(settlement.criminals,settlement)
}

// TODO: Development
const calcEfficency = (clan: ClanInterface, settlement: SettlementInterface): number => {
    let efficency = 0
    let total_goods_counted = 0
    if(clan.timber.is_consumed) {
        efficency += 1 - ensureNumber(settlement.timber.deficit / settlement.timber.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.tools.is_consumed) {
        efficency += 1 - ensureNumber(settlement.tools.deficit / settlement.tools.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.common_ores.is_consumed) {
        efficency += 1 - ensureNumber(settlement.common_ores.deficit / settlement.common_ores.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.medical_supplies.is_consumed) {
        efficency += 1 - ensureNumber(settlement.medical_supplies.deficit / settlement.medical_supplies.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.rare_ores.is_consumed) {
        efficency += 1 - ensureNumber(settlement.rare_ores.deficit / settlement.rare_ores.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.gems.is_consumed) {
        efficency += 1 - ensureNumber(settlement.gems.deficit / settlement.gems.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.livestock.is_consumed) {
        efficency += 1 - ensureNumber(settlement.livestock.deficit / settlement.livestock.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.runes.is_consumed) {
        efficency += 1 - ensureNumber(settlement.runes.deficit / settlement.runes.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.armaments.is_consumed) {
        efficency += 1 - ensureNumber(settlement.armaments.deficit / settlement.armaments.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.books.is_consumed) {
        efficency += 1 - ensureNumber(settlement.books.deficit / settlement.books.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.enchanted_armaments.is_consumed) {
        efficency += 1 - ensureNumber(settlement.enchanted_armaments.deficit / settlement.enchanted_armaments.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.enchanted_charcoal.is_consumed) {
        efficency += 1 - ensureNumber(settlement.enchanted_charcoal.deficit / settlement.enchanted_charcoal.consumption_rate)
        total_goods_counted += 1
    }
    efficency = ensureNumber(efficency / total_goods_counted)
    efficency *= 5
    efficency = Math.max(efficency + 1,0)
    efficency = Math.floor(efficency)
    return efficency;
}


const tierModifier = (tier: SettlementTier) => {
    return (2 ** (tier - 1))
}