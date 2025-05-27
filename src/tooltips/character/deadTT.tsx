import ToolTips from "../TT";
import { FaSkull } from "react-icons/fa";

export default function DeadTT() {
    return <ToolTips
        hover={<FaSkull />}
        body={<div className="flex flex-row gap-1">This Character is dead</div>}
    />
}