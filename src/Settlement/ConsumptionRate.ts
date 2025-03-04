import { SettlementInterface } from "./SettlementInterface";

export const setConsumptionRates = (settlement: SettlementInterface) => {
    settlement.food_and_water.consumption_rate = FoodAndWater(settlement)
    settlement.beer.consumption_rate = Beer(settlement)
    settlement.leather_and_textiles.consumption_rate = LeatherAndTextiles(settlement)
    settlement.artisinal_goods.consumption_rate = ArtisinalGoods(settlement)
    settlement.livestock.consumption_rate = Livestock(settlement)
    settlement.ornamental_luxuries.consumption_rate = Ornament(settlement)
    settlement.enchanted_luxuries.consumption_rate = Luxuries(settlement)
    settlement.timber.consumption_rate = Timber(settlement)
    settlement.tools.consumption_rate = Tools(settlement)
    settlement.enchanted_charcoal.consumption_rate = Charcoal(settlement)
    settlement.common_ores.consumption_rate = Ores(settlement)
    settlement.medical_supplies.consumption_rate = Medicine(settlement)
    settlement.gems.consumption_rate = Gems(settlement)
    settlement.rare_ores.consumption_rate = RareOres(settlement)
    settlement.books.consumption_rate = Books(settlement)
    settlement.runes.consumption_rate = Runes(settlement)
    settlement.armaments.consumption_rate = Arms(settlement)
    settlement.enchanted_armaments.consumption_rate = EArms(settlement)
}

const FoodAndWater = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.food_and_water.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.food_and_water.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.food_and_water.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.food_and_water.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.food_and_water.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.food_and_water.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.food_and_water.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.food_and_water.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.food_and_water.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.food_and_water.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.food_and_water.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.food_and_water.consumption_rate * settlement.warriors.population
    return consumed
}

const Beer = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.beer.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.beer.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.beer.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.beer.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.beer.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.beer.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.beer.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.beer.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.beer.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.beer.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.beer.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.beer.consumption_rate * settlement.warriors.population
    return consumed
}

const LeatherAndTextiles = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.leather_and_textiles.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.leather_and_textiles.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.leather_and_textiles.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.leather_and_textiles.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.leather_and_textiles.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.leather_and_textiles.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.leather_and_textiles.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.leather_and_textiles.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.leather_and_textiles.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.leather_and_textiles.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.leather_and_textiles.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.leather_and_textiles.consumption_rate * settlement.warriors.population
    return consumed
}

const ArtisinalGoods = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.artisanal_goods.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.artisanal_goods.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.artisanal_goods.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.artisanal_goods.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.artisanal_goods.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.artisanal_goods.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.artisanal_goods.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.artisanal_goods.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.artisanal_goods.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.artisanal_goods.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.artisanal_goods.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.artisanal_goods.consumption_rate * settlement.warriors.population
    return consumed
}

const Livestock = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.livestock.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.livestock.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.livestock.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.livestock.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.livestock.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.livestock.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.livestock.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.livestock.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.livestock.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.livestock.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.livestock.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.livestock.consumption_rate * settlement.warriors.population
    return consumed
}

const Ornament = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.ornamental_luxuries.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.ornamental_luxuries.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.ornamental_luxuries.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.ornamental_luxuries.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.ornamental_luxuries.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.ornamental_luxuries.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.ornamental_luxuries.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.ornamental_luxuries.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.ornamental_luxuries.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.ornamental_luxuries.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.ornamental_luxuries.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.ornamental_luxuries.consumption_rate * settlement.warriors.population
    return consumed
}

const Luxuries = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.enchanted_luxuries.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.enchanted_luxuries.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.enchanted_luxuries.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.enchanted_luxuries.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.enchanted_luxuries.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.enchanted_luxuries.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.enchanted_luxuries.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.enchanted_luxuries.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.enchanted_luxuries.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.enchanted_luxuries.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.enchanted_luxuries.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.enchanted_luxuries.consumption_rate * settlement.warriors.population
    return consumed
}

const Timber = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.timber.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.timber.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.timber.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.timber.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.timber.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.timber.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.timber.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.timber.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.timber.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.timber.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.timber.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.timber.consumption_rate * settlement.warriors.population
    return consumed
}

const Tools = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.tools.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.tools.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.tools.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.tools.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.tools.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.tools.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.tools.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.tools.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.tools.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.tools.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.tools.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.tools.consumption_rate * settlement.warriors.population
    return consumed
}

const Charcoal = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.enchanted_charcoal.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.enchanted_charcoal.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.enchanted_charcoal.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.enchanted_charcoal.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.enchanted_charcoal.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.enchanted_charcoal.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.enchanted_charcoal.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.enchanted_charcoal.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.enchanted_charcoal.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.enchanted_charcoal.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.enchanted_charcoal.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.enchanted_charcoal.consumption_rate * settlement.warriors.population
    return consumed
}

const Ores = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.common_ores.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.common_ores.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.common_ores.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.common_ores.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.common_ores.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.common_ores.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.common_ores.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.common_ores.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.common_ores.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.common_ores.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.common_ores.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.common_ores.consumption_rate * settlement.warriors.population
    return consumed
}

const Medicine = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.medical_supplies.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.medical_supplies.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.medical_supplies.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.medical_supplies.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.medical_supplies.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.medical_supplies.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.medical_supplies.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.medical_supplies.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.medical_supplies.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.medical_supplies.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.medical_supplies.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.medical_supplies.consumption_rate * settlement.warriors.population
    return consumed
}

const Gems = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.gems.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.gems.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.gems.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.gems.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.gems.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.gems.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.gems.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.gems.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.gems.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.gems.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.gems.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.gems.consumption_rate * settlement.warriors.population
    return consumed
}

const RareOres = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.rare_ores.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.rare_ores.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.rare_ores.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.rare_ores.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.rare_ores.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.rare_ores.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.rare_ores.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.rare_ores.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.rare_ores.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.rare_ores.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.rare_ores.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.rare_ores.consumption_rate * settlement.warriors.population
    return consumed
}

const Books = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.books.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.books.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.books.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.books.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.books.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.books.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.books.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.books.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.books.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.books.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.books.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.books.consumption_rate * settlement.warriors.population
    return consumed
}

const Runes = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.runes.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.runes.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.runes.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.runes.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.runes.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.runes.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.runes.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.runes.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.runes.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.runes.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.runes.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.runes.consumption_rate * settlement.warriors.population
    return consumed
}

const Arms = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.armaments.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.armaments.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.armaments.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.armaments.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.armaments.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.armaments.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.armaments.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.armaments.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.armaments.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.armaments.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.armaments.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.armaments.consumption_rate * settlement.warriors.population
    return consumed
}

const EArms = (settlement: SettlementInterface): number => {
    let consumed = 0
    consumed += settlement.archivists.enchanted_armaments.consumption_rate * settlement.archivists.population
    consumed += settlement.clerics.enchanted_armaments.consumption_rate * settlement.clerics.population
    consumed += settlement.craftsmen.enchanted_armaments.consumption_rate * settlement.craftsmen.population
    consumed += settlement.criminals.enchanted_armaments.consumption_rate * settlement.criminals.population
    consumed += settlement.engineers.enchanted_armaments.consumption_rate * settlement.engineers.population
    consumed += settlement.farmers.enchanted_armaments.consumption_rate * settlement.farmers.population
    consumed += settlement.foresters.enchanted_armaments.consumption_rate * settlement.foresters.population
    consumed += settlement.merchants.enchanted_armaments.consumption_rate * settlement.merchants.population
    consumed += settlement.miners.enchanted_armaments.consumption_rate * settlement.miners.population
    consumed += settlement.rulers.enchanted_armaments.consumption_rate * settlement.rulers.population
    consumed += settlement.rune_smiths.enchanted_armaments.consumption_rate * settlement.rune_smiths.population
    consumed += settlement.warriors.enchanted_armaments.consumption_rate * settlement.warriors.population
    return consumed
}