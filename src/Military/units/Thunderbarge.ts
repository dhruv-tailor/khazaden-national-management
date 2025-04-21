import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { addGoods, multiplyGoods, empty_goodsdist } from "../../Goods/GoodsDist";
import { regiment_consumption_factor, RegimentInterface, empty_regiment, regiment_types } from "./RegimentInterface";

export const Thunderbarge = () : RegimentInterface => {
    return {
        ...empty_regiment(),
        name: "Thunderbarge",
        type: regiment_types.Thunderbarge,
        clan_type: clanTypes.engineers,
        pops_conusmed: 50,
        max_pops: 50,
        turns_to_levy: 12,
        consumption_rate: addGoods(multiplyGoods(regiment_consumption_factor, {
        ...empty_goodsdist,
        tools: 20,
        medical: 0,
        livestock: 0,
        arms: 15,
        enchanted_arms: 30,
        money: 100,
    }),{
        money: 0,
        food: 1,
        beer: 1,
        leather: 1,
        artisanal: 1,
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
    }
}