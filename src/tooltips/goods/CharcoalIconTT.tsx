import { GiThrownCharcoal } from "react-icons/gi";
import ToolTips from "../TT";

export default function CharcoalIconTT() {
    return <ToolTips 
        hover={<GiThrownCharcoal/>}
        body={<>
            <b>Enchanted Charcoal</b>
            <p>Consumed by: Rune Smiths</p>
            <p>Produced by: Foresters</p>
        </>}
    />
}