import { FaTools } from "react-icons/fa";
import ToolTips from "../TT";
import MinersIconTT from "../clans/MinersIconTT";
import FarmersIconTT from "../clans/FarmersIconTT";
import ForestersIconTT from "../clans/ForestersIconTT";
import WarriorsIconTT from "../clans/WarriorsIconTT";
import CriminalsIconTT from "../clans/CriminalsIconTT";
import CraftsmenIconTT from "../clans/CraftsmenIconTT";

export default function ToolsIconTT() {
    return <ToolTips 
        hover={<FaTools/>}
        body={<>
            <b>Timber</b>
            <div className="flex flex-row gap-1">
                Consumed by:
                <MinersIconTT/>
                <FarmersIconTT/>
                <ForestersIconTT/>
                <WarriorsIconTT/>
                <CriminalsIconTT/>
                </div>
            <div className="flex flex-row gap-1">
                Produced by:
                <CraftsmenIconTT/>
            </div>
        </>}
    />
}