import { IoFastFood } from "react-icons/io5";
import ToolTips from "../TT";
import FarmersIconTT from "../clans/FarmersIconTT";
import ForestersIconTT from "../clans/ForestersIconTT";

export default function FoodIconTT() {
    return <ToolTips 
        hover={<IoFastFood/>}
        body={<>
            <b>Food and Water</b>
            <p>Consumed by everyone to survive</p>
            <div className="flex flex-row gap-1">
                Produced by:
                <FarmersIconTT/>
                <ForestersIconTT/>
            </div>
        </>}
    />
}