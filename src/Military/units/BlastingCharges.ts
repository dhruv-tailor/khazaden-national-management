import { addGoods, empty_goodsdist, multiplyGoods } from "../../Goods/GoodsDist";
import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { EliteVarient, regiment_consumption_factor, RegimentInterface } from "./RegimentInterface";

export const BlastingCharges: RegimentInterface = {
    name: "Tunnel Clearers",
    type: "BlastingCharges",
    clan_type: clanTypes.miners,
    pops_conusmed: 20,
    turns_to_levy: 1,
    consumption_rate: addGoods(multiplyGoods(regiment_consumption_factor, {
        ...empty_goodsdist,
        tools: 10,
        medical: 1,
        livestock: 1,
        money: 1,
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
    elite_varient: EliteVarient.standard,
    health: 100
}