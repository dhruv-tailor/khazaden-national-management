import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { SettlementInterface } from "./Settlement/SettlementInterface/SettlementInterface";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";
import { addGoods, empty_goodsdist, goodsdist, subtractGoods } from "./Goods/GoodsDist";
import { Panel } from "primereact/panel";
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

export default function Game() {
    const gameId = useParams().game
    let navigate = useNavigate();

    const [settlements,setSettlements] = useState<SettlementInterface[]>([])

    // Federal Goods
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [changeGoods,setChangeGoods] = useState<goodsdist>({...empty_goodsdist});
    const [prices,setPrices] = useState<goodsdist>({...empty_goodsdist})
    const [loans,setLoans] = useState<LoanInterface[]>([])

    // Stimulus
    const [whoToGive,setWhoToGive] = useState<string>('');
    const [giveGoodsVisable,setGiveGoodsVisable] = useState<boolean>(false)

    // New Settlement Screen
    const [newSettlementVisable,setNewSettlementVisable] = useState<boolean>(false);

    const [currentMonth,setCurrentMonth] = useState<number>(0)
    const [currentYear,setCurrentYear] = useState<number>(0)
    
    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        store.get<goodsdist>('Federal Prices').then(value => {if (value) {setPrices(value)}})
        store.get<SettlementInterface[]>('settlements').then(value => {if (value) {setSettlements(value)}});
        store.get<LoanInterface[]>('loans').then(value => {if (value) {setLoans(value)}});
        store.get<number>('Current Month').then(value => {if (value) {setCurrentMonth(value)}});
        store.get<number>('Current Year').then(value => {if (value) {setCurrentYear(value)}});
        updateSettlements()
    }
    
    const updateSettlements = () => setChangeGoods(FederalChange(settlements,loans))

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

    const navigateSettlement = async (name: string) => {
        await saveData()
        navigate(`settlement/${name}`)
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.set('settlements',settlements)
        store.set('Federal Reserve',reserveGoods)
        store.set('Federal Prices',prices)
        store.save()
    }

    const createSettlement = (s: SettlementInterface) => {
        setNewSettlementVisable(false)
        s.name = `settlement${settlements.length + 1}`
        setSettlements([...settlements,s])
        setPrices({...calcPriceGoods(prices,reserveGoods,s.stock)})
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


    useEffect(() => {getSettlements()},[])
    
    return (
        <div className="flex flex-column gap-2">
            <Button label={`${MonthInfo[currentMonth as keyof typeof MonthInfo].name} ${currentYear} | Next Turn`} size='small' icon='pi pi-angle-double-right' onClick={processNextTurn}/>
            <div className="flex flex-row gap-1">
                <Button className='flex-grow-1' severity="secondary" label='Foreign Powers' icon='pi pi-flag-fill' onClick={goToForeignPowers}/>
                <Button className='flex-grow-1' severity="warning" label='Economy' icon='pi pi-wallet' onClick={goToEconomy}/>
            </div>
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
            {reserveGoods.money >= ((settlements.length ** 2) * 4500) ? 
            <Button icon="pi pi-plus" onClick={()=>{
                setReserveGoods({...reserveGoods,money: reserveGoods.money - ((settlements.length ** 2) * 4500)})
                setNewSettlementVisable(true)
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
        <Dialog
            header={'New Settlement'}
            closable={false}
            visible={newSettlementVisable}
            onHide={() => {setNewSettlementVisable(false)}}
        >
            <NewSettlement max_resources={reserveGoods} updateFunc={createSettlement}/>
        </Dialog>

    </div>
    )
}