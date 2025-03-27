import { GiCoalWagon } from "react-icons/gi";
import ToolTips from "../TT";
import CraftsmenIconTT from "../clans/CraftsmenIconTT";
import MinersIconTT from "../clans/MinersIconTT";

export default function CommonOresIconTT() {
    return <ToolTips 
        hover={<GiCoalWagon/>}
        body={<>
            <b>Common Ores</b>
            <div className="flex flex-row gap-1">
                Consumed by:
                <CraftsmenIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produced by:
                <MinersIconTT/>
            </div>
        </>}
    />
}