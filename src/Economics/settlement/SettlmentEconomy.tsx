import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { empty_settlement, monthsStored, settlementChange, SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { saveLocation } from "../../utilities/SaveData";
import { load } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import DisplayGoods from "../../components/goodsDislay";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "../pricing/PriceChart";
import PriceCard from "../pricing/PriceCard";
import { addGoods, empty_goodsdist, goodsdist, goodsId, minPerGood, multiplyGoods, roundGoods, scaleGoods, subtractGoods, totalGoods } from "../../Goods/GoodsDist";
import { calcPriceGoods } from "../pricing/prices";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { Dialog } from "primereact/dialog";
import SellGoods from "../selling/SellGoods";
import { InputNumber } from "primereact/inputnumber";
import MonthsStoredTT from "../../tooltips/economy/monthsStoredTT";
import { GetFederalGoodsStored } from "../../utilities/SimpleFunctions";
import { LoanInterface, takeLoan } from "../loans/loanInterface";
import ViewLoans from "../loans/ViewLoans";
import { ArmyInterface } from "../../Military/Army/Army";
import TradeDealView from "../Trade/TradeDealView";
export default function SettlmentEconomy() {
    const gameId = useParams().game;
    const settlementId = useParams().settlement;
    let navigate = useNavigate();

    const [settlement, setSettlement] = useState<SettlementInterface>({...empty_settlement});
    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [federalPrices,setFederalPrices] = useState<goodsdist>({...empty_goodsdist});
    const [foreignPowers,setForeignPowers] = useState<ForeignPowerInterface[]>([]);
    const [showSell,setShowSell] = useState<boolean>(false);
    const [FederalMonthsStored,setFederalMonthsStored] = useState<number>(0);
    const [FederalLoans,setFederalLoans] = useState<LoanInterface[]>([]);
    const [showLoans,setShowLoans] = useState<boolean>(false);
    const [armies,setArmies] = useState<ArmyInterface[]>([]);
    const [showTradeDeal,setShowTradeDeal] = useState<boolean>(false);
    const navigateTo = async (location: string) => {
        await saveData()
        navigate(location)
    }

    const getInfo = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements') ?? [];
        
        if(settlements) {
            setSettlements(settlements);
            const current_settlement = settlements.find(settlement => settlement.name === settlementId);
            if(current_settlement) {
                setSettlement(current_settlement);
            }
        }
        
        // Load other data in parallel but wait for all to complete
        await Promise.all([
            store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}}),
            store.get<goodsdist>('Federal Prices').then(value => {if (value) {setFederalPrices(value)}}),
            store.get<ForeignPowerInterface[]>('Foreign Powers').then(value => {if (value) {setForeignPowers(value)}}),
            store.get<number>('Months Stored').then(value => {if (value) {setFederalMonthsStored(value)}}),
            store.get<LoanInterface[]>('Loans').then(value => {if (value) {setFederalLoans(value)}}),
            store.get<ArmyInterface[]>('Armies').then(value => {if (value) {setArmies(value)}})
        ]);
    }

    useEffect(()=>{getInfo()},[])
    
    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const updatedSettlements = settlements.map(s => {
            if (s.name === settlement.name) {return({...settlement})}
            return {...s}
        })
        store.set('Federal Reserve',reserveGoods)
        store.set('Federal Prices',federalPrices)
        store.set('settlements',updatedSettlements)
        store.set('Months Stored',FederalMonthsStored)
        store.set('Loans',FederalLoans)
        store.set('Armies',armies)
        store.save()
    }

    function processSettlementOrder(id: string, capUsed: number, order: goodsdist): void {
        const s = settlements.map(settlement => {
            if (id === settlement.name) { return settlement }
            const old_stock = {...settlement.stock}
            const new_stock = subtractGoods(settlement.stock,order)
            const new_prices = calcPriceGoods(settlement.prices,old_stock,new_stock)
            return {...settlement, stock: {
                ...new_stock,
                money: old_stock.money + totalGoods(multiplyGoods(order,roundGoods(settlement.prices)))
            }, prices: new_prices}
        })
        const old_stock = {...settlement.stock}
        const new_stock = addGoods(order,settlement.stock)
        const new_prices = calcPriceGoods(settlement.prices,old_stock,new_stock)
        setSettlement({
            ...settlement,
            stock: {
                ...new_stock,
                money: old_stock.money - totalGoods(multiplyGoods(order,roundGoods(settlement.prices)))
            },
            prices: new_prices,
            merchant_capacity: settlement.merchant_capacity - capUsed
        })
        setSettlements([...s])
    }

    const processFederalOrder = (_id: string, capUsed: number, order: goodsdist): void => {
        let old_stock = {...reserveGoods}
        let new_stock = subtractGoods(reserveGoods,order)
        let new_prices = calcPriceGoods(federalPrices,old_stock,new_stock)
        setReserveGoods({
            ...new_stock,
            money: old_stock.money + totalGoods(multiplyGoods(order,roundGoods(federalPrices)))
        })
        setFederalPrices(new_prices)
        old_stock = {...settlement.stock}
        new_stock = addGoods(order,settlement.stock)
        new_prices = calcPriceGoods(settlement.prices,old_stock,new_stock)
        setSettlement({
            ...settlement,
            stock: {
                ...settlement.stock,
                money: old_stock.money - totalGoods(multiplyGoods(order,roundGoods(federalPrices)))
            },
            prices: new_prices,
            merchant_capacity: settlement.merchant_capacity - capUsed
        })
    }

    function processForeignOrder(id: string, capUsed: number, order: goodsdist): void {
        const f = foreignPowers.map(power => {
            if (id !== power.name) { return power}
            const old_stock = {...settlement.stock}
            const new_stock = addGoods(order,settlement.stock)
            const new_prices = calcPriceGoods(settlement.prices,old_stock,new_stock)
            setSettlement({
                ...settlement,
                stock: {
                    ...new_stock,
                    money: old_stock.money - totalGoods(multiplyGoods(order,roundGoods(scaleGoods(power.prices,power.tarriffs + 1))))
                },
                prices: new_prices,
                merchant_capacity: settlement.merchant_capacity - capUsed
            })
            setReserveGoods({
                ...reserveGoods,
                money: reserveGoods.money + totalGoods(multiplyGoods(order,roundGoods(scaleGoods(power.prices,power.tarriffs))))
            })
            return {...power, available_supply: subtractGoods(power.available_supply,order)}
        })
        setForeignPowers([...f])
    }

    function processSell(type: goodsId, units: number, name: string): void {
        setShowSell(false)
        const old_stock = {...settlement.stock}
        let money_gained = units
        if (type === goodsId.food) {money_gained = units * settlement.prices.food}
        if (type === goodsId.beer) {money_gained = units * settlement.prices.beer}
        if (type === goodsId.leather) {money_gained = units * settlement.prices.leather}
        if (type === goodsId.artisanal) {money_gained = units * settlement.prices.artisanal}
        if (type === goodsId.livestock) {money_gained = units * settlement.prices.livestock}
        if (type === goodsId.ornamental) {money_gained = units * settlement.prices.ornamental}
        if (type === goodsId.enchanted) {money_gained = units * settlement.prices.enchanted}
        if (type === goodsId.timber) {money_gained = units * settlement.prices.timber}
        if (type === goodsId.tools) {money_gained = units * settlement.prices.tools}
        if (type === goodsId.common_ores) {money_gained = units * settlement.prices.common_ores}
        if (type === goodsId.medical) {money_gained = units * settlement.prices.medical}
        if (type === goodsId.rare_ores) {money_gained = units * settlement.prices.rare_ores}
        if (type === goodsId.gems) {money_gained = units * settlement.prices.gems}
        if (type === goodsId.runes) {money_gained = units * settlement.prices.runes}
        if (type === goodsId.arms) {money_gained = units * settlement.prices.arms}
        if (type === goodsId.books) {money_gained = units * settlement.prices.books}
        if (type === goodsId.enchanted_arms) {money_gained = units * settlement.prices.enchanted_arms}
        if (type === goodsId.charcoal) {money_gained = units * settlement.prices.charcoal}
        
        setSettlement({
            ...settlement,
            stock: {
                food: type === goodsId.food ? settlement.stock.food - units : settlement.stock.food,
                beer: type === goodsId.beer ? settlement.stock.beer - units : settlement.stock.beer,
                leather: type === goodsId.leather ? settlement.stock.leather - units : settlement.stock.leather,
                artisanal: type === goodsId.artisanal ? settlement.stock.artisanal - units : settlement.stock.artisanal,
                livestock: type === goodsId.livestock ? settlement.stock.livestock - units : settlement.stock.livestock,
                ornamental: type === goodsId.ornamental ? settlement.stock.ornamental - units : settlement.stock.ornamental,    
                enchanted: type === goodsId.enchanted ? settlement.stock.enchanted - units : settlement.stock.enchanted,
                timber: type === goodsId.timber ? settlement.stock.timber - units : settlement.stock.timber,
                tools: type === goodsId.tools ? settlement.stock.tools - units : settlement.stock.tools,
                common_ores: type === goodsId.common_ores ? settlement.stock.common_ores - units : settlement.stock.common_ores,
                medical: type === goodsId.medical ? settlement.stock.medical - units : settlement.stock.medical,
                rare_ores: type === goodsId.rare_ores ? settlement.stock.rare_ores - units : settlement.stock.rare_ores,
                gems: type === goodsId.gems ? settlement.stock.gems - units : settlement.stock.gems,
                runes: type === goodsId.runes ? settlement.stock.runes - units : settlement.stock.runes,
                arms: type === goodsId.arms ? settlement.stock.arms - units : settlement.stock.arms,
                books: type === goodsId.books ? settlement.stock.books - units : settlement.stock.books,
                enchanted_arms: type === goodsId.enchanted_arms ? settlement.stock.enchanted_arms - units : settlement.stock.enchanted_arms,
                money: old_stock.money + money_gained,
                charcoal: type === goodsId.charcoal ? settlement.stock.charcoal - units : settlement.stock.charcoal
            },
            prices: calcPriceGoods(settlement.prices,old_stock,settlement.stock),
            merchant_capacity: settlement.merchant_capacity - units
        })
        const f = foreignPowers.map(power => {
            if (name !== power.name) {return power}
            return {...power, available_supply: {
                food: power.available_supply.food - (type === goodsId.food ? units : 0),
                beer: power.available_supply.beer - (type === goodsId.beer ? units : 0),
                leather: power.available_supply.leather - (type === goodsId.leather ? units : 0),
                artisanal: power.available_supply.artisanal - (type === goodsId.artisanal ? units : 0),
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

    const loanTaken = (giver: string, amount: number) => {
        setShowLoans(false)
        const s = settlements.map(s => {
            if (giver !== s.name) {return s}
            const newLoans = [...settlement.loans, takeLoan(amount, s.visible_name, s.name)]
            setSettlement({...settlement, loans: newLoans})
            return {...s, available_loan: s.available_loan - amount}
        })
        setSettlements([...s])
    }

    const declareBankruptcy = () => {
        setSettlement({...settlement, stock: {...empty_goodsdist}, loans: [],garrison: []})
    }

    // Add loading state
    if (!settlement || !settlement.name || settlement.stock.money === undefined) {
        return <div>Loading...</div>;
    }


    return (
        <div className="flex flex-column gap-2">
            {/* Header Section */}
            <div className="flex flex-row justify-content-between align-items-center gap-2">
                <Button 
                    size="small" 
                    label="Go Back" 
                    icon='pi pi-angle-double-left' 
                    onClick={()=>navigateTo(`/game/${gameId}/settlement/${settlementId}`)}
                    className="p-button-text"
                />
                <div className="flex gap-2">
                    <Button 
                        size="small" 
                        label="View Loans" 
                        icon='pi pi-money-bill' 
                        onClick={() => setShowLoans(true)}
                        severity="info"
                    />
                    <Button 
                        size="small"
                        label="Sell Goods"
                        icon="pi pi-wallet" 
                        severity="success" 
                        onClick={() => setShowSell(true)}
                    />
                    <Button 
                        size="small"
                        label="Trade Deals"
                        icon="pi pi-arrow-right-arrow-left"
                        severity="info"
                        onClick={() => setShowTradeDeal(true)}
                    />
                </div>
            </div>

            {/* Settlement Goods Section */}
            <Card title="Settlement Goods" className="sticky top-0 z-5 bg-black shadow-2">
                <div className="flex flex-column gap-2">
                    <div className="flex flex-row align-items-center gap-3">
                        <div className="flex flex-column gap-1">
                            <MonthsStoredTT/>
                            <InputNumber 
                                showButtons 
                                size={4} 
                                min={0} 
                                value={settlement.months_stored} 
                                onChange={e => setSettlement({...settlement, months_stored: e.value as number})}
                            />
                        </div>
                        {settlement.name !== '' && (
                            <DisplayGoods 
                                stock={roundGoods(settlement.stock)} 
                                change={roundGoods(settlementChange(settlement))}
                            />
                        )}
                    </div>
                </div>
            </Card>

            {/* Price Chart Section */}
            <Card title="Price Chart">
                <PriceChart 
                    data={priceChartDataProp(settlement.price_history,settlement.prices)} 
                    options={priceChartOptionsProp()}
                />
            </Card>

            {/* Local Goods Section */}
            <Card title='Local Goods'>
                <div className="flex flex-column gap-2">
                    <div className="font-bold text-sm">
                        Merchant Capacity: {settlement.merchant_capacity} | 
                        Available Money: {settlement.stock.money}
                    </div>
                    <div className="grid">
                        <div className="col-12 md:col-6 lg:col-4">
                            <PriceCard
                                name={'Federal Reserve'}
                                id={'Federal Reserve'}
                                goods={minPerGood(roundGoods(subtractGoods(reserveGoods,GetFederalGoodsStored(settlements,FederalMonthsStored,FederalLoans,armies))),0)}
                                prices={roundGoods(federalPrices)}
                                merchantCapacity={settlement.merchant_capacity}
                                maxCost={settlement.stock.money}
                                updateFunc={processFederalOrder}
                                myGoods={roundGoods(reserveGoods)}
                                myChange={roundGoods(settlementChange(settlement))}
                            />
                        </div>
                        {settlements.filter(s => s.name !== settlement.name).map(s => (
                            <div key={s.name} className="col-12 md:col-6 lg:col-4">
                                <PriceCard
                                    name={s.visible_name}
                                    id={s.name}
                                    goods={minPerGood(roundGoods(subtractGoods(s.stock,monthsStored(s))),0)}
                                    prices={roundGoods(s.prices)}
                                    merchantCapacity={settlement.merchant_capacity}
                                    maxCost={settlement.stock.money}
                                    updateFunc={processSettlementOrder}
                                    myGoods={roundGoods(reserveGoods)}
                                    myChange={roundGoods(settlementChange(settlement))}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Global Goods Section */}
            <Card title='Global Goods'>
                <div className="flex flex-column gap-2">
                    <div className="font-bold text-sm">
                        Merchant Capacity: {settlement.merchant_capacity} | 
                        Available Money: {settlement.stock.money}
                    </div>
                    <div className="grid">
                        {foreignPowers.filter(power => !power.isEmbargoed).map(power => (
                            <div key={power.name} className="col-12 md:col-6 lg:col-4">
                                <PriceCard
                                    name={power.name}
                                    id={power.name}
                                    goods={roundGoods(power.available_supply)}
                                    prices={roundGoods(scaleGoods(power.prices,power.tarriffs + 1))}
                                    merchantCapacity={settlement.merchant_capacity}
                                    maxCost={settlement.stock.money}
                                    updateFunc={processForeignOrder}
                                    myGoods={roundGoods(reserveGoods)}
                                    myChange={roundGoods(settlementChange(settlement))}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Dialogs */}
            <Dialog 
                header="Sell Goods" 
                visible={showSell} 
                onHide={() => setShowSell(false)}
                className="w-11"
                contentStyle={{ padding: '0.5rem' }}
            >
                <SellGoods
                    merchantCapacity={settlement.merchant_capacity}
                    supply={settlement.stock}
                    currentChange={roundGoods(settlementChange(settlement))}
                    foreignPowers={foreignPowers.filter(power => !power.isEmbargoed)}
                    prices={settlement.prices}
                    competingPrices={settlements.filter(s => s.name !== settlement.name).map(s => s.prices).concat(federalPrices)}
                    updateFunc={processSell}
                />
            </Dialog>

            <Dialog 
                header="Loans" 
                visible={showLoans} 
                onHide={() => setShowLoans(false)}
                className="w-11"
                contentStyle={{ padding: '0.5rem' }}
            >
                <ViewLoans 
                    loans={settlement.loans} 
                    settlements={settlements} 
                    updateFunc={loanTaken} 
                    declareBankruptcy={declareBankruptcy}
                />
            </Dialog>

            <Dialog 
                header="Trade Deals" 
                visible={showTradeDeal} 
                onHide={() => setShowTradeDeal(false)}
                className="w-11"
                contentStyle={{ padding: '0.5rem' }}
            >
                <TradeDealView 
                    tradedeals={settlement.trade_deals} 
                    foreignPowers={foreignPowers} 
                    settlements={settlements.filter(s => s.name !== settlement.name)} 
                    currentStock={settlement.stock} 
                    merchantCapacity={settlement.merchant_capacity} 
                    prices={settlement.prices} 
                    currentChange={roundGoods(settlementChange(settlement))}
                />
            </Dialog>
        </div>
    )
}
