import ArtisanalIconTT from "../goods/ArtisanalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import BooksIconTT from "../goods/BooksIconTT";
import EnchantedIconTT from "../goods/EnchantedIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import LivestockIconTT from "../goods/LivestockIconTT";
import OrnamentalIconTT from "../goods/OrnamentalIconTT";
import ToolTips from "../TT";
import { BiSolidCrown } from "react-icons/bi";

export default function RulersIconTT() {

    return <ToolTips 
        hover={<BiSolidCrown/>}
        body={<>
            <b>Rulers (Uzbaden)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisanalIconTT/>
                <OrnamentalIconTT/>
                <LivestockIconTT/>
                <EnchantedIconTT/>
                <BooksIconTT/>
            </div>
        </>}/>
}