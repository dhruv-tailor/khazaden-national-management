import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { Handle, Position } from "@xyflow/react";

type SettlementNodeData = {
    settlement: SettlementInterface;
};

export default function SettlementNode({data}: {data: SettlementNodeData}) {
    if (!data?.settlement) return null;
    
    const { settlement } = data;
    return (
        <div>
            {settlement.connections[0] && <Handle type="source" position={Position.Top} id='top' />}
            {settlement.connections[1] && <Handle type="source" position={Position.Bottom} id='bottom' />}
            {settlement.connections[2] && <Handle type="source" position={Position.Left} id='left' />}
            {settlement.connections[3] && <Handle type="source" position={Position.Right} id='right' />}
            <h1>{settlement.visible_name}</h1>
        </div>
    )
}
