import { FaBeer } from "react-icons/fa";
import FoodIconTT from "../goods/FoodIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ArtisanalIconTT from "../goods/ArtisanalIconTT";
import ToolsIconTT from "../goods/ToolsIconTT";
import ArmsIconTT from "../goods/ArmsIconTT";
import EnchantedArmsTT from "../goods/EnchantedArmsTT";
import MoneyIconTT from "../goods/MoneyIconTT";
import ToolTips from "../TT";
import ForestersIconTT from "../clans/ForestersIconTT";
export default function BugmansRangersIconTT() {
    return <ToolTips 
        hover={<FaBeer/>}
        body={<>
            <b>Bugman's Rangers</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisanalIconTT/>
                <ToolsIconTT/>
                <ArmsIconTT/>
                <EnchantedArmsTT/>
                <MoneyIconTT/>
            </div>
            <div className="text-sm">
                <p>Pops Consumed: 40</p>
                <p>Turns to Levy: 3</p>
                <div className="flex flex-row gap-1">
                    <p>Clan Type: </p>
                    <ForestersIconTT/>
                </div>
            </div>
        </>}/>
} 