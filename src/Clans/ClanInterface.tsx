export interface ClanInterface {
    population: number;
    
    // Consumption and Production
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

    // Goods produced = 0.25 * taxed_productivity
    // Taxed Goods is player set
    // taxed_productivity = ((loyalty + efficency)/20) * 40 * productivty_rate * population * tax_rate
    tax_rate: number;
    loyalty: number;
    efficency: number;
}

interface goodInteraction {
    is_consumed: boolean;
    is_produced: boolean;
    consumption_rate: number;
    production_rate: number;
}

export const newMerchants = () => {
    let merchants: ClanInterface = {
        population: 0,
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
    }
    return merchants;
}

export const newClerics = () => {
    let clerics: ClanInterface = {
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
    }
    return clerics;
}

export const newMiners = () => {
    let miners: ClanInterface = {
        population: 0,
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
    }
    return miners;
}

export const newFarmers = () => {
    let farmers: ClanInterface = {
        population: 0,
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
    }
    return farmers;
}

export const newWarriors = () => {
    let warriors: ClanInterface = {
        population: 0,
        food_and_water: setGoodInteraction(true, false),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, false),
        ornamental_luxuries: setGoodInteraction(false, false),
        livestock: setGoodInteraction(false, false),
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
    }
    return warriors;
}

export const newForesters = () => {
    let foresters: ClanInterface = {
        population: 0,
        food_and_water: setGoodInteraction(true, true),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, true),
        ornamental_luxuries: setGoodInteraction(false, false),
        livestock: setGoodInteraction(false, false),
        enchanted_luxuries: setGoodInteraction(false, false),
        timber: setGoodInteraction(false, true),
        tools: setGoodInteraction(false, false),
        common_ores: setGoodInteraction(false, false),
        medical_supplies: setGoodInteraction(false, false),
        rare_ores: setGoodInteraction(false, false),
        gems: setGoodInteraction(false, false),
        runes: setGoodInteraction(false, false),
        armaments: setGoodInteraction(false, false),
        books: setGoodInteraction(false, false),
        enchanted_armaments: setGoodInteraction(false, false),
        enchanted_charcoal: setGoodInteraction(false, true),
        tax_rate: 0.6,
        loyalty: 0,
        efficency: 0,
    }
    return foresters;
}

export const newCriminals = () => {
    let foresters: ClanInterface = {
        population: 0,
        food_and_water: setGoodInteraction(true, false),
        beer: setGoodInteraction(true, false),
        leather_and_textiles: setGoodInteraction(true, false),
        artisanal_goods: setGoodInteraction(true, false),
        ornamental_luxuries: setGoodInteraction(false, false),
        livestock: setGoodInteraction(false, false),
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
    }
    return foresters;
}

export const setGoodInteraction = (isConsumed : boolean, isProduced: boolean) : goodInteraction => {
    return {is_consumed: isConsumed, is_produced: isProduced, consumption_rate: isConsumed ? 1 : 0, production_rate: 0}
}