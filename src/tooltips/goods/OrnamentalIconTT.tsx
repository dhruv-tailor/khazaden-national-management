import { GiPouringChalice } from "react-icons/gi";
import ToolTips from "../TT";
import RulersIconTT from "../clans/RulersIconTT";
import ArchivistsIconTT from "../clans/ArchivistsIconTT";
import EngineersIconTT from "../clans/EngineersIconTT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";
import CraftsmenIconTT from "../clans/CraftsmenIconTT";
import MerchantsIconTT from "../clans/MerchantsIconTT";
import ClericsIconTT from "../clans/ClericsIconTT";

export default function OrnamentalIconTT() {
    return <ToolTips 
            hover={<GiPouringChalice/>}
            body={<>
                <b>Ornamental Luxuries</b>
                <div className="flex flex-row gap-1">
                    Consumed by:
                    <RulersIconTT/>
                    <ArchivistsIconTT/>
                    <EngineersIconTT/>
                    <RuneSmithsIconTT/>
                    <CraftsmenIconTT/>
                    <MerchantsIconTT/>
                    <ClericsIconTT/>
                </div>
                <div className="flex flex-row gap-1">
                    Produced by:
                    <CraftsmenIconTT/>
                </div>
            </>}
        />
}