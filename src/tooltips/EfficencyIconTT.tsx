import { FaGear } from "react-icons/fa6";
import ToolTips from "./TT";

export default function EfficencyIconTT() {
    return <ToolTips hover={<FaGear/>} body={<b>Efficency</b>} />
}