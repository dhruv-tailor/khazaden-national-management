import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";
import { useEffect, useState } from "react";
import DisplayGoods from "../components/goodsDislay";
import { addGoods, empty_goodsdist, goodsdist, multiplyGoods, roundGoods, subtractGoods, totalGoods, } from "../Goods/GoodsDist";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../utilities/SaveData";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "./pricing/PriceChart";
import { ForeignPowerInterface } from "../ForeignPowers/Interface/ForeignPowerInterface";
import { Dialog } from "primereact/dialog";
import { LoanInterface, takeLoan } from "./loans/loanInterface";
import ViewLoans from "./loans/ViewLoans";
import { Card } from "primereact/card";
import { ArmyInterface } from "../Military/Army/Army";
import TradeDealView from "./Trade/TradeDealView";
import { FederalChange } from "../utilities/SimpleFunctions";
import { empty_trade_deal, TradeDealInterface } from "./Trade/interface/TradeDealInterface";

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
    const [federalDeals,setFederalDeals] = useState<TradeDealInterface[]>([])
    const getInfo = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const get_settlements = await store.get<SettlementInterface[]>('settlements') ?? [];
        setSettlements(get_settlements)

        await Promise.all([
            store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}}),
            store.get<goodsdist>('Federal Prices').then(value => {if (value) {setPrices(value)}}),
            store.get<goodsdist[]>('Price History').then(value => {if (value) {setPriceHistory(value);}}),
            store.get<number>('Merchant Capacity').then(value => {if (value) {setMerchantCapacity(value)}}),
            store.get<ForeignPowerInterface[]>('Foreign Powers').then(value => {if (value) {setForeignPowers(value)}}),
            store.get<LoanInterface[]>('Loans').then(value => {if (value) {setLoans(value)}}),
            store.get<ArmyInterface[]>('Armies').then(value => {if (value) {setArmies(value)}}),
            store.get<TradeDealInterface[]>('Trade Deals').then(value => {if (value) {setFederalDeals(value)}})
        ])
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
        await Promise.all([
            store.set('Federal Reserve',reserveGoods),
            store.set('Federal Prices',prices),
            store.set('Price History',priceHistory),
            store.set('settlements',settlements),
            store.set('Foreign Powers',foreignPowers),
            store.set('Merchant Capacity',merchantCapacity), 
            store.set('Loans',loans),
            store.set('Armies',armies),
            store.set('Trade Deals',federalDeals),
            store.save()
        ])
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

    const createTradeDeal = (partnerType: string, partnerId: string, length: number, tradeDealInfo: {
        goodName: keyof goodsdist;
        amount: number;
        isOutgoing: boolean;
        price: number;
    }[]) => {
        const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const new_deal : TradeDealInterface = {...empty_trade_deal}
        new_deal.trade_id = uniqueId
        if (partnerType === 'settlement') { 
            new_deal.name = settlements.find(s => s.name === partnerId)?.visible_name ?? ''
            new_deal.active = 'sent'
        }
        else if (partnerType === 'foreign') {
            new_deal.name = partnerId
            new_deal.active = 'active'
        }
        new_deal.type = partnerType as "settlement" | "foreign" | "federal"
        new_deal.duration = length
        let merchant_cap_used = 0
        tradeDealInfo.forEach(info => {
            if (info.isOutgoing) { new_deal.outgoing[info.goodName] += info.amount }
            else { new_deal.incoming[info.goodName] += info.amount }
            if(info.goodName !== 'money') { merchant_cap_used += info.amount }
        })
        setFederalDeals([...federalDeals,{...new_deal}])
        setMerchantCapacity(merchantCapacity - merchant_cap_used)
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
                id: 'federal',
                name: 'Federal',
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
    }

    const handleAcceptDeal = (trade_id: string) => {
        let type = ''
        let partner = ''
        federalDeals.forEach(td => {
            if (td.trade_id === trade_id) {
                type = td.type
                partner = td.name
            }
        })
        setFederalDeals(federalDeals.map(td => td.trade_id === trade_id ? {...td, active: 'active' as const} : td))
        if (type === 'settlement') {
            setSettlements([...settlements.map(s => {
                if (s.name !== partner) {return {...s}}
                return {
                    ...s,
                    trade_deals: s.trade_deals.map(td => td.trade_id === trade_id ? {...td, active: 'active' as const} : td)
                }
            })])
        }
        else if (type === 'foreign') {
            setForeignPowers([...foreignPowers.map(fp => fp.name === partner ? {...fp, trade_deals: fp.trade_deals.map(td => td.trade_id === trade_id ? {...td, active: 'active' as const} : td)} : fp)])
        }
    }

    const handleDeclineDeal = (trade_id: string) => {
        let type = ''
        let partner = ''
        let merchant_cap_used = 0
        federalDeals.forEach(td => {
            if (td.trade_id === trade_id) {
                type = td.type
                partner = td.name
                merchant_cap_used = totalGoods(td.outgoing) + totalGoods(td.incoming)
            }
        })
        setFederalDeals(federalDeals.filter(td => td.trade_id !== trade_id))
        setMerchantCapacity(merchantCapacity + merchant_cap_used)
        if (type === 'settlement') {
            setSettlements([...settlements.map(s => {
                if (s.name !== partner) {return {...s}}
                return {...s, trade_deals: s.trade_deals.filter(td => td.trade_id !== trade_id), merchant_capacity: s.merchant_capacity + merchant_cap_used}
            })])
        }
        else if (type === 'foreign') {
            setForeignPowers([...foreignPowers.map(fp => fp.name === partner ? {...fp, trade_deals: fp.trade_deals.filter(td => td.trade_id !== trade_id)} : fp)])
        }
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

            {/* Federal Trade Deals Section */}
            <Card title="Federal Trade Deals">
                <TradeDealView 
                    tradedeals={federalDeals} 
                    foreignPowers={Object.values(foreignPowers)} 
                    settlements={settlements} 
                    currentStock={reserveGoods} 
                    merchantCapacity={merchantCapacity} 
                    prices={prices} 
                    currentChange={changeGoods} 
                    updateFunc={createTradeDeal}
                    isFederal={true}
                    federalReserve={reserveGoods}
                    federalChange={FederalChange(settlements,loans,armies,federalDeals)}
                    federalPrices={prices}
                    federalMerchantCap={merchantCapacity}
                    handleAcceptDeal={handleAcceptDeal}
                    handleDeclineDeal={handleDeclineDeal}
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