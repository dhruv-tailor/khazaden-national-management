import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { SettlementInterface } from "../Settlement/SettlementInterface";
import { useEffect, useState } from "react";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../utilities/SaveData";
import { empty_goodsdist, goodsdist } from "../components/ResourceDistribution";
import { Panel } from "primereact/panel";
import { FaCoins, FaTools, FaBriefcaseMedical, FaGem, FaShieldAlt, FaBook } from "react-icons/fa";
import { GiBeerStein, GiClothes, GiPouringChalice, GiCrystalBall, GiWoodPile, GiCoalWagon, GiGems, GiRuneStone, GiMagicShield, GiThrownCharcoal } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { LuHandCoins } from "react-icons/lu";
import { PiCowFill } from "react-icons/pi";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "./PriceChart";

export default function Economy() {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);
    const [federalPrices,setFederalPrices] = useState<goodsdist>({...empty_goodsdist});
    const [priceHistory,setPriceHistory] = useState<goodsdist[]>([])
    const [reserveGoods,setReserveGoods] = useState<goodsdist>({...empty_goodsdist});

    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        store.get<goodsdist>('Federal Prices').then(value => {if (value) {setFederalPrices(value);}})
        store.get<goodsdist[]>('Price History').then(value => {if (value) {setPriceHistory(value);}})
        const settlements = await store.get<SettlementInterface[]>('settlements');
        if (settlements) {
            setSettlements(settlements);
        }
    }

    useEffect(() => {
        getSettlements();
        
    }, []);

    return (
        <div className="flex flex-column gap-2">
            <Button label='Go Back' icon='pi pi-angle-double-left' onClick={()=>{
                navigate(`/game/${gameId}`)
                }}/>
            <div className="flex flex-row gap-1">
                <Panel header="Federal Reserve" toggleable>
                    <div className="flex flex-row flex-wrap gap-2">
                        <div className="flex flex-row gap-1">
                            <FaCoins/>
                            {reserveGoods.money}
                        </div>
                        <div className="flex flex-row gap-1">
                            <IoFastFood/>
                            {reserveGoods.food}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiBeerStein/>
                            {reserveGoods.beer}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiClothes/>
                            {reserveGoods.leather}
                        </div>
                        <div className="flex flex-row gap-1">
                            <LuHandCoins/>
                            {reserveGoods.artisinal}
                        </div>
                        <div className="flex flex-row gap-1">
                            <PiCowFill/>
                            {reserveGoods.livestock}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiPouringChalice/>
                            {reserveGoods.ornamental}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiCrystalBall/>
                            {reserveGoods.enchanted}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiWoodPile/>
                            {reserveGoods.timber}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaTools/>
                            {reserveGoods.tools}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiCoalWagon/>
                            {reserveGoods.common_ores}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaBriefcaseMedical/>
                            {reserveGoods.medical}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaGem/>
                            {reserveGoods.rare_ores}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiGems/>
                            {reserveGoods.gems}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiRuneStone/>
                            {reserveGoods.runes}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaShieldAlt/>
                            {reserveGoods.arms}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaBook/>
                            {reserveGoods.books}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiMagicShield/>
                            {reserveGoods.enchanted_arms}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiThrownCharcoal/>
                            {reserveGoods.charcoal}
                        </div>
                    </div>
                </Panel>
                <Panel header='Prices' toggleable>
                <div className="flex flex-row flex-wrap gap-2">
                        <div className="flex flex-row gap-1">
                            <IoFastFood/>
                            {Math.round(federalPrices.food)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiBeerStein/>
                            {Math.round(federalPrices.beer)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiClothes/>
                            {Math.round(federalPrices.leather)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <LuHandCoins/>
                            {Math.round(federalPrices.artisinal)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <PiCowFill/>
                            {Math.round(federalPrices.livestock)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiPouringChalice/>
                            {Math.round(federalPrices.ornamental)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiCrystalBall/>
                            {Math.round(federalPrices.enchanted)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiWoodPile/>
                            {Math.round(federalPrices.timber)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaTools/>
                            {Math.round(federalPrices.tools)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiCoalWagon/>
                            {Math.round(federalPrices.common_ores)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaBriefcaseMedical/>
                            {Math.round(federalPrices.medical)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaGem/>
                            {Math.round(federalPrices.rare_ores)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiGems/>
                            {Math.round(federalPrices.gems)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiRuneStone/>
                            {Math.round(federalPrices.runes)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaShieldAlt/>
                            {Math.round(federalPrices.arms)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <FaBook/>
                            {Math.round(federalPrices.books)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiMagicShield/>
                            {Math.round(federalPrices.enchanted_arms)}
                        </div>
                        <div className="flex flex-row gap-1">
                            <GiThrownCharcoal/>
                            {Math.round(federalPrices.charcoal)}
                        </div>
                    </div>
                </Panel>
            </div>
            <div>
                <PriceChart data={priceChartDataProp(priceHistory,federalPrices)} options={priceChartOptionsProp()}/>
            </div>
        </div>
    )
}