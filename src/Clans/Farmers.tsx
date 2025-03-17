import { clans } from "../Goods/good";
import { ClanInterface, setGoodInteraction } from "./ClanInterface";

export const newFarmers = () => {
    let farmers: ClanInterface = {
        name: 'Farmers',
        population: 0,
        id: clans.farmers,
        food_and_water: setGoodInteraction(true, true),
        beer: setGoodInteraction(true, true),
        leather_and_textiles: setGoodInteraction(true, true),
        artisanal_goods: setGoodInteraction(true, false),
        ornamental_luxuries: setGoodInteraction(false, false),
        livestock: setGoodInteraction(false, true),
        enchanted_luxuries: setGoodInteraction(false, false),
        timber: setGoodInteraction(false, false),
        tools: setGoodInteraction(true, false),
        common_ores: setGoodInteraction(false, false),
        medical_supplies: setGoodInteraction(false, false),
        rare_ores: setGoodInteraction(false, false),
        gems: setGoodInteraction(false, false),
        runes: setGoodInteraction(false, false),
        armaments: setGoodInteraction(false, false),
        books: setGoodInteraction(false, false),
        enchanted_armaments: setGoodInteraction(false, false),
        enchanted_charcoal: setGoodInteraction(false, false),
        tax_rate: 0.6,
        loyalty: 0,
        efficency: 0,
        taxed_productivity: 0,
        goods_produced: 0,
        productivity_rate: 1,
        loyalty_modifiers: [], 
        total_productivity: 0,
        development: 0,
    }
    return farmers;
}