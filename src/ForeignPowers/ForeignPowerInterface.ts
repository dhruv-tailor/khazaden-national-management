import { goodsdist } from "../components/ResourceDistribution";
import { initial_prices } from "../Economics/priceChanges";
import { EconomyTypeData, EconomyTypes } from "../Goods/EconomyTypes";

export enum ForeignRecognition {
    None,
    Secret,
    Limited,
    Full
}

export enum CombatantStatus {
    Neutral,
    LowIntesity,
    ProvincialWarfare,
    ConventionalWarfare,
    Allied
}

export enum AllianceStatus {
    Overlord,
    Allied,
    Friendly,
    Neutral,
    Nostile,
    AtWar,
    Subject
}

export enum VassalStatus {
    None,
    Colony,
    Puppet,
    March,
    Dominion,
    Protectorate
}

export enum MilitaryAccess {
    Prohibited,
    Limited,
    Granted
}

export interface ForeignPowerInterface {
    name: string;
    relations: number;
    recognition: ForeignRecognition;
    isEmbargoed: boolean;
    tarriffs: number;
    dwarfPopulation: number;
    immigrationRate: number;
    combatantStatus: CombatantStatus;
    allianceStatus: AllianceStatus;
    vassalStatus: VassalStatus;
    militaryAccess: MilitaryAccess;
    economyType: EconomyTypes;
    supply: goodsdist;
    demand: goodsdist;
    prices: goodsdist;
    available_supply: goodsdist;
    available_demand: goodsdist;
    retlaitory_tariffs: number;
    price_history: goodsdist[]
}

export const newForeignPower = (name: string, dwarfPopulation: number,economy: EconomyTypes,start_factor: number): ForeignPowerInterface => {
    const pop_scaling_factor = 1000
    return({
        name: name,
        relations: 0,
        recognition: ForeignRecognition.None,
        isEmbargoed: true,
        tarriffs: 0,
        dwarfPopulation: dwarfPopulation,
        immigrationRate: 0,
        combatantStatus: CombatantStatus.Neutral,
        allianceStatus: AllianceStatus.Neutral,
        vassalStatus: VassalStatus.None,
        militaryAccess: MilitaryAccess.Prohibited,
        economyType: economy,
        supply: {
            money: pop_scaling_factor * start_factor,
            food: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.food,
            beer: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.beer,
            leather: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.leather,
            artisinal: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.artisinal,
            livestock: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.livestock,
            ornamental: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.ornamental,
            enchanted: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.enchanted,
            timber: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.timber,
            tools: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.tools,
            common_ores: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.common_ores,
            medical: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.medical,
            rare_ores: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.rare_ores,
            gems: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.gems,
            runes: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.runes,
            arms: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.arms,
            books: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.books,
            enchanted_arms: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.enchanted_arms,
            charcoal: pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.charcoal
        },
        demand: {
            money: pop_scaling_factor * start_factor,
            food: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.food,
            beer: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.beer,
            leather: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.leather,
            artisinal: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.artisinal,
            livestock: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.livestock,
            ornamental: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.ornamental,
            enchanted: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.enchanted,
            timber: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.timber,
            tools: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.tools,
            common_ores: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.common_ores,
            medical: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.medical,
            rare_ores: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.rare_ores,
            gems: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.gems,
            runes: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.runes,
            arms: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.arms,
            books: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.books,
            enchanted_arms: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.enchanted_arms,
            charcoal: pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.charcoal
        },
        prices: {...initial_prices},
        available_supply: {
            money: Math.round(pop_scaling_factor * start_factor * 0.05),
            food: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.food * 0.05),
            beer: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.beer * 0.05),
            leather: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.leather * 0.05),
            artisinal: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.artisinal * 0.05),
            livestock: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.livestock * 0.05),
            ornamental: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.ornamental * 0.05),
            enchanted: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.enchanted * 0.05),
            timber: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.timber * 0.05),
            tools: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.tools * 0.05),
            common_ores: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.common_ores * 0.05),
            medical: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.medical * 0.05),
            rare_ores: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.rare_ores * 0.05),
            gems: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.gems * 0.05),
            runes: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.runes * 0.05),
            arms: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.arms * 0.05),
            books: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.books * 0.05),
            enchanted_arms: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.enchanted_arms * 0.05),
            charcoal: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].supply.charcoal * 0.05)
        },
        available_demand: {
            money: Math.round(pop_scaling_factor * start_factor * 0.05),
            food: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.food * 0.05),
            beer: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.beer * 0.05),
            leather: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.leather * 0.05),
            artisinal: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.artisinal * 0.05),
            livestock: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.livestock * 0.05),
            ornamental: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.ornamental * 0.05),
            enchanted: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.enchanted * 0.05),
            timber: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.timber * 0.05),
            tools: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.tools * 0.05),
            common_ores: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.common_ores * 0.05),
            medical: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.medical * 0.05),
            rare_ores: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.rare_ores * 0.05),
            gems: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.gems * 0.05),
            runes: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.runes * 0.05),
            arms: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.arms * 0.05),
            books: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.books * 0.05),
            enchanted_arms: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.enchanted_arms * 0.05),
            charcoal: Math.round(pop_scaling_factor * start_factor * EconomyTypeData[economy].demand.charcoal * 0.05)
        },
        retlaitory_tariffs: 0,
        price_history: []
    })
}
