import { ClanInterface, newClerics, newCriminals, newFarmers, newForesters, newMerchants, newMiners, newWarriors } from "../Clans/ClanInterface";
import { TerrainData, TerrainType } from "./TerrainInterface";
import { newRulerClan } from "../Clans/Rulers";
import { newArchivists } from "../Clans/Archivists";
import { newEngineers } from "../Clans/Engineers";
import { newRuneSmiths } from "../Clans/RuneSmiths";
import { newCraftsmen } from "../Clans/Craftsmen";

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

interface settlementGoodsInfo {
    production_cap: number;
    stock: number;
    consumption_rate: number;
    deficit: number;
}

export enum SettlementTier {
    Hamlet = 1,
    Village,
    Town,
    City,
    Metropolis,
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
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].food_and_water_balancing),
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
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        enchanted_luxuries: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
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
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
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
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
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
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        runes: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        armaments: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
            stock: 0,
            consumption_rate: 0,
            deficit: 0,
        },
        enchanted_armaments: {
            production_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing),
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

export const setLoyalties = (settlement: SettlementInterface) => {
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

const calcLoylaty = (clan: ClanInterface, settlement: SettlementInterface): number => {
    const taxation_modifier = 3.24 + (1.23 * clan.tax_rate) - (12.40 * (clan.tax_rate ** 2))
    let total_goods_counted = 3
    let loyalty = 0
    loyalty += 1 - (settlement.beer.deficit / settlement.beer.consumption_rate)
    loyalty += 1 - (settlement.leather_and_textiles.deficit / settlement.leather_and_textiles.consumption_rate)
    loyalty += 1 - (settlement.artisinal_goods.deficit / settlement.leather_and_textiles.consumption_rate)
    if(clan.livestock.is_consumed) {
        loyalty += 1 - (settlement.ornamental_luxuries.deficit / settlement.ornamental_luxuries.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.livestock.is_consumed) {
        loyalty += 1 - (settlement.livestock.deficit / settlement.livestock.consumption_rate)
        total_goods_counted += 1
    }
    if(clan.enchanted_luxuries.is_consumed) {
        loyalty += 1 - (settlement.enchanted_luxuries.deficit / settlement.enchanted_luxuries.consumption_rate)
        total_goods_counted += 1
    }
    loyalty /= total_goods_counted * 6
    loyalty = Math.floor(Math.max(0,taxation_modifier + loyalty))
    loyalty = Math.min(10,loyalty)
    return 0;
}

const setEfficency = (clan: ClanInterface, settlement: SettlementInterface): number => {
    return 0;
}

const tierModifier = (tier: SettlementTier) => {
    return (2 ** (tier - 1))
}