import { clans } from "../Goods/good";
import { ClanInterface, setGoodInteraction } from "./ClanInterface";

export const newMiners = () => {
    let miners: ClanInterface = {
        name: 'Miners',
        population: 0,
        id: clans.miners,
        food_and_water: setGoodInteraction(true, false),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, false),
        ornamental_luxuries: setGoodInteraction(false, false),
        livestock: setGoodInteraction(false, false),
        enchanted_luxuries: setGoodInteraction(false, false),
        timber: setGoodInteraction(false, false),
        tools: setGoodInteraction(true, false),
        common_ores: setGoodInteraction(false, true),
        medical_supplies: setGoodInteraction(false, false),
        rare_ores: setGoodInteraction(false, true),
        gems: setGoodInteraction(false, true),
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
        productivity_rate: 3,
        loyalty_modifiers: [],
        total_productivity: 0,
    }
    return miners;
}