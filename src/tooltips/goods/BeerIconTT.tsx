import { GiBeerStein } from "react-icons/gi";
import ToolTips from "../TT";

export default function BeerIconTT() {
    return <ToolTips 
        hover={<GiBeerStein/>}
        body={<>
            <b>Beer</b>
            <p>Consumed by everyone to survive</p>
            <p>Produced by: Farmers</p>
        </>}
    />
}