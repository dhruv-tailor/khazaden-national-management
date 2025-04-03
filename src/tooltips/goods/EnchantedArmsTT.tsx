import { GiMagicShield } from "react-icons/gi";
import ToolTips from "../TT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";

export default function EnchantedArmsIconTT() {
   return <ToolTips 
        hover={<GiMagicShield/>}
        body={<>
            <b>Enchanted Armaments</b>
            <p>Consumed by: Army</p>
            <div className="flex flex-row gap-1">
                Produced by:
                <RuneSmithsIconTT/>
            </div>
        </>}
    />
}