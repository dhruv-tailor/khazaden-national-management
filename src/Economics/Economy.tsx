import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { monthsStored, SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";
import { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import DisplayGoods from "../components/goodsDislay";
import { addGoods, empty_goodsdist, goodsdist, goodsId, minPerGood, multiplyGoods, roundGoods, scaleGoods, subtractGoods, totalGoods } from "../Goods/GoodsDist";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../utilities/SaveData";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "./pricing/PriceChart";
import { ForeignPowerInterface } from "../ForeignPowers/Interface/ForeignPowerInterface";
import PriceCard from "./pricing/PriceCard";
import { calcPriceGoods } from "./pricing/prices";
import { Dialog } from "primereact/dialog";
import SellGoods from "./selling/SellGoods";
import MonthsStoredTT from "../tooltips/economy/monthsStoredTT";
import { InputNumber } from "primereact/inputnumber";

export default function Economy () {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements,setSettlements] = useState<SettlementInterface[]>([])
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [changeGoods,setChangeGoods] = useState<goodsdist>({...empty_goodsdist});
    const [prices,setPrices] = useState<goodsdist>({...empty_goodsdist})
    const [priceHistory,setPriceHistory] = useState<goodsdist[]>([])
    const [merchantCapacity,setMerchantCapacity] = useState<number>(0);
    const [FederalMonthsStored,setFederalMonthsStored] = useState<number>(0);
    const [foreignPowers,setForeignPowers] = useState<ForeignPowerInterface[]>([])

    const [showSell, setShowSell] = useState(false)

    const getInfo = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        store.get<goodsdist>('Federal Prices').then(value => {if (value) {setPrices(value)}})
        store.get<goodsdist[]>('Price History').then(value => {if (value) {setPriceHistory(value);}})
        store.get<number>('Merchant Capacity').then(value => {if (value) {setMerchantCapacity(value)}});
        store.get<number>('Months Stored').then(value => {if (value) {setFederalMonthsStored(value)}});
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
        store.set('Months Stored',FederalMonthsStored)
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
            setReserveGoods(
                {
                    ...addGoods(order,reserveGoods),
                    money: reserveGoods.money - totalGoods(multiplyGoods(order, roundGoods(scaleGoods(power.prices,power.tarriffs + 1))))
                })
            setPrices(calcPriceGoods(prices,old_reserve,reserveGoods))
            return {...power, available_supply: subtractGoods(power.available_supply,order)}
        })
        setForeignPowers([...f])
        setMerchantCapacity(merchantCapacity - capUsed)
    }

    const processSell = (type: goodsId,units: number,name: string) => {
        setShowSell(false)
        const old_reserve = {...reserveGoods}
        let money_gained = units
        if (type === goodsId.food) {money_gained = units * prices.food}
        if (type === goodsId.beer) {money_gained = units * prices.beer}
        if (type === goodsId.leather) {money_gained = units * prices.leather}
        if (type === goodsId.artisinal) {money_gained = units * prices.artisinal}
        if (type === goodsId.livestock) {money_gained = units * prices.livestock}
        if (type === goodsId.ornamental) {money_gained = units * prices.ornamental}
        if (type === goodsId.enchanted) {money_gained = units * prices.enchanted}
        if (type === goodsId.timber) {money_gained = units * prices.timber}
        if (type === goodsId.tools) {money_gained = units * prices.tools}
        if (type === goodsId.common_ores) {money_gained = units * prices.common_ores}
        if (type === goodsId.medical) {money_gained = units * prices.medical}
        if (type === goodsId.rare_ores) {money_gained = units * prices.rare_ores}
        if (type === goodsId.gems) {money_gained = units * prices.gems}
        if (type === goodsId.runes) {money_gained = units * prices.runes}
        if (type === goodsId.arms) {money_gained = units * prices.arms}
        if (type === goodsId.books) {money_gained = units * prices.books}
        if (type === goodsId.enchanted_arms) {money_gained = units * prices.enchanted_arms}
        if (type === goodsId.charcoal) {money_gained = units * prices.charcoal}
        
        setReserveGoods({
            food: type === goodsId.food ? reserveGoods.food - units : reserveGoods.food,
            beer: type === goodsId.beer ? reserveGoods.beer - units : reserveGoods.beer,
            leather: type === goodsId.leather ? reserveGoods.leather - units : reserveGoods.leather,
            artisinal: type === goodsId.artisinal ? reserveGoods.artisinal - units : reserveGoods.artisinal,
            livestock: type === goodsId.livestock ? reserveGoods.livestock - units : reserveGoods.livestock,
            ornamental: type === goodsId.ornamental ? reserveGoods.ornamental - units : reserveGoods.ornamental,
            enchanted: type === goodsId.enchanted ? reserveGoods.enchanted - units : reserveGoods.enchanted,
            timber: type === goodsId.timber ? reserveGoods.timber - units : reserveGoods.timber,
            tools: type === goodsId.tools ? reserveGoods.tools - units : reserveGoods.tools,
            common_ores: type === goodsId.common_ores ? reserveGoods.common_ores - units : reserveGoods.common_ores,
            medical: type === goodsId.medical ? reserveGoods.medical - units : reserveGoods.medical,
            rare_ores: type === goodsId.rare_ores ? reserveGoods.rare_ores - units : reserveGoods.rare_ores,
            gems: type === goodsId.gems ? reserveGoods.gems - units : reserveGoods.gems,
            runes: type === goodsId.runes ? reserveGoods.runes - units : reserveGoods.runes,
            arms: type === goodsId.arms ? reserveGoods.arms - units : reserveGoods.arms,
            books: type === goodsId.books ? reserveGoods.books - units : reserveGoods.books,
            enchanted_arms: type === goodsId.enchanted_arms ? reserveGoods.enchanted_arms - units : reserveGoods.enchanted_arms,
            charcoal: type === goodsId.charcoal ? reserveGoods.charcoal - units : reserveGoods.charcoal,
            money: reserveGoods.money + money_gained
        })
        setPrices(calcPriceGoods(prices,old_reserve,reserveGoods))
        setMerchantCapacity(merchantCapacity - units)
        const f = foreignPowers.map(power => {
            if (name !== power.name) {return power}
            return {...power, available_supply: {
                food: power.available_supply.food - (type === goodsId.food ? units : 0),
                beer: power.available_supply.beer - (type === goodsId.beer ? units : 0),
                leather: power.available_supply.leather - (type === goodsId.leather ? units : 0),
                artisinal: power.available_supply.artisinal - (type === goodsId.artisinal ? units : 0),
                livestock: power.available_supply.livestock - (type === goodsId.livestock ? units : 0),
                ornamental: power.available_supply.ornamental - (type === goodsId.ornamental ? units : 0),
                enchanted: power.available_supply.enchanted - (type === goodsId.enchanted ? units : 0),
                timber: power.available_supply.timber - (type === goodsId.timber ? units : 0),
                tools: power.available_supply.tools - (type === goodsId.tools ? units : 0),
                common_ores: power.available_supply.common_ores - (type === goodsId.common_ores ? units : 0),
                medical: power.available_supply.medical - (type === goodsId.medical ? units : 0),
                rare_ores: power.available_supply.rare_ores - (type === goodsId.rare_ores ? units : 0),
                gems: power.available_supply.gems - (type === goodsId.gems ? units : 0),
                runes: power.available_supply.runes - (type === goodsId.runes ? units : 0),
                arms: power.available_supply.arms - (type === goodsId.arms ? units : 0),
                books: power.available_supply.books - (type === goodsId.books ? units : 0),
                enchanted_arms: power.available_supply.enchanted_arms - (type === goodsId.enchanted_arms ? units : 0),
                money: power.available_supply.money,
                charcoal: power.available_supply.charcoal - (type === goodsId.charcoal ? units : 0)
            }}
        })
        setForeignPowers([...f])
    }

    return(
        <div className="flex flex-column gap-2">
            <Button label="Go Back" icon='pi pi-angle-double-left' onClick={()=>navigateTo(`/game/${gameId}`)}/>
            {/* National Stock */}
            <Panel header="Federal Reserve" toggleable>
                <div className="flex flex-row gap-1">
                <div className="flex flex-column gap-1">
                        <MonthsStoredTT/>
                        <InputNumber showButtons size={4} min={0} value={FederalMonthsStored} onChange={e => setFederalMonthsStored(e.value as number)}/>
                    </div>
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
                    <Button icon="pi pi-wallet" label="Sell Goods" severity="success" onClick={() => setShowSell(true)}/>
                </div>
            </Panel>
            <Dialog header="Sell Goods" visible={showSell} onHide={() => setShowSell(false)}>
                    <SellGoods
                        merchantCapacity={merchantCapacity}
                        supply={reserveGoods}
                        foreignPowers={foreignPowers.filter(p => p.isEmbargoed === false)} 
                        prices={prices} 
                        competingPrices={settlements.map(s => s.prices)}
                        updateFunc={processSell}/>
            </Dialog>
            {/* Price Chart */}
            <Panel header='Federal Prices' toggleable collapsed>
                <PriceChart data={priceChartDataProp(priceHistory,prices)} options={priceChartOptionsProp()}/>
            </Panel>
            {/* Local Goods */}
            <Panel header='Local Goods' toggleable>
                Merchant Capacity: {merchantCapacity}
                <div className="flex flex-row gap-2 flex-wrap">
                    {settlements.map(s => <PriceCard
                        name={s.visible_name}
                        id={s.name}
                        goods={minPerGood(roundGoods(subtractGoods(s.stock,monthsStored(s))),0)}
                        prices={roundGoods(s.prices)}
                        merchantCapacity={merchantCapacity}
                        maxCost={reserveGoods.money}
                        updateFunc={processSettlementOrder}
                    />)}
                </div>
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
                            prices={roundGoods(scaleGoods(power.prices,power.tarriffs + 1))}
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