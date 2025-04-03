import { GiRuneStone } from "react-icons/gi";
import ToolTips from "../TT";
import ArchivistsIconTT from "../clans/ArchivistsIconTT";
import EngineersIconTT from "../clans/EngineersIconTT";
import ClericsIconTT from "../clans/ClericsIconTT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";

export default function RunesIconTT() {
    return <ToolTips 
        hover={<GiRuneStone/>}
        body={<>
            <b>Runes</b>
            <div className="flex flex-row gap-1">
                Consumed by:
                <ArchivistsIconTT/>
                <EngineersIconTT/>
                <ClericsIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produced by:
                <RuneSmithsIconTT/>
            </div>
        </>}
    />
}