import { GiWoodPile } from "react-icons/gi";
import ToolTips from "../TT";
import CraftsmenIconTT from "../clans/CraftsmenIconTT";
import ForestersIconTT from "../clans/ForestersIconTT";

export default function TimberIconTT() {
    return <ToolTips 
        hover={<GiWoodPile/>}
        body={<>
            <b>Timber</b>
            <div className="flex flex-row gap-1">
                Consumed by:
                <CraftsmenIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produced by:
                <ForestersIconTT/>
            </div>
        </>}
    />
}