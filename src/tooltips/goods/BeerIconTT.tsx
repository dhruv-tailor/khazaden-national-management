import { GiBeerStein } from "react-icons/gi";
import ToolTips from "../TT";
import FarmersIconTT from "../clans/FarmersIconTT";

export default function BeerIconTT() {
    return <ToolTips 
        hover={<GiBeerStein/>}
        body={<>
            <b>Beer</b>
            <p>Consumed by everyone to survive</p>
            <div className="flex flex-row gap-1">
                Produced by:
                <FarmersIconTT/>
            </div>
        </>}
    />
}