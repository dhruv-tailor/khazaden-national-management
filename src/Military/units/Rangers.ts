import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { addGoods, multiplyGoods, empty_goodsdist } from "../../Goods/GoodsDist";
import { regiment_consumption_factor, RegimentInterface, empty_regiment, regiment_types } from "./RegimentInterface";

export const Rangers = () : RegimentInterface => {
    return {
        ...empty_regiment(),
        name: "Backwoods Scrappers",
        type: regiment_types.Rangers,
        clan_type: clanTypes.foresters,
        pops_conusmed: 20,
        max_pops: 20,
        turns_to_levy: 2,
        consumption_rate: addGoods(multiplyGoods(regiment_consumption_factor, {
        ...empty_goodsdist,
        tools: 0,
        medical: 0,
        livestock: 0,
        arms: 3,
        enchanted_arms: 0,
        money: 3,
    }),{
        money: 0,
        food: 1,
        beer: 1,
        leather: 1,
        artisanal: 1,
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