import { useNavigate, useParams } from "react-router"
import { saveLocation } from "../../utilities/SaveData";
import { load } from "@tauri-apps/plugin-store";
import { emptySettlement, SettlementInterface } from "../SettlementInterface";
import { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import ClanInfo from "./ClanInfo";
import { BiSolidCrown } from "react-icons/bi";
import { FaArchive, FaGem, FaHammer  } from "react-icons/fa";
import { MdEngineering, MdChurch } from "react-icons/md";
import { GiBlacksmith, GiFarmer, GiAxeInStump, GiBeerStein, GiWoodPile, GiThrownCharcoal, GiCoalWagon, GiGems, GiClothes } from "react-icons/gi";
import { TbMoneybag, TbPick } from "react-icons/tb";
import { RiCriminalFill } from "react-icons/ri";
import ShowAllGoods from "./ShowAllGoods";
import { LuSword } from "react-icons/lu";
import { Button } from "primereact/button";
import { IoFastFood } from "react-icons/io5";
import { PiCowFill } from "react-icons/pi";

export default function SettlementDetailed() {
    const gameId = useParams().game
    let navigate = useNavigate();
    const settlementId = useParams().settlement
    const [settlement, setSettlement] = useState<SettlementInterface>(emptySettlement);

    const [food,setFood] = useState(settlement.food_and_water.production_cap)
    const [beer,setBeer] = useState(settlement.beer.production_cap)
    const [leather,setLeather] = useState(settlement.leather_and_textiles.production_cap)
    const [livestock, setLivestock] = useState(settlement.livestock.production_cap)
    const [timber, setTimber] = useState(settlement.timber.production_cap)
    const [charcoal, setCharcoal] = useState(settlement.enchanted_charcoal.production_cap)
    const [commonOres, setCommonOres] = useState(settlement.common_ores.production_cap)
    const [gems, setGems] = useState(settlement.gems.production_cap)
    const [rareOres, setRareOres] = useState(settlement.rare_ores.production_cap)

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

    useEffect(() => {
        setFood(
            settlement.food_and_water.production_cap - 
            (settlement.farmers.food_and_water.produced + settlement.foresters.food_and_water.produced)
        )
        setBeer(settlement.beer.production_cap - settlement.farmers.beer.produced)
        setLeather(settlement.leather_and_textiles.production_cap - settlement.farmers.leather_and_textiles.produced)
        setLivestock(settlement.livestock.production_cap - settlement.farmers.livestock.produced)
        setTimber(settlement.timber.production_cap - settlement.foresters.timber.produced)
        setCharcoal(settlement.enchanted_charcoal.production_cap - settlement.foresters.enchanted_charcoal.produced)
        setCommonOres(settlement.common_ores.production_cap - settlement.miners.common_ores.produced)
        setGems(settlement.gems.production_cap - settlement.miners.gems.produced)
        setRareOres(settlement.rare_ores.production_cap - settlement.miners.rare_ores.produced)
        getSettlementData()
    },[settlement])

    return(
        <div className="flex flex-column gap-2">
                <Button label={'Back to All Settlements'} icon="pi pi-arrow-left" size='small' onClick={goBack}/>

                <div className="flex flex-row gap-2">

                    <Panel header={'Current resources'} toggleable>
                        <ShowAllGoods settlement={settlement}/>
                    </Panel>

                    <Panel header={'Available Natural Resources'} toggleable>
                        <div className="flex flex-row flex-wrap gap-2">
                            <div className="flex flex-row gap-1">
                                <IoFastFood />
                                {food}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiBeerStein />
                                {beer}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiClothes />
                                {leather}
                            </div>
                            <div className="flex flex-row gap-1">
                                <PiCowFill />
                                {livestock}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiWoodPile />
                                {timber}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiThrownCharcoal />
                                {charcoal}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiCoalWagon />
                                {commonOres}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiGems />
                                {gems}
                            </div>
                            <div className="flex flex-row gap-1">
                                <FaGem />
                                {rareOres}
                            </div>
                        </div>
                    </Panel>

                </div>


                <Panel header={'Clans'} toggleable>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {settlement.rulers.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.rulers}
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<BiSolidCrown/>}/> : null}
                        {settlement.archivists.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.archivists} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<FaArchive/>}/> : null}
                        {settlement.engineers.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.engineers}
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<MdEngineering/>}/> : null}
                        {settlement.rune_smiths.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.rune_smiths}
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<GiBlacksmith/>}/> : null}
                        {settlement.craftsmen.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.craftsmen} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<FaHammer/>}/> : null}
                        {settlement.merchants.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.merchants} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<TbMoneybag/>}/> : null}
                        {settlement.clerics.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.clerics} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<MdChurch/>}/> : null}
                        {settlement.miners.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.miners} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<TbPick/>}/> : null}
                        {settlement.farmers.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.farmers} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<GiFarmer/>}/> : null}
                        {settlement.warriors.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.warriors} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<LuSword/>}/> : null}
                        {settlement.foresters.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.foresters} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<GiAxeInStump/>}/> : null}
                        {settlement.criminals.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.criminals} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<RiCriminalFill/>}/> : null}
                    </div>
                </Panel>
        </div>
        
    )
}
