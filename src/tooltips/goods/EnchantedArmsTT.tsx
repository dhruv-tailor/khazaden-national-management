import { GiMagicShield } from "react-icons/gi";
import ToolTips from "../TT";

export default function EnchantedArmsIconTT() {
   return <ToolTips 
        hover={<GiMagicShield/>}
        body={<>
            <b>Enchanted Armaments</b>
            <p>Consumed by: Army</p>
            <p>Produced by: Rune Smiths</p>
        </>}
    />
}