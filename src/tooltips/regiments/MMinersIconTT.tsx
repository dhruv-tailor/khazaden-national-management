import { FaHardHat } from "react-icons/fa";
import FoodIconTT from "../goods/FoodIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ArtisanalIconTT from "../goods/ArtisanalIconTT";
import ToolsIconTT from "../goods/ToolsIconTT";
import MedicalIconTT from "../goods/MedicalIconTT";
import LivestockIconTT from "../goods/LivestockIconTT";
import RunesIconTT from "../goods/RunesIconTT";
import BooksIconTT from "../goods/BooksIconTT";
import MoneyIconTT from "../goods/MoneyIconTT";
import ToolTips from "../TT";
import FarmersIconTT from "../clans/FarmersIconTT";
export default function MMinersIconTT() {
    return <ToolTips 
        hover={<FaHardHat/>}
        body={<>
            <b>Grain Guards</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisanalIconTT/>
                <ToolsIconTT/>
                <MedicalIconTT/>
                <LivestockIconTT/>
                <RunesIconTT/>
                <BooksIconTT/>
                <MoneyIconTT/>
            </div>
            <div className="text-sm">
                <p>Pops Consumed: 20</p>
                <p>Turns to Levy: 1</p>
                <div className="flex flex-row gap-1">
                    <p>Clan Type: </p>
                    <FarmersIconTT/>
                </div>
            </div>
        </>}/>
} 