import { EconomyTypeData, EconomyTypes } from "../../Goods/EconomyTypes";
import { AllianceStatus, CombatantStatus, ForeignPowerInterface, ForeignRecognition, MilitaryAccess, VassalStatus } from "../ForeignPowerInterface";
const pop_scaling_factor = 1000
const start_factor = 5
const economy = EconomyTypes.Dwarven

export const Eidgenossenkhazaden: ForeignPowerInterface = {
    name: "Eidgenossenkhazaden",
    relations: 2,
    recognition: ForeignRecognition.Limited,
    isEmbargoed: false,
    tarriffs: 0,
    dwarfPopulation: 0.25,
    immigrationRate: 0.10,
    combatantStatus: CombatantStatus.Neutral,
    allianceStatus: AllianceStatus.Friendly,
    vassalStatus: VassalStatus.None,
    militaryAccess: MilitaryAccess.Limited,
    economyType: EconomyTypes.Dwarven,
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
            }
}