import { FaGem } from "react-icons/fa";
import ToolTips from "../TT";
import ArchivistsIconTT from "../clans/ArchivistsIconTT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";
import MinersIconTT from "../clans/MinersIconTT";

export default function RareOresIconTT() {
    return <ToolTips 
            hover={<FaGem/>}
            body={<>
                <b>Rare Ores</b>
                <div className="flex flex-row gap-1">
                    Consumed by:
                    <ArchivistsIconTT/>
                    <RuneSmithsIconTT/>
                    </div>
                <div className="flex flex-row gap-1">
                    Produced by:
                    <MinersIconTT/>
                </div>
            </>}
        />
}