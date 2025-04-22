import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";
import { useEffect, useState } from "react";
import DisplayGoods from "../components/goodsDislay";
import { addGoods, empty_goodsdist, goodsdist, multiplyGoods, roundGoods, } from "../Goods/GoodsDist";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../utilities/SaveData";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "./pricing/PriceChart";
import { ForeignPowerInterface } from "../ForeignPowers/Interface/ForeignPowerInterface";
import { Dialog } from "primereact/dialog";
import { LoanInterface, takeLoan } from "./loans/loanInterface";
import ViewLoans from "./loans/ViewLoans";
import { Card } from "primereact/card";
import { ArmyInterface } from "../Military/Army/Army";

export default function Economy() {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements,setSettlements] = useState<SettlementInterface[]>([])
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [changeGoods,setChangeGoods] = useState<goodsdist>({...empty_goodsdist});
    const [prices,setPrices] = useState<goodsdist>({...empty_goodsdist})
    const [priceHistory,setPriceHistory] = useState<goodsdist[]>([])
    const [merchantCapacity,setMerchantCapacity] = useState<number>(0);
    const [foreignPowers,setForeignPowers] = useState<ForeignPowerInterface[]>([])
    const [loans,setLoans] = useState<LoanInterface[]>([])
    const [showLoans,setShowLoans] = useState<boolean>(false)
    const [armies,setArmies] = useState<ArmyInterface[]>([])

    const getInfo = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        store.get<goodsdist>('Federal Prices').then(value => {if (value) {setPrices(value)}})
        store.get<goodsdist[]>('Price History').then(value => {if (value) {setPriceHistory(value);}})
        store.get<number>('Merchant Capacity').then(value => {if (value) {setMerchantCapacity(value)}});
        store.get<ForeignPowerInterface[]>('Foreign Powers').then(value => {if (value) {setForeignPowers(value)}});
        store.get<LoanInterface[]>('Loans').then(value => {if (value) {setLoans(value)}});
        store.get<ArmyInterface[]>('Armies').then(value => {if (value) {setArmies(value)}});
        const get_settlements = await store.get<SettlementInterface[]>('settlements') ?? [];
        setSettlements(get_settlements)
        updateSettlements()
    }

    const updateSettlements = () => {
        const change_reserve = settlements.map(settlement => {
            return settlement.clans.map(
                clan => roundGoods(multiplyGoods(clan.production,settlement.taxation))
            ).reduce((sum,val) => addGoods(sum,val))
        }).reduce((sum,val) => addGoods(sum,val))

        change_reserve.money = Math.round(settlements.map(settlement => {
            return settlement.clans.map(
                clan => clan.tax_rate * clan.taxed_productivity
            ).reduce((sum,val) => sum + val) * settlement.taxation.money
            }).reduce((sum,val) => sum + val))

        setChangeGoods(change_reserve)
    }

    useEffect(() => {getInfo()},[])

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.set('Federal Reserve',reserveGoods)
        store.set('Federal Prices',prices)
        store.set('Price History',priceHistory)
        store.set('settlements',settlements)
        store.set('Foreign Powers',foreignPowers)
        store.set('Merchant Capacity',merchantCapacity)
        store.set('Loans',loans)
        store.set('Armies',armies)
        store.save()
    }

    const navigateTo = async (location: string) => {
        await saveData();
        navigate(location);
    }


    const loanTaken = (settlement: string, amount: number) => {
        const s = settlements.map(s => {
            if (settlement !== s.name) {return s}
            setLoans([...loans,takeLoan(amount,s.visible_name,s.name)])
            return {...s, available_loan: s.available_loan - amount}
        })
        setSettlements([...s])
    }

    const declareBankruptcy = () => {
        setReserveGoods({...empty_goodsdist})
        setLoans([])
        setArmies([])
    }

    return (
        <div className="flex flex-column gap-3">
            {/* Header Section */}
            <div className="flex flex-row justify-content-between align-items-center">
                <Button 
                    size="small" 
                    label="Go Back" 
                    icon='pi pi-angle-double-left' 
                    onClick={() => navigateTo(`/game/${gameId}`)}
                    className="p-button-text"
                />
                <Button 
                    size="small" 
                    label="View Loans" 
                    icon='pi pi-money-bill' 
                    onClick={() => setShowLoans(true)}
                    severity="info"
                />
            </div>

            {/* Federal Reserve Section */}
            <Card title="Federal Reserve" className="sticky top-0 z-5 bg-black shadow-2">
                <div className="flex flex-row align-items-center gap-3">
                    {settlements.length > 0 && (
                        <DisplayGoods 
                            stock={reserveGoods} 
                            change={{
                                ...changeGoods,
                                money: settlements.map(
                                    s => s.clans.map(
                                        c => Math.round(c.tax_rate * c.taxed_productivity * s.taxation.money)
                                    ).reduce((sum,val) => sum + val,0)
                                ).reduce((sum,val) => sum + val,0)
                            }}
                        />
                    )}
                </div>
            </Card>

            {/* Price Chart Section */}
            <Card title="Federal Prices">
                <PriceChart 
                    data={priceChartDataProp(priceHistory,roundGoods(prices))} 
                    options={priceChartOptionsProp()}
                />
            </Card>

            <Dialog 
                header="Loans" 
                visible={showLoans} 
                onHide={() => setShowLoans(false)}
            >
                <ViewLoans 
                    loans={loans} 
                    settlements={settlements} 
                    updateFunc={loanTaken} 
                    declareBankruptcy={declareBankruptcy}
                />
            </Dialog>
        </div>
    )
}