import { goodsdist } from "../../Goods/GoodsDist"
import { ensureNumber } from "../../utilities/SimpleFunctions"

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
    return((val !== 0) || (val !== null) ? val : current_price)
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
const fixPrice = (price: number) => (price === null || Math.round(price) === 0) 

export const calcPriceGoods = (current_prices: goodsdist, current_inventory: goodsdist, new_inventory: goodsdist) => {
    const new_prices = {
        money: current_prices.money,
        food: calcPriceChange(current_prices.food,current_inventory.food,new_inventory.food,price_volitility.food),
        beer: calcPriceChange(current_prices.beer,current_inventory.beer,new_inventory.beer,price_volitility.beer),
        leather: calcPriceChange(current_prices.leather,current_inventory.leather,new_inventory.leather,price_volitility.leather),
        artisinal: calcPriceChange(current_prices.artisinal,current_inventory.artisinal,new_inventory.artisinal,price_volitility.artisinal),
        livestock: calcPriceChange(current_prices.livestock,current_inventory.livestock,new_inventory.livestock,price_volitility.livestock),
        ornamental: calcPriceChange(current_prices.ornamental,current_inventory.ornamental,new_inventory.ornamental,price_volitility.ornamental),
        enchanted: calcPriceChange(current_prices.enchanted,current_inventory.enchanted,new_inventory.enchanted,price_volitility.enchanted),
        timber: calcPriceChange(current_prices.timber,current_inventory.timber,new_inventory.timber,price_volitility.timber),
        tools: calcPriceChange(current_prices.tools,current_inventory.tools,new_inventory.tools,price_volitility.tools),
        common_ores: calcPriceChange(current_prices.common_ores,current_inventory.common_ores,new_inventory.common_ores,price_volitility.common_ores),
        medical: calcPriceChange(current_prices.medical,current_inventory.medical,new_inventory.medical,price_volitility.medical),
        rare_ores: calcPriceChange(current_prices.rare_ores,current_inventory.rare_ores,new_inventory.rare_ores,price_volitility.rare_ores),
        gems: calcPriceChange(current_prices.gems,current_inventory.gems,new_inventory.gems,price_volitility.gems),
        runes: calcPriceChange(current_prices.runes,current_inventory.runes,new_inventory.runes,price_volitility.runes),
        arms: calcPriceChange(current_prices.arms,current_inventory.arms,new_inventory.arms,price_volitility.arms),
        books: calcPriceChange(current_prices.books,current_inventory.books,new_inventory.books,price_volitility.books),
        enchanted_arms: calcPriceChange(current_prices.enchanted_arms,current_inventory.enchanted_arms,new_inventory.enchanted_arms,price_volitility.enchanted_arms),
        charcoal: calcPriceChange(current_prices.charcoal,current_inventory.charcoal,new_inventory.charcoal,price_volitility.charcoal),
    }
    return {
        money: current_prices.money,
        food: fixPrice(new_prices.food) ? initial_prices.food : new_prices.food,
        beer: fixPrice(new_prices.beer) ? initial_prices.beer : new_prices.beer,
        leather: fixPrice(new_prices.leather) ? initial_prices.leather : new_prices.leather,
        artisinal: fixPrice(new_prices.artisinal) ? initial_prices.artisinal : new_prices.artisinal,
        livestock: fixPrice(new_prices.livestock) ? initial_prices.livestock : new_prices.livestock,
        ornamental: fixPrice(new_prices.ornamental) ? initial_prices.ornamental : new_prices.ornamental,
        enchanted: fixPrice(new_prices.enchanted) ? initial_prices.enchanted : new_prices.enchanted,
        timber: fixPrice(new_prices.timber) ? initial_prices.timber : new_prices.timber,
        tools: fixPrice(new_prices.tools) ? initial_prices.tools : new_prices.tools,
        common_ores: fixPrice(new_prices.common_ores) ? initial_prices.common_ores : new_prices.common_ores,
        medical: fixPrice(new_prices.medical) ? initial_prices.medical : new_prices.medical,
        rare_ores: fixPrice(new_prices.rare_ores) ? initial_prices.rare_ores : new_prices.rare_ores,
        gems: fixPrice(new_prices.gems) ? initial_prices.gems : new_prices.gems,
        runes: fixPrice(new_prices.runes) ? initial_prices.runes : new_prices.runes,
        arms: fixPrice(new_prices.arms) ? initial_prices.arms : new_prices.arms,
        books: fixPrice(new_prices.books) ? initial_prices.books : new_prices.books,
        enchanted_arms: fixPrice(new_prices.enchanted_arms) ? initial_prices.enchanted_arms : new_prices.enchanted_arms,
        charcoal: fixPrice(new_prices.charcoal) ? initial_prices.charcoal : new_prices.charcoal,
    }
}
