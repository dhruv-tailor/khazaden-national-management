import ArtisanalIconTT from "../goods/ArtisanalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import OrnamentalIconTT from "../goods/OrnamentalIconTT";
import ToolTips from "../TT";
import GemsIconTT from "../goods/GemsIconTT";
import { FaHammer } from "react-icons/fa";
import TimberIconTT from "../goods/TimberIconTT";
import CommonOresIconTT from "../goods/CommonOresTT";
import ToolsIconTT from "../goods/ToolsIconTT";
import ArmsIconTT from "../goods/ArmsIconTT";

export default function CraftsmenIconTT() {

    return <ToolTips 
        hover={<FaHammer/>}
        body={<>
            <b>Craftsmen (Dush)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisanalIconTT/>
                <OrnamentalIconTT/>
                <TimberIconTT/>
                <CommonOresIconTT/>
                <GemsIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produces:
                <ArtisanalIconTT/>
                <OrnamentalIconTT/>
                <ToolsIconTT/>
                <ArmsIconTT/>
            </div>
        </>}/>
}