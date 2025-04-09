import { LazyStore, load } from "@tauri-apps/plugin-store";
import { documentDir } from "@tauri-apps/api/path";
import {  readDir, BaseDirectory, remove } from "@tauri-apps/plugin-fs";
import { productName } from "../../src-tauri/tauri.conf.json"
import { type } from '@tauri-apps/plugin-os'
import { newSettlement, updateGoodsProduction } from "../Settlement/SettlementInterface/SettlementInterface";
import { TerrainType } from "../Settlement/SettlementInterface/TerrainInterface";
import { clanTypes } from "../Clans/ClanInterface/ClanInterface";
import { empty_goodsdist } from "../Goods/GoodsDist";
import { initial_prices } from "../Economics/pricing/prices";
import { Baetanuesa, Beznesti, Dragonsbane, Eidgenossenkhazaden, Garozemle, Kayasahr, Pactusallamanni, Polabtheli, Saemark, Sledzianska, TerraKontor } from "../ForeignPowers/Interface/ForeignPowerInterface";
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
    initial_settlement.stock = {
        money: 2000,
        food: 150,
        beer: 150,
        leather: 150,
        artisinal: 50,
        livestock: 50,
        ornamental: 50,
        enchanted: 0,
        timber: 600,
        tools: 100,
        common_ores: 150,
        medical: 25,
        rare_ores: 150,
        gems: 150,
        runes: 0,
        arms: 25,
        books: 25,
        enchanted_arms: 0,
        charcoal: 0
    }

    initial_settlement.clans.forEach(clan => {
        if(clan.id === clanTypes.craftsmen || clan.id === clanTypes.merchants) {clan.population = 1}
        else if (clan.id === clanTypes.miners) {clan.population = 2}
        else if (clan.id === clanTypes.farmers) {clan.population = 6}
    })
    // good productions
    updateGoodsProduction(initial_settlement)
    // Finances
    initial_settlement.projected_pop = 10
    initial_settlement.merchant_capacity = 50
    
    store.set('settlements', [initial_settlement]);
    store.set('Federal Reserve',{...empty_goodsdist})
    store.set('Foreign Powers', [Baetanuesa,Beznesti,Dragonsbane,Eidgenossenkhazaden,Garozemle,Kayasahr,Pactusallamanni,Polabtheli,Saemark,Sledzianska,TerraKontor])
    store.set('Positive Global Market Trend',true) //True means going up false means going down
    store.set('Osc Period',60) // How Many months in the economy trend
    store.set('Osc Months Passed',0) // How Many months into the economy are we
    store.set('Market Trajectory', 0.0002) // The Veleocity of the market
    store.set('Turns Passed',0) // Turns since game start
    store.set('Federal Prices',{...initial_prices}) // Prices for the goods in the federal reserve
    store.set('Price History',[]) // Tracks the history of prices in the nation
    store.set('Merchant Capacity',0) // Merchant Capacity for the nation
    store.set('Months Stored',1) // Months worth of goods that are stored in the nation
    await store.save();
    store.close();
}