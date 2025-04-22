import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { empty_settlement, settlementChange, SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { saveLocation } from "../../utilities/SaveData";
import { load } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import DisplayGoods from "../../components/goodsDislay";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "../pricing/PriceChart";
import { empty_goodsdist, goodsdist, roundGoods, subtractGoods } from "../../Goods/GoodsDist";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { Dialog } from "primereact/dialog";
import { LoanInterface, takeLoan } from "../loans/loanInterface";
import ViewLoans from "../loans/ViewLoans";
import { ArmyInterface } from "../../Military/Army/Army";
import TradeDealView from "../Trade/TradeDealView";
import { empty_trade_deal, TradeDealInterface } from "../Trade/interface/TradeDealInterface";
import { FederalChange } from "../../utilities/SimpleFunctions";
export default function SettlmentEconomy() {
    const gameId = useParams().game;
    const settlementId = useParams().settlement;
    let navigate = useNavigate();

    const [settlement, setSettlement] = useState<SettlementInterface>({...empty_settlement});
    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [federalPrices,setFederalPrices] = useState<goodsdist>({...empty_goodsdist});
    const [foreignPowers,setForeignPowers] = useState<ForeignPowerInterface[]>([]);
    const [FederalLoans,setFederalLoans] = useState<LoanInterface[]>([]);
    const [showLoans,setShowLoans] = useState<boolean>(false);
    const [armies,setArmies] = useState<ArmyInterface[]>([]);
    const [federalMerchantCap,setFederalMerchantCap] = useState<number>(0)
    const [federalDeals,setFederalDeals] = useState<TradeDealInterface[]>([])

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
            store.get<LoanInterface[]>('Loans').then(value => {if (value) {setFederalLoans(value)}}),
            store.get<ArmyInterface[]>('Armies').then(value => {if (value) {setArmies(value)}}),
            store.get<number>('Merchant Capacity').then(value => {if (value) {setFederalMerchantCap(value)}}),
            store.get<TradeDealInterface[]>('Trade Deals').then(value => {if (value) {setFederalDeals(value)}}),
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
        store.set('Loans',FederalLoans)
        store.set('Armies',armies)
        store.set('Merchant Capacity',federalMerchantCap)
        store.set('Trade Deals',federalDeals)
        store.save()
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


    const createTradeDeal = (partnerType: string, partnerId: string, length: number, tradeDealInfo: {
        goodName: keyof goodsdist;
        amount: number;
        isOutgoing: boolean;
        price: number;
    }[]) => {
        const new_deal : TradeDealInterface = {...empty_trade_deal}
        new_deal.id = partnerId
        if (partnerType === 'settlement') { 
            new_deal.name = settlements.find(s => s.name === partnerId)?.visible_name ?? ''
            new_deal.active = 'sent'
        }
        else if (partnerType === 'foreign') {
            new_deal.name = partnerId
            new_deal.active = 'active'
        }
        else if (partnerType === 'federal') {
            new_deal.name = 'federal'
            new_deal.active = 'sent'
        }
        new_deal.type = partnerType as "settlement" | "foreign" | "federal"
        new_deal.duration = length
        let merchant_cap_used = 0
        tradeDealInfo.forEach(info => {
            if (info.isOutgoing) { new_deal.outgoing[info.goodName] += info.amount }
            else { new_deal.incoming[info.goodName] += info.amount }
            merchant_cap_used += info.amount
        })
        setSettlement({
            ...settlement,
            trade_deals: [...settlement.trade_deals,{...new_deal}],
            merchant_capacity: settlement.merchant_capacity - merchant_cap_used
        })
        if (partnerType === 'foreign') {
            // The other details doesn't really matter it can stay the same
            const mirror_deal: TradeDealInterface = {...new_deal,outgoing: {...new_deal.incoming},incoming:{...new_deal.outgoing}}
            const fps = foreignPowers.map(fp => {
                if (fp.name !== partnerId) {return {...fp}}
                return {
                    ...fp,
                    trade_deals: [...fp.trade_deals,mirror_deal],
                    available_demand: subtractGoods(fp.available_demand,new_deal.outgoing),
                    available_supply: subtractGoods(fp.available_supply,new_deal.incoming)
                }
            })
            setForeignPowers({...fps})
        }
        else if (partnerType === 'settlement') {
            const mirror_deal: TradeDealInterface = {
                ...new_deal,
                outgoing: {...new_deal.incoming},
                incoming:{...new_deal.outgoing},
                id: settlement.name,
                name: settlement.visible_name,
                active: 'checking'
            }
            setSettlements([...settlements.map(s => {
                if (s.name !== partnerId) {return {...s}}
                return {
                    ...s,
                    trade_deals: [...s.trade_deals,{...mirror_deal}],
                    merchant_capacity: s.merchant_capacity - merchant_cap_used
                }
            })])
        }
        else if (partnerType === 'federal') {
            const mirror_deal: TradeDealInterface = {
                ...new_deal,
                outgoing: {...new_deal.incoming},
                incoming:{...new_deal.outgoing},
                id: settlement.name,
                name: settlement.visible_name,
                active: 'checking'
            }
            setFederalDeals([...federalDeals,{...mirror_deal}])
        }
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
                </div>
            </div>

            {/* Settlement Goods Section */}
            <Card title="Settlement Goods" className="sticky top-0 z-5 bg-black shadow-2">
                <div className="flex flex-row align-items-center gap-3">
                    {settlement.name !== '' && (
                        <DisplayGoods 
                            stock={roundGoods(settlement.stock)} 
                            change={roundGoods(settlementChange(settlement))}
                        />
                    )}
                </div>
            </Card>

            {/* Price Chart Section */}
            <Card title="Price Chart">
                <PriceChart 
                    data={priceChartDataProp(settlement.price_history,roundGoods(settlement.prices))} 
                    options={priceChartOptionsProp()}
                />
            </Card>

            <Card title='Trade'>
                <TradeDealView 
                    tradedeals={settlement.trade_deals} 
                    foreignPowers={foreignPowers} 
                    settlements={settlements.filter(s => s.name !== settlement.name)} 
                    currentStock={settlement.stock} 
                    merchantCapacity={settlement.merchant_capacity} 
                    prices={settlement.prices} 
                    currentChange={roundGoods(settlementChange(settlement))}
                    updateFunc={createTradeDeal}
                    isFederal={false}
                    federalReserve={reserveGoods}
                    federalChange={FederalChange(settlements,FederalLoans,armies)}
                    federalPrices={federalPrices}
                    federalMerchantCap={federalMerchantCap}
                />
            </Card>

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
        </div>
    )
}
