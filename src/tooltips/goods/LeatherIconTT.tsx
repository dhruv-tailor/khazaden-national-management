import { GiClothes } from "react-icons/gi";
import ToolTips from "../TT";
import FarmersIconTT from "../clans/FarmersIconTT";

export default function LeatherIconTT() {
    return <ToolTips 
        hover={<GiClothes/>}
        body={<>
            <b>Leather & Textiles</b>
            <p>Consumed by everyone to survive</p>
            <div className="flex flex-row gap-1">
                Produced by:
                <FarmersIconTT/>
            </div>
        </>}
    />
}