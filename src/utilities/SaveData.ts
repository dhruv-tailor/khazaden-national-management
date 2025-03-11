import { LazyStore, load } from "@tauri-apps/plugin-store";
import { documentDir } from "@tauri-apps/api/path";
import {  readDir, BaseDirectory, remove } from "@tauri-apps/plugin-fs";
import { productName } from "../../src-tauri/tauri.conf.json"
import { type } from '@tauri-apps/plugin-os'
import { TerrainType } from "../Settlement/TerrainInterface";
import { newSettlement, updateGoodsProduction } from "../Settlement/SettlementInterface";

const fileSeperator = () => {
    const osType = type();
    if (osType === 'windows') {
        return '\\';
    } else {
        return '/';
    }
}

const savegameFolder = async () => {
    const documnets = await documentDir();
    const savegame_folder = `${documnets}${fileSeperator()}${productName}`;
    return savegame_folder;
}

export const saveLocation = async (saveName: string) => {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${saveName}.json`;
    return saveFile;
}

// Gets a list of savegames
export const getSavegames = async () : Promise<string[]> => {
    const savegames_objects = await readDir(`${productName}`, {baseDir: BaseDirectory.Document});
    let savegames : string[] = []
    savegames_objects.map((savegame) => {savegames.push(savegame.name.split('.')[0])});
    return savegames;
}

// Deletes a savegame
export const deleteSavegame = async (saveName: string) => {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${saveName}.json`;
    await remove(saveFile, {baseDir: BaseDirectory.Document});
}

export const createNewSave = async (saveName: string)  => {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${saveName}.json`;
    new LazyStore(saveFile,{autoSave: false}); 
    const store = await load(saveFile, {autoSave: false});
    let initial_settlement = newSettlement('Skarduhn', TerrainType.Mountain);
    store.set('settlements', [initial_settlement]);
    // Initial Stock
    initial_settlement.food_and_water.stock = 150
    initial_settlement.beer.stock = 150
    initial_settlement.leather_and_textiles.stock = 150
    initial_settlement.artisinal_goods.stock = 50
    initial_settlement.livestock.stock = 50
    initial_settlement.ornamental_luxuries.stock = 50
    initial_settlement.enchanted_luxuries.stock = 0
    initial_settlement.timber.stock = 600
    initial_settlement.tools.stock = 100
    initial_settlement.common_ores.stock = 150
    initial_settlement.medical_supplies.stock = 25
    initial_settlement.rare_ores.stock = 150
    initial_settlement.gems.stock = 150
    initial_settlement.runes.stock = 0
    initial_settlement.armaments.stock = 25
    initial_settlement.books.stock = 25
    initial_settlement.enchanted_armaments.stock = 0
    initial_settlement.enchanted_charcoal.stock = 0
    // initial population
    initial_settlement.craftsmen.population = 1
    initial_settlement.merchants.population = 1
    initial_settlement.miners.population = 2
    initial_settlement.farmers.population = 6
    // good productions
    updateGoodsProduction(initial_settlement)
    // Finances
    initial_settlement.finance_points = 2000
    initial_settlement.projected_pop = 10
    
    store.set('settlements', [initial_settlement]);
    await store.save();
    store.close();
}