import { ClanInterface, setGoodInteraction } from "./ClanInterface";

export const newClerics = () => {
    let clerics: ClanInterface = {
        name: 'Clerics',
        population: 0,
        food_and_water: setGoodInteraction(true, false),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, false),
        ornamental_luxuries: setGoodInteraction(true, false),
        livestock: setGoodInteraction(false, false),
        enchanted_luxuries: setGoodInteraction(false, false),
        timber: setGoodInteraction(false, false),
        tools: setGoodInteraction(false, false),
        common_ores: setGoodInteraction(false, false),
        medical_supplies: setGoodInteraction(false, true),
        rare_ores: setGoodInteraction(false, false),
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
        productivity_rate: 4,
    }
    return clerics;
}