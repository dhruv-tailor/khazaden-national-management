import { GiClothes } from "react-icons/gi";
import ToolTips from "../TT";

export default function LeatherIconTT() {
    return <ToolTips 
        hover={<GiClothes/>}
        body={<>
            <b>Leather & Textiles</b>
            <p>Consumed by everyone to survive</p>
            <p>Produced by: Farmers</p>
        </>}
    />
}