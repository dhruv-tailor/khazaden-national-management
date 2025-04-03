import ArtisinalIconTT from "../goods/ArtisinalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ToolTips from "../TT";
import ToolsIconTT from "../goods/ToolsIconTT";
import LivestockIconTT from "../goods/LivestockIconTT";
import { GiFarmer } from "react-icons/gi";

export default function FarmersIconTT() {

    return <ToolTips
        hover={<GiFarmer/>}
        body={<>
            <b>Farmers (Zaram)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisinalIconTT/>
                <ToolsIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produces:
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <LivestockIconTT/>
            </div>
        </>}/>
}