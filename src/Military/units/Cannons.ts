import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { addGoods, multiplyGoods, empty_goodsdist } from "../../Goods/GoodsDist";
import { regiment_consumption_factor, EliteVarient, RegimentInterface } from "./RegimentInterface";

export const Cannons: RegimentInterface = {
    name: "Boomin Bombards",
    type: "Cannons",
    clan_type: clanTypes.engineers,
    pops_conusmed: 4,
    turns_to_levy: 4,
    consumption_rate: addGoods(multiplyGoods(regiment_consumption_factor, {
        ...empty_goodsdist,
        tools: 1,
        medical: 0,
        livestock: 3,
        arms: 16,
        enchanted_arms: 0,
        money: 6,
    }),{
        money: 0,
        food: 1,
        beer: 1,
        leather: 1,
        artisinal: 1,
        ornamental: 1,
        livestock: 1,
        enchanted: 0,
        timber: 0,
        tools: 0,
        common_ores: 0,
        medical: 0,
        rare_ores: 0,
        gems: 0,
        runes: 1,
        arms: 0,
        books: 1,
        enchanted_arms: 0,
        charcoal: 0
    }),
    elite_varient: EliteVarient.standard,
    health: 100
}