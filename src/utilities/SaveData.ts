import { LazyStore, load } from "@tauri-apps/plugin-store";
import { documentDir } from "@tauri-apps/api/path";
import {  readDir, BaseDirectory, remove } from "@tauri-apps/plugin-fs";
import { productName } from "../../src-tauri/tauri.conf.json"
import { type } from '@tauri-apps/plugin-os'
import { newSettlement, updateGoodsProduction } from "../Settlement/SettlementInterface/SettlementInterface";
import { TerrainType } from "../Settlement/SettlementInterface/TerrainInterface";
import { clanTypes } from "../Clans/ClanInterface/ClanInterface";
import { empty_goodsdist, goodsdist } from "../Goods/GoodsDist";
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
        artisanal: 50,
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
    store.set('Loans',[]) // History of loans
    store.set('Current Year',728) // Current Year
    store.set('Current Month',0) // Current Month
    store.set('Armies',[]) // Armies
    await store.save();
    store.close();
}

export const createCustomSave = async (saveName: string,custom_resources: goodsdist,custom_clans: {[key in clanTypes]: number}) => {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${saveName}.json`;
    new LazyStore(saveFile,{autoSave: false}); 
    const store = await load(saveFile, {autoSave: false});
    let initial_settlement = newSettlement('Skarduhn', TerrainType.Mountain);
    store.set('settlements', [initial_settlement]);
    initial_settlement.stock = {...custom_resources}

    initial_settlement.clans.forEach(clan => {
        clan.population = custom_clans[clan.id]
    })

    updateGoodsProduction(initial_settlement)

    initial_settlement.projected_pop = custom_clans[clanTypes.farmers] + custom_clans[clanTypes.warriors] + custom_clans[clanTypes.clerics] + custom_clans[clanTypes.rulers] + custom_clans[clanTypes.craftsmen] + custom_clans[clanTypes.merchants] + custom_clans[clanTypes.miners] + custom_clans[clanTypes.archivists] + custom_clans[clanTypes.engineers] + custom_clans[clanTypes.runeSmiths] + custom_clans[clanTypes.foresters] + custom_clans[clanTypes.criminals]

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
    store.set('Loans',[]) // History of loans
    store.set('Current Year',728) // Current Year
    store.set('Current Month',0) // Current Month
    store.set('Armies',[]) // Armies
    await store.save();
    store.close();
}
export const createJan728Save = async (saveName: string) => {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${saveName}.json`;
    new LazyStore(saveFile,{autoSave: false}); 
    const store = await load(saveFile, {autoSave: false});
    let initial_settlement = newSettlement('Skarduhn', TerrainType.Mountain);
    store.set('settlements', [initial_settlement]);

    initial_settlement.clans.forEach(clan => {
        if(clan.id === clanTypes.craftsmen || clan.id === clanTypes.merchants) {clan.population = 1}
        else if (clan.id === clanTypes.miners) {clan.population = 2}
        else if (clan.id === clanTypes.farmers) {clan.population = 6}
    })

    initial_settlement.clans.forEach(clan => {
        if(clan.id === clanTypes.farmers) {
            clan.tax_rate = 0.2
            clan.development = 174
        }
        else if(clan.id === clanTypes.miners) {
            clan.tax_rate = 0.2
            clan.development = 46
        }
        else if(clan.id === clanTypes.craftsmen) {
            clan.tax_rate = 0.2
            clan.development = 34
        }
        else if(clan.id === clanTypes.merchants) {
            clan.tax_rate = 0.75
            clan.development = 121
        }
    })

    initial_settlement.development_growth_bonus = clanTypes.farmers

    initial_settlement.stock = {
        money: 1193,
        food: 150,
        beer: 140,
        leather: 140,
        artisanal: 47,
        livestock: 50,
        ornamental: 48,
        enchanted: 0,
        timber: 598,
        tools: 93,
        common_ores: 145,
        medical: 25,
        rare_ores: 150,
        gems: 140,
        runes: 0,
        arms: 25,
        books: 25,
        enchanted_arms: 0,
        charcoal: 0
    }
    
    updateGoodsProduction(initial_settlement)

    initial_settlement.projected_pop = 10
    initial_settlement.merchant_capacity = 65
    
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
    store.set('Loans',[]) // History of loans
    store.set('Current Year',728) // Current Year
    store.set('Current Month',1) // Current Month
    store.set('Armies',[]) // Armies
    await store.save();
    store.close();
}

export const createJul728Save = async (saveName: string) => {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${saveName}.json`;
    new LazyStore(saveFile,{autoSave: false}); 
    const store = await load(saveFile, {autoSave: false});
    let initial_settlement = newSettlement('Skarduhn', TerrainType.Mountain);
    store.set('settlements', [initial_settlement]);


    initial_settlement.clans.forEach(clan => {
        if(clan.id === clanTypes.craftsmen) {
            clan.tax_rate = 0.2
            clan.development = 236
            clan.population = 1
        }
        else if(clan.id === clanTypes.merchants) {
            clan.tax_rate = 0.75
            clan.development = 164
            clan.population = 3
        }
        else if(clan.id === clanTypes.clerics) {
            clan.population = 1
        }
        else if(clan.id === clanTypes.miners) {
            clan.tax_rate = 0.2
            clan.development = 340
            clan.population = 2
        }
        else if(clan.id === clanTypes.farmers) {
            clan.tax_rate = 0.2
            clan.development = 735
            clan.population = 6
        }
    })

    initial_settlement.development_growth_bonus = clanTypes.miners
    initial_settlement.population_growth_bonus = clanTypes.farmers

    initial_settlement.stock = {
        money: 371,
        food: 100,
        beer: 80,
        leather: 80,
        artisanal: 0,
        livestock: 50,
        ornamental: 36,
        enchanted: 0,
        timber: 586,
        tools: 46,
        common_ores: 115,
        medical: 25,
        rare_ores: 150,
        gems: 125,
        runes: 0,
        arms: 25,
        books: 25,
        enchanted_arms: 0,
        charcoal: 0
    }
    
    updateGoodsProduction(initial_settlement)

    initial_settlement.projected_pop = 13
    initial_settlement.merchant_capacity = 43
    
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
    store.set('Loans',[]) // History of loans
    store.set('Current Year',728) // Current Year
    store.set('Current Month',7) // Current Month
    store.set('Armies',[]) // Armies
    await store.save();
    store.close();
}

export const createJan729Save = async (saveName: string) => {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${saveName}.json`;
    new LazyStore(saveFile,{autoSave: false}); 
    const store = await load(saveFile, {autoSave: false});
    let initial_settlement = newSettlement('Skarduhn', TerrainType.Mountain);
    store.set('settlements', [initial_settlement]);


    initial_settlement.clans.forEach(clan => {
        if(clan.id === clanTypes.runeSmiths) {
            clan.population = 1
        }
        else if(clan.id === clanTypes.craftsmen) {
            clan.tax_rate = 0.4
            clan.development = 423
            clan.population = 1
        }
        else if(clan.id === clanTypes.merchants) {
            clan.tax_rate = 0.75
            clan.development = 283
            clan.population = 3
        }
        else if(clan.id === clanTypes.clerics) {
            clan.population = 1
            clan.development = 58
        }
        else if(clan.id === clanTypes.miners) {
            clan.development = 759
            clan.population = 2
        }
        else if(clan.id === clanTypes.farmers) {
            clan.tax_rate = 0.4
            clan.development = 1279
            clan.population = 6
        }
    })

    initial_settlement.development_growth_bonus = clanTypes.miners
    initial_settlement.population_growth_bonus = clanTypes.farmers

    initial_settlement.stock = {
        money: 59,
        food: 52,
        beer: 37,
        leather: 29,
        artisanal: 0,
        livestock: 1,
        ornamental: 6,
        enchanted: 0,
        timber: 532,
        tools: 45,
        common_ores: 85,
        medical: 25,
        rare_ores: 150,
        gems: 0,
        runes: 0,
        arms: 25,
        books: 25,
        enchanted_arms: 0,
        charcoal: 0
    }
    
    updateGoodsProduction(initial_settlement)

    initial_settlement.projected_pop = 14
    initial_settlement.merchant_capacity = 64
    
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
    store.set('Loans',[]) // History of loans
    store.set('Current Year',728) // Current Year
    store.set('Current Month',7) // Current Month
    store.set('Armies',[]) // Armies
    await store.save();
    store.close();
}