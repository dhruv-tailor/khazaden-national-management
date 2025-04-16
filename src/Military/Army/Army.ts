import { RegimentInterface } from "../units/RegimentInterface";

export interface ArmyInterface {
    name: string;
    id: number;
    units: RegimentInterface[];
    max_units: number;
}

export const empty_army: ArmyInterface = {
    name: '',
    id: 0,
    units: [],
    max_units: 20,
}


