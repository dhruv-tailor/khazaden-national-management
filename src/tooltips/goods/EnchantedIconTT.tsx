import { GiCrystalBall } from "react-icons/gi";
import ToolTips from "../TT";

export default function EnchantedIconTT() {
    return <ToolTips 
        hover={<GiCrystalBall/>}
        body={<>
            <b>Enchanted Luxuries</b>
            <p>Consumed by: Rulers</p>
            <p>Produced by: Rune Smiths</p>
        </>}
    />
}