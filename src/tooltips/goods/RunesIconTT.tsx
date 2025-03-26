import { GiRuneStone } from "react-icons/gi";
import ToolTips from "../TT";

export default function RunesIconTT() {
    return <ToolTips 
        hover={<GiRuneStone/>}
        body={<>
            <b>Runes</b>
            <p>Consumed by: Archivists Engineers Clerics</p>
            <p>Produced by: Rune Smiths</p>
        </>}
    />
}