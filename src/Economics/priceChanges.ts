import { goodsdist } from "../components/ResourceDistribution";
import { ensureNumber } from "../Settlement/SettlementInterface";

export const price_volitility: goodsdist = {
    money: 0,
    food: 0.02,
    beer: 0.06,
    leather: 0.07,
    artisinal: 0.12,
    livestock: 0.18,
    ornamental: 0.17,
    enchanted: 0.35,
    timber: 0.03,
    tools: 0.03,
    common_ores: 0.04,
    medical: 0.09,
    rare_ores: 0.25,
    gems: 0.28,
    runes: 0.27,
    arms: 0.13,
    books: 0.10,
    enchanted_arms: 0.38,
    charcoal: 0.22
}

export const calcPriceChange = (current_price: number, current_inventory: number, new_inventory: number, volitility: number) => {
    const val = Math.max(0,ensureNumber(current_price * (1 + volitility * Math.log(ensureNumber(current_inventory/new_inventory)))))
    return(val !== 0 ? val : current_price)
}

export const initial_prices: goodsdist = {
    money: 0,
    food: 4,
    beer: 9,
    leather: 12,
    artisinal: 13,
    livestock: 15,
    ornamental: 17,
    enchanted: 35,
    timber: 5,
    tools: 7,
    common_ores: 8,
    medical: 9,
    rare_ores: 11,
    gems: 15,
    runes: 21,
    arms: 27,
    books: 27,
    enchanted_arms: 32,
    charcoal: 40
}