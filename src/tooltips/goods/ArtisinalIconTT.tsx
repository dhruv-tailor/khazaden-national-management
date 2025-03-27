import { LuHandCoins } from "react-icons/lu";
import ToolTips from "../TT";
import CraftsmenIconTT from "../clans/CraftsmenIconTT";
import ForestersIconTT from "../clans/ForestersIconTT";

export default function ArtisinalIconTT() {
    return <ToolTips 
            hover={<LuHandCoins/>}
            body={<>
                <b>Artisinal Goods</b>
                <p>Consumed by everyone to survive</p>
                <div className="flex flex-row gap-1">
                    Produced by: 
                    <CraftsmenIconTT/>
                    <ForestersIconTT/>
                </div>
            </>}/>
}