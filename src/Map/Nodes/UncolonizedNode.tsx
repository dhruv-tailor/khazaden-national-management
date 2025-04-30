import { Handle, Position } from "@xyflow/react";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { TerrainData } from "../../Settlement/SettlementInterface/TerrainInterface";
import { UncolonziedInterface } from "../MapInfoInterface";

type UncolonizedNodeData = {
    uncolonized: UncolonziedInterface;
};

export default function UncolonizedNode({data}: {data: UncolonizedNodeData}) {
    if (!data?.uncolonized) return null;
    
    const { uncolonized } = data;

    return (
        <div>
            {uncolonized.connections[0] && <Handle type={uncolonized.isSource[0] ? "source" : "target"} position={Position.Top} id='top' />}
            {uncolonized.connections[1] && <Handle type={uncolonized.isSource[1] ? "source" : "target"} position={Position.Bottom} id='bottom' />}
            {uncolonized.connections[2] && <Handle type={uncolonized.isSource[2] ? "source" : "target"} position={Position.Left} id='left' />}
            {uncolonized.connections[3] && <Handle type={uncolonized.isSource[3] ? "source" : "target"} position={Position.Right} id='right' />}
            
            <Card 
                className="shadow-2"
                title={
                    <div className="flex gap-2 align-items-center justify-content-between">
                        <span className="text-xl font-bold">Uncolonized Territory</span>
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <div className="flex gap-2">
                        <Tag 
                            value={TerrainData[uncolonized.terrain].name} 
                            severity="info"
                            className="text-sm"
                        />
                    </div>
                    <div className="flex justify-content-end">
                        <Button 
                            icon="pi pi-map" 
                            label="Explore" 
                            size="small"
                            severity="success"
                            className="p-button-sm"
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}
