import { initial_prices } from "../../Economics/pricing/prices";
import { TradeDealInterface } from "../../Economics/Trade/interface/TradeDealInterface";
import { EconomyTypeData, EconomyTypes } from "../../Goods/EconomyTypes";
import { goodsdist, scaleGoods } from "../../Goods/GoodsDist";

export enum ForeignRecognition {
    None,
    Secret,
    Limited,
    Full
}

export enum CombatantStatus {
    Neutral,
    LowIntesity,
    ProvincialWarfare,
    ConventionalWarfare,
    Allied
}

export enum AllianceStatus {
    Overlord,
    Allied,
    Friendly,
    Neutral,
    Nostile,
    AtWar,
    Subject
}

export enum VassalStatus {
    None,
    Colony,
    Puppet,
    March,
    Dominion,
    Protectorate
}

export enum MilitaryAccess {
    Prohibited,
    Limited,
    Granted
}

export interface ForeignPowerInterface {
    name: string;
    relations: number;
    recognition: ForeignRecognition;
    isEmbargoed: boolean;
    dwarfPopulation: number;
    immigrationRate: number;
    combatantStatus: CombatantStatus;
    allianceStatus: AllianceStatus;
    vassalStatus: VassalStatus;
    militaryAccess: MilitaryAccess;
    economyType: EconomyTypes;
    supply: goodsdist;
    demand: goodsdist;
    prices: goodsdist;
    available_supply: goodsdist;
    available_demand: goodsdist;
    price_history: goodsdist[];
    trade_deals: TradeDealInterface[];
    global_id: string;
    connections: [boolean,boolean,boolean,boolean];
    isSource: [boolean,boolean,boolean,boolean];
    market_access: number; // What percentage of the market is available to interact with for the player
}

export const newForeignPower = (name: string, dwarfPopulation: number,economy: EconomyTypes,start_factor: number): ForeignPowerInterface => {
    const pop_scaling_factor = 1000 * start_factor
    const availability_factor = 0.05
    return({
        name: name,
        relations: 0,
        recognition: ForeignRecognition.None,
        isEmbargoed: true,
        dwarfPopulation: dwarfPopulation,
        immigrationRate: 0,
        combatantStatus: CombatantStatus.Neutral,
        allianceStatus: AllianceStatus.Neutral,
        vassalStatus: VassalStatus.None,
        militaryAccess: MilitaryAccess.Prohibited,
        economyType: economy,
        supply: scaleGoods({ money: 1, ...EconomyTypeData[economy].supply }, pop_scaling_factor),
        demand: scaleGoods({ money: 1, ...EconomyTypeData[economy].demand }, pop_scaling_factor),
        prices: {...initial_prices},
        available_supply: scaleGoods({ money: 1, ...EconomyTypeData[economy].demand }, pop_scaling_factor * availability_factor),
        available_demand: scaleGoods({ money: 1, ...EconomyTypeData[economy].demand }, pop_scaling_factor * availability_factor),
        price_history: [],
        trade_deals: [],
        global_id: '',
        connections: [true,true,true,true],
        isSource: [false,false,false,false],
        market_access: availability_factor
    })
}

export const Baetanuesa = newForeignPower("Baetanuesa", 0.11,EconomyTypes.Colonial,2.5);
export const Beznesti = newForeignPower("Beznesti", 0,EconomyTypes.Colonial,2);
export const Dragonsbane = newForeignPower("Dragonsbane", 0.08,EconomyTypes.Balanced,5);
export const Garozemle = newForeignPower("Garozemle", 0.05,EconomyTypes.Aristocratic,6);
export const Kayasahr = newForeignPower("Kayasahr", 0.05,EconomyTypes.SilkRoad,2);
export const Pactusallamanni = newForeignPower("Pactusallamanni", 0.2,EconomyTypes.Balanced,2);
export const Polabtheli = newForeignPower("Polabtheli", 0,EconomyTypes.Elven,2);
export const Saemark = newForeignPower("Saemark", 0.2,EconomyTypes.Seaborne,7);
export const Sledzianska = newForeignPower("Sledzianska", 0.04,EconomyTypes.Agricultural,3);
export const TerraKontor = newForeignPower("Terra Kontor", 0.03,EconomyTypes.Martial,2.5);


export const Eidgenossenkhazaden: ForeignPowerInterface = {
    ...newForeignPower("Eidgenossenkhazaden", 0.25,EconomyTypes.Dwarven,5),
    relations: 40,
    recognition: ForeignRecognition.Limited,
    isEmbargoed: false,
    immigrationRate: 0.10,
    allianceStatus: AllianceStatus.Neutral,
    militaryAccess: MilitaryAccess.Limited
};

export const getForeignPower = (name: string): ForeignPowerInterface => {
    switch(name){
        case "Baetanuesa":
            return newForeignPower("Baetanuesa", 0.11,EconomyTypes.Colonial,2.5)
        case "Beznesti":
            return newForeignPower("Beznesti", 0,EconomyTypes.Colonial,2)
        case "Dragonsbane":
            return newForeignPower("Dragonsbane", 0.08,EconomyTypes.Balanced,5)
        case "Garozemle":
            return newForeignPower("Garozemle", 0.05,EconomyTypes.Aristocratic,6)
        case "Kayasahr":
            return newForeignPower("Kayasahr", 0.05,EconomyTypes.SilkRoad,2)
        case "Pactusallamanni":
            return newForeignPower("Pactusallamanni", 0.2,EconomyTypes.Balanced,2)
        case "Polabtheli":
            return newForeignPower("Polabtheli", 0,EconomyTypes.Elven,2)
        case "Saemark":
            return newForeignPower("Saemark", 0.2,EconomyTypes.Seaborne,7)
        case "Sledzianska":
            return newForeignPower("Sledzianska", 0.04,EconomyTypes.Agricultural,3)
        case "TerraKontor":
            return newForeignPower("Terra Kontor", 0.03,EconomyTypes.Martial,2.5)
        default:
            return newForeignPower("Unknown", 0,EconomyTypes.Colonial,2)
    }
}