import { useNavigate, useParams } from "react-router"
import { saveLocation } from "../../utilities/SaveData";
import { load } from "@tauri-apps/plugin-store";
import { emptySettlement, SettlementInterface } from "../SettlementInterface";
import { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import ClanInfo from "./ClanInfo";
import { BiSolidCrown } from "react-icons/bi";
import { FaArchive, FaHammer  } from "react-icons/fa";
import { MdEngineering, MdChurch } from "react-icons/md";
import { GiBlacksmith, GiFarmer, GiAxeInStump } from "react-icons/gi";
import { TbMoneybag, TbPick } from "react-icons/tb";
import { RiCriminalFill } from "react-icons/ri";
import ShowAllGoods from "./ShowAllGoods";
import { LuSword } from "react-icons/lu";
import { Button } from "primereact/button";

export default function SettlementDetailed() {
    const gameId = useParams().game
    let navigate = useNavigate();
    const settlementId = useParams().settlement
    const [settlement, setSettlement] = useState<SettlementInterface>(emptySettlement);

    const getSettlementData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        const current_settlement = settlements?.find(settlement => settlement.name === settlementId)
        if(current_settlement) {
            setSettlement(current_settlement)
        }
    }

    const goBack = () => {
        navigate(`/game/${gameId}`)
    }

    useEffect(() => {
        getSettlementData()
    },[])



    return(
        <div className="flex flex-column gap-2">
                <Button label={'Back to All Settlements'} icon="pi pi-arrow-left" size='small' onClick={goBack}/>
                <Panel header={'Current resources'} toggleable>
                    <ShowAllGoods settlement={settlement}/>
                </Panel>
                <Panel header={'Clans'} toggleable>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {settlement.rulers.population > 0 ? <ClanInfo clan={settlement.rulers} icon={<BiSolidCrown/>}/> : null}
                        {settlement.archivists.population > 0 ? <ClanInfo clan={settlement.archivists} icon={<FaArchive/>}/> : null}
                        {settlement.engineers.population > 0 ? <ClanInfo clan={settlement.engineers} icon={<MdEngineering/>}/> : null}
                        {settlement.rune_smiths.population > 0 ? <ClanInfo clan={settlement.rune_smiths} icon={<GiBlacksmith/>}/> : null}
                        {settlement.craftsmen.population > 0 ? <ClanInfo clan={settlement.craftsmen} icon={<FaHammer/>}/> : null}
                        {settlement.merchants.population > 0 ? <ClanInfo clan={settlement.merchants} icon={<TbMoneybag/>}/> : null}
                        {settlement.clerics.population > 0 ? <ClanInfo clan={settlement.clerics} icon={<MdChurch/>}/> : null}
                        {settlement.miners.population > 0 ? <ClanInfo clan={settlement.miners} icon={<TbPick/>}/> : null}
                        {settlement.farmers.population > 0 ? <ClanInfo clan={settlement.farmers} icon={<GiFarmer/>}/> : null}
                        {settlement.warriors.population > 0 ? <ClanInfo clan={settlement.warriors} icon={<LuSword/>}/> : null}
                        {settlement.foresters.population > 0 ? <ClanInfo clan={settlement.foresters} icon={<GiAxeInStump/>}/> : null}
                        {settlement.criminals.population > 0 ? <ClanInfo clan={settlement.criminals} icon={<RiCriminalFill/>}/> : null}
                    </div>
                </Panel>
        </div>
        
    )
}
