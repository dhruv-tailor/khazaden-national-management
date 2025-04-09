import { ensureNumber } from "../utilities/SimpleFunctions";

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

export enum goodsId {
    money,
    food,
    beer,
    leather,
    artisinal,
    livestock,
    ornamental,
    enchanted,
    timber,
    tools,
    common_ores,
    medical,
    rare_ores,
    gems,
    runes,
    arms,
    books,
    enchanted_arms,
    charcoal,
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

export const addGoods = (a: goodsdist, b: goodsdist): goodsdist => {
    return {
        money: a.money + b.money,
        food: a.food + b.food,
        beer: a.beer + b.beer,
        leather: a.leather + b.leather,
        artisinal: a.artisinal + b.artisinal,
        livestock: a.livestock + b.livestock,
        ornamental: a.ornamental + b.ornamental,
        enchanted: a.enchanted + b.enchanted,
        timber: a.timber + b.timber,
        tools: a.tools + b.tools,
        common_ores: a.common_ores + b.common_ores,
        medical: a.medical + b.medical,
        rare_ores: a.rare_ores + b.rare_ores,
        gems: a.gems + b.gems,
        runes: a.runes + b.runes,
        arms: a.arms + b.arms,
        books: a.books + b.books,
        enchanted_arms: a.enchanted_arms + b.enchanted_arms,
        charcoal: a.charcoal + b.charcoal
    }
}

export const subtractGoods = (a: goodsdist, b: goodsdist): goodsdist => {
    return {
        money: a.money - b.money,
        food: a.food - b.food,
        beer: a.beer - b.beer,
        leather: a.leather - b.leather,
        artisinal: a.artisinal - b.artisinal,
        livestock: a.livestock - b.livestock,
        ornamental: a.ornamental - b.ornamental,
        enchanted: a.enchanted - b.enchanted,
        timber: a.timber - b.timber,
        tools: a.tools - b.tools,
        common_ores: a.common_ores - b.common_ores,
        medical: a.medical - b.medical,
        rare_ores: a.rare_ores - b.rare_ores,
        gems: a.gems - b.gems,
        runes: a.runes - b.runes,
        arms: a.arms - b.arms,
        books: a.books - b.books,
        enchanted_arms: a.enchanted_arms - b.enchanted_arms,
        charcoal: a.charcoal - b.charcoal
    }
}

export const multiplyGoods = (a: goodsdist, b: goodsdist): goodsdist => {
    return {
        money: a.money * b.money,
        food: a.food * b.food,
        beer: a.beer * b.beer,
        leather: a.leather * b.leather,
        artisinal: a.artisinal * b.artisinal,
        livestock: a.livestock * b.livestock,
        ornamental: a.ornamental * b.ornamental,
        enchanted: a.enchanted * b.enchanted,
        timber: a.timber * b.timber,
        tools: a.tools * b.tools,
        common_ores: a.common_ores * b.common_ores,
        medical: a.medical * b.medical,
        rare_ores: a.rare_ores * b.rare_ores,
        gems: a.gems * b.gems,
        runes: a.runes * b.runes,
        arms: a.arms * b.arms,
        books: a.books * b.books,
        enchanted_arms: a.enchanted_arms * b.enchanted_arms,
        charcoal: a.charcoal * b.charcoal
    }
}

export const divideGoods = (a: goodsdist, b: goodsdist): goodsdist => {
    return {
        money: ensureNumber(a.money / b.money),
        food: ensureNumber(a.food / b.food),
        beer: ensureNumber(a.beer / b.beer),
        leather: ensureNumber(a.leather / b.leather),
        artisinal: ensureNumber(a.artisinal / b.artisinal),
        livestock: ensureNumber(a.livestock / b.livestock),
        ornamental: ensureNumber(a.ornamental / b.ornamental),
        enchanted: ensureNumber(a.enchanted / b.enchanted),
        timber: ensureNumber(a.timber / b.timber),
        tools: ensureNumber(a.tools / b.tools),
        common_ores: ensureNumber(a.common_ores / b.common_ores),
        medical: ensureNumber(a.medical / b.medical),
        rare_ores: ensureNumber(a.rare_ores / b.rare_ores),
        gems: ensureNumber(a.gems / b.gems),
        runes: ensureNumber(a.runes / b.runes),
        arms: ensureNumber(a.arms / b.arms),
        books: ensureNumber(a.books / b.books),
        enchanted_arms: ensureNumber(a.enchanted_arms / b.enchanted_arms),
        charcoal: ensureNumber(a.charcoal / b.charcoal)
    }
}

export const scaleGoods = (a: goodsdist, modifier: number): goodsdist => {
    return {
        money: a.money * modifier,
        food: a.food * modifier,
        beer: a.beer * modifier,
        leather: a.leather * modifier,
        artisinal: a.artisinal * modifier,
        livestock: a.livestock * modifier,
        ornamental: a.ornamental * modifier,
        enchanted: a.enchanted * modifier,
        timber: a.timber * modifier,
        tools: a.tools * modifier,
        common_ores: a.common_ores * modifier,
        medical: a.medical * modifier,
        rare_ores: a.rare_ores * modifier,
        gems: a.gems * modifier,
        runes: a.runes * modifier,
        arms: a.arms * modifier,
        books: a.books * modifier,
        enchanted_arms: a.enchanted_arms * modifier,
        charcoal: a.charcoal * modifier
    }
}

export const scaleDownGoods = (a: goodsdist, modifier: number): goodsdist => {
    return {
        money: ensureNumber(a.money / modifier),
        food: ensureNumber(a.food / modifier),
        beer: ensureNumber(a.beer / modifier),
        leather: ensureNumber(a.leather / modifier),
        artisinal: ensureNumber(a.artisinal / modifier),
        livestock: ensureNumber(a.livestock / modifier),
        ornamental: ensureNumber(a.ornamental / modifier),
        enchanted: ensureNumber(a.enchanted / modifier),
        timber: ensureNumber(a.timber / modifier),
        tools: ensureNumber(a.tools / modifier),
        common_ores: ensureNumber(a.common_ores / modifier),
        medical: ensureNumber(a.medical / modifier),
        rare_ores: ensureNumber(a.rare_ores / modifier),
        gems: ensureNumber(a.gems / modifier),
        runes: ensureNumber(a.runes / modifier),
        arms: ensureNumber(a.arms / modifier),
        books: ensureNumber(a.books / modifier),
        enchanted_arms: ensureNumber(a.enchanted_arms / modifier),
        charcoal: ensureNumber(a.charcoal / modifier)
    }
}

export const roundGoods = (a: goodsdist): goodsdist => {
    return {
        money: Math.round(a.money),
        food: Math.round(a.food),
        beer: Math.round(a.beer),
        leather: Math.round(a.leather),
        artisinal: Math.round(a.artisinal),
        livestock: Math.round(a.livestock),
        ornamental: Math.round(a.ornamental),
        enchanted: Math.round(a.enchanted),
        timber: Math.round(a.timber),
        tools: Math.round(a.tools),
        common_ores: Math.round(a.common_ores),
        medical: Math.round(a.medical),
        rare_ores: Math.round(a.rare_ores),
        gems: Math.round(a.gems),
        runes: Math.round(a.runes),
        arms: Math.round(a.arms),
        books: Math.round(a.books),
        enchanted_arms: Math.round(a.enchanted_arms),
        charcoal: Math.round(a.charcoal)
    }
}

export const totalGoods = (a: goodsdist): number => {
    let total = 0
    total += a.food
    total += a.beer
    total += a.leather
    total += a.artisinal
    total += a.livestock
    total += a.ornamental
    total += a.enchanted
    total += a.timber
    total += a.tools
    total += a.common_ores
    total += a.medical
    total += a.rare_ores
    total += a.gems
    total += a.runes
    total += a.arms
    total += a.books
    total += a.enchanted_arms
    total += a.charcoal
    return total
}

export const floorGoods = (a: goodsdist): goodsdist => {
    return {
        money: Math.floor(a.money),
        food: Math.floor(a.food),
        beer: Math.floor(a.beer),
        leather: Math.floor(a.leather),
        artisinal: Math.floor(a.artisinal),
        livestock: Math.floor(a.livestock),
        ornamental: Math.floor(a.ornamental),
        enchanted: Math.floor(a.enchanted),
        timber: Math.floor(a.timber),
        tools: Math.floor(a.tools),
        common_ores: Math.floor(a.common_ores),
        medical: Math.floor(a.medical),
        rare_ores: Math.floor(a.rare_ores),
        gems: Math.floor(a.gems),
        runes: Math.floor(a.runes),
        arms: Math.floor(a.arms),
        books: Math.floor(a.books),
        enchanted_arms: Math.floor(a.enchanted_arms),
        charcoal: Math.floor(a.charcoal)
    }
}

export const minPerGood = (a: goodsdist,b: number): goodsdist => {
    return {
        money: Math.min(a.money,b),
        food: Math.min(a.food,b),
        beer: Math.min(a.beer,b),
        leather: Math.min(a.leather,b),
        artisinal: Math.min(a.artisinal,b),
        livestock: Math.min(a.livestock,b),
        ornamental: Math.min(a.ornamental,b),
        enchanted: Math.min(a.enchanted,b),
        timber: Math.min(a.timber,b),
        tools: Math.min(a.tools,b),
        common_ores: Math.min(a.common_ores,b),
        medical: Math.min(a.medical,b),
        rare_ores: Math.min(a.rare_ores,b),
        gems: Math.min(a.gems,b),
        runes: Math.min(a.runes,b),
        arms: Math.min(a.arms,b),
        books: Math.min(a.books,b),
        enchanted_arms: Math.min(a.enchanted_arms,b),
        charcoal: Math.min(a.charcoal,b)
    }
}
