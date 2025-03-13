export interface goodsdist {
    money: number;
    food: number;
    beer: number;
    leather: number;
    artisinal: number;
    livestock: number;
    ornamental: number;
    enchanted: number;
    timber: number;
    tools: number;
    common_ores: number;
    medical: number;
    rare_ores: number;
    gems: number;
    runes: number;
    arms: number;
    books: number;
    enchanted_arms: number;
    charcoal: number;
}

export const empty_goodsdist: goodsdist = {
    money: 0,
    food: 0,
    beer: 0,
    leather: 0,
    artisinal: 0,
    livestock: 0,
    ornamental: 0,
    enchanted: 0,
    timber: 0,
    tools: 0,
    common_ores: 0,
    medical: 0,
    rare_ores: 0,
    gems: 0,
    runes: 0,
    arms: 0,
    books: 0,
    enchanted_arms: 0,
    charcoal: 0
}

export default function ResourceDistribuition({goods_cap},{goods_cap: goodsdist}) {
    
}