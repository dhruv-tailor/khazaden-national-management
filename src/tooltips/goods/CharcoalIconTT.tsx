import { GiThrownCharcoal } from "react-icons/gi";
import ToolTips from "../TT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";
import ForestersIconTT from "../clans/ForestersIconTT";

export default function CharcoalIconTT() {
    return <ToolTips 
        hover={<GiThrownCharcoal/>}
        body={<>
            <b>Enchanted Charcoal</b>
            <div className="flex flex-row gap-1">
                Consumed by: 
                <RuneSmithsIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produced by:
                <ForestersIconTT/>
            </div>
        </>}
    />
}