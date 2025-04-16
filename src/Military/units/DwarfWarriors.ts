import { addGoods, empty_goodsdist, multiplyGoods } from "../../Goods/GoodsDist";
import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { regiment_consumption_factor, RegimentInterface, empty_regiment, regiment_types } from "./RegimentInterface";

export const DwarfWarriors = () : RegimentInterface => {
    return {
        ...empty_regiment(),
        name: "Dwarf Warriors",
        type: regiment_types.DwarfWarriors,
        clan_type: clanTypes.warriors,
        pops_conusmed: 5,
        max_pops: 5,
        turns_to_levy: 2,
        consumption_rate: addGoods(multiplyGoods(regiment_consumption_factor, {
        ...empty_goodsdist,
        tools: 1,
        medical: 1,
        livestock: 1,
        arms: 1,
        money: 3,
    }),{
        money: 0,
        food: 1,
        beer: 1,
        leather: 1,
        artisinal: 1,
        ornamental: 0,
        livestock: 0,
        enchanted: 0,
        timber: 0,
        tools: 1,
        common_ores: 0,
        medical: 0,
        rare_ores: 0,
        gems: 0,
        runes: 0,
        arms: 0,
        books: 0,
        enchanted_arms: 0,
        charcoal: 0
    }),
    }
}