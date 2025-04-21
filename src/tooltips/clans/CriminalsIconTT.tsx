import ArtisanalIconTT from "../goods/ArtisanalIconTT";
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
                <ArtisanalIconTT/>
                <ToolsIconTT/>
            </div>
        </>}/>
}