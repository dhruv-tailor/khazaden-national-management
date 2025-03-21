import { clans } from "../Goods/good";
import { ensureNumber } from "../Settlement/SettlementInterface";

export interface ClanInterface {
    name: string;
    population: number;
    id: clans;
    
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
    loyalty_modifiers: modifier[]; 
    efficency: number;
    taxed_productivity: number;
    goods_produced: number;
    productivity_rate: number;
    total_productivity: number;

    // Develeopment
    development: number;
}

interface modifier {
    name: string;
    value: number;
}

export interface goodInteraction {
    is_consumed: boolean;
    is_produced: boolean;
    consumption_rate: number;
    produced: number;
}

export const setGoodInteraction = (isConsumed : boolean, isProduced: boolean) : goodInteraction => {
    return {
        is_consumed: isConsumed, 
        is_produced: isProduced, 
        consumption_rate: isConsumed ? 1 : 0, 
        produced: 0,
    }
}

const emptyGoodInteraction: goodInteraction = {
    is_consumed: true,
    is_produced: true,
    consumption_rate: 0,
    produced: 0,
}

export const emptyClanInterface: ClanInterface = {
    name: '',
    population: 0,
    id: clans.archivists,
    food_and_water: emptyGoodInteraction,
    beer: emptyGoodInteraction,
    leather_and_textiles: emptyGoodInteraction,
    artisanal_goods: emptyGoodInteraction,
    ornamental_luxuries: emptyGoodInteraction,
    livestock: emptyGoodInteraction,
    enchanted_luxuries: emptyGoodInteraction,
    timber: emptyGoodInteraction,
    tools: emptyGoodInteraction,
    common_ores: emptyGoodInteraction,
    medical_supplies: emptyGoodInteraction,
    rare_ores: emptyGoodInteraction,
    gems: emptyGoodInteraction,
    runes: emptyGoodInteraction,
    armaments: emptyGoodInteraction,
    books: emptyGoodInteraction,
    enchanted_armaments: emptyGoodInteraction,
    enchanted_charcoal: emptyGoodInteraction,

    // Goods produced = 0.25 * taxed_productivity
    // Taxed Goods is player set
    // taxed_productivity = ((loyalty + efficency)/20) * 40 * productivty_rate * population * tax_rate
    tax_rate: 0,
    loyalty: 0,
    efficency: 0,
    taxed_productivity: 0,
    goods_produced: 0,
    productivity_rate: 0,
    loyalty_modifiers: [],
    total_productivity: 0,
    development: 0,
}

export const developmentBonus = (clan: ClanInterface) : number =>  Math.floor(Math.max(0,Math.floor(((ensureNumber(clan.development/(8 * clan.population))) ** (1/3))-2))+1);