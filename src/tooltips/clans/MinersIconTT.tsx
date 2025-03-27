import ArtisinalIconTT from "../goods/ArtisinalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import ToolTips from "../TT";
import { TbPick } from "react-icons/tb";
import ToolsIconTT from "../goods/ToolsIconTT";
import CommonOresIconTT from "../goods/CommonOresTT";
import RareOresIconTT from "../goods/RareOresIconTT";
import GemsIconTT from "../goods/GemsIconTT";

export default function MinersIconTT() {

    return <ToolTips
        hover={<TbPick/>}
        body={<>
            <b>Miners (Felak)</b>
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
                <CommonOresIconTT/>
                <RareOresIconTT/>
                <GemsIconTT/>
            </div>
        </>}/>
}