import { TerrainData, TerrainType } from "./TerrainInterface";

export interface SettlementInterface {
    name: string;
    terrain_type: TerrainType;
    tier: SettlementTier;

    pop_cap: number;
    food_and_water_cap: number;
    beer_cap: number;
    leather_and_textiles_cap: number;
    livestock_cap: number;
    timber_cap: number;
    enchanted_charcoal_cap: number;
    common_ores_cap: number;
    gems_cap: number;
    rare_ores_cap: number;

    population: number;
    food_and_water: number;
    beer: number;
    leather_and_textiles: number;
    livestock: number;
    timber: number;
    enchanted_charcoal: number;
    common_ores: number;
    gems: number;
    rare_ores: number;
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
        food_and_water_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].food_and_water_balancing),
        beer_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].beer_balancing),
        leather_and_textiles_cap: Math.round(tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].leather_and_textiles_balancing),
        livestock_cap: tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].livestock_balancing,
        timber_cap: tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].timber_balancing,
        enchanted_charcoal_cap: tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].enchanted_charcoal_balancing,
        common_ores_cap: tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].common_ores_balancing,
        gems_cap: tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].gems_balancing,
        rare_ores_cap: tierModifier(SettlementTier.Hamlet) * TerrainData[terrain_type].rare_ores_balancing,
        food_and_water: 0,
        beer: 0,
        leather_and_textiles: 0,
        livestock: 0,
        timber: 0,
        enchanted_charcoal: 0,
        common_ores: 0,
        gems: 0,
        rare_ores: 0,
        population: 0
    }
    return settlement;
}

const tierModifier = (tier: SettlementTier) => {
    return (2 ** (tier - 1))
}