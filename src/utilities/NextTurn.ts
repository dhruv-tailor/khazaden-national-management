import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./SaveData";
import { popGrowth, SettlementInterface, updateGoodsProduction } from "../Settlement/SettlementInterface";
import { goodsdist } from "../components/ResourceDistribution";

// Calcualtes How much a settlement's stock changes
const calcStockChange = (produced: number, consumed: number, quota: number) => Math.round((produced * (1 - quota)) - consumed)

export const NextTurn = async (game: string) => {
    const store = await load(await saveLocation(game), {autoSave: false});
    const settlements = await store.get<SettlementInterface[]>('settlements');
    const next_goodsdist = await store.get<goodsdist>('Federal Reserve');
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

        // Update Goods Stocked
        settlement.food_and_water.stock += calcStockChange(settlement.farmers.food_and_water.produced + settlement.foresters.food_and_water.produced, settlement.food_and_water.consumption_rate, settlement.production_quota)
        if (settlement.food_and_water.stock < 0) {
            settlement.food_and_water.deficit = Math.abs(settlement.food_and_water.stock)
            settlement.food_and_water.stock = 0
        }
        settlement.beer.stock += calcStockChange(settlement.farmers.beer.produced, settlement.beer.consumption_rate, settlement.production_quota)
        if (settlement.beer.stock < 0) {
            settlement.beer.deficit = Math.abs(settlement.beer.stock)
            settlement.beer.stock = 0
        }
        settlement.leather_and_textiles.stock += calcStockChange(settlement.farmers.leather_and_textiles.produced, settlement.leather_and_textiles.consumption_rate, settlement.production_quota)
        if (settlement.leather_and_textiles.stock < 0) {
            settlement.leather_and_textiles.deficit = Math.abs(settlement.leather_and_textiles.stock)
            settlement.leather_and_textiles.stock = 0
        }
        settlement.artisinal_goods.stock += calcStockChange(settlement.craftsmen.artisanal_goods.produced + settlement.foresters.artisanal_goods.produced, settlement.artisinal_goods.consumption_rate, settlement.production_quota)
        if (settlement.artisinal_goods.stock < 0) {
            settlement.artisinal_goods.deficit = Math.abs(settlement.artisinal_goods.stock)
            settlement.artisinal_goods.stock = 0
        }
        settlement.livestock.stock += calcStockChange(settlement.farmers.livestock.produced, settlement.livestock.consumption_rate, settlement.production_quota)
        if (settlement.livestock.stock < 0) {
            settlement.livestock.deficit = Math.abs(settlement.livestock.stock)
            settlement.livestock.stock = 0
        }
        settlement.ornamental_luxuries.stock += calcStockChange(settlement.craftsmen.ornamental_luxuries.produced, settlement.ornamental_luxuries.consumption_rate, settlement.production_quota)
        if (settlement.ornamental_luxuries.stock < 0) {
            settlement.ornamental_luxuries.deficit = Math.abs(settlement.ornamental_luxuries.stock)
            settlement.ornamental_luxuries.stock = 0
        }
        settlement.enchanted_luxuries.stock += calcStockChange(settlement.rune_smiths.enchanted_luxuries.produced, settlement.enchanted_luxuries.consumption_rate, settlement.production_quota)
        if (settlement.enchanted_luxuries.stock < 0) {
            settlement.enchanted_luxuries.deficit = Math.abs(settlement.enchanted_luxuries.stock)
            settlement.enchanted_luxuries.stock = 0
        }
        settlement.timber.stock += calcStockChange(settlement.foresters.timber.produced, settlement.timber.consumption_rate, settlement.production_quota)
        if (settlement.timber.stock < 0) {
            settlement.timber.deficit = Math.abs(settlement.timber.stock)
            settlement.timber.stock = 0
        }
        settlement.tools.stock += calcStockChange(settlement.craftsmen.tools.produced, settlement.tools.consumption_rate, settlement.production_quota)
        if (settlement.tools.stock < 0) {
            settlement.tools.deficit = Math.abs(settlement.tools.stock)
            settlement.tools.stock = 0
        }
        settlement.common_ores.stock += calcStockChange(settlement.miners.common_ores.produced, settlement.common_ores.consumption_rate, settlement.production_quota)
        if (settlement.common_ores.stock < 0) {
            settlement.common_ores.deficit = Math.abs(settlement.common_ores.stock)
            settlement.common_ores.stock = 0
        }
        settlement.medical_supplies.stock += calcStockChange(settlement.clerics.medical_supplies.produced, settlement.medical_supplies.consumption_rate, settlement.production_quota)
        if (settlement.medical_supplies.stock < 0) {
            settlement.medical_supplies.deficit = Math.abs(settlement.medical_supplies.stock)
            settlement.medical_supplies.stock = 0
        }
        settlement.rare_ores.stock += calcStockChange(settlement.miners.rare_ores.produced, settlement.rare_ores.consumption_rate, settlement.production_quota)
        if (settlement.rare_ores.stock < 0) {
            settlement.rare_ores.deficit = Math.abs(settlement.rare_ores.stock)
            settlement.rare_ores.stock = 0
        }
        settlement.gems.stock += calcStockChange(settlement.miners.gems.produced, settlement.gems.consumption_rate, settlement.production_quota)
        if (settlement.gems.stock < 0) {
            settlement.gems.deficit = Math.abs(settlement.gems.stock)
            settlement.gems.stock = 0
        }
        settlement.runes.stock += calcStockChange(settlement.rune_smiths.runes.produced, settlement.runes.consumption_rate, settlement.production_quota)
        if (settlement.runes.stock < 0) {
            settlement.runes.deficit = Math.abs(settlement.runes.stock)
            settlement.runes.stock = 0
        }
        settlement.armaments.stock += calcStockChange(settlement.craftsmen.armaments.produced, settlement.armaments.consumption_rate, settlement.production_quota)
        if (settlement.armaments.stock < 0) {
            settlement.armaments.deficit = Math.abs(settlement.armaments.stock)
            settlement.armaments.stock = 0
        }
        settlement.books.stock += calcStockChange(settlement.clerics.books.produced + settlement.archivists.books.produced, settlement.books.consumption_rate, settlement.production_quota)
        if (settlement.books.stock < 0) {
            settlement.books.deficit = Math.abs(settlement.books.stock)
            settlement.books.stock = 0
        }
        settlement.enchanted_armaments.stock += calcStockChange(settlement.rune_smiths.enchanted_armaments.produced, settlement.enchanted_armaments.consumption_rate, settlement.production_quota)
        if (settlement.enchanted_armaments.stock < 0) {
            settlement.enchanted_armaments.deficit = Math.abs(settlement.enchanted_armaments.stock)
            settlement.enchanted_armaments.stock = 0
        }
        settlement.enchanted_charcoal.stock += calcStockChange(settlement.foresters.enchanted_charcoal.produced, settlement.enchanted_charcoal.consumption_rate, settlement.production_quota)
        if (settlement.enchanted_charcoal.stock < 0) {
            settlement.enchanted_charcoal.deficit = Math.abs(settlement.enchanted_charcoal.stock)
            settlement.enchanted_charcoal.stock = 0
        }

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
        popGrowth(settlement)

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

    })
    store.set('settlements',settlements)
    store.set('Federal Reserve', next_goodsdist)
    store.save()
}