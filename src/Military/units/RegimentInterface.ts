import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { empty_goodsdist, goodsdist } from "../../Goods/GoodsDist";

export enum EliteVarient {
    standard,
    grudge_settler,
    regiment_of_renown,
    mercanary
}

export interface RegimentInterface {
    name: string;
    type: string;
    pops_conusmed: number; // How many pops it takes to make one unit
    turns_to_levy: number; // How many turns it takes to levy one unit
    clan_type: clanTypes;
    consumption_rate: goodsdist;
    elite_varient: EliteVarient;
    health: number;
    
}

export const regiment_consumption_factor: goodsdist = {
    ...empty_goodsdist,
    money: 100,
    tools: 20,
    medical: 20,
    livestock: 75,
    arms: 10,
    enchanted_arms: 10
}