import { MdEngineering } from "react-icons/md";
import ArtisanalIconTT from "../goods/ArtisanalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import BooksIconTT from "../goods/BooksIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import LivestockIconTT from "../goods/LivestockIconTT";
import OrnamentalIconTT from "../goods/OrnamentalIconTT";
import RunesIconTT from "../goods/RunesIconTT";
import ToolTips from "../TT";

export default function EngineersIconTT() {

    return <ToolTips 
        hover={<MdEngineering/>}
        body={<>
            <b>Engineers (Kheled)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisanalIconTT/>
                <OrnamentalIconTT/>
                <LivestockIconTT/>
                <RunesIconTT/>
                <BooksIconTT/>
            </div>
        </>}/>
}