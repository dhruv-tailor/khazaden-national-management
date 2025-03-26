import { GiGems } from "react-icons/gi";
import ToolTips from "../TT";

export default function GemsIconTT() {
    return <ToolTips 
        hover={<GiGems/>}
        body={<>
            <b>Gems</b>
            <p>Consumed by: Rune Smiths Craftsmen</p>
            <p>Produced by: Miners</p>
        </>}
    />
}