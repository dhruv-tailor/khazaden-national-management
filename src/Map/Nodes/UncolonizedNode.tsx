import { Handle, Position } from "@xyflow/react";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { TerrainData, TerrainType } from "../../Settlement/SettlementInterface/TerrainInterface";
import { UncolonziedInterface } from "../MapInfoInterface";
import { GiMountainCave, GiPineTree, GiMagicSwirl, GiWheat } from 'react-icons/gi';
import { FaMapMarkedAlt } from 'react-icons/fa';

type UncolonizedNodeData = {
    uncolonized: UncolonziedInterface;
};

const getTerrainIcon = (terrain: TerrainType) => {
    switch (terrain) {
        case TerrainType.Mountain:
            return <GiMountainCave className="text-xl" />;
        case TerrainType.Forest:
            return <GiPineTree className="text-xl" />;
        case TerrainType.Enchanted_Forest:
            return <GiMagicSwirl className="text-xl" />;
        case TerrainType.Farmland:
            return <GiWheat className="text-xl" />;
        default:
            return <FaMapMarkedAlt className="text-xl" />;
    }
};

const getTerrainSeverity = (terrain: TerrainType): 'success' | 'warning' | 'info' | 'danger' | 'secondary' | 'contrast' => {
    switch (terrain) {
        case TerrainType.Mountain:
            return 'warning';
        case TerrainType.Forest:
            return 'info';
        case TerrainType.Enchanted_Forest:
            return 'secondary';
        case TerrainType.Farmland:
            return 'success';
        default:
            return 'info';
    }
};

export default function UncolonizedNode({data}: {data: UncolonizedNodeData}) {
    if (!data?.uncolonized) return null;
    
    const { uncolonized } = data;
    const terrainIcon = getTerrainIcon(uncolonized.terrain);
    const terrainSeverity = getTerrainSeverity(uncolonized.terrain);

    return (
        <div>
            {uncolonized.connections[0] && <Handle type={uncolonized.isSource[0] ? "source" : "target"} position={Position.Top} id='top' />}
            {uncolonized.connections[1] && <Handle type={uncolonized.isSource[1] ? "source" : "target"} position={Position.Bottom} id='bottom' />}
            {uncolonized.connections[2] && <Handle type={uncolonized.isSource[2] ? "source" : "target"} position={Position.Left} id='left' />}
            {uncolonized.connections[3] && <Handle type={uncolonized.isSource[3] ? "source" : "target"} position={Position.Right} id='right' />}
            
            <Card >
                <div className="flex flex-column gap-3">
                    <Tag severity={terrainSeverity}>
                        <span className="mr-2">{terrainIcon}</span>
                        {TerrainData[uncolonized.terrain].name}
                    </Tag>
                    <Button 
                        icon="pi pi-map" 
                        label="Settle Location" 
                        size="small"
                        severity="success"
                        className="p-button-sm"
                    />
                </div>
            </Card>
        </div>
    )
}
