import {ReactFlow, Background, type Node, type Edge, useNodesState} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SettlementNode from './Nodes/SettlementNode';
import ForeignNode from './Nodes/ForeignNode';
import { useCallback, useEffect } from 'react';
import UncolonizedNode from './Nodes/UncolonizedNode';
const nodeTypes = {
    settlement: SettlementNode,
    foreign: ForeignNode,
    uncolonized: UncolonizedNode,
}

export default function WorldMap(
    {nodes,edges,updateNodePositions,createUncolonizedNode}: 
    {
        nodes: Node[],
        edges: Edge[],
        updateNodePositions: (nodes:{id: string, position: {x: number, y: number}}[]) => void,
        createUncolonizedNode: (from: { nodeid: string; handleid: string; }) => void
    }
        
    ) {

    const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(nodes);

    // Update flow nodes when props change
    useEffect(() => {
        setFlowNodes(nodes);
    }, [nodes, setFlowNodes]);

    // Handle node position updates during drag
    const onNodeDrag = useCallback((_event: React.MouseEvent, node: Node) => {
        setFlowNodes((nds) => 
            nds.map((n) => {
                if (n.id === node.id) {
                    return {
                        ...n,
                        position: node.position,
                    };
                }
                return n;
            })
        );
    }, [setFlowNodes]);

    // Handle node position updates when drag stops
    const onNodeDragStop = useCallback(() => {
        updateNodePositions(flowNodes.map(n => ({id: n.id, position: n.position})));
    }, [flowNodes, updateNodePositions]);


    const onConnectEnd = useCallback((_event: MouseEvent | TouchEvent, params: any) => {
        // Make sure that it's not connected to anything
        console.log(params)
        if (params.toNode === null) {
            createUncolonizedNode({ nodeid: params.fromNode.id, handleid: params.fromHandle.id})
        }
    }, []);

    return (
        <div style={{ width: '100%', height: '72vh' }}>
            <ReactFlow
                nodes={flowNodes} 
                edges={edges} 
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onNodeDrag={onNodeDrag}
                onNodeDragStop={onNodeDragStop}
                onConnectEnd={onConnectEnd}
                fitView
            >
                <Background />
            </ReactFlow>
        </div>
    )
}
