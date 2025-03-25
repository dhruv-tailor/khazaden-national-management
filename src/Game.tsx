import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { SettlementInterface } from "./Settlement/SettlementInterface/SettlementInterface";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";
import { addGoods, empty_goodsdist, goodsdist, roundGoods, scaleGoods } from "./Goods/GoodsDist";
import { Panel } from "primereact/panel";

export default function Game() {
    const gameId = useParams().game
    let navigate = useNavigate();

    const [settlements,setSettlements] = useState<SettlementInterface[]>([])

    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});
    const [changeGoods,setChangeGoods] = useState<goodsdist>(empty_goodsdist);
    
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
            return settlement.clans.map(clan => clan.tax_rate * clan.taxed_productivity).reduce((sum,val) => sum + val) * settlement.settlement_tax
         }).reduce((sum,val) => sum + val))

         setChangeGoods(change_reserve)
    }

    useEffect(() => {
        getSettlements()
    },[])
    
    return(
    <div className="flex flex-column gap-2">
        <Panel header="Federal Reserve" toggleable>
            TEST
        </Panel>
    </div>
    )
}