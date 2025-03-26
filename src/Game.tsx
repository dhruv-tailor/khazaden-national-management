import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { SettlementInterface } from "./Settlement/SettlementInterface/SettlementInterface";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";
import { addGoods, empty_goodsdist, goodsdist, roundGoods, scaleGoods, subtractGoods } from "./Goods/GoodsDist";
import { Panel } from "primereact/panel";
import DisplayGoods from "./components/goodsDislay";
import Settlement from "./Settlement/Settlement";
import { Dialog } from "primereact/dialog";
import ResourceDistribuition from "./components/ResourceDistribution";
import { Button } from "primereact/button";
import MoneyIconTT from "./tooltips/goods/MoneyIconTT";

export default function Game() {
    const gameId = useParams().game
    let navigate = useNavigate();

    const [settlements,setSettlements] = useState<SettlementInterface[]>([])

    // Federal Goods
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [changeGoods,setChangeGoods] = useState<goodsdist>(empty_goodsdist);

    // Stimulus
    const [whoToGive,setWhoToGive] = useState<string>('');
    const [giveGoodsVisable,setGiveGoodsVisable] = useState<boolean>(false)
    
    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        const get_settlements = await store.get<SettlementInterface[]>('settlements') ?? [];
        setSettlements(get_settlements)
        updateSettlements()
    }
    
    const updateSettlements = () => {
        const change_reserve = settlements.map(settlement => {
            return settlement.clans.map(
                clan => roundGoods(scaleGoods(clan.production,settlement.production_quota))
            ).reduce((sum,val) => addGoods(sum,val))
        }).reduce((sum,val) => addGoods(sum,val))

        change_reserve.money = Math.round(settlements.map(settlement => {
            return settlement.clans.map(
                clan => clan.tax_rate * clan.taxed_productivity
            ).reduce((sum,val) => sum + val) * settlement.settlement_tax
         }).reduce((sum,val) => sum + val))

         setChangeGoods(change_reserve)
    }

    const setSettlementTax = (name: string, val: number) => {
        setSettlements(settlements.map(s => {
            if (s.name !== name) {return s}
            return {...s,settlement_tax: val}
        }))
    }

    const setSettlementQuota = (name: string, val: number) => {
        setSettlements(settlements.map(s => {
            if (s.name !== name) {return s}
            return {...s,production_quota: val}
        }))
    }

    const giveGoods = (name: string) => {
        setWhoToGive(name)
        setGiveGoodsVisable(true)
    }

    const stimulus = (dist: goodsdist) => {
        // Take from Frederal Reserve and give to settlment
        setReserveGoods(subtractGoods(reserveGoods,dist))
        setSettlements(settlements.map(s => {
            if (s.name !== whoToGive) {return s}
            return {...s, stock: addGoods(s.stock,dist)}
        }))
        setGiveGoodsVisable(false)
        setWhoToGive('')
    }

    const navigateSettlement = (name: string) => {
        saveData()
        navigate(`settlement/${name}`)
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.set('settlements',settlements)
        store.set('Federal Reserve',reserveGoods)
        store.save()
    }

    useEffect(() => {
        getSettlements()
    },[])
    
    return(
    <div className="flex flex-column gap-2">
        <Panel header="Federal Reserve" toggleable>
            {settlements.length > 0 ? <DisplayGoods 
                stock={reserveGoods} 
                change={{...changeGoods,money: 
                settlements.map(
                    s => s.clans.map(
                        c => Math.round(c.tax_rate * c.taxed_productivity * s.settlement_tax)
                        ).reduce((sum,val) => sum + val)
                    ).reduce((sum,val) => sum + val)
                }}
            />: null}
        </Panel>
        <div className="flex flex-row flex-wrap gap-2">
            {settlements.map(s => <Settlement 
                key={s.name} 
                settlement={s} 
                updateTax={setSettlementTax}
                updateQuota={setSettlementQuota}
                stimulus={giveGoods}
                goTo={navigateSettlement}
                />)}
            {/* New Settlment Button */}
            {reserveGoods.money < ((settlements.length ** 2) * 4500) ? 
            <Button icon="pi pi-plus" onClick={()=>{
                setReserveGoods({...reserveGoods,money: reserveGoods.money - ((settlements.length ** 2) * 4500)})
            }}>
                <div className="flex flex-row gap-1">
                    New Settlement
                    <MoneyIconTT/>
                    {(settlements.length ** 2) * 4500}
                </div>
            </Button>: null}

        </div>
        {/* Stimulus Dialog */}
        <Dialog header={'Stimulus'} visible={giveGoodsVisable} onHide={() => {
            setGiveGoodsVisable(false)
            setWhoToGive('')
        }}>
            <ResourceDistribuition goods_cap={reserveGoods} updateFunc={stimulus}/>
        </Dialog>

        {/* New Settlment Dialog */}


    </div>
    )
}