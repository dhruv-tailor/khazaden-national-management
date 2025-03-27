import ArtisinalIconTT from "../goods/ArtisinalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import BooksIconTT from "../goods/BooksIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import LivestockIconTT from "../goods/LivestockIconTT";
import OrnamentalIconTT from "../goods/OrnamentalIconTT";
import RunesIconTT from "../goods/RunesIconTT";
import ToolTips from "../TT";
import { GiBlacksmith } from "react-icons/gi";
import RareOresIconTT from "../goods/RareOresIconTT";
import GemsIconTT from "../goods/GemsIconTT";
import EnchantedIconTT from "../goods/EnchantedIconTT";
import EnchantedArmsIconTT from "../goods/EnchantedArmsTT";

export default function RuneSmithsIconTT() {

    return <ToolTips 
        hover={<GiBlacksmith/>}
        body={<>
            <b>Rune Smiths (Kibil)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisinalIconTT/>
                <OrnamentalIconTT/>
                <LivestockIconTT/>
                <RareOresIconTT/>
                <GemsIconTT/>
                <BooksIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produces:
                <EnchantedIconTT/>
                <RunesIconTT/>
                <EnchantedArmsIconTT/>
            </div>
        </>}/>
}