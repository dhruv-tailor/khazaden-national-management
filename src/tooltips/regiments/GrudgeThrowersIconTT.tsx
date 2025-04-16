import { FaCrosshairs } from "react-icons/fa";
import FoodIconTT from "../goods/FoodIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ArtisinalIconTT from "../goods/ArtisinalIconTT";
import OrnamentalIconTT from "../goods/OrnamentalIconTT";
import ToolsIconTT from "../goods/ToolsIconTT";
import ArmsIconTT from "../goods/ArmsIconTT";
import LivestockIconTT from "../goods/LivestockIconTT";
import RunesIconTT from "../goods/RunesIconTT";
import BooksIconTT from "../goods/BooksIconTT";
import MoneyIconTT from "../goods/MoneyIconTT";
import ToolTips from "../TT";
import EngineersIconTT from "../clans/EngineersIconTT";
export default function GrudgeThrowersIconTT() {
    return <ToolTips 
        hover={<FaCrosshairs/>}
        body={<>
            <b>Wall Renderers</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisinalIconTT/>
                <OrnamentalIconTT/>
                <ToolsIconTT/>
                <ArmsIconTT/>
                <LivestockIconTT/>
                <RunesIconTT/>
                <BooksIconTT/>
                <MoneyIconTT/>
            </div>
            <div className="text-sm">
                <p>Pops Consumed: 4</p>
                <p>Turns to Levy: 3</p>
                <div className="flex flex-row gap-1">
                    <p>Clan Type: </p>
                    <EngineersIconTT/>
                </div>
            </div>
        </>}/>
} 