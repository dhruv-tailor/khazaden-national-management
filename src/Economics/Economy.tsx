import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";
import { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import DisplayGoods from "../components/goodsDislay";
import { addGoods, empty_goodsdist, goodsdist, multiplyGoods, roundGoods, scaleGoods, subtractGoods, totalGoods } from "../Goods/GoodsDist";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../utilities/SaveData";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "./pricing/PriceChart";
import { ForeignPowerInterface } from "../ForeignPowers/Interface/ForeignPowerInterface";
import PriceCard from "./pricing/PriceCard";
import { calcPriceGoods } from "./pricing/prices";

export default function Economy () {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements,setSettlements] = useState<SettlementInterface[]>([])
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [changeGoods,setChangeGoods] = useState<goodsdist>({...empty_goodsdist});
    const [prices,setPrices] = useState<goodsdist>({...empty_goodsdist})
    const [priceHistory,setPriceHistory] = useState<goodsdist[]>([])
    const [merchantCapacity,setMerchantCapacity] = useState<number>(0);
    const [foreignPowers,setForeignPowers] = useState<ForeignPowerInterface[]>([])

    const getInfo = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        store.get<goodsdist>('Federal Prices').then(value => {if (value) {setPrices(value)}})
        store.get<goodsdist[]>('Price History').then(value => {if (value) {setPriceHistory(value);}})
        store.get<number>('Merchant Capacity').then(value => {if (value) {setMerchantCapacity(value)}});
        store.get<ForeignPowerInterface[]>('Foreign Powers').then(value => {if (value) {setForeignPowers(value)}});
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

    useEffect(() => {getInfo()},[])

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.set('Federal Reserve',reserveGoods)
        store.set('Federal Prices',prices)
        store.set('Price History',priceHistory)
        store.set('settlements',settlements)
        store.set('Foreign Powers',foreignPowers)
        store.set('Merchant Capacity',merchantCapacity)
        store.save()
    }

    const navigateTo = async (location: string) => {
        await saveData();
        navigate(location);
    }

    const processSettlementOrder = (id: string, capUsed: number, order: goodsdist) => {
        const s = settlements.map(settlement => {
            if (id !== settlement.name) { return settlement }
            const old_stock = settlement.stock
            const new_stock = subtractGoods(settlement.stock,order)
            const new_prices = calcPriceGoods(settlement.prices,old_stock,new_stock)
            const old_reserve = {...reserveGoods}
            setReserveGoods({...addGoods(order,reserveGoods),money: reserveGoods.money - totalGoods(multiplyGoods(order, roundGoods(settlement.prices)))})
            setPrices(calcPriceGoods(prices,old_reserve,reserveGoods))
            return {
                ...settlement,
                stock: {
                    ...new_stock,
                    money: totalGoods(multiplyGoods(order, roundGoods(settlement.prices)))
                },
                prices: new_prices
            }
        })
        setSettlements([...s])
        setMerchantCapacity(merchantCapacity - capUsed)
    }

    const processForeignOrder = (id: string, capUsed: number, order: goodsdist) => {
        const f = foreignPowers.map(power => {
            if (id !== power.name) { return power}
            const old_reserve = {...reserveGoods}
            setReserveGoods({...addGoods(order,reserveGoods),money: reserveGoods.money - totalGoods(multiplyGoods(order, roundGoods(power.prices)))})
            setPrices(calcPriceGoods(prices,old_reserve,reserveGoods))
            return {...power, available_supply: subtractGoods(power.available_supply,order)}
        })
        setForeignPowers([...f])
        setMerchantCapacity(merchantCapacity - capUsed)
    }

    return(
        <div className="flex flex-column gap-2">
            <Button label="Go Back" icon='pi pi-angle-double-left' onClick={()=>navigateTo(`/game/${gameId}`)}/>
            {/* National Stock */}
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
            {/* Price Chart */}
            <Panel header='Federal Prices' toggleable>
                <PriceChart data={priceChartDataProp(priceHistory,prices)} options={priceChartOptionsProp()}/>
            </Panel>
            {/* Local Goods */}
            <Panel header='Local Goods' toggleable>
                Merchant Capacity: {merchantCapacity}
                {settlements.map(s => <PriceCard
                    name={s.visible_name}
                    id={s.name}
                    goods={s.stock}
                    prices={roundGoods(s.prices)}
                    merchantCapacity={merchantCapacity}
                    maxCost={reserveGoods.money}
                    updateFunc={processSettlementOrder}
                />)}
            </Panel>
            {/* Global Goods */}
            <Panel header='Global Goods' toggleable>
                Merchant Capacity: {merchantCapacity}
                <div className="flex flex-row gap-2 flex-wrap">
                    {foreignPowers.filter(power => !power.isEmbargoed).map(power => {
                        return <PriceCard
                            name={power.name}
                            id={power.name}
                            goods={roundGoods(power.available_supply)}
                            prices={roundGoods(power.prices)}
                            merchantCapacity={merchantCapacity}
                            maxCost={reserveGoods.money}
                            updateFunc={processForeignOrder}
                        />
                    })}
                </div>
            </Panel>
        </div>
    )
}