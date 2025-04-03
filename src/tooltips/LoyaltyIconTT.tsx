import ToolTips from "./TT";
import { FaHeart } from "react-icons/fa";

export default function LoyaltyIconTT() {
    return <ToolTips hover={<FaHeart/>} body={<b>Loyalty</b>} />
}