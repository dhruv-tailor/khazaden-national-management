import { GiWoodPile } from "react-icons/gi";
import ToolTips from "../TT";

export default function TimberIconTT() {
    return <ToolTips 
        hover={<GiWoodPile/>}
        body={<>
            <b>Timber</b>
            <p>Consumed by: Craftsmen</p>
            <p>Produced by: Foresters</p>
        </>}
    />
}