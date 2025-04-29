import { Edge } from "@xyflow/react";

export interface MapInfoInterface {
    nodes: {
        id: string, 
        position: {x: number, y: number},
    }[]
    edges: Edge[];
}

export const empty_map_info: MapInfoInterface = {
    nodes: [],
    edges: [],
}
