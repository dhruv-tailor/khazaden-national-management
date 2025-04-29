import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../../utilities/SaveData";
import { empty_settlement, settlementChange, SettlementInterface, SettlementTier, tierModifier } from "../SettlementInterface/SettlementInterface";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import { TerrainData } from "../SettlementInterface/TerrainInterface";
import { Card } from "primereact/card";
import DisplayGoods from "../../components/goodsDislay";
import ClanInfo from "./ClanInfo";
import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import NaturalResources from "./NaturalResources";
import { addGoods, goodsdist, roundGoods } from "../../Goods/GoodsDist";
import BureaucracyBonus from "./Bureaucracy/BureaucracyBonus";
import PopConversion from "./PopConversion";
import { FederalInterface } from "../../utilities/FederalInterface";
import { empty_federal_interface } from "../../utilities/FederalInterface";

export default function SettlementDetailed() {
    const gameId = useParams().game
    const settlementId = useParams().settlement

    let navigate = useNavigate();

    const [settlement, setSettlement] = useState<SettlementInterface>({...empty_settlement});
    const [rename,setRename] = useState<boolean>(false)
    const [newName,setNewName] = useState<string>('')
    const [showPopConversion,setShowPopConversion] = useState<boolean>(false)

    const getSettlement = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const federal = await store.get<FederalInterface>('Federal') ?? {...empty_federal_interface};
        const current_settlement = federal.settlements?.find(settlement => settlement.name === settlementId)
        if(current_settlement) {setSettlement(current_settlement)}
        setNewName(settlement.visible_name)
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const federal = await store.get<FederalInterface>('Federal') ?? {...empty_federal_interface};
        const updatedSettlements = federal.settlements?.map(s => {
            if (s.name === settlement.name) {return({...settlement})}
            return {...s}
        })
        store.set('Federal',{...federal,settlements: updatedSettlements})
        store.save()
    }

    useEffect(()=>{getSettlement()},[])

    const goBack = async () => {
        await saveData()
        navigate(`/game/${gameId}`)
    }

    const upgradeSettlement = () => {
        const cost = (settlement.tier ** 2) * 4000
        setSettlement({
            ...settlement,
            tier: settlement.tier + 1,
            stock : {
                ...settlement.stock,
                money: settlement.stock.money - cost
            },
            pop_cap:Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].reference_pop_cap),
            production_cap: {
                money: -1,
                food: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].food_and_water_balancing),
                beer: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].beer_balancing),
                leather: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].leather_and_textiles_balancing),
                artisanal: -1,
                livestock: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].livestock_balancing),
                ornamental: -1,
                enchanted: -1,
                timber: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].timber_balancing),
                tools: -1,
                common_ores: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].common_ores_balancing),
                medical: -1,
                rare_ores: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].rare_ores_balancing),
                gems: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].gems_balancing),
                runes: -1,
                arms: -1,
                books: -1,
                enchanted_arms: -1,
                charcoal: Math.round(tierModifier(settlement.tier + 1) * TerrainData[settlement.terrain_type].enchanted_charcoal_balancing)
            }
        })
    }

    const updateTax = (id: clanTypes, newRate: number) => {
        const s = settlement.clans.map(clan => {
            if(clan.id === id) {return {...clan,tax_rate: newRate}}
            return {...clan}
        })
        setSettlement({...settlement,clans: s})
    }

    const updateGoods = (id: clanTypes, goods: goodsdist) => {
        const clans = settlement.clans.map(clan => {
            if(clan.id === id) {return {...clan,production: addGoods(clan.production,goods)}}
            return {...clan}
        })
        const delta_prod_cap = {
            money: 0,
            food: -goods.food,
            beer: -goods.beer,
            leather: -goods.leather,
            artisanal: 0,
            livestock: -goods.livestock,
            ornamental: 0,
            enchanted: 0,
            timber: -goods.timber,
            tools: 0,
            common_ores: -goods.common_ores,
            medical: 0,
            rare_ores: -goods.rare_ores,
            gems: -goods.gems,
            runes: 0,
            arms: 0,
            books: 0,
            enchanted_arms: 0,
            charcoal: -goods.charcoal
        }
        setSettlement({...settlement,clans: clans,production_cap: addGoods(settlement.production_cap,delta_prod_cap)})
    }

    const updateDevelopment = (id: clanTypes, amount: number) => {
        const clans = settlement.clans.map(clan => {
            if(clan.id === id) {return {...clan,development: clan.development + (amount/4)}}
            return{...clan}
        })
        setSettlement(
            {
                ...settlement,
                clans: clans,
                stock: {
                    ...settlement.stock,
                    money: settlement.stock.money - amount
                }
            }
        )
    }

    const setBonus = (id: clanTypes, type: string) => {
        if(type === 'development') {setSettlement({...settlement,development_growth_bonus: id})}
        else if(type === 'efficency') {setSettlement({...settlement,efficency_bonus: id})}
        else if(type === 'loyalty') {setSettlement({...settlement,loyalty_bonus: id})}
        else if(type === 'corvee') {setSettlement({...settlement,corvee_bonus: id})}
        else if(type === 'population') {setSettlement({...settlement,population_growth_bonus: id})}
    }

    const goToEconomy = async () => {
        await saveData()
        navigate(`economy`)
    }

    const convertPops = (sourceClan: string, targetClan: string, amount: number, cost: number) => {
        setShowPopConversion(false)
        const clans = settlement.clans.map(clan => {
            if(clan.name === sourceClan) {return {...clan,population: clan.population - amount}}
            else if(clan.name === targetClan) {return {...clan,population: clan.population + amount}}
            return {...clan}
        })
        setSettlement({...settlement,
            clans: clans,
            stock: {
                ...settlement.stock,
                money: settlement.stock.money - cost
            }
        })
    }

    const goToMilitary = async () => {
        await saveData()
        navigate(`military`)
    }

    return(
        <div className="flex flex-column gap-2">
            <div className="flex flex-row justify-content-between align-items-center">
                <Button label="Back to All Settlements" icon="pi pi-arrow-left" size="small" onClick={goBack}/>
                <div className="flex flex-row align-items-center gap-2">
                    <h1 className="m-0">{settlement.visible_name}</h1>
                    <Button size="small" icon='pi pi-pencil' rounded text onClick={() => setRename(true)}/>
                </div>
            </div>
            
            {/* Upgrade Settlement Button */}
            {(settlement.tier < SettlementTier.Metropolis) && (settlement.stock.money >= ((settlement.tier ** 2) * 4000)) ?
            <Button severity="success" icon="pi pi-angle-double-up" onClick={upgradeSettlement}>
                <div className="flex flex-row gap-2">
                    Upgrade Settlement
                    <MoneyIconTT/>
                    {(settlement.tier ** 2) * 4000}
                </div>
            </Button>:null}

            {/* Buttons to go to Economy and Military */}
            <div className="flex flex-row gap-1">
                <Button className='flex-grow-1' severity="warning" label='Economy' icon='pi pi-wallet' onClick={goToEconomy}/>
                <Button className='flex-grow-1' severity="danger" label='Army' icon='pi pi-users' onClick={goToMilitary}/>
            </div>
            
            <div className="flex flex-row gap-1 sticky top-0 z-5 bg-black shadow-2">
                {/* Show Reserve */}
                <Card title="Settlement Reserve" className="flex-grow-1">
                    {settlement.name !== '' ? 
                    <DisplayGoods stock={roundGoods(settlement.stock)} change={roundGoods(settlementChange(settlement))}/>:null}
                </Card>
                {/* Natural Resources Available */}
                <Card title="Natural Resources" className="flex-grow-1">
                    <NaturalResources resources={settlement.production_cap}/>
                </Card>
            </div>

            {/* Bureaucracy */}
            <Card title="Bureaucracy">
                <div className="flex flex-row gap-2 flex-wrap">
                    {/* Pop Conversion Button */}
                    <Button size="small" label='Convert Pops' icon='pi pi-users' onClick={() => setShowPopConversion(true)}/>
                    <Dialog header="Convert Pops" visible={showPopConversion} onHide={() => setShowPopConversion(false)}>
                        <PopConversion clans={settlement.clans} updateFunc={convertPops}/>
                    </Dialog>
                    {/* Bureaucracy Bonus */}
                    <BureaucracyBonus settlement={settlement} updateFunc={setBonus}/>
                </div>
            </Card>
            
            {/* Show Clans */}
            <div className="flex flex-row gap-2 flex-wrap">
                {settlement.clans.map(clan => {
                    if (clan.population > 0) {
                        return <ClanInfo 
                            clan={clan}
                            updateTax={updateTax}
                            natCap={settlement.production_cap}
                            updateGoods={updateGoods}
                            settlmentFunds={settlement.stock.money}
                            updateDevelopment={updateDevelopment}
                        />
                    }
                    return <></>
                })}
            </div>

            <Dialog header="Rename Settlement" visible={rename} closable={false} onHide={() => setRename(false)}>
                <div className="p-inputgroup flex-1">
                    <InputText value={newName} onChange={e => setNewName(e.target.value)}/>
                    <Button className="p-button-success" icon="pi pi-check" onClick={() => {
                        settlement.visible_name = newName
                        setRename(false)
                    }}/>
                </div>
            </Dialog>
        </div>
    )
}