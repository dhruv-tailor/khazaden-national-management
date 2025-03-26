import { GiPouringChalice } from "react-icons/gi";
import ToolTips from "../TT";

export default function OrnamentalIconTT() {
    return <ToolTips 
            hover={<GiPouringChalice/>}
            body={<>
                <b>Ornamental Luxuries</b>
                <p>Consumed by: Rulers, Archivists, Engineers, Rune Smiths, Craftsmen, Merchants, Clerics</p>
                <p>Produced by: Craftsmen</p>
            </>}
        />
}