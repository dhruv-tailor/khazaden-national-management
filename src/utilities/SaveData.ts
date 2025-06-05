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
import {Eidgenossenkhazaden } from "../ForeignPowers/Interface/ForeignPowerInterface";
import { empty_federal_interface, FederalInterface } from "./FederalInterface";
import { empty_map_info } from "../Map/MapInfoInterface";
import { generate_family, generate_random_character } from "../Character/Generator/CharacterGenerator";
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

interface SaveConfig {
    saveName: string;
    spawnRate?: number;
    connectionSpawnRate?: number;
    settlementConfig: {
        clans: {
            [key in clanTypes]?: {
                population?: number;
                tax_rate?: number;
                development?: number;
            };
        };
        stock?: goodsdist;
        development_growth_bonus?: clanTypes;
        population_growth_bonus?: clanTypes;
        efficency_bonus?: clanTypes;
        projected_pop?: number;
        merchant_capacity?: number;
    };
    year: number;
    month: number;
}

const DEFAULT_SPAWN_RATE = 0.48;
const DEFAULT_CONNECTION_SPAWN_RATE = 0.47;

async function createSaveFile(config: SaveConfig) {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${config.saveName}.json`;
    new LazyStore(saveFile, {autoSave: false}); 
    const store = await load(saveFile, {autoSave: false});
    
    let global_id = 0;
    let initial_settlement = newSettlement('Skarduhn', TerrainType.Mountain);
    initial_settlement.global_id = `s${global_id.toString()}`;
    global_id++;

    // Configure clans
    initial_settlement.clans.forEach(clan => {
        const clanConfig = config.settlementConfig.clans[clan.id];
        if (clanConfig) {
            if (clanConfig.population !== undefined) clan.population = clanConfig.population;
            if (clanConfig.tax_rate !== undefined) clan.tax_rate = clanConfig.tax_rate;
            if (clanConfig.development !== undefined) clan.development = clanConfig.development;
        }
    });

    // Set settlement properties
    if (config.settlementConfig.stock) {
        initial_settlement.stock = config.settlementConfig.stock;
    }
    if (config.settlementConfig.development_growth_bonus) {
        initial_settlement.development_growth_bonus = config.settlementConfig.development_growth_bonus;
    }
    if (config.settlementConfig.population_growth_bonus) {
        initial_settlement.population_growth_bonus = config.settlementConfig.population_growth_bonus;
    }
    if (config.settlementConfig.efficency_bonus) {
        initial_settlement.efficency_bonus = config.settlementConfig.efficency_bonus;
    }
    if (config.settlementConfig.projected_pop) {
        initial_settlement.projected_pop = config.settlementConfig.projected_pop;
    }
    if (config.settlementConfig.merchant_capacity) {
        initial_settlement.merchant_capacity = config.settlementConfig.merchant_capacity;
    }

    updateGoodsProduction(initial_settlement);

    const federal_interface: FederalInterface = {
        ...empty_federal_interface,
        settlements: [initial_settlement],
        reserve: {...empty_goodsdist},
        foreign_powers: [{...Eidgenossenkhazaden, global_id: `f${global_id.toString()}`}],
        prices: {...initial_prices},
        price_history: [],
        merchant_capacity: 0,
        loans: [],
        armies: [],
        trade_deals: [],
    };

    global_id++;
    // Generate king / Queen of Skarduhn
    federal_interface.characters = generate_family(global_id);
    federal_interface.king = federal_interface.characters[0].id;
    federal_interface.characters[0].title = federal_interface.characters[0].gender === 'male' ? 'King' : 'Queen';
    global_id += federal_interface.characters.length;
    // Generate Settlement
    federal_interface.settlements.forEach(settlement => {
        // Generate Governer
        const governer = generate_random_character(`g${global_id}`, 'random');
        governer.title = 'Governer';
        settlement.governer = governer.id;
        global_id++;
        federal_interface.characters.push(governer);
        // Generate Clan Leaders
        settlement.clans.forEach(clan => {
            const clan_leader = generate_random_character(`c${global_id}`, 'random');
            clan_leader.title = `${clan.name} Leader`;
            clan.leader = clan_leader.id;
            global_id++;
            federal_interface.characters.push(clan_leader);
        })
    })
    // Set common save data
    store.set('Undiscovered Foreign Powers', ['Baetanuesa','Beznesti','Dragonsbane','Garozemle','Kayasahr','Pactusallamanni','Polabtheli','Saemark','Sledzianska','TerraKontor']);
    store.set('Global ID', global_id);
    store.set('Federal', federal_interface);
    store.set('Positive Global Market Trend', true);
    store.set('Osc Period', 60);
    store.set('Osc Months Passed', 0);
    store.set('Market Trajectory', 0.0002);
    store.set('Turns Passed', 0);
    store.set('Current Year', config.year);
    store.set('Current Month', config.month);
    store.set('Foreign Spawn Rate', config.spawnRate ?? DEFAULT_SPAWN_RATE);
    store.set('Connection Spawn Rate', config.connectionSpawnRate ?? DEFAULT_CONNECTION_SPAWN_RATE);
    store.set('Map Info', {
        ...empty_map_info,
        nodes: [
            { id: `s${0}`, position: {x: 230, y: -10} },
            { id: `f${1}`, position: {x: 790, y: 40} }
        ],
        edges: [
            { id: '0l-1r', source: 's0', target: 'f1', sourceHandle: 'right', targetHandle: 'left' }
        ]
    });

    await store.save();
    store.close();
}

export const createNewSave = async (saveName: string, spawnRate: number = DEFAULT_SPAWN_RATE, connectionSpawnRate: number = DEFAULT_CONNECTION_SPAWN_RATE) => {
    const config: SaveConfig = {
        saveName,
        spawnRate,
        connectionSpawnRate,
        settlementConfig: {
            clans: {
                [clanTypes.craftsmen]: { population: 1 },
                [clanTypes.merchants]: { population: 1 },
                [clanTypes.miners]: { population: 2 },
                [clanTypes.farmers]: { population: 6 }
            },
            stock: {
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
            },
            projected_pop: 10,
            merchant_capacity: 50
        },
        year: 728,
        month: 0
    };
    await createSaveFile(config);
};

export const createCustomSave = async (saveName: string, startingResources: goodsdist, clanDistribution: {[key in clanTypes]: number}, spawnRate: number = DEFAULT_SPAWN_RATE, connectionSpawnRate: number = DEFAULT_CONNECTION_SPAWN_RATE) => {
    const config: SaveConfig = {
        saveName,
        spawnRate,
        connectionSpawnRate,
        settlementConfig: {
            clans: {
                [clanTypes.rulers]: { population: clanDistribution[clanTypes.rulers] },
                [clanTypes.archivists]: { population: clanDistribution[clanTypes.archivists] },
                [clanTypes.engineers]: { population: clanDistribution[clanTypes.engineers] },
                [clanTypes.runeSmiths]: { population: clanDistribution[clanTypes.runeSmiths] },
                [clanTypes.craftsmen]: { population: clanDistribution[clanTypes.craftsmen] },
                [clanTypes.merchants]: { population: clanDistribution[clanTypes.merchants] },
                [clanTypes.clerics]: { population: clanDistribution[clanTypes.clerics] },
                [clanTypes.miners]: { population: clanDistribution[clanTypes.miners] },
                [clanTypes.farmers]: { population: clanDistribution[clanTypes.farmers] },
                [clanTypes.warriors]: { population: clanDistribution[clanTypes.warriors] },
                [clanTypes.foresters]: { population: clanDistribution[clanTypes.foresters] },
                [clanTypes.criminals]: { population: clanDistribution[clanTypes.criminals] }
            },
            stock: startingResources,
            projected_pop: clanDistribution[clanTypes.farmers] + clanDistribution[clanTypes.miners] + clanDistribution[clanTypes.craftsmen] + clanDistribution[clanTypes.merchants] + clanDistribution[clanTypes.clerics] + clanDistribution[clanTypes.rulers] + clanDistribution[clanTypes.warriors] + clanDistribution[clanTypes.foresters] + clanDistribution[clanTypes.criminals],
            merchant_capacity: 50
        },
        year: 728,
        month: 0
    };
    await createSaveFile(config);
}

export const createJan728Save = async (saveName: string, spawnRate: number = DEFAULT_SPAWN_RATE, connectionSpawnRate: number = DEFAULT_CONNECTION_SPAWN_RATE) => {
    const config: SaveConfig = {
        saveName,
        spawnRate,
        connectionSpawnRate,
        settlementConfig: {
            clans: {
                [clanTypes.farmers]: { population: 6, tax_rate: 0.2, development: 174 },
                [clanTypes.miners]: { population: 2, tax_rate: 0.2, development: 46 },
                [clanTypes.craftsmen]: { population: 1, tax_rate: 0.2, development: 34 },
                [clanTypes.merchants]: { population: 1, tax_rate: 0.75, development: 121 }
            },
            development_growth_bonus: clanTypes.farmers,
            stock: {
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
            },
            projected_pop: 10,
            merchant_capacity: 65
        },
        year: 728,
        month: 1
    };
    await createSaveFile(config);
};

export const createJul728Save = async (saveName: string, spawnRate: number = DEFAULT_SPAWN_RATE, connectionSpawnRate: number = DEFAULT_CONNECTION_SPAWN_RATE) => {
    const config: SaveConfig = {
        saveName,
        spawnRate,
        connectionSpawnRate,
        settlementConfig: {
            clans: {
                [clanTypes.craftsmen]: { population: 1, tax_rate: 0.2, development: 236 },
                [clanTypes.merchants]: { population: 3, tax_rate: 0.75, development: 164 },
                [clanTypes.clerics]: { population: 1 },
                [clanTypes.miners]: { population: 2, tax_rate: 0.2, development: 340 },
                [clanTypes.farmers]: { population: 6, tax_rate: 0.2, development: 735 }
            },
            development_growth_bonus: clanTypes.miners,
            population_growth_bonus: clanTypes.farmers,
            stock: {
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
            },
            projected_pop: 13,
            merchant_capacity: 43
        },
        year: 728,
        month: 7
    };
    await createSaveFile(config);
};

export const createJan729Save = async (saveName: string, spawnRate: number = DEFAULT_SPAWN_RATE, connectionSpawnRate: number = DEFAULT_CONNECTION_SPAWN_RATE) => {
    const config: SaveConfig = {
        saveName,
        spawnRate,
        connectionSpawnRate,
        settlementConfig: {
            clans: {
                [clanTypes.runeSmiths]: { population: 1 },
                [clanTypes.craftsmen]: { population: 1, tax_rate: 0.4, development: 423 },
                [clanTypes.merchants]: { population: 3, tax_rate: 0.75, development: 283 },
                [clanTypes.clerics]: { population: 1, development: 58 },
                [clanTypes.miners]: { population: 2, development: 759 },
                [clanTypes.farmers]: { population: 6, tax_rate: 0.4, development: 1279 }
            },
            development_growth_bonus: clanTypes.miners,
            population_growth_bonus: clanTypes.farmers,
            stock: {
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
            },
            projected_pop: 14,
            merchant_capacity: 64
        },
        year: 729,
        month: 1
    };
    await createSaveFile(config);
};

export const createNov731Save = async (saveName: string, spawnRate: number = DEFAULT_SPAWN_RATE, connectionSpawnRate: number = DEFAULT_CONNECTION_SPAWN_RATE) => {
    const config: SaveConfig = {
        saveName,
        spawnRate,
        connectionSpawnRate,
        settlementConfig: {
            clans: {
                [clanTypes.rulers]: { population: 2, tax_rate: 0.75, development: 846 },
                [clanTypes.runeSmiths]: { population: 1, tax_rate: 0.75, development: 390 },
                [clanTypes.craftsmen]: { population: 1, tax_rate: 0.6, development: 783 },
                [clanTypes.merchants]: { population: 3, tax_rate: 0.6, development: 1162 },
                [clanTypes.clerics]: { population: 1, tax_rate: 0.75, development: 277 },
                [clanTypes.miners]: { population: 2, development: 1694 },
                [clanTypes.farmers]: { population: 7, tax_rate: 0.4, development: 2321 }
            },
            development_growth_bonus: clanTypes.craftsmen,
            population_growth_bonus: clanTypes.farmers,
            efficency_bonus: clanTypes.miners,
            stock: {
                money: 440,
                food: 36,
                beer: 4,
                leather: 1,
                artisanal: 0,
                livestock: 0,
                ornamental: 0,
                enchanted: 0,
                timber: 368,
                tools: 1,
                common_ores: 1,
                medical: 0,
                rare_ores: 5,
                gems: 0,
                runes: 0,
                arms: 0,
                books: 0,
                enchanted_arms: 0,
                charcoal: 0
            },
            projected_pop: 14,
            merchant_capacity: 65
        },
        year: 731,
        month: 11
    };
    await createSaveFile(config);
};