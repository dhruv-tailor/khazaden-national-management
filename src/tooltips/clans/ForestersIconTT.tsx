import ArtisinalIconTT from "../goods/ArtisinalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ToolTips from "../TT";
import ToolsIconTT from "../goods/ToolsIconTT";
import { GiAxeInStump } from "react-icons/gi";
import TimberIconTT from "../goods/TimberIconTT";
import CharcoalIconTT from "../goods/CharcoalIconTT";

export default function ForestersIconTT() {

    return <ToolTips
        hover={<GiAxeInStump/>}
        body={<>
            <b>Foresters (Hund)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisinalIconTT/>
                <ToolsIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                produces:
                <ArtisinalIconTT/>
                <TimberIconTT/>
                <CharcoalIconTT/>
            </div>
        </>}/>
}