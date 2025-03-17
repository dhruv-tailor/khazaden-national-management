import { clans } from "../Goods/good";
import { ClanInterface, setGoodInteraction } from "./ClanInterface";

export const newArchivists = () => {
    let archivists: ClanInterface = {
        name: 'Archivists',
        population: 0,
        id: clans.archivists,
        food_and_water: setGoodInteraction(true, false),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, false),
        ornamental_luxuries: setGoodInteraction(true, false),
        livestock: setGoodInteraction(true, false),
        enchanted_luxuries: setGoodInteraction(false, false),
        timber: setGoodInteraction(false, false),
        tools: setGoodInteraction(false, false),
        common_ores: setGoodInteraction(false, false),
        medical_supplies: setGoodInteraction(false, false),
        rare_ores: setGoodInteraction(true, false),
        gems: setGoodInteraction(false, false),
        runes: setGoodInteraction(true, false),
        armaments: setGoodInteraction(false, false),
        books: setGoodInteraction(false, true),
        enchanted_armaments: setGoodInteraction(false, false),
        enchanted_charcoal: setGoodInteraction(false, false),
        tax_rate: 0.6,
        loyalty: 0,
        efficency: 0,
        taxed_productivity: 0,
        goods_produced: 0,
        productivity_rate: 6,
        loyalty_modifiers: [],
        total_productivity: 0,
        development: 0,
    }
    return archivists;
}