import {ReactFlow, Background, type Node,type Edge, OnNodeDrag} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SettlementNode from './Nodes/SettlementNode';
import ForeignNode from './Nodes/ForeignNode';

const nodeTypes = {
    settlement: SettlementNode,
    foreign: ForeignNode,
}

export default function WorldMap({nodes,edges,updateNodePositions}: {nodes: Node[],edges: Edge[],updateNodePositions: (nodes:{id: string, position: {x: number, y: number}}[]) => void}) {


    const onNodeDrag:OnNodeDrag = (_,node) => {
        const new_nodes = nodes.map(n => n.id === node.id ? node : n)
        updateNodePositions(new_nodes.map(n => ({id: n.id, position: n.position})));
    }

    return (
        <div style={{ width: '100%', height: '64vh' }}>
            <ReactFlow
             nodes={nodes} 
             edges={edges} 
             nodeTypes={nodeTypes}
             onNodeDrag={onNodeDrag}
             >
                <Background />
            </ReactFlow>
        </div>
    )
}
