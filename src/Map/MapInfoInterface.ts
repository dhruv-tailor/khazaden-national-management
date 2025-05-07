import { Edge } from "@xyflow/react";
import { TerrainType } from "../Settlement/SettlementInterface/TerrainInterface";

export interface MapInfoInterface {
    nodes: {
        id: string, 
        position: {x: number, y: number},
    }[]
    edges: Edge[];
    colonized: colonizedInterface[];
}

export const empty_map_info: MapInfoInterface = {
    nodes: [],
    edges: [],
    colonized: [],
}

export interface colonizedInterface {
    id: string,
    terrain: TerrainType,
    connections: [boolean,boolean,boolean,boolean]
    isSource: [boolean,boolean,boolean,boolean]
}

export const empty_colonized: colonizedInterface = {
    id: '',
    terrain: TerrainType.Mountain,
    connections: [true,true,true,true],
    isSource: [true,true,true,true],
}