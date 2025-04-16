import { FaShieldAlt } from "react-icons/fa";
import FoodIconTT from "../goods/FoodIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ArtisinalIconTT from "../goods/ArtisinalIconTT";
import ToolsIconTT from "../goods/ToolsIconTT";
import ArmsIconTT from "../goods/ArmsIconTT";
import EnchantedArmsTT from "../goods/EnchantedArmsTT";
import MedicalIconTT from "../goods/MedicalIconTT";
import LivestockIconTT from "../goods/LivestockIconTT";
import MoneyIconTT from "../goods/MoneyIconTT";
import ToolTips from "../TT";
import WarriorsIconTT from "../clans/WarriorsIconTT";

export default function IronbreakersIconTT() {
    return <ToolTips 
        hover={<FaShieldAlt/>}
        body={<>
            <b>The Adamantine Guard</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisinalIconTT/>
                <ToolsIconTT/>
                <ArmsIconTT/>
                <EnchantedArmsTT/>
                <MedicalIconTT/>
                <LivestockIconTT/>
                <MoneyIconTT/>
            </div>
            <div className="text-sm">
                <p>Pops Consumed: 20</p>
                <p>Turns to Levy: 6</p>
                <div className="flex flex-row gap-1">
                    <p>Clan Type: </p>
                    <WarriorsIconTT/>
                </div>
            </div>
        </>}/>
} 