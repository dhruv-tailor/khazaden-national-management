interface ClanInterface {
    population: number;
    
    // Consumption
    food_and_water: goodInteraction;
    beer: goodInteraction;
    leather_and_textiles: goodInteraction;
    artisanal_goods: goodInteraction;
    ornamental_luxuries: goodInteraction;
    livestock: goodInteraction;
    enchanted_luxuries: goodInteraction;
    timber: goodInteraction;
    tools: goodInteraction;
    common_ores: goodInteraction;
    medical_supplies: goodInteraction;
    rare_ores: goodInteraction;
    gems: goodInteraction;
    runes: goodInteraction;
    armaments: goodInteraction;
    books: goodInteraction;
    enchanted_armaments: goodInteraction;
    enchanted_charcoal: goodInteraction;
}

interface goodInteraction {
    is_consumed: boolean;
    is_produced: boolean;
    consumption_rate: number;
    production_rate: number;
}

const newRulerClan = () => {
    let rulers: ClanInterface = {
        population: 0,
        food_and_water: setGoodInteraction(true, false),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, false),
        ornamental_luxuries: setGoodInteraction(true, false),
        livestock: setGoodInteraction(true, false),
        enchanted_luxuries: setGoodInteraction(true, false),
        timber: setGoodInteraction(false, false),
        tools: setGoodInteraction(false, false),
        common_ores: setGoodInteraction(false, false),
        medical_supplies: setGoodInteraction(false, false),
        rare_ores: setGoodInteraction(false, false),
        gems: setGoodInteraction(false, false),
        runes: setGoodInteraction(false, false),
        armaments: setGoodInteraction(false, false),
        books: setGoodInteraction(false, false),
        enchanted_armaments: setGoodInteraction(false, false),
        enchanted_charcoal: setGoodInteraction(false, false),
    }
    return rulers;
}

const setGoodInteraction = (isConsumed : boolean, isProduced: boolean) : goodInteraction => {
    return {is_consumed: isConsumed, is_produced: isProduced, consumption_rate: isConsumed ? 1 : 0, production_rate: 0}
}