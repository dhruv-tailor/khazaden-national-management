import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { empty_settlement, settlementChange, SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { saveLocation } from "../../utilities/SaveData";
import { load } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import DisplayGoods from "../../components/goodsDislay";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "../pricing/PriceChart";
import { empty_goodsdist, goodsdist, roundGoods, subtractGoods, totalGoods } from "../../Goods/GoodsDist";
import { Dialog } from "primereact/dialog";
import { takeLoan } from "../loans/loanInterface";
import ViewLoans from "../loans/ViewLoans";
import TradeDealView from "../Trade/TradeDealView";
import { empty_trade_deal, TradeDealInterface } from "../Trade/interface/TradeDealInterface";
import { FederalChange } from "../../utilities/SimpleFunctions";
import { FederalInterface } from "../../utilities/FederalInterface";
import { empty_federal_interface } from "../../utilities/FederalInterface";

export default function SettlmentEconomy() {
    const gameId = useParams().game;
    const settlementId = useParams().settlement;
    let navigate = useNavigate();

    const [federal,setFederal] = useState<FederalInterface>({...empty_federal_interface})
    const [settlement,setSettlement] = useState<SettlementInterface>({...empty_settlement})
    const [showLoans,setShowLoans] = useState<boolean>(false);


    const navigateTo = async (location: string) => {
        await saveData()
        navigate(location)
    }

    const getInfo = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const federal = await store.get<FederalInterface>('Federal') ?? {...empty_federal_interface};
        if(federal.settlements) {
            setFederal({...federal});
            const current_settlement = federal.settlements.find(settlement => settlement.name === settlementId);
            if(current_settlement) {
                setSettlement(current_settlement);
            }
        }
        
    }

    useEffect(()=>{getInfo()},[])
    
    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const updatedSettlements = federal.settlements.map(s => {
            if (s.name === settlement.name) {return({...settlement})}
            return {...s}
        })
        store.set('Federal',{...federal,settlements: updatedSettlements})
        store.save()
    }

    const loanTaken = (giver: string, amount: number) => {
        setShowLoans(false)
        const s = federal.settlements.map(s => {
            if (giver !== s.name) {return s}
            const newLoans = [...settlement.loans, takeLoan(amount, s.visible_name, s.name)]
            setSettlement({...settlement, loans: newLoans})
            return {...s, available_loan: s.available_loan - amount}
        })
        setFederal({...federal,settlements: s})
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
        //generate a unique id for the deal
        const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const new_deal : TradeDealInterface = {...empty_trade_deal}
        new_deal.trade_id = uniqueId
        if (partnerType === 'settlement') { 
            new_deal.name = federal.settlements.find(s => s.name === partnerId)?.visible_name ?? ''
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
            if(info.goodName !== 'money') { merchant_cap_used += info.amount }
        })
        setSettlement({
            ...settlement,
            trade_deals: [...settlement.trade_deals,{...new_deal}],
            merchant_capacity: settlement.merchant_capacity - merchant_cap_used
        })
        if (partnerType === 'foreign') {
            // The other details doesn't really matter it can stay the same
            const mirror_deal: TradeDealInterface = {...new_deal,outgoing: {...new_deal.incoming},incoming:{...new_deal.outgoing}}
            const fps = federal.foreign_powers.map(fp => {
                if (fp.name !== partnerId) {return {...fp}}
                return {
                    ...fp,
                    trade_deals: [...fp.trade_deals,mirror_deal],
                    available_demand: subtractGoods(fp.available_demand,new_deal.outgoing),
                    available_supply: subtractGoods(fp.available_supply,new_deal.incoming)
                }
            })
            setFederal({...federal,foreign_powers: fps})
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
            setFederal({...federal,settlements: federal.settlements.map(s => {
                if (s.name !== partnerId) {return {...s}}
                return {
                    ...s,
                    trade_deals: [...s.trade_deals,{...mirror_deal}],
                    merchant_capacity: s.merchant_capacity - merchant_cap_used
                }
            })})
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
            setFederal({...federal,trade_deals: [...federal.trade_deals,{...mirror_deal}]})
        }
    }

    const handleAcceptDeal = (trade_id: string) => {
        let type = ''
        let partner = ''
        settlement.trade_deals.forEach(td => {
            if (td.trade_id === trade_id) {
                type = td.type
                partner = td.name
            }
        })
        setSettlement({
            ...settlement,
            trade_deals: settlement.trade_deals.map(td => td.trade_id === trade_id ? {...td, active: 'active'} : td)
        })
        if (type === 'settlement') {
            setFederal({...federal,settlements: federal.settlements.map(s => {
                if (s.name !== partner) {return {...s}}
                return {
                    ...s,
                    trade_deals: s.trade_deals.map(td => td.trade_id === trade_id ? {...td, active: 'active' as const} : td),
                }
            })})
        }
        else if (type === 'foreign') {
            setFederal({...federal,foreign_powers: federal.foreign_powers.map(fp => fp.name === partner ? {...fp, trade_deals: fp.trade_deals.map(td => td.trade_id === trade_id ? {...td, active: 'active' as const} : td)} : fp)})
        }
        else if (type === 'federal') {
            setFederal({...federal,trade_deals: federal.trade_deals.map(td => td.trade_id === trade_id ? {...td, active: 'active' as const} : td)})
        }
    }

    const handleDeclineDeal = (trade_id: string) => {
        let type = ''
        let partner = ''
        let merchant_cap_used = 0
        settlement.trade_deals.forEach(td => {
            if (td.trade_id === trade_id) {
                type = td.type
                partner = td.name
                merchant_cap_used = totalGoods(td.outgoing) + totalGoods(td.incoming)
            }
        })
        setSettlement({
            ...settlement,
            trade_deals: settlement.trade_deals.filter(td => td.trade_id !== trade_id)
        })
        if (type === 'settlement') {
            setFederal({...federal,settlements: federal.settlements.map(s => {
                if (s.name !== partner) {return {...s}}
                return {...s, trade_deals: s.trade_deals.filter(td => td.trade_id !== trade_id), merchant_capacity: s.merchant_capacity + merchant_cap_used}
            })})
        }
        else if (type === 'foreign') {
            setFederal({...federal,foreign_powers: federal.foreign_powers.map(fp => fp.name === partner ? {...fp, trade_deals: fp.trade_deals.filter(td => td.trade_id !== trade_id)} : fp)})
        }
        else if (type === 'federal') {
            setFederal({...federal,trade_deals: federal.trade_deals.filter(td => td.trade_id !== trade_id)})
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
                    foreignPowers={Object.values(federal.foreign_powers)} 
                    settlements={federal.settlements.filter(s => s.name !== settlement.name)} 
                    currentStock={settlement.stock} 
                    merchantCapacity={settlement.merchant_capacity} 
                    prices={settlement.prices} 
                    currentChange={roundGoods(settlementChange(settlement))}
                    updateFunc={createTradeDeal}
                    isFederal={false}
                    federalReserve={federal.reserve}
                    federalChange={FederalChange(federal)}
                    federalPrices={federal.prices}
                    federalMerchantCap={federal.merchant_capacity}
                    handleAcceptDeal={handleAcceptDeal}
                    handleDeclineDeal={handleDeclineDeal}
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
                    settlements={federal.settlements} 
                    updateFunc={loanTaken} 
                    declareBankruptcy={declareBankruptcy}
                />
            </Dialog>
        </div>
    )
}
