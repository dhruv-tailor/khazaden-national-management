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
import { Panel } from "primereact/panel";
import DisplayGoods from "../../components/goodsDislay";
import ClanInfo from "./ClanInfo";
import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import NaturalResources from "./NaturalResources";
import { addGoods, goodsdist } from "../../Goods/GoodsDist";
import BureaucracyBonus from "./Bureaucracy/BureaucracyBonus";

export default function SettlementDetailed() {
    const gameId = useParams().game
    const settlementId = useParams().settlement

    let navigate = useNavigate();

    const [settlement, setSettlement] = useState<SettlementInterface>({...empty_settlement});
    const [rename,setRename] = useState<boolean>(false)
    const [newName,setNewName] = useState<string>('')

    const getSettlement = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        const current_settlement = settlements?.find(settlement => settlement.name === settlementId)
        if(current_settlement) {setSettlement(current_settlement)}
        setNewName(settlement.visible_name)
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements') ?? [];
        const updatedSettlements = settlements?.map(s => {
            if (s.name === settlement.name) {return({...settlement})}
            return {...s}
        })
        store.set('settlements',updatedSettlements)
        store.save()
        console.log('saved')
    }

    useEffect(()=>{getSettlement()},[])

    const goBack = async () => {
        await saveData()
        navigate(`/game/${gameId}`)
    }

    const upgradeSettlement = () => {
        const cost = (settlement.tier ** 2) * 4000
        settlement.tier += 1
        settlement.stock.money -= cost
        settlement.production_cap = {
            money: -1,
            food: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].food_and_water_balancing),
            beer: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].beer_balancing),
            leather: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].leather_and_textiles_balancing),
            artisinal: -1,
            livestock: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].livestock_balancing),
            ornamental: -1,
            enchanted: -1,
            timber: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].timber_balancing),
            tools: -1,
            common_ores: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].common_ores_balancing),
            medical: -1,
            rare_ores: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].rare_ores_balancing),
            gems: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].gems_balancing),
            runes: -1,
            arms: -1,
            books: -1,
            enchanted_arms: -1,
            charcoal: Math.round(tierModifier(settlement.tier) * TerrainData[settlement.terrain_type].enchanted_charcoal_balancing)
        }
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
            artisinal: 0,
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

    return(
        <div className="flex flex-column gap-2">
            <Button label="Back to All Settlements" icon="pi pi-arrow-left" size="small" onClick={goBack}/>
            
            {/* Settlement Name */}
            <div className="flex flex-row gap-2">
                <h1>{settlement.visible_name}</h1>
                <Button size="small" icon='pi pi-pencil' rounded text onClick={() => setRename(true)}/>
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
            
            {/* Upgrade Settlement Button */}
            {(settlement.tier < SettlementTier.Metropolis) && (settlement.stock.money >= ((settlement.tier ** 2) * 4000)) ?
            <Button severity="success" icon="pi pi-angle-double-up" onClick={upgradeSettlement}>
                <div className="flex flex-row gap-2">
                    Upgrade Settlement
                    <MoneyIconTT/>
                    {(settlement.tier ** 2) * 4000}
                </div>
            </Button>:null}
            
            <div className="flex flex-row gap-1">
                {/* Show Reserve */}
                <Panel header="Settlement Reserve">
                    {settlement.name !== '' ? 
                    <DisplayGoods stock={settlement.stock} change={settlementChange(settlement)}/>:null}
                </Panel>
                {/* Natural Resources Available */}
                <Panel header="Natural Resources">
                    <NaturalResources resources={settlement.production_cap}/>
                </Panel>
            </div>

            {/* Bureaucracy Bonus */}
            <Panel header='Bureaucracy Bonus' toggleable>
                <BureaucracyBonus settlement={settlement}/>
            </Panel>
            
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
        </div>
    )
}