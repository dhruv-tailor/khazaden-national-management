import { FaArchive } from "react-icons/fa";
import ArtisanalIconTT from "../goods/ArtisanalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import BooksIconTT from "../goods/BooksIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import LivestockIconTT from "../goods/LivestockIconTT";
import OrnamentalIconTT from "../goods/OrnamentalIconTT";
import RareOresIconTT from "../goods/RareOresIconTT";
import RunesIconTT from "../goods/RunesIconTT";
import ToolTips from "../TT";

export default function ArchivistsIconTT() {

    return <ToolTips 
        hover={<FaArchive/>}
        body={<>
            <b>Archivists (Mazar)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisanalIconTT/>
                <OrnamentalIconTT/>
                <LivestockIconTT/>
                <RareOresIconTT/>
                <RunesIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produces:
                <BooksIconTT/>
            </div>
        </>}/>
}