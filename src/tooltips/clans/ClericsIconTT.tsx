import ArtisanalIconTT from "../goods/ArtisanalIconTT";
import BeerIconTT from "../goods/BeerIconTT";
import FoodIconTT from "../goods/FoodIconTT";
import LeatherIconTT from "../goods/LeatherIconTT";
import OrnamentalIconTT from "../goods/OrnamentalIconTT";
import ToolTips from "../TT";
import RunesIconTT from "../goods/RunesIconTT";
import { MdChurch } from "react-icons/md";
import MedicalIconTT from "../goods/MedicalIconTT";
import BooksIconTT from "../goods/BooksIconTT";

export default function ClericsIconTT() {

    return <ToolTips
        hover={<MdChurch/>}
        body={<>
            <b>Clerics (Zigil)</b>
            <div className="flex flex-row gap-1">
                Consumes: 
                <FoodIconTT/>
                <BeerIconTT/>
                <LeatherIconTT/>
                <ArtisanalIconTT/>
                <OrnamentalIconTT/>
                <RunesIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produces:
                <MedicalIconTT/>
                <BooksIconTT/>
            </div>
        </>}/>
}