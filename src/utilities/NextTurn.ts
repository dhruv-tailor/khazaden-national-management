import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./SaveData";
import { popGrowth, SettlementInterface, updateGoodsProduction } from "../Settlement/SettlementInterface";
import { empty_goodsdist, goodsdist } from "../components/ResourceDistribution";
import { ForeignPowerInterface } from "../ForeignPowers/ForeignPowerInterface";
import { calcPriceChange, price_volitility } from "../Economics/priceChanges";

// Calcualtes How much a settlement's stock changes
const calcStockChange = (produced: number, consumed: number, quota: number) => Math.round((produced * (1 - quota)) - consumed)

export const NextTurn = async (game: string) => {
    const store = await load(await saveLocation(game), {autoSave: false});
    const settlements = await store.get<SettlementInterface[]>('settlements');
    const current_goodsdist = await store.get<goodsdist>('Federal Reserve') ?? {...empty_goodsdist};
    const next_goodsdist = {...empty_goodsdist};
    const foreign_nations = await store.get<ForeignPowerInterface[]>('Foreign Powers');
    // Market Data
    const osc_months = await store.get<number>('Osc Period') ?? 0
    const osc_months_passed = await store.get<number>('Osc Months Passed')?? 0
    const market_trajectory = await store.get<number>('Market Trajectory')?? 0
    const global_market_trend = await store.get<boolean>('Positive Global Market Trend')?? true
    const market_modifier = (Math.random() * ((2 * market_trajectory) + market_trajectory) - market_trajectory * (global_market_trend ? 1 : -1)) + 1
    const turns_passed = await store.get<number>('Turns Passed') ?? 0;
    const federal_prices = await store.get<goodsdist>('Federal Prices') ?? {...empty_goodsdist}
    const price_history = await store.get<goodsdist[]>('Price History') ?? []

    // Federal Merchant Capacity
    let merchant_capacity: number = 0

    if (!next_goodsdist) {
        throw new Error('Failed to load Federal Reserve goods distribution');
    }
    settlements?.forEach(settlement =>{
        // First update Taxation gained
        const baseTax = Math.round((settlement.rulers.tax_rate * settlement.rulers.taxed_productivity) +
        (settlement.archivists.tax_rate * settlement.archivists.taxed_productivity) +
        (settlement.engineers.tax_rate * settlement.engineers.taxed_productivity) +
        (settlement.rune_smiths.tax_rate * settlement.rune_smiths.taxed_productivity) +
        (settlement.craftsmen.tax_rate * settlement.craftsmen.taxed_productivity) +
        (settlement.merchants.tax_rate * settlement.merchants.taxed_productivity) +
        (settlement.clerics.tax_rate * settlement.clerics.taxed_productivity) +
        (settlement.miners.tax_rate * settlement.miners.taxed_productivity) +
        (settlement.farmers.tax_rate * settlement.farmers.taxed_productivity) +
        (settlement.warriors.tax_rate * settlement.warriors.taxed_productivity) +
        (settlement.foresters.tax_rate * settlement.foresters.taxed_productivity))

        // The Federal Government Takes its cut
        settlement.finance_points += Math.round(baseTax * (1 - settlement.settlment_tax))
        next_goodsdist.money += Math.round((baseTax * settlement.settlment_tax))
        settlement.price_history = [...settlement.price_history,settlement.prices]

        // Update Goods Stocked
        let old_stock = settlement.food_and_water.stock
        settlement.food_and_water.stock += calcStockChange(settlement.farmers.food_and_water.produced + settlement.foresters.food_and_water.produced, settlement.food_and_water.consumption_rate, settlement.production_quota)
        if (settlement.food_and_water.stock < 0) {
            settlement.food_and_water.deficit = Math.abs(settlement.food_and_water.stock)
            settlement.food_and_water.stock = 0
        }
        settlement.prices.food = calcPriceChange(settlement.prices.food,old_stock,settlement.food_and_water.stock,price_volitility.food)

        old_stock = settlement.beer.stock
        settlement.beer.stock += calcStockChange(settlement.farmers.beer.produced, settlement.beer.consumption_rate, settlement.production_quota)
        if (settlement.beer.stock < 0) {
            settlement.beer.deficit = Math.abs(settlement.beer.stock)
            settlement.beer.stock = 0
        }
        settlement.prices.beer = calcPriceChange(settlement.prices.beer,old_stock,settlement.beer.stock,price_volitility.beer)

        old_stock = settlement.leather_and_textiles.stock
        settlement.leather_and_textiles.stock += calcStockChange(settlement.farmers.leather_and_textiles.produced, settlement.leather_and_textiles.consumption_rate, settlement.production_quota)
        if (settlement.leather_and_textiles.stock < 0) {
            settlement.leather_and_textiles.deficit = Math.abs(settlement.leather_and_textiles.stock)
            settlement.leather_and_textiles.stock = 0
        }
        settlement.prices.leather = calcPriceChange(settlement.prices.leather,old_stock,settlement.leather_and_textiles.stock,price_volitility.leather)

        old_stock = settlement.artisinal_goods.stock
        settlement.artisinal_goods.stock += calcStockChange(settlement.craftsmen.artisanal_goods.produced + settlement.foresters.artisanal_goods.produced, settlement.artisinal_goods.consumption_rate, settlement.production_quota)
        if (settlement.artisinal_goods.stock < 0) {
            settlement.artisinal_goods.deficit = Math.abs(settlement.artisinal_goods.stock)
            settlement.artisinal_goods.stock = 0
        }
        settlement.prices.artisinal = calcPriceChange(settlement.prices.artisinal,old_stock,settlement.artisinal_goods.stock,price_volitility.artisinal)

        old_stock = settlement.livestock.stock
        settlement.livestock.stock += calcStockChange(settlement.farmers.livestock.produced, settlement.livestock.consumption_rate, settlement.production_quota)
        if (settlement.livestock.stock < 0) {
            settlement.livestock.deficit = Math.abs(settlement.livestock.stock)
            settlement.livestock.stock = 0
        }
        settlement.prices.livestock = calcPriceChange(settlement.prices.livestock,old_stock,settlement.livestock.stock,price_volitility.livestock)

        old_stock = settlement.ornamental_luxuries.stock
        settlement.ornamental_luxuries.stock += calcStockChange(settlement.craftsmen.ornamental_luxuries.produced, settlement.ornamental_luxuries.consumption_rate, settlement.production_quota)
        if (settlement.ornamental_luxuries.stock < 0) {
            settlement.ornamental_luxuries.deficit = Math.abs(settlement.ornamental_luxuries.stock)
            settlement.ornamental_luxuries.stock = 0
        }
        settlement.prices.ornamental = calcPriceChange(settlement.prices.ornamental,old_stock,settlement.ornamental_luxuries.stock,price_volitility.ornamental)

        old_stock = settlement.enchanted_luxuries.stock
        settlement.enchanted_luxuries.stock += calcStockChange(settlement.rune_smiths.enchanted_luxuries.produced, settlement.enchanted_luxuries.consumption_rate, settlement.production_quota)
        if (settlement.enchanted_luxuries.stock < 0) {
            settlement.enchanted_luxuries.deficit = Math.abs(settlement.enchanted_luxuries.stock)
            settlement.enchanted_luxuries.stock = 0
        }
        settlement.prices.enchanted = calcPriceChange(settlement.prices.enchanted,old_stock,settlement.enchanted_luxuries.stock,price_volitility.enchanted)

        old_stock = settlement.timber.stock
        settlement.timber.stock += calcStockChange(settlement.foresters.timber.produced, settlement.timber.consumption_rate, settlement.production_quota)
        if (settlement.timber.stock < 0) {
            settlement.timber.deficit = Math.abs(settlement.timber.stock)
            settlement.timber.stock = 0
        }
        settlement.prices.timber = calcPriceChange(settlement.prices.timber,old_stock,settlement.timber.stock,price_volitility.timber)

        old_stock = settlement.tools.stock
        settlement.tools.stock += calcStockChange(settlement.craftsmen.tools.produced, settlement.tools.consumption_rate, settlement.production_quota)
        if (settlement.tools.stock < 0) {
            settlement.tools.deficit = Math.abs(settlement.tools.stock)
            settlement.tools.stock = 0
        }
        settlement.prices.tools = calcPriceChange(settlement.prices.tools,old_stock,settlement.tools.stock,price_volitility.tools)

        old_stock = settlement.common_ores.stock
        settlement.common_ores.stock += calcStockChange(settlement.miners.common_ores.produced, settlement.common_ores.consumption_rate, settlement.production_quota)
        if (settlement.common_ores.stock < 0) {
            settlement.common_ores.deficit = Math.abs(settlement.common_ores.stock)
            settlement.common_ores.stock = 0
        }
        settlement.prices.tools = calcPriceChange(settlement.prices.common_ores,old_stock,settlement.common_ores.stock,price_volitility.common_ores)

        old_stock = settlement.medical_supplies.stock
        settlement.medical_supplies.stock += calcStockChange(settlement.clerics.medical_supplies.produced, settlement.medical_supplies.consumption_rate, settlement.production_quota)
        if (settlement.medical_supplies.stock < 0) {
            settlement.medical_supplies.deficit = Math.abs(settlement.medical_supplies.stock)
            settlement.medical_supplies.stock = 0
        }
        settlement.prices.medical = calcPriceChange(settlement.prices.medical,old_stock,settlement.medical_supplies.stock,price_volitility.medical)

        old_stock = settlement.rare_ores.stock
        settlement.rare_ores.stock += calcStockChange(settlement.miners.rare_ores.produced, settlement.rare_ores.consumption_rate, settlement.production_quota)
        if (settlement.rare_ores.stock < 0) {
            settlement.rare_ores.deficit = Math.abs(settlement.rare_ores.stock)
            settlement.rare_ores.stock = 0
        }
        settlement.prices.rare_ores = calcPriceChange(settlement.prices.rare_ores,old_stock,settlement.rare_ores.stock,price_volitility.rare_ores)

        old_stock = settlement.gems.stock
        settlement.gems.stock += calcStockChange(settlement.miners.gems.produced, settlement.gems.consumption_rate, settlement.production_quota)
        if (settlement.gems.stock < 0) {
            settlement.gems.deficit = Math.abs(settlement.gems.stock)
            settlement.gems.stock = 0
        }
        settlement.prices.gems = calcPriceChange(settlement.prices.gems,old_stock,settlement.gems.stock,price_volitility.gems)

        old_stock = settlement.runes.stock
        settlement.runes.stock += calcStockChange(settlement.rune_smiths.runes.produced, settlement.runes.consumption_rate, settlement.production_quota)
        if (settlement.runes.stock < 0) {
            settlement.runes.deficit = Math.abs(settlement.runes.stock)
            settlement.runes.stock = 0
        }
        settlement.prices.runes = calcPriceChange(settlement.prices.runes,old_stock,settlement.runes.stock,price_volitility.runes)

        old_stock = settlement.armaments.stock
        settlement.armaments.stock += calcStockChange(settlement.craftsmen.armaments.produced, settlement.armaments.consumption_rate, settlement.production_quota)
        if (settlement.armaments.stock < 0) {
            settlement.armaments.deficit = Math.abs(settlement.armaments.stock)
            settlement.armaments.stock = 0
        }
        settlement.prices.arms = calcPriceChange(settlement.prices.arms,old_stock,settlement.armaments.stock,price_volitility.arms)

        old_stock = settlement.books.stock
        settlement.books.stock += calcStockChange(settlement.clerics.books.produced + settlement.archivists.books.produced, settlement.books.consumption_rate, settlement.production_quota)
        if (settlement.books.stock < 0) {
            settlement.books.deficit = Math.abs(settlement.books.stock)
            settlement.books.stock = 0
        }
        settlement.prices.books = calcPriceChange(settlement.prices.books,old_stock,settlement.books.stock,price_volitility.books)

        old_stock = settlement.enchanted_armaments.stock
        settlement.enchanted_armaments.stock += calcStockChange(settlement.rune_smiths.enchanted_armaments.produced, settlement.enchanted_armaments.consumption_rate, settlement.production_quota)
        if (settlement.enchanted_armaments.stock < 0) {
            settlement.enchanted_armaments.deficit = Math.abs(settlement.enchanted_armaments.stock)
            settlement.enchanted_armaments.stock = 0
        }
        settlement.prices.enchanted_arms = calcPriceChange(settlement.prices.enchanted_arms,old_stock,settlement.enchanted_armaments.stock,price_volitility.enchanted_arms)

        old_stock = settlement.enchanted_charcoal.stock
        settlement.enchanted_charcoal.stock += calcStockChange(settlement.foresters.enchanted_charcoal.produced, settlement.enchanted_charcoal.consumption_rate, settlement.production_quota)
        if (settlement.enchanted_charcoal.stock < 0) {
            settlement.enchanted_charcoal.deficit = Math.abs(settlement.enchanted_charcoal.stock)
            settlement.enchanted_charcoal.stock = 0
        }
        settlement.prices.charcoal = calcPriceChange(settlement.prices.charcoal,old_stock,settlement.enchanted_charcoal.stock,price_volitility.charcoal)

        next_goodsdist.food += Math.round((settlement.farmers.food_and_water.produced + settlement.foresters.food_and_water.produced) * (settlement.production_quota))
        next_goodsdist.beer += Math.round(settlement.farmers.beer.produced * settlement.production_quota)
        next_goodsdist.leather += Math.round(settlement.farmers.leather_and_textiles.produced * settlement.production_quota)
        next_goodsdist.artisinal += Math.round((settlement.craftsmen.artisanal_goods.produced + settlement.foresters.artisanal_goods.produced) * settlement.production_quota)
        next_goodsdist.livestock += Math.round((settlement.farmers.livestock.produced) * settlement.production_quota)
        next_goodsdist.ornamental += Math.round(settlement.craftsmen.ornamental_luxuries.produced * settlement.production_quota)
        next_goodsdist.enchanted += Math.round(settlement.rune_smiths.enchanted_luxuries.produced * settlement.production_quota)
        next_goodsdist.timber += Math.round(settlement.foresters.timber.produced * settlement.production_quota)
        next_goodsdist.tools += Math.round(settlement.craftsmen.tools.produced * settlement.production_quota)
        next_goodsdist.common_ores += Math.round(settlement.miners.common_ores.produced * settlement.production_quota)
        next_goodsdist.medical += Math.round(settlement.clerics.medical_supplies.produced * settlement.production_quota)
        next_goodsdist.rare_ores += Math.round(settlement.miners.rare_ores.produced * settlement.production_quota)
        next_goodsdist.gems += Math.round(settlement.miners.gems.produced * settlement.production_quota)
        next_goodsdist.runes += Math.round(settlement.rune_smiths.runes.produced * settlement.production_quota)
        next_goodsdist.arms += Math.round(settlement.craftsmen.armaments.produced * settlement.production_quota)
        next_goodsdist.books += Math.round((settlement.clerics.books.produced + settlement.archivists.books.produced) * settlement.production_quota)
        next_goodsdist.enchanted_arms += Math.round(settlement.rune_smiths.enchanted_armaments.produced * settlement.production_quota)
        next_goodsdist.charcoal += Math.round(settlement.foresters.enchanted_charcoal.produced * settlement.production_quota)

        // Calculate Pop Growth
        popGrowth(settlement,foreign_nations ?? [])

        const P0 = (settlement.archivists.population + 
            settlement.clerics.population +
            settlement.craftsmen.population +
            settlement.criminals.population +
            settlement.engineers.population +
            settlement.farmers.population +
            settlement.foresters.population +
            settlement.merchants.population +
            settlement.miners.population +
            settlement.rulers.population +
            settlement.rune_smiths.population +
            settlement.warriors.population)
        
        // If Population Gained, then add new pops
        if(Math.floor(settlement.projected_pop) > P0) {
            const delta_pop = Math.floor(settlement.projected_pop) - P0;
            for(let i = 0; i < delta_pop; i++) {
                const newPop = Math.floor(Math.random() * 12)
                if (newPop === 0) {settlement.rulers.population += 1}
                else if (newPop === 1) {settlement.archivists.population += 1}
                else if (newPop === 2) {settlement.engineers.population += 1}
                else if (newPop === 3) {settlement.rune_smiths.population += 1}
                else if (newPop === 4) {settlement.craftsmen.population += 1}
                else if (newPop === 5) {settlement.merchants.population += 1}
                else if (newPop === 6) {settlement.clerics.population += 1}
                else if (newPop === 7) {settlement.miners.population += 1}
                else if (newPop === 8) {settlement.farmers.population += 1}
                else if (newPop === 9) {settlement.warriors.population += 1}
                else if (newPop === 10) {settlement.foresters.population += 1}
                else if (newPop === 11) {settlement.criminals.population += 1}
            }
        }

        updateGoodsProduction(settlement)

        // Validate that there's no overproduction
        if (settlement.archivists.books.produced > settlement.archivists.goods_produced) {
            settlement.archivists.books.produced = settlement.archivists.goods_produced
        }
        if ((settlement.rune_smiths.enchanted_luxuries.produced + settlement.rune_smiths.runes.produced + settlement.rune_smiths.enchanted_armaments.produced) > settlement.rune_smiths.goods_produced) {
            const total = (settlement.rune_smiths.enchanted_luxuries.produced + settlement.rune_smiths.runes.produced + settlement.rune_smiths.enchanted_armaments.produced)
            settlement.rune_smiths.enchanted_luxuries.produced = Math.floor((settlement.rune_smiths.enchanted_luxuries.produced/total) * settlement.rune_smiths.goods_produced)
            settlement.rune_smiths.runes.produced = Math.floor((settlement.rune_smiths.runes.produced / total) * settlement.rune_smiths.goods_produced)
            settlement.rune_smiths.enchanted_armaments.produced = Math.floor((settlement.rune_smiths.enchanted_armaments.produced/total) * settlement.rune_smiths.goods_produced)
        }
        if ((settlement.craftsmen.artisanal_goods.produced + settlement.craftsmen.ornamental_luxuries.produced + settlement.craftsmen.tools.produced + settlement.craftsmen.armaments.produced) > settlement.craftsmen.goods_produced) {
            const total = (settlement.craftsmen.artisanal_goods.produced + settlement.craftsmen.ornamental_luxuries.produced + settlement.craftsmen.tools.produced + settlement.craftsmen.armaments.produced)
            const max = settlement.craftsmen.goods_produced
            settlement.craftsmen.artisanal_goods.produced = Math.floor((settlement.craftsmen.artisanal_goods.produced/total) * max)
            settlement.craftsmen.ornamental_luxuries.produced = Math.floor((settlement.craftsmen.ornamental_luxuries.produced/total) * max)
            settlement.craftsmen.tools.produced = Math.floor((settlement.craftsmen.tools.produced/total) * max)
            settlement.craftsmen.armaments.produced = Math.floor((settlement.craftsmen.armaments.produced/total) * max)
        }
        if((settlement.clerics.medical_supplies.produced + settlement.clerics.books.produced) > settlement.clerics.goods_produced) {
            const total = (settlement.clerics.medical_supplies.produced + settlement.clerics.books.produced)
            const max = settlement.clerics.goods_produced
            settlement.clerics.medical_supplies.produced = Math.floor((settlement.clerics.medical_supplies.produced/total)*max)
            settlement.clerics.books.produced = Math.floor((settlement.clerics.books.produced/total)*max)
        }
        if((settlement.miners.common_ores.produced + settlement.miners.rare_ores.produced + settlement.miners.gems.produced) > settlement.miners.goods_produced){
            const total = (settlement.miners.common_ores.produced + settlement.miners.rare_ores.produced + settlement.miners.gems.produced)
            const max = settlement.miners.goods_produced
            settlement.miners.common_ores.produced = Math.floor((settlement.miners.common_ores.produced/total)*max)
            settlement.miners.rare_ores.produced = Math.floor((settlement.miners.rare_ores.produced/total)*max)
            settlement.miners.gems.produced = Math.floor((settlement.miners.gems.produced/total)*max)
        }
        if((settlement.farmers.food_and_water.produced + settlement.farmers.beer.produced + settlement.farmers.leather_and_textiles.produced + settlement.farmers.livestock.produced) > settlement.farmers.goods_produced) {
            const total = (settlement.farmers.food_and_water.produced + settlement.farmers.beer.produced + settlement.farmers.leather_and_textiles.produced + settlement.farmers.livestock.produced)
            const max = settlement.farmers.goods_produced
            settlement.farmers.food_and_water.produced = Math.floor((settlement.farmers.food_and_water.produced/total)*max)
            settlement.farmers.beer.produced = Math.floor((settlement.farmers.beer.produced/total)*max)
            settlement.farmers.leather_and_textiles.produced = Math.floor((settlement.farmers.leather_and_textiles.produced/total)*max)
            settlement.farmers.livestock.produced = Math.floor((settlement.farmers.livestock.produced/total)*max)
        }
        if((settlement.foresters.food_and_water.produced + settlement.foresters.artisanal_goods.produced + settlement.foresters.timber.produced + settlement.foresters.enchanted_charcoal.produced) > settlement.foresters.goods_produced){
            const total = (settlement.foresters.food_and_water.produced + settlement.foresters.artisanal_goods.produced + settlement.foresters.timber.produced + settlement.foresters.enchanted_charcoal.produced)
            const max = settlement.foresters.goods_produced
            settlement.foresters.food_and_water.produced = Math.floor((settlement.foresters.food_and_water.produced/total)*max)
            settlement.foresters.artisanal_goods.produced = Math.floor((settlement.foresters.artisanal_goods.produced/total)*max)
            settlement.foresters.timber.produced = Math.floor((settlement.foresters.timber.produced/total)*max)
            settlement.foresters.enchanted_charcoal.produced = Math.floor((settlement.foresters.enchanted_charcoal.produced/total)*max)
        }
        settlement.merchant_capacity = Math.round(settlement.merchants.taxed_productivity * (1 - settlement.settlment_tax))
        merchant_capacity += Math.round(settlement.merchants.taxed_productivity * settlement.settlment_tax)
    })

    foreign_nations?.forEach(nation => {
        const market_health = randMarketHealth()
        const old_supply = {...nation.supply}
        nation.supply ={
            money: nation.supply.money * market_health * randMarketHealth() * market_modifier,
            food: nation.supply.food * market_health * randMarketHealth() * market_modifier,
            beer: nation.supply.beer * market_health * randMarketHealth() * market_modifier,
            leather: nation.supply.leather * market_health * randMarketHealth() * market_modifier,
            artisinal: nation.supply.artisinal * market_health * randMarketHealth() * market_modifier,
            livestock: nation.supply.livestock * market_health * randMarketHealth() * market_modifier,
            ornamental: nation.supply.ornamental * market_health * randMarketHealth() * market_modifier,
            enchanted: nation.supply.enchanted * market_health * randMarketHealth() * market_modifier,
            timber: nation.supply.timber * market_health * randMarketHealth() * market_modifier,
            tools: nation.supply.tools * market_health * randMarketHealth() * market_modifier,
            common_ores: nation.supply.common_ores * market_health * randMarketHealth() * market_modifier,
            medical: nation.supply.medical * market_health * randMarketHealth() * market_modifier,
            rare_ores: nation.supply.rare_ores * market_health * randMarketHealth() * market_modifier,
            gems: nation.supply.gems * market_health * randMarketHealth() * market_modifier,
            runes: nation.supply.runes * market_health * randMarketHealth() * market_modifier,
            arms: nation.supply.arms * market_health * randMarketHealth() * market_modifier,
            books: nation.supply.books * market_health * randMarketHealth() * market_modifier,
            enchanted_arms: nation.supply.enchanted_arms * market_health * randMarketHealth() * market_modifier,
            charcoal: nation.supply.charcoal * market_health * randMarketHealth() * market_modifier,
        }
        nation.demand ={
            money: nation.demand.money * market_health * randMarketHealth() * market_modifier,
            food: nation.demand.food * market_health * randMarketHealth() * market_modifier,
            beer: nation.demand.beer * market_health * randMarketHealth() * market_modifier,
            leather: nation.demand.leather * market_health * randMarketHealth() * market_modifier,
            artisinal: nation.demand.artisinal * market_health * randMarketHealth() * market_modifier,
            livestock: nation.demand.livestock * market_health * randMarketHealth() * market_modifier,
            ornamental: nation.demand.ornamental * market_health * randMarketHealth() * market_modifier,
            enchanted: nation.demand.enchanted * market_health * randMarketHealth() * market_modifier,
            timber: nation.demand.timber * market_health * randMarketHealth() * market_modifier,
            tools: nation.demand.tools * market_health * randMarketHealth() * market_modifier,
            common_ores: nation.demand.common_ores * market_health * randMarketHealth() * market_modifier,
            medical: nation.demand.medical * market_health * randMarketHealth() * market_modifier,
            rare_ores: nation.demand.rare_ores * market_health * randMarketHealth() * market_modifier,
            gems: nation.demand.gems * market_health * randMarketHealth() * market_modifier,
            runes: nation.demand.runes * market_health * randMarketHealth() * market_modifier,
            arms: nation.demand.arms * market_health * randMarketHealth() * market_modifier,
            books: nation.demand.books * market_health * randMarketHealth() * market_modifier,
            enchanted_arms: nation.demand.enchanted_arms * market_health * randMarketHealth() * market_modifier,
            charcoal: nation.demand.charcoal * market_health * randMarketHealth() * market_modifier,
        }
        // Update Prices
        nation.price_history = [...nation.price_history,nation.prices]
        nation.prices.food = calcPriceChange(nation.prices.food,old_supply.food,nation.supply.food,price_volitility.food)
        nation.prices.beer = calcPriceChange(nation.prices.beer,old_supply.beer,nation.supply.beer,price_volitility.beer)
        nation.prices.leather = calcPriceChange(nation.prices.leather,old_supply.leather,nation.supply.leather,price_volitility.leather)
        nation.prices.artisinal = calcPriceChange(nation.prices.artisinal,old_supply.artisinal,nation.supply.artisinal,price_volitility.artisinal)
        nation.prices.livestock = calcPriceChange(nation.prices.livestock,old_supply.livestock,nation.supply.livestock,price_volitility.livestock)
        nation.prices.ornamental = calcPriceChange(nation.prices.ornamental,old_supply.ornamental,nation.supply.ornamental,price_volitility.ornamental)
        nation.prices.enchanted = calcPriceChange(nation.prices.enchanted,old_supply.enchanted,nation.supply.enchanted,price_volitility.enchanted)
        nation.prices.timber = calcPriceChange(nation.prices.timber,old_supply.timber,nation.supply.timber,price_volitility.timber)
        nation.prices.tools = calcPriceChange(nation.prices.tools,old_supply.tools,nation.supply.tools,price_volitility.tools)
        nation.prices.common_ores = calcPriceChange(nation.prices.common_ores,old_supply.common_ores,nation.supply.common_ores,price_volitility.common_ores)
        nation.prices.medical = calcPriceChange(nation.prices.medical,old_supply.medical,nation.supply.medical,price_volitility.medical)
        nation.prices.rare_ores = calcPriceChange(nation.prices.rare_ores,old_supply.rare_ores,nation.supply.rare_ores,price_volitility.rare_ores)
        nation.prices.gems = calcPriceChange(nation.prices.gems,old_supply.gems,nation.supply.gems,price_volitility.gems)
        nation.prices.runes = calcPriceChange(nation.prices.runes,old_supply.runes,nation.supply.runes,price_volitility.runes)
        nation.prices.arms = calcPriceChange(nation.prices.arms,old_supply.arms,nation.supply.arms,price_volitility.arms)
        nation.prices.books = calcPriceChange(nation.prices.books,old_supply.books,nation.supply.books,price_volitility.books)
        nation.prices.enchanted_arms = calcPriceChange(nation.prices.enchanted_arms,old_supply.enchanted_arms,nation.supply.enchanted_arms,price_volitility.enchanted_arms)
        nation.prices.charcoal = calcPriceChange(nation.prices.charcoal,old_supply.charcoal,nation.supply.charcoal,price_volitility.charcoal)

        nation.available_supply = {
            money: Math.round(nation.supply.money * 0.05),
            food: Math.round(nation.supply.food * 0.05),
            beer: Math.round(nation.supply.beer * 0.05),
            leather: Math.round(nation.supply.leather * 0.05),
            artisinal: Math.round(nation.supply.artisinal * 0.05),
            livestock: Math.round(nation.supply.livestock * 0.05),
            ornamental: Math.round(nation.supply.ornamental * 0.05),
            enchanted: Math.round(nation.supply.enchanted * 0.05),
            timber: Math.round(nation.supply.timber * 0.05),
            tools: Math.round(nation.supply.tools * 0.05),
            common_ores: Math.round(nation.supply.common_ores * 0.05),
            medical: Math.round(nation.supply.medical * 0.05),
            rare_ores: Math.round(nation.supply.rare_ores * 0.05),
            gems: Math.round(nation.supply.gems * 0.05),
            runes: Math.round(nation.supply.runes * 0.05),
            arms: Math.round(nation.supply.arms * 0.05),
            books: Math.round(nation.supply.books * 0.05),
            enchanted_arms: Math.round(nation.supply.enchanted_arms * 0.05),
            charcoal: Math.round(nation.supply.charcoal * 0.05),
        }

        nation.available_demand = {
            money: Math.round(nation.demand.money * 0.05),
            food: Math.round(nation.demand.food * 0.05),
            beer: Math.round(nation.demand.beer * 0.05),
            leather: Math.round(nation.demand.leather * 0.05),
            artisinal: Math.round(nation.demand.artisinal * 0.05),
            livestock: Math.round(nation.demand.livestock * 0.05),
            ornamental: Math.round(nation.demand.ornamental * 0.05),
            enchanted: Math.round(nation.demand.enchanted * 0.05),
            timber: Math.round(nation.demand.timber * 0.05),
            tools: Math.round(nation.demand.tools * 0.05),
            common_ores: Math.round(nation.demand.common_ores * 0.05),
            medical: Math.round(nation.demand.medical * 0.05),
            rare_ores: Math.round(nation.demand.rare_ores * 0.05),
            gems: Math.round(nation.demand.gems * 0.05),
            runes: Math.round(nation.demand.runes * 0.05),
            arms: Math.round(nation.demand.arms * 0.05),
            books: Math.round(nation.demand.books * 0.05),
            enchanted_arms: Math.round(nation.demand.enchanted_arms * 0.05),
            charcoal: Math.round(nation.demand.charcoal * 0.05),
        }

    })
    if(osc_months_passed > osc_months) {
        store.set('Osc Period',Math.floor(Math.random() * 28) + 48)
        store.set('Osc Months Passed',0)
        store.set('Market Trajectory',Math.random() * 0.005)
        store.set('Positive Global Market Trend',!global_market_trend)
    } else {
        store.set('Osc Months Passed',osc_months_passed + 1)
    }
    store.set('settlements',settlements)

    store.set('Price History',[...price_history,federal_prices])
    federal_prices.food = calcPriceChange(federal_prices.food,current_goodsdist.food,current_goodsdist.food + next_goodsdist.food,price_volitility.food)
    federal_prices.beer = calcPriceChange(federal_prices.beer,current_goodsdist.beer,current_goodsdist.beer + next_goodsdist.beer,price_volitility.beer)
    federal_prices.leather = calcPriceChange(federal_prices.leather,current_goodsdist.leather,current_goodsdist.leather + next_goodsdist.leather,price_volitility.leather)
    federal_prices.artisinal = calcPriceChange(federal_prices.artisinal,current_goodsdist.artisinal,current_goodsdist.artisinal + next_goodsdist.artisinal,price_volitility.artisinal)
    federal_prices.livestock = calcPriceChange(federal_prices.livestock,current_goodsdist.livestock,current_goodsdist.livestock + next_goodsdist.livestock,price_volitility.livestock)
    federal_prices.ornamental = calcPriceChange(federal_prices.ornamental,current_goodsdist.ornamental,current_goodsdist.ornamental + next_goodsdist.ornamental,price_volitility.ornamental)
    federal_prices.enchanted = calcPriceChange(federal_prices.enchanted,current_goodsdist.enchanted,current_goodsdist.enchanted + next_goodsdist.enchanted,price_volitility.enchanted)
    federal_prices.timber = calcPriceChange(federal_prices.timber,current_goodsdist.timber,current_goodsdist.timber + next_goodsdist.timber,price_volitility.timber)
    federal_prices.tools = calcPriceChange(federal_prices.tools,current_goodsdist.tools,current_goodsdist.tools + next_goodsdist.tools,price_volitility.tools)
    federal_prices.common_ores = calcPriceChange(federal_prices.common_ores,current_goodsdist.common_ores,current_goodsdist.common_ores + next_goodsdist.common_ores,price_volitility.common_ores)
    federal_prices.medical = calcPriceChange(federal_prices.medical,current_goodsdist.medical,current_goodsdist.medical + next_goodsdist.medical,price_volitility.medical)
    federal_prices.rare_ores = calcPriceChange(federal_prices.rare_ores,current_goodsdist.rare_ores,current_goodsdist.rare_ores + next_goodsdist.rare_ores,price_volitility.rare_ores)
    federal_prices.gems = calcPriceChange(federal_prices.gems,current_goodsdist.gems,current_goodsdist.gems + next_goodsdist.gems,price_volitility.gems)
    federal_prices.runes = calcPriceChange(federal_prices.runes,current_goodsdist.runes,current_goodsdist.runes + next_goodsdist.runes,price_volitility.runes)
    federal_prices.arms = calcPriceChange(federal_prices.arms,current_goodsdist.arms,current_goodsdist.arms + next_goodsdist.arms,price_volitility.arms)
    federal_prices.books = calcPriceChange(federal_prices.books,current_goodsdist.books,current_goodsdist.books + next_goodsdist.books,price_volitility.books)
    federal_prices.enchanted_arms = calcPriceChange(federal_prices.enchanted_arms,current_goodsdist.enchanted_arms,current_goodsdist.enchanted_arms + next_goodsdist.enchanted_arms,price_volitility.enchanted_arms)
    federal_prices.charcoal = calcPriceChange(federal_prices.charcoal,current_goodsdist.charcoal,current_goodsdist.charcoal + next_goodsdist.charcoal,price_volitility.charcoal)
    store.set('Federal Prices', federal_prices)

    next_goodsdist.money = current_goodsdist.money + next_goodsdist.money
    next_goodsdist.food = current_goodsdist.food + next_goodsdist.food
    next_goodsdist.beer = current_goodsdist.beer + next_goodsdist.beer
    next_goodsdist.leather = current_goodsdist.leather + next_goodsdist.leather
    next_goodsdist.artisinal = current_goodsdist.artisinal + next_goodsdist.artisinal
    next_goodsdist.livestock = current_goodsdist.livestock + next_goodsdist.livestock
    next_goodsdist.ornamental = current_goodsdist.ornamental + next_goodsdist.ornamental
    next_goodsdist.enchanted = current_goodsdist.enchanted + next_goodsdist.enchanted
    next_goodsdist.timber = current_goodsdist.timber + next_goodsdist.timber
    next_goodsdist.tools = current_goodsdist.tools + next_goodsdist.tools
    next_goodsdist.common_ores = current_goodsdist.common_ores + next_goodsdist.common_ores
    next_goodsdist.medical = current_goodsdist.medical + next_goodsdist.medical
    next_goodsdist.rare_ores = current_goodsdist.rare_ores + next_goodsdist.rare_ores
    next_goodsdist.gems = current_goodsdist.gems + next_goodsdist.gems
    next_goodsdist.runes = current_goodsdist.runes + next_goodsdist.runes
    next_goodsdist.arms = current_goodsdist.arms + next_goodsdist.arms
    next_goodsdist.books = current_goodsdist.books + next_goodsdist.books
    next_goodsdist.enchanted_arms = current_goodsdist.enchanted_arms + next_goodsdist.enchanted_arms
    next_goodsdist.charcoal = current_goodsdist.charcoal + next_goodsdist.charcoal

    store.set('Federal Reserve', next_goodsdist)
    store.set('Turns Passed',turns_passed + 1)
    store.set('Merchant Capacity',Math.round(merchant_capacity))
    store.save()
}

const randMarketHealth = () => ((Math.floor(Math.random() * 101) - 26)/(10 ** 5)) + 1