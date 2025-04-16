import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { empty_goodsdist, goodsdist } from "../../Goods/GoodsDist";
import { BlastingCharges } from "./BlastingCharges";
import { BoltThrowers } from "./BoltThrowers";
import { BugmansRangers } from "./BugmansRangers";
import { Cannons } from "./Cannons";
import { DwarfWarriors } from "./DwarfWarriors";
import { FlameCannons } from "./FlameCannons";
import { GrudgeThrowers } from "./GrudgeThrowers";
import { Gyrobombers } from "./Gyrobombers";
import { Gyrocopters } from "./Gyrocopters";
import { Hammerers } from "./Hammerers";
import { Ironbreakers } from "./Ironbreakers";
import { Irondrakes } from "./Irondrakes";
import { Longbeards } from "./Longbeards";
import { MMiners } from "./MMiners";
import { OrganGuns } from "./OrganGuns";
import { Quarrellers } from "./Quarrellers";
import { Rangers } from "./Rangers";
import { Slayers } from "./Slayers";
import { Thunderbarge } from "./Thunderbarge";
import { Thunderers } from "./Thunderers";
import { TrollhammerTorpedoes } from "./TrollhammerTorpedoes";

export enum regiment_types {
    TrollhammerTorpedoes = 1,
    Thunderers,
    Thunderbarge,
    Slayers,
    Rangers,
    Quarrellers,
    OrganGuns,
    MMiners,
    Longbeards,
    Irondrakes,
    Ironbreakers,
    Hammerers,
    Gyrocopters,
    Gyrobombers,
    GrudgeThrowers,
    FlameCannons,
    DwarfWarriors,
    BugmansRangers,
    BoltThrowers,
    BlastingCharges,
    Cannons
}

export interface RegimentInterface {
    name: string;
    type: regiment_types;
    pops_conusmed: number; // How many pops it takes to make one unit
    max_pops: number;
    turns_to_levy: number; // How many turns it takes to levy one unit
    clan_type: clanTypes;
    consumption_rate: goodsdist;
    id: number;
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

export const empty_regiment = () => {
    return {
        name: "",
        type: regiment_types.DwarfWarriors,
        pops_conusmed: 0,
        max_pops: 0,
        turns_to_levy: 0,
        clan_type: clanTypes.none,
        consumption_rate: {...empty_goodsdist},
        id: Math.floor(Math.random() * 1000000)
    }
}

export const RegimentData = {
    [regiment_types.TrollhammerTorpedoes]: {...TrollhammerTorpedoes()},
    [regiment_types.Thunderers]: {...Thunderers()},
    [regiment_types.Thunderbarge]: {...Thunderbarge()},
    [regiment_types.Slayers]: {...Slayers()},
    [regiment_types.Rangers]: {...Rangers()},
    [regiment_types.Quarrellers]: {...Quarrellers()},
    [regiment_types.OrganGuns]: {...OrganGuns()},
    [regiment_types.MMiners]: {...MMiners()},
    [regiment_types.Longbeards]: {...Longbeards()},
    [regiment_types.Irondrakes]: {...Irondrakes()},
    [regiment_types.Ironbreakers]: {...Ironbreakers()},
    [regiment_types.Hammerers]: {...Hammerers()},
    [regiment_types.Gyrocopters]: {...Gyrocopters()},
    [regiment_types.Gyrobombers]: {...Gyrobombers()},
    [regiment_types.GrudgeThrowers]: {...GrudgeThrowers()},   
    [regiment_types.FlameCannons]: {...FlameCannons()},   
    [regiment_types.DwarfWarriors]: {...DwarfWarriors()},
    [regiment_types.BugmansRangers]: {...BugmansRangers()},
    [regiment_types.BoltThrowers]: {...BoltThrowers()},
    [regiment_types.BlastingCharges]: {...BlastingCharges()},
    [regiment_types.Cannons]: {...Cannons()},
}   
