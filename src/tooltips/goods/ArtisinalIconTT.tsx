import { LuHandCoins } from "react-icons/lu";
import ToolTips from "../TT";

export default function ArtisinalIconTT() {
    return <ToolTips 
            hover={<LuHandCoins/>}
            body={<>
                <b>Artisinal Goods</b>
                <p>Consumed by everyone to survive</p>
                <p>Produced by: Craftsmen and Foresters</p>
            </>}/>
}