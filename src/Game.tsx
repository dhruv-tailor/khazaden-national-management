import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { SettlementInterface } from "./Settlement/SettlementInterface/SettlementInterface";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";
import { addGoods, empty_goodsdist, goodsdist, roundGoods, subtractGoods } from "./Goods/GoodsDist";
import DisplayGoods from "./components/goodsDislay";
import { Dialog } from "primereact/dialog";
import ResourceDistribuition from "./components/ResourceDistribution";
import { Button } from "primereact/button";
import MoneyIconTT from "./tooltips/goods/MoneyIconTT";
import NewSettlement from "./Settlement/NewSettlement";
import { calcPriceGoods } from "./Economics/pricing/prices";
import { NextTurn } from "./utilities/NextTurn";
import { FederalChange } from "./utilities/SimpleFunctions";
import { LoanInterface } from "./Economics/loans/loanInterface";
import { MonthInfo } from "./components/MonthInfo";
import { Card } from "primereact/card";
import { ArmyInterface } from "./Military/Army/Army";
import { TradeDealInterface } from "./Economics/Trade/interface/TradeDealInterface";
import { FederalInterface } from "./utilities/FederalInterface";
import { empty_federal_interface } from "./utilities/FederalInterface";
import WorldMap from "./Map/WorldMap";
import { empty_map_info, colonizedInterface } from "./Map/MapInfoInterface";
import { MapInfoInterface } from "./Map/MapInfoInterface";
import { TerrainType } from "./Settlement/SettlementInterface/TerrainInterface";
import { AllianceStatus, ForeignPowerInterface, ForeignRecognition, getForeignPower } from "./ForeignPowers/Interface/ForeignPowerInterface";
import { PriorityQueue } from "./utilities/PriorityQueue";
export interface FederalChangeProps {
    settlements: SettlementInterface[],
    loans: LoanInterface[],
    armies: ArmyInterface[],
    tradeDeals: TradeDealInterface[]
}
export default function Game() {
    const gameId = useParams().game
    let navigate = useNavigate();

    const [global_id,setGlobalID] = useState<number>(0)

    // Federal Goods
    const [changeGoods,setChangeGoods] = useState<goodsdist>({...empty_goodsdist});
    const [federal,setFederal] = useState<FederalInterface>({...empty_federal_interface})

    // Stimulus
    const [whoToGive,setWhoToGive] = useState<string>('');
    const [giveGoodsVisable,setGiveGoodsVisable] = useState<boolean>(false)

    // Uncolonized
    const [fromNode,setFromNode] = useState<{nodeid: string, handleid: string} | null>(null)
    const [toNode,setToNode] = useState<{nodeid: string, handleid: string} | null>(null)
    const [confirmDiscoveryVisable,setConfirmDiscoveryVisable] = useState<boolean>(false)
    const [buildRoadVisable,setBuildRoadVisable] = useState<boolean>(false)

    // New Settlement Screen
    const [newSettlementVisable,setNewSettlementVisable] = useState<boolean>(false);

    const [currentMonth,setCurrentMonth] = useState<number>(0)
    const [currentYear,setCurrentYear] = useState<number>(0)

    const [map_info,setMapInfo] = useState<MapInfoInterface>({...empty_map_info})
    const [undiscovered_foreign_powers,setUndiscoveredForeignPowers] = useState<string[]>([])
    const [foreign_spawn_rate,setForeignSpawnRate] = useState<number>(0.48)
    const [connection_spawn_rate,setConnectionSpawnRate] = useState<number>(0.47)
    const [node_to_colonize,setNodeToColonize] = useState<{id: string, terrain: TerrainType} | null>(null)

    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        await Promise.all([
            store.get<FederalInterface>('Federal').then(value => {if (value) {setFederal(value)}}),
            store.get<number>('Current Month').then(value => {if (value) {setCurrentMonth(value)}}),
            store.get<number>('Current Year').then(value => {if (value) {setCurrentYear(value)}}),
            store.get<MapInfoInterface>('Map Info').then(value => {if (value) {setMapInfo(value)}}),
            store.get<number>('Global ID').then(value => {if (value) {setGlobalID(value)}}),
            store.get<string[]>('Undiscovered Foreign Powers').then(value => {if (value) {setUndiscoveredForeignPowers(value)}}),
            store.get<number>('Foreign Spawn Rate').then(value => {if (value) {setForeignSpawnRate(value)}}),
            store.get<number>('Connection Spawn Rate').then(value => {if (value) {setConnectionSpawnRate(value)}}),
        ])
        updateSettlements()
    }

    const updateSettlements = () => setChangeGoods({...FederalChange(federal)})


    const giveGoods = (name: string) => {
        setWhoToGive(name)
        setGiveGoodsVisable(true)
    }

    const stimulus = (dist: goodsdist) => {
        // Take from Frederal Reserve and give to settlment
        setFederal({...federal,reserve: subtractGoods(federal.reserve,dist)})
        setFederal({...federal,settlements: federal.settlements.map(s => {
            if (s.name !== whoToGive) {return s}
            return {...s, stock: addGoods(s.stock,dist)}
        })})
        setGiveGoodsVisable(false)
        setWhoToGive('')
    }

    const navigateSettlement = async (name: string) => {
        await saveData()
        navigate(`settlement/${name}`)
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.set('Map Info',map_info)
        store.set('Federal',federal)
        store.set('Global ID',global_id)
        store.set('Undiscovered Foreign Powers',undiscovered_foreign_powers)
        store.set('Foreign Spawn Rate',foreign_spawn_rate)
        store.save()
    }

    const createSettlement = (s: SettlementInterface) => {
        setNewSettlementVisable(false)
        const new_id = `s${global_id}`
        s.name = `settlement${federal.settlements.length + 1}`
        setFederal({
            ...federal,
            settlements: [...federal.settlements,{
                ...s,
                global_id: new_id,
                isSource: map_info.colonized.find(u => u.id === node_to_colonize?.id)?.isSource ?? [true, true, true, true],
                connections: map_info.colonized.find(u => u.id === node_to_colonize?.id)?.connections ?? [true, true, true, true]
            }],
            reserve: {
            ...federal.reserve,
            money: federal.reserve.money - ((federal.settlements.length ** 2) * 4500)
        }})
        setGlobalID(global_id + 1)
        setMapInfo({
            ...map_info,
            nodes: map_info.nodes.map(node => {
                if (node.id !== node_to_colonize?.id) {return node}
                return { id: new_id, position: node.position }
            }),
            edges: map_info.edges.map(edge => {
                if (edge.source === node_to_colonize?.id) {
                    return { ...edge, source: new_id }
                }
                else if (edge.target === node_to_colonize?.id) {
                    return {...edge, target: new_id }
                }
                return edge
            }),
            colonized: map_info.colonized.filter(u => u.id !== node_to_colonize?.id)
        })
        updateSettlements()
    }

    const processNextTurn = async () => {
        await saveData()
        await NextTurn(gameId ?? '')
        await getSettlements()
    }

    const goToEconomy = async () => {
        await saveData()
        navigate(`economy`)
    }

    const goToMilitary = async () => {
        await saveData()
        navigate(`military`)
    }

    const updateTaxation = (name: string, taxation: goodsdist) => {
        setFederal({...federal,settlements: federal.settlements.map(s => {
            if (s.name !== name) {return s}
            return {...s, taxation: taxation}
        })})
        setChangeGoods({...FederalChange(federal)})
    }

    const setMerchantTax = (name: string, merchant_tax: number) => {
        setFederal({...federal,settlements: federal.settlements.map(s => {
            if (s.name !== name) {return s}
            return {...s, merchant_tax: merchant_tax}
        })})
        setChangeGoods({...FederalChange(federal)})
    }


    useEffect(() => {getSettlements()},[])

    const updateNodePositions = (new_nodes:{id: string, position: {x: number, y: number}}[]) => {
        setMapInfo({...map_info, nodes: new_nodes})
    }

    const confirmDiscovery = (from: {nodeid: string, handleid: string}) => {
        setFromNode({...from})
        setConfirmDiscoveryVisable(true)
    }

    // When exploring a new node, there's a chance that a foreign power will spawn instead
    const spawnForeignPower = (from: {nodeid: string, handleid: string}) => {
        if (undiscovered_foreign_powers.length === 0) {
            createUncolonizedNode(from)
            return
        }
        const foreign_power = undiscovered_foreign_powers[Math.floor(Math.random() * undiscovered_foreign_powers.length)]
        setUndiscoveredForeignPowers(undiscovered_foreign_powers.filter(power => power !== foreign_power))
        const new_foreign_power: ForeignPowerInterface = {
            ...getForeignPower(foreign_power),
            recognition: ForeignRecognition.Limited,
            immigrationRate: 0.10,
            allianceStatus: AllianceStatus.Neutral,
            isEmbargoed: false,
            global_id: `f${global_id}`,
            connections: [
                from.handleid === 'bottom' ? true : Math.random() < 0.5 ? true : false,
                from.handleid === 'top' ? true : Math.random() < 0.5 ? true : false,
                from.handleid === 'right' ? true : Math.random() < 0.5 ? true : false,
                from.handleid === 'left' ? true : Math.random() < 0.5 ? true : false
            ] as [boolean, boolean, boolean, boolean],
            isSource: [false, false, false, false] as [boolean, boolean, boolean, boolean]
        }

        let targetHandle = 'bottom'
        let targetPosition = {
            x: map_info.nodes.find(n => n.id === from.nodeid)?.position.x ?? 0, 
            y: (map_info.nodes.find(n => n.id === from.nodeid)?.position.y ?? 0) - 300
        }
        if(from.handleid === 'bottom'){
            targetHandle = 'top'
            targetPosition = {
                x: map_info.nodes.find(n => n.id === from.nodeid)?.position.x ?? 0, 
                y: (map_info.nodes.find(n => n.id === from.nodeid)?.position.y ?? 0) + 300
            }
        }
        else if(from.handleid === 'right'){
            targetHandle = 'left'
            targetPosition = {
                x: (map_info.nodes.find(n => n.id === from.nodeid)?.position.x ?? 0) + 300, 
                y: map_info.nodes.find(n => n.id === from.nodeid)?.position.y ?? 0
            }
        }
        else if(from.handleid === 'left'){
            targetHandle = 'right'
            targetPosition = {
                x: (map_info.nodes.find(n => n.id === from.nodeid)?.position.x ?? 0) - 300, 
                y: map_info.nodes.find(n => n.id === from.nodeid)?.position.y ?? 0
            }
        }

        setFederal({
            ...federal,
            foreign_powers: [...federal.foreign_powers,{...new_foreign_power}]
        })
        setGlobalID(global_id + 1)
        setMapInfo({...map_info,
            nodes: [...map_info.nodes,{id: new_foreign_power.global_id, position: targetPosition}],
            edges: [...map_info.edges, {
                id: `${from.nodeid}-${new_foreign_power.global_id}`,
                source: from.nodeid,
                target: new_foreign_power.global_id,
                sourceHandle: from.handleid,
                targetHandle: targetHandle,
            }],
        })
    }

    // Create a new Uncolonized Node
    const createUncolonizedNode = ( from: {nodeid: string, handleid: string}) => {
        // Can't create a node if a connection from that handle already exists
        const existing_edge = map_info.edges.find(edge => {
            return edge.source === from.nodeid && edge.sourceHandle === from.handleid
        })
        if(existing_edge){ return }
        // Get Terrain from the existing node
        let terrain = TerrainType.Mountain
        if(from.nodeid.startsWith('s')){
            terrain = federal.settlements.find(s => s.global_id === from.nodeid)?.terrain_type ?? TerrainType.Mountain
        }
        else if(from.nodeid.startsWith('u')){
            terrain = map_info.colonized.find(u => u.id === from.nodeid)?.terrain ?? TerrainType.Mountain
        }
        // 50% chance that terrain is changed to a different terrain
        if(Math.random() < 0.5){
            const terrain_count = Object.values(TerrainType).filter(value => typeof value === 'number') as number[]
            const randVal = () => terrain_count[Math.floor(Math.random() * terrain_count.length)]
            terrain = randVal() as TerrainType
        }

        // Generate a new uncolonized node
        const new_uncolonized: colonizedInterface = {
            id: `u${global_id}`,
            terrain: terrain,
            connections: [
                from.handleid === 'bottom' ? true : Math.random() < connection_spawn_rate ? true : false,
                from.handleid === 'top' ? true : Math.random() < connection_spawn_rate ? true : false,
                from.handleid === 'right' ? true : Math.random() < connection_spawn_rate ? true : false,
                from.handleid === 'left' ? true : Math.random() < connection_spawn_rate ? true : false
            ],
            isSource: [
                from.handleid === 'bottom' ? false : true,
                from.handleid === 'top' ? false : true,
                from.handleid === 'right' ? false : true,
                from.handleid === 'left' ? false : true
            ]
        }
        let targetHandle = 'bottom'
        let targetPosition = {
            x: map_info.nodes.find(n => n.id === from.nodeid)?.position.x ?? 0, 
            y: (map_info.nodes.find(n => n.id === from.nodeid)?.position.y ?? 0) - 300
        }
        if(from.handleid === 'bottom'){
            targetHandle = 'top'
            targetPosition = {
                x: map_info.nodes.find(n => n.id === from.nodeid)?.position.x ?? 0, 
                y: (map_info.nodes.find(n => n.id === from.nodeid)?.position.y ?? 0) + 300
            }
        }
        else if(from.handleid === 'right'){
            targetHandle = 'left'
            targetPosition = {
                x: (map_info.nodes.find(n => n.id === from.nodeid)?.position.x ?? 0) + 300, 
                y: map_info.nodes.find(n => n.id === from.nodeid)?.position.y ?? 0
            }
        }
        else if(from.handleid === 'left'){
            targetHandle = 'right'
            targetPosition = {
                x: (map_info.nodes.find(n => n.id === from.nodeid)?.position.x ?? 0) - 300, 
                y: map_info.nodes.find(n => n.id === from.nodeid)?.position.y ?? 0
            }
        }

        setMapInfo({...map_info,
            nodes: [...map_info.nodes,{id: new_uncolonized.id, position: targetPosition}],
            edges: [...map_info.edges, {
                id: `${from.nodeid}-${new_uncolonized.id}`,
                source: from.nodeid,
                target: new_uncolonized.id,
                sourceHandle: from.handleid,
                targetHandle: targetHandle,
            }],
            colonized: [...map_info.colonized, new_uncolonized]
        })
        setGlobalID(global_id + 1)
        

    }

    const buildRoad = (from: {nodeid: string, handleid: string}, to: {nodeid: string, handleid: string}) => {
        setFromNode(from)
        setToNode(to)
        setBuildRoadVisable(true)
    }

    const generateRoad = (from: {nodeid: string, handleid: string}, to: {nodeid: string, handleid: string}) => {
        let federal_settlements = [...federal.settlements]
        let federal_foreign_powers = [...federal.foreign_powers]
        let colonized = [...map_info.colonized]

        if (from.nodeid.startsWith('s')) {
            federal_settlements = federal_settlements.map(s => {
                if (s.global_id !== from.nodeid) {return s}
                return {...s,
                    isSource: [
                        from.handleid === 'top' ? true : s.isSource[0],
                        from.handleid === 'bottom' ? true : s.isSource[1],
                        from.handleid === 'right' ? true : s.isSource[2],
                        from.handleid === 'left' ? true : s.isSource[3]
                    ]
                }
            })
        }
        else if (from.nodeid.startsWith('f')) {
            federal_foreign_powers = federal_foreign_powers.map(f => {
                if (f.global_id !== from.nodeid) {return f}
                return {
                    ...f,
                    isSource: [
                        from.handleid === 'top' ? true : f.isSource[0],
                        from.handleid === 'bottom' ? true : f.isSource[1],
                        from.handleid === 'right' ? true : f.isSource[2],
                        from.handleid === 'left' ? true : f.isSource[3]
                    ]
                }
            })
        }
        else if (from.nodeid.startsWith('u')) {
            colonized = colonized.map(u => {
                if (u.id !== from.nodeid) {return u}
                return {
                    ...u,
                    isSource: [
                        from.handleid === 'top' ? true : u.isSource[0],
                        from.handleid === 'bottom' ? true : u.isSource[1],
                        from.handleid === 'right' ? true : u.isSource[2],
                        from.handleid === 'left' ? true : u.isSource[3]
                    ]
                }
            })
        }

        if (to.nodeid.startsWith('s')) {
            federal_settlements = federal_settlements.map(s => {
                if (s.global_id !== to.nodeid) {return s}
                return {
                    ...s,
                    isSource: [
                        to.handleid === 'top' ? false : s.isSource[0],
                        to.handleid === 'bottom' ? false : s.isSource[1],
                        to.handleid === 'right' ? false : s.isSource[2],
                        to.handleid === 'left' ? false : s.isSource[3]
                    ]
                }
            })
        }
        else if (to.nodeid.startsWith('f')) {
            federal_foreign_powers = federal_foreign_powers.map(f => {
                if (f.global_id !== to.nodeid) {return f}
                return {
                    ...f,
                    isSource: [
                        to.handleid === 'top' ? false : f.isSource[0],
                        to.handleid === 'bottom' ? false : f.isSource[1],
                        to.handleid === 'right' ? false : f.isSource[2],
                        to.handleid === 'left' ? false : f.isSource[3]
                    ]
                }
            })
        }
        else if (to.nodeid.startsWith('u')) {
            colonized = colonized.map(u => {
                if (u.id !== to.nodeid) {return u}
                return {
                    ...u,
                    isSource: [
                        to.handleid === 'top' ? false : u.isSource[0],
                        to.handleid === 'bottom' ? false : u.isSource[1],
                        to.handleid === 'right' ? false : u.isSource[2],
                        to.handleid === 'left' ? false : u.isSource[3]
                    ]
                }
            })
        }

        setFederal({
            ...federal,
            reserve: {
                ...federal.reserve,
                money: federal.reserve.money - Math.round(Math.sqrt((distance(from.nodeid,to.nodeid) ** 2) / 2) * 1000)
            },
            settlements: federal_settlements,
            foreign_powers: federal_foreign_powers,
        })
        setMapInfo({...map_info,
            colonized: colonized,
            edges: [...map_info.edges,{
                id: `${from.nodeid}-${to.nodeid}`,
                source: from.nodeid,
                target: to.nodeid,
                sourceHandle: from.handleid,
                targetHandle: to.handleid
            }]
        })
    }

    const distance = (fromid: string, toid: string) => reconstructPath(dijkstraSearch(fromid,toid).came_from,fromid,toid).length - 1


    const dijkstraSearch = (fromid: string, toid: string) => {
        const frontier = new PriorityQueue<string>()
        frontier.put(fromid, 0)
        const came_from: {[key: string]: string | null} = {[fromid]: null}
        const cost_so_far: {[key: string]: number} = {[fromid]: 0}
        
        while(!frontier.empty()) {
            const current = frontier.get()
            if (current === toid) { break; }
            const connections = map_info.edges.filter(e => e.source === current || e.target === current).map(e => e.source === current ? e.target : e.source)
            connections.forEach(c => {
                const new_cost = cost_so_far[current] + 1 // As of now, the cost of movement is always 1
                if (cost_so_far[c] === undefined || cost_so_far[c] === null || new_cost < cost_so_far[c]) {
                    cost_so_far[c] = new_cost
                    const priority = new_cost
                    frontier.put(c,priority)
                    came_from[c] = current
                }
            })
        }
        return {came_from, cost_so_far}
    }

    const reconstructPath = (came_from: {[key: string]: string | null}, startid: string,toid: string) => {
        let current = toid
        const path: string[] = []
        // return empty array if no path is found
        if (came_from[current] === null) {return path}
        while(current !== startid) {
            path.push(current)
            current = came_from[current] ?? ''
        }
        path.push(startid)
        return path.reverse()
    }

    const colonizeNode = (id: string, terrain: TerrainType) => {
        setNodeToColonize({id: id, terrain: terrain})
        setNewSettlementVisable(true)
    }
    
    return (
        <div className="flex flex-column gap-1">
            {/* Header Section */}
            <div className="flex flex-column gap-1">
                <div className="flex flex-row align-items-center justify-content-between">
                    <h1 className="m-0">Game Management</h1>
                    <Button 
                        label={`${MonthInfo[currentMonth as keyof typeof MonthInfo].name} ${currentYear} | Next Turn`} 
                        size='small' 
                        icon='pi pi-angle-double-right' 
                        onClick={processNextTurn}
                        severity="success"
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <Button 
                        className='flex-grow-1' 
                        severity="warning" 
                        label='Economy' 
                        icon='pi pi-wallet' 
                        onClick={goToEconomy}
                    />
                    <Button 
                        className='flex-grow-1' 
                        severity="danger" 
                        label='Military' 
                        icon='pi pi-users' 
                        onClick={goToMilitary}
                    />
                </div>
            </div>

            {/* Federal Reserve Section */}
            <Card className="sticky top-0  z-5 bg-black shadow-2">
                <div className="flex flex-column">
                    <div className="flex flex-row justify-content-between align-items-center">
                        <h2 className="m-0">Federal Reserve</h2>
                        {federal.settlements.length > 0 && (
                            <DisplayGoods 
                                stock={roundGoods(federal.reserve)} 
                                change={{
                                    ...changeGoods,
                                    money: Math.round(federal.settlements.map(
                                        s => s.clans.map(
                                            c => Math.round(c.tax_rate * c.taxed_productivity * s.taxation.money)
                                        ).reduce((sum,val) => sum + val)
                                    ).reduce((sum,val) => sum + val))
                                }}
                            />
                        )}
                    </div>
                </div>
            </Card>

            {map_info.nodes.length > 0 && (
                <WorldMap nodes={map_info.nodes.map(node => {
                    if(node.id.startsWith('s')){
                    return {
                        id: node.id,
                        type: 'settlement',
                        data: {
                            settlement: federal.settlements.find(s => s.global_id === node.id),
                            goTo: navigateSettlement,
                            updateTaxation: updateTaxation,
                            setMerchantTax: setMerchantTax,
                            federal: federal,
                            stimulus: giveGoods
                        },
                        position: {x: node.position.x, y: node.position.y},
                        draggable: true
                    }
                    }
                    else if(node.id.startsWith('f')){
                        return {
                            id: node.id,
                            type: 'foreign',
                            data: {foreign: federal.foreign_powers.find(f => f.global_id === node.id)},
                            position: {x: node.position.x, y: node.position.y},
                            draggable: true
                        }
                    }
                    else if(node.id.startsWith('u')){
                        return {
                            id: node.id,
                            type: 'uncolonized',
                            data: {
                                uncolonized: map_info.colonized.find(u => u.id === node.id),
                                colonizeNode: colonizeNode
                            },
                            position: {x: node.position.x, y: node.position.y},
                            draggable: true
                        }
                    }
                    return {id: 'error', data: {label: 'Error'}, position: {x: 0, y: 0}}
                    })} 
                    edges={map_info.edges}
                    updateNodePositions={updateNodePositions}
                    createUncolonizedNode={confirmDiscovery}
                    buildRoad={buildRoad}
                />
            )}

            {/* Stimulus Dialog */}
            <Dialog 
                header="Stimulus" 
                visible={giveGoodsVisable} 
                onHide={() => {
                    setGiveGoodsVisable(false)
                    setWhoToGive('')
                }}
                className="w-30rem"
            >
                <ResourceDistribuition 
                    goods_cap={federal.reserve} 
                    updateFunc={stimulus}
                />
            </Dialog>

            {/* New Settlement Dialog */}
            <Dialog
                header="New Settlement"
                visible={newSettlementVisable}
                onHide={() => setNewSettlementVisable(false)}
                className="w-30rem"
            >
                <NewSettlement 
                    max_resources={federal.reserve} 
                    updateFunc={createSettlement}
                    terrain={node_to_colonize?.terrain ?? TerrainType.Mountain}
                    cost={((federal.settlements.length ** 2) * 4500)}
                />
            </Dialog>

            <Dialog
                header="Confirm Exploration"
                visible={confirmDiscoveryVisable}
                onHide={() => setConfirmDiscoveryVisable(false)}
                className="w-30rem"
            >
                <div className="flex flex-column gap-3">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-map text-xl"></i>
                        <span>Explore this territory?</span>
                    </div>
                    
                    <div className="flex align-items-center gap-2">
                        <MoneyIconTT/>
                        <span>{(1 + ((map_info.nodes.length - 2)/10)) * 1000}</span>
                    </div>

                    <div className="flex justify-content-end gap-2 mt-3">
                        <Button 
                            label="Cancel" 
                            icon="pi pi-times" 
                            onClick={() => {
                                setConfirmDiscoveryVisable(false)
                                setFromNode(null)
                            }}
                            className="p-button-text"
                        />
                        <Button 
                            //disabled={federal.reserve.money < ((1 + ((map_info.nodes.length - 2)/10)) * 1000)}
                            label="Explore" 
                            icon="pi pi-check" 
                            onClick={() => {
                                setFederal({
                                    ...federal,
                                    reserve: {
                                        ...federal.reserve, 
                                        money: federal.reserve.money - ((1 + ((map_info.nodes.length - 2)/10)) * 1000)
                                    }
                                })
                                setConfirmDiscoveryVisable(false);
                                if (fromNode) {
                                    if(Math.random() > foreign_spawn_rate){ createUncolonizedNode(fromNode);}
                                    else{spawnForeignPower(fromNode);}
                                }
                                setFromNode(null);
                            }}
                            severity="success"
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Build Road"
                visible={buildRoadVisable}
                onHide={() => setBuildRoadVisable(false)}
                className="w-30rem"
            >
                <div className="flex flex-column gap-3">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-map text-xl"></i>
                        <span>Build a road between these territories?</span>
                    </div>
                    
                    <div className="flex align-items-center gap-2">
                        <MoneyIconTT/>
                        <span>{fromNode && toNode ? Math.round(Math.sqrt((distance(fromNode.nodeid,toNode.nodeid) ** 2) / 2) * 1000) : 0}</span>
                    </div>

                    <div className="flex justify-content-end gap-2 mt-3">
                        <Button 
                            label="Cancel" 
                            icon="pi pi-times" 
                            onClick={() => {
                                setBuildRoadVisable(false)
                                setFromNode(null)
                                setToNode(null)
                            }}
                            className="p-button-text"
                        />
                        <Button 
                            // disabled={federal.reserve.money < ((1 + ((map_info.edges.length - 2)/10)) * 1000)}
                            label="Build Road" 
                            icon="pi pi-check" 
                            onClick={() => {
                                if (fromNode && toNode) {
                                    generateRoad(fromNode, toNode);
                                }
                                setBuildRoadVisable(false);
                                setFromNode(null);
                                setToNode(null);
                            }}
                            severity="success"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}