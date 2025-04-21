import ArtisanalIconTT from "../goods/ArtisanalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import OrnamentalIconTT from "../goods/OrnamentalIconTT";
import ToolTips from "../TT";
import LivestockIconTT from "../goods/LivestockIconTT";
import { TbMoneybag } from "react-icons/tb";

export default function MerchantsIconTT() {

    return <ToolTips 
        hover={<TbMoneybag/>}
        body={<>
            <b>Merchants (Baraz)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisanalIconTT/>
                <OrnamentalIconTT/>
                <LivestockIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Allows Trading
            </div>
        </>}/>
}