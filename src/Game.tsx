import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { SettlementInterface } from "./Settlement/SettlementInterface/SettlementInterface";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";
import { addGoods, empty_goodsdist, goodsdist, roundGoods, subtractGoods } from "./Goods/GoodsDist";
import DisplayGoods from "./components/goodsDislay";
import Settlement from "./Settlement/Settlement";
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
import { empty_map_info } from "./Map/MapInfoInterface";
import { MapInfoInterface } from "./Map/MapInfoInterface";
export interface FederalChangeProps {
    settlements: SettlementInterface[],
    loans: LoanInterface[],
    armies: ArmyInterface[],
    tradeDeals: TradeDealInterface[]
}
export default function Game() {
    const gameId = useParams().game
    let navigate = useNavigate();

    // Federal Goods
    const [changeGoods,setChangeGoods] = useState<goodsdist>({...empty_goodsdist});
    const [federal,setFederal] = useState<FederalInterface>({...empty_federal_interface})

    // Stimulus
    const [whoToGive,setWhoToGive] = useState<string>('');
    const [giveGoodsVisable,setGiveGoodsVisable] = useState<boolean>(false)

    // New Settlement Screen
    const [newSettlementVisable,setNewSettlementVisable] = useState<boolean>(false);

    const [currentMonth,setCurrentMonth] = useState<number>(0)
    const [currentYear,setCurrentYear] = useState<number>(0)

    const [map_info,setMapInfo] = useState<MapInfoInterface>({...empty_map_info})
    
    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        await Promise.all([
            store.get<FederalInterface>('Federal').then(value => {if (value) {setFederal(value)}}),
            store.get<number>('Current Month').then(value => {if (value) {setCurrentMonth(value)}}),
            store.get<number>('Current Year').then(value => {if (value) {setCurrentYear(value)}}),
            store.get<MapInfoInterface>('Map Info').then(value => {if (value) {setMapInfo(value)}}),
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

    const goToForeignPowers = async () => {
        await saveData()
        navigate(`foreignpowers`)
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
    
    return (
        <div className="flex flex-column gap-3 p-3">
            {/* Header Section */}
            <div className="flex flex-column gap-2">
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
                        severity="secondary" 
                        label='Foreign Powers' 
                        icon='pi pi-flag-fill' 
                        onClick={goToForeignPowers}
                    />
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
            <Card className="sticky top-0 z-5 bg-black shadow-2">
                <div className="flex flex-column gap-3">
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

            {/* Settlements Section */}
            {/* <div className="grid">
                {federal.settlements.map(s => (
                    <div key={s.name} className="col-12 md:col-6 lg:col-4">
                        <Settlement 
                            settlement={s} 
                            stimulus={giveGoods}
                            updateTaxation={updateTaxation}
                            updateMerchantTax={setMerchantTax}
                            goTo={navigateSettlement}
                            federal_reserve={federal.reserve}
                            FederalProps={federal}
                        />
                    </div>
                ))}
            </div> */}
            {map_info.nodes.length > 0 && (
                <WorldMap nodes={map_info.nodes.map(node => {
                    if(node.id.startsWith('s')){
                    return {
                        id: node.id,
                        type: 'settlement',
                        data: {settlement: federal.settlements.find(s => s.global_id === node.id)},
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
                    return {id: 'error', data: {label: 'Error'}, position: {x: 0, y: 0}}
                })} edges={map_info.edges}
                updateNodePositions={updateNodePositions}
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
        </div>
    )
}