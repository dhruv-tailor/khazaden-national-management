import { FaCoins } from "react-icons/fa";
import ToolTips from "../TT";

export default function MoneyIconTT() {
    return <ToolTips 
        hover={<FaCoins/>}
        body={<>
            <b>Finiance Points</b>
        </>}
    />
}