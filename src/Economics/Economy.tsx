import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";
import { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import DisplayGoods from "../components/goodsDislay";
import { addGoods, empty_goodsdist, goodsdist, roundGoods, scaleGoods } from "../Goods/GoodsDist";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../utilities/SaveData";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "./pricing/PriceChart";

export default function Economy () {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements,setSettlements] = useState<SettlementInterface[]>([])
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [changeGoods,setChangeGoods] = useState<goodsdist>({...empty_goodsdist});
    const [prices,setPrices] = useState<goodsdist>({...empty_goodsdist})
    const [priceHistory,setPriceHistory] = useState<goodsdist[]>([])
    const [merchantCapacity,setMerchantCapacity] = useState<number>(0);

    const getInfo = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        store.get<goodsdist>('Federal Prices').then(value => {if (value) {setPrices(value)}})
        store.get<goodsdist[]>('Price History').then(value => {if (value) {setPriceHistory(value);}})
        store.get<number>('Merchant Capacity').then(value => {if (value) {setMerchantCapacity(value)}});
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

    return(
        <div className="flex flex-column gap-2">
            <Button label="Go Back" icon='pi pi-angle-double-left'/>
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
            </Panel>
        </div>
    )
}