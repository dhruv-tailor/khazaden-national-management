import { GiCoalWagon } from "react-icons/gi";
import ToolTips from "../TT";

export default function CommonOresIconTT() {
    return <ToolTips 
        hover={<GiCoalWagon/>}
        body={<>
            <b>Common Ores</b>
            <p>Consumed by: Craftsmen</p>
            <p>Produced by: Miners</p>
        </>}
    />
}