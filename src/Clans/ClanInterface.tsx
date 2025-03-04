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
    taxed_productivity: number;
    goods_produced: number;
    productivity_rate: number;
}

export interface goodInteraction {
    is_consumed: boolean;
    is_produced: boolean;
    consumption_rate: number;
    production_rate: number;
}

export const setGoodInteraction = (isConsumed : boolean, isProduced: boolean) : goodInteraction => {
    return {is_consumed: isConsumed, is_produced: isProduced, consumption_rate: isConsumed ? 1 : 0, production_rate: isProduced ? 1 : 0}
}