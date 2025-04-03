import { FaBook } from "react-icons/fa";
import ToolTips from "../TT";
import RulersIconTT from "../clans/RulersIconTT";
import EngineersIconTT from "../clans/EngineersIconTT";
import RuneSmithsIconTT from "../clans/RuneSmithsIconTT";
import ArchivistsIconTT from "../clans/ArchivistsIconTT";
import ClericsIconTT from "../clans/ClericsIconTT";

export default function BooksIconTT() {
    return <ToolTips 
        hover={<FaBook/>}
        body={<>
            <b>Books</b>
            <div className="flex flex-row gap-1">
                Consumed by: 
                <RulersIconTT/>
                <EngineersIconTT/>
                <RuneSmithsIconTT/>
            </div>
            <div className="flex flex-row gap-1">
                Produced by: 
                <ArchivistsIconTT/>
                <ClericsIconTT/>
            </div>
        </>}
    />
}