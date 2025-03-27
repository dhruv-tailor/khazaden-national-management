import { PiCowFill } from "react-icons/pi";
import ToolTips from "../TT";
import RulersIconTT from "../clans/RulersIconTT";
import ArchivistsIconTT from "../clans/ArchivistsIconTT";
import EngineersIconTT from "../clans/EngineersIconTT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";
import MerchantsIconTT from "../clans/MerchantsIconTT";
import FarmersIconTT from "../clans/FarmersIconTT";

export default function LivestockIconTT() {
    return <ToolTips 
        hover={<PiCowFill/>}
        body={<>
            <b>Livestock</b>
            <div className="flex flex-row gap-1">
                Consumed by: <RulersIconTT/>
                <ArchivistsIconTT/>
                <EngineersIconTT/>
                <RuneSmithsIconTT/>
                <MerchantsIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produced by:
                <FarmersIconTT/>
            </div>
        </>}
    />
}