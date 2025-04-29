import { Handle, Position } from "@xyflow/react";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";

type ForeignNodeData = {
    foreign: ForeignPowerInterface;
};

export default function ForeignNode({data}: {data: ForeignNodeData}) {
    if (!data?.foreign) return null;
    const { foreign } = data;
    return (
        <div>
            {foreign.connections[0] && <Handle type="target" position={Position.Top} id='top' />}
            {foreign.connections[1] && <Handle type="target" position={Position.Bottom} id='bottom' />}
            {foreign.connections[2] && <Handle type="target" position={Position.Left} id='left' />}
            {foreign.connections[3] && <Handle type="target" position={Position.Right} id='right' />}
            <h1>{foreign.name}</h1>
        </div>
    )
}
