import { FaCoins } from "react-icons/fa";
import ToolTips from "../TT";

export default function MoneyIconTT() {
    return <ToolTips 
        hover={<FaCoins/>}
        body={<>
            <b>Finance Points</b>
        </>}
    />
}