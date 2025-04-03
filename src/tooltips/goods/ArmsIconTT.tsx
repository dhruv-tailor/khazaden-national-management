import { FaShieldAlt } from "react-icons/fa";
import ToolTips from "../TT";
import CraftsmenIconTT from "../clans/CraftsmenIconTT";

export default function ArmsIconTT() {

    return <ToolTips 
        hover={<FaShieldAlt/>}
        body={<>
            <b>Armaments</b>
            <p>Consumed by: Army</p>
            <div className="flex flex-row gap-1">
                Produced by:
                <CraftsmenIconTT/>
            </div>
        </>}/>
}