import { useParams } from "react-router"
import { saveLocation } from "../../utilities/SaveData";
import { load } from "@tauri-apps/plugin-store";
import { emptySettlement, SettlementInterface } from "../SettlementInterface";
import { useEffect, useState } from "react";
import { IoFastFood  } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { GiBeerStein, GiClothes, GiWoodPile, GiThrownCharcoal,GiCoalWagon, GiGems, GiPouringChalice, GiCrystalBall, GiRuneStone, GiMagicShield } from "react-icons/gi";
import { PiCowFill } from "react-icons/pi";
import { FaGem, FaTools, FaBriefcaseMedical, FaBook, FaShieldAlt } from "react-icons/fa";
import { LuHandCoins, LuSword } from "react-icons/lu";
import PlusMinus from '../../components/PlusMinus';
import { Panel } from "primereact/panel";
import ClanInfo from "./ClanInfo";
import { BiSolidCrown } from "react-icons/bi";
import { FaArchive, FaHammer  } from "react-icons/fa";
import { MdEngineering, MdChurch } from "react-icons/md";
import { GiBlacksmith, GiFarmer, GiAxeInStump } from "react-icons/gi";
import { TbMoneybag, TbPick } from "react-icons/tb";
import { RiCriminalFill } from "react-icons/ri";

export default function SettlementDetailed() {
    const gameId = useParams().game
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

    useEffect(() => {
        getSettlementData()
    },[])

    return(
        <div className="flex flex-column gap-2">
        <Panel header={'Current resources'} toggleable>
            <div className="flex flex-row gap-2 flex-wrap">
                <div className='flex flex-row gap-1'>
                    <IoFastFood/>
                    {settlement.food_and_water.stock}
                    <PlusMinus value={-settlement.food_and_water.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiBeerStein/>
                    {settlement.beer.stock}
                    <PlusMinus value={-settlement.beer.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiClothes/>
                    {settlement.leather_and_textiles.stock}
                    <PlusMinus value={-settlement.leather_and_textiles.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <LuHandCoins/>
                    {settlement.artisinal_goods.stock}
                    <PlusMinus value={-settlement.artisinal_goods.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <PiCowFill/>
                    {settlement.livestock.stock}
                    <PlusMinus value={-settlement.livestock.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiPouringChalice />
                    {settlement.ornamental_luxuries.stock}
                    <PlusMinus value={-settlement.ornamental_luxuries.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiCrystalBall />
                    {settlement.enchanted_luxuries.stock}
                    <PlusMinus value={-settlement.enchanted_luxuries.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiWoodPile />
                    {settlement.timber.stock}
                    <PlusMinus value={-settlement.timber.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <FaTools />
                    {settlement.tools.stock}
                    <PlusMinus value={-settlement.tools.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiThrownCharcoal />
                    {settlement.enchanted_charcoal.stock}
                    <PlusMinus value={-settlement.enchanted_charcoal.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiCoalWagon />
                    {settlement.common_ores.stock}
                    <PlusMinus value={-settlement.common_ores.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <FaBriefcaseMedical />
                    {settlement.medical_supplies.stock}
                    <PlusMinus value={-settlement.medical_supplies.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiGems />
                    {settlement.gems.stock}
                    <PlusMinus value={-settlement.gems.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <FaGem />
                    {settlement.rare_ores.stock}
                    <PlusMinus value={-settlement.rare_ores.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <FaBook />
                    {settlement.books.stock}
                    <PlusMinus value={-settlement.books.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiRuneStone />
                    {settlement.runes.stock}
                    <PlusMinus value={-settlement.runes.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <FaShieldAlt />
                    {settlement.armaments.stock}
                    <PlusMinus value={-settlement.armaments.consumption_rate}/>
                </div>
                <div className='flex flex-row gap-1'>
                    <GiMagicShield />
                    {settlement.enchanted_armaments.stock}
                    <PlusMinus value={-settlement.enchanted_armaments.consumption_rate}/>
                </div>
            </div>
        </Panel>
        <Panel header={'Clans'} toggleable>
            <div className="flex flex-row gap-2 flex-wrap">
                <ClanInfo clan={settlement.rulers} icon={<BiSolidCrown/>}/>
                <ClanInfo clan={settlement.archivists} icon={<FaArchive/>}/>
                <ClanInfo clan={settlement.engineers} icon={<MdEngineering/>}/>
                <ClanInfo clan={settlement.rune_smiths} icon={<GiBlacksmith/>}/>
                <ClanInfo clan={settlement.craftsmen} icon={<FaHammer />}/>
                <ClanInfo clan={settlement.merchants} icon={<TbMoneybag />}/>
                <ClanInfo clan={settlement.clerics} icon={<MdChurch />}/>
                <ClanInfo clan={settlement.miners} icon={<TbPick />}/>
                <ClanInfo clan={settlement.farmers} icon={<GiFarmer/>}/>
                <ClanInfo clan={settlement.warriors} icon={<LuSword/>}/>
                <ClanInfo clan={settlement.foresters} icon={<GiAxeInStump />}/>
                <ClanInfo clan={settlement.criminals} icon={<RiCriminalFill/>}/>
            </div>
        </Panel>
        </div>
    )
}
