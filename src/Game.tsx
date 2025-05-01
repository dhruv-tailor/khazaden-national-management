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
import { empty_map_info, UncolonziedInterface } from "./Map/MapInfoInterface";
import { MapInfoInterface } from "./Map/MapInfoInterface";
import { TerrainType } from "./Settlement/SettlementInterface/TerrainInterface";
import { AllianceStatus, ForeignPowerInterface, ForeignRecognition, getForeignPower } from "./ForeignPowers/Interface/ForeignPowerInterface";
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
    const [confirmDiscoveryVisable,setConfirmDiscoveryVisable] = useState<boolean>(false)

    // New Settlement Screen
    const [newSettlementVisable,setNewSettlementVisable] = useState<boolean>(false);

    const [currentMonth,setCurrentMonth] = useState<number>(0)
    const [currentYear,setCurrentYear] = useState<number>(0)

    const [map_info,setMapInfo] = useState<MapInfoInterface>({...empty_map_info})
    const [undiscovered_foreign_powers,setUndiscoveredForeignPowers] = useState<string[]>([])
    const [foreign_spawn_rate,setForeignSpawnRate] = useState<number>(0.48)

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
        s.name = `settlement${federal.settlements.length + 1}`
        setFederal({...federal,settlements: [...federal.settlements,s]})
        setFederal({...federal,prices: calcPriceGoods(federal.prices,federal.reserve,s.stock)})
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
            terrain = map_info.uncolonzied.find(u => u.id === from.nodeid)?.terrain ?? TerrainType.Mountain
        }
        // 50% chance that terrain is changed to a different terrain
        if(Math.random() < 0.5){
            const terrain_count = Object.values(TerrainType).filter(value => typeof value === 'number') as number[]
            const randVal = () => terrain_count[Math.floor(Math.random() * terrain_count.length)]
            terrain = randVal() as TerrainType
        }

        // Generate a new uncolonized node
        const new_uncolonized: UncolonziedInterface = {
            id: `u${global_id}`,
            terrain: terrain,
            connections: [
                from.handleid === 'bottom' ? true : Math.random() < 0.5 ? true : false,
                from.handleid === 'top' ? true : Math.random() < 0.5 ? true : false,
                from.handleid === 'right' ? true : Math.random() < 0.5 ? true : false,
                from.handleid === 'left' ? true : Math.random() < 0.5 ? true : false
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
            uncolonzied: [...map_info.uncolonzied, new_uncolonized]
        })
        setGlobalID(global_id + 1)
        

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
                            data: {uncolonized: map_info.uncolonzied.find(u => u.id === node.id)},
                            position: {x: node.position.x, y: node.position.y},
                            draggable: true
                        }
                    }
                    return {id: 'error', data: {label: 'Error'}, position: {x: 0, y: 0}}
                })} edges={map_info.edges}
                updateNodePositions={updateNodePositions}
                createUncolonizedNode={confirmDiscovery}
                 />
            )}

            {/* New Settlement Button */}
            {federal.reserve.money >= ((federal.settlements.length ** 2) * 4500) && (
                <Card>
                    <Button 
                        icon="pi pi-plus" 
                        onClick={() => {
                            setFederal({
                                ...federal,
                                reserve: {
                                    ...federal.reserve,
                                    money: federal.reserve.money - ((federal.settlements.length ** 2) * 4500)
                                }
                            })
                            setNewSettlementVisable(true)
                        }}
                        className="w-full"
                        severity="info"
                    >
                        <div className="flex flex-row align-items-center justify-content-center gap-2">
                            New Settlement
                            <MoneyIconTT/>
                            <span className="font-bold">{(federal.settlements.length ** 2) * 4500}</span>
                        </div>
                    </Button>
                </Card>
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
                closable={false}
                visible={newSettlementVisable}
                onHide={() => setNewSettlementVisable(false)}
                className="w-30rem"
            >
                <NewSettlement 
                    max_resources={federal.reserve} 
                    updateFunc={createSettlement}
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
        </div>
    )
}