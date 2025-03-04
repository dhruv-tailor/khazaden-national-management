import { ClanInterface, setGoodInteraction } from "./ClanInterface";

export const newRuneSmiths = () => {
    let runeSmiths: ClanInterface = {
        population: 0,
        food_and_water: setGoodInteraction(true, false),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, false),
        ornamental_luxuries: setGoodInteraction(true, false),
        livestock: setGoodInteraction(true, false),
        enchanted_luxuries: setGoodInteraction(false, true),
        timber: setGoodInteraction(false, false),
        tools: setGoodInteraction(false, false),
        common_ores: setGoodInteraction(false, false),
        medical_supplies: setGoodInteraction(false, false),
        rare_ores: setGoodInteraction(true, false),
        gems: setGoodInteraction(true, false),
        runes: setGoodInteraction(false, true),
        armaments: setGoodInteraction(false, false),
        books: setGoodInteraction(true, false),
        enchanted_armaments: setGoodInteraction(false, true),
        enchanted_charcoal: setGoodInteraction(true, false),
        tax_rate: 0.6,
        loyalty: 0,
        efficency: 0,
        taxed_productivity: 0,
        goods_produced: 0,
        productivity_rate: 5,
    }

    runeSmiths.rare_ores.consumption_rate = 5
    return runeSmiths;
}