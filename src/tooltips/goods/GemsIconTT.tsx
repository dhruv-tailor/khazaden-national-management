import { GiGems } from "react-icons/gi";
import ToolTips from "../TT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";
import CraftsmenIconTT from "../clans/CraftsmenIconTT";
import MinersIconTT from "../clans/MinersIconTT";

export default function GemsIconTT() {
    return <ToolTips 
        hover={<GiGems/>}
        body={<>
            <b>Gems</b>
            <div className="flex flex-row gap-1">
                Consumed by:
                <RuneSmithsIconTT/>
                <CraftsmenIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produced by:
                <MinersIconTT/>
            </div>
        </>}
    />
}