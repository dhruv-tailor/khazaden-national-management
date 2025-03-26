import { FaGem } from "react-icons/fa";
import ToolTips from "../TT";

export default function RareOresIconTT() {
    return <ToolTips 
            hover={<FaGem/>}
            body={<>
                <b>Rare Ores</b>
                <p>Consumed by: Archivists Rune Smiths</p>
                <p>Produced by: Miners</p>
            </>}
        />
}