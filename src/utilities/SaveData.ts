import { LazyStore, load } from "@tauri-apps/plugin-store";
import { documentDir } from "@tauri-apps/api/path";
import {  readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import { productName } from "../../src-tauri/tauri.conf.json"
import { type } from '@tauri-apps/plugin-os'

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


export const createNewSave = async (saveName: string)  => {
    const savegame_folder = await savegameFolder();
    const saveFile = `${savegame_folder}${fileSeperator()}${saveName}.json`;
    new LazyStore(saveFile,{autoSave: false}); 
    const store = await load(saveFile, {autoSave: false});
    let initial_settlement = {
        name: 'Skarduhn',
        terrain_type: 'mountain',
        tier: 1
    }
    store.set('settlements', [initial_settlement]);
    await store.save();
    store.close();
}

// Gets a list of savegames
export const getSavegames = async () : Promise<string[]> => {
    const savegames_objects = await readDir(`${productName}`, {baseDir: BaseDirectory.Document});
    console.log('getSaves');
    let savegames : string[] = []
    savegames_objects.map((savegame) => {savegames.push(savegame.name)});
    return savegames;
}