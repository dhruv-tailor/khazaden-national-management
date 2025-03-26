import { FaShieldAlt } from "react-icons/fa";
import ToolTips from "../TT";

export default function ArmsIconTT() {

    return <ToolTips 
        hover={<FaShieldAlt/>}
        body={<>
            <b>Armaments</b>
            <p>Consumed by: Army</p>
            <p>Produced by: Craftsmen</p>
        </>}/>
}