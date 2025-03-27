import ArtisinalIconTT from "../goods/ArtisinalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ToolTips from "../TT";
import ToolsIconTT from "../goods/ToolsIconTT";
import { RiCriminalFill } from "react-icons/ri";

export default function CriminalsIconTT() {

    return <ToolTips 
        hover={<RiCriminalFill/>}
        body={<>
            <b>Criminals (Zaharn)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisinalIconTT/>
                <ToolsIconTT/>
            </div>
        </>}/>
}