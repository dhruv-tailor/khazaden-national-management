import { GiCrystalBall } from "react-icons/gi";
import ToolTips from "../TT";
import RulersIconTT from "../clans/RulersIconTT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";

export default function EnchantedIconTT() {
    return <ToolTips 
        hover={<GiCrystalBall/>}
        body={<>
            <b>Enchanted Luxuries</b>
            <div className="flex flex-row gap-1">
                Consumed by:
                <RulersIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produced by:
                <RuneSmithsIconTT/>
            </div>
        </>}
    />
}