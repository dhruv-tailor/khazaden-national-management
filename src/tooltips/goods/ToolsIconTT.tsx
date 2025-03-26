import { FaTools } from "react-icons/fa";
import ToolTips from "../TT";

export default function ToolsIconTT() {
    return <ToolTips 
        hover={<FaTools/>}
        body={<>
            <b>Timber</b>
            <p>Consumed by: Craftsmen</p>
            <p>Produced by: Foresters</p>
        </>}
    />
}