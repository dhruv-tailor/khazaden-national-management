import { PiCowFill } from "react-icons/pi";
import ToolTips from "../TT";

export default function LivestockIconTT() {
    return <ToolTips 
        hover={<PiCowFill/>}
        body={<>
            <b>Livestock</b>
            <p>Consumed by: Rulers, Archivists, Engineers, Rune Smiths, Merchants</p>
            <p>Produced by: Farmers</p>
        </>}
    />
}