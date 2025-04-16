import { FaTree } from "react-icons/fa";
import FoodIconTT from "../goods/FoodIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ArtisinalIconTT from "../goods/ArtisinalIconTT";
import ToolsIconTT from "../goods/ToolsIconTT";
import ArmsIconTT from "../goods/ArmsIconTT";
import MoneyIconTT from "../goods/MoneyIconTT";
import ToolTips from "../TT";
import ForestersIconTT from "../clans/ForestersIconTT";
export default function RangersIconTT() {
    return <ToolTips 
        hover={<FaTree/>}
        body={<>
            <b>Backwoods Scrappers</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisinalIconTT/>
                <ToolsIconTT/>
                <ArmsIconTT/>
                <MoneyIconTT/>
            </div>
            <div className="text-sm">
                <p>Pops Consumed: 20</p>
                <p>Turns to Levy: 2</p>
                <div className="flex flex-row gap-1">
                    <p>Clan Type: </p>
                    <ForestersIconTT/>
                </div>
            </div>
        </>}/>
} 