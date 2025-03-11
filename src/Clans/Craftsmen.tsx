import { clans } from "../Goods/good";
import { ClanInterface, setGoodInteraction } from "./ClanInterface";

export const newCraftsmen = () => {
    let craftsmen: ClanInterface = {
        name: 'Craftsmen',
        population: 0,
        id: clans.craftsmen,
        food_and_water: setGoodInteraction(true, false),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, true),
        ornamental_luxuries: setGoodInteraction(true, true),
        livestock: setGoodInteraction(false, false),
        enchanted_luxuries: setGoodInteraction(false, false),
        timber: setGoodInteraction(true, false),
        tools: setGoodInteraction(false, true),
        common_ores: setGoodInteraction(true, false),
        medical_supplies: setGoodInteraction(false, false),
        rare_ores: setGoodInteraction(false, false),
        gems: setGoodInteraction(true, false),
        runes: setGoodInteraction(false, false),
        armaments: setGoodInteraction(false, true),
        books: setGoodInteraction(false, false),
        enchanted_armaments: setGoodInteraction(false, false),
        enchanted_charcoal: setGoodInteraction(false, false),
        tax_rate: 0.6,
        loyalty: 0,
        efficency: 0,
        taxed_productivity: 0,
        goods_produced: 0,
        productivity_rate: 5,
        loyalty_modifiers: [], 
        total_productivity: 0,
    }

    craftsmen.common_ores.consumption_rate = 5
    return craftsmen;
}