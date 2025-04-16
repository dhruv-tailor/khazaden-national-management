import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { addGoods, multiplyGoods, empty_goodsdist } from "../../Goods/GoodsDist";
import { regiment_consumption_factor, RegimentInterface, empty_regiment, regiment_types } from "./RegimentInterface";

export const BugmansRangers = () : RegimentInterface => {
    return {
        ...empty_regiment(),
        name: "Bugman's Rangers",
        type: regiment_types.BugmansRangers,
        clan_type: clanTypes.foresters,
        pops_conusmed: 40,
        max_pops: 40,
        turns_to_levy: 3,
        consumption_rate: addGoods(multiplyGoods(regiment_consumption_factor, {
        ...empty_goodsdist,
        tools: 0,
        medical: 0,
        livestock: 0,
        arms: 3,
        enchanted_arms: 2,
        money: 6,
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