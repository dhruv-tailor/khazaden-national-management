import { IoFastFood } from "react-icons/io5";
import ToolTips from "../TT";

export default function FoodIconTT() {
    return <ToolTips 
        hover={<IoFastFood/>}
        body={<>
            <b>Food and Water</b>
            <p>Consumed by everyone to survive</p>
            <p>Produced by: Farmers and Foresters</p>
        </>}
    />
}