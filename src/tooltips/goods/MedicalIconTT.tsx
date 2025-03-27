import { FaBriefcaseMedical } from "react-icons/fa";
import ToolTips from "../TT";
import ClericsIconTT from "../clans/ClericsIconTT";

export default function MedicalIconTT() {
    return <ToolTips 
        hover={<FaBriefcaseMedical/>}
        body={<>
            <b>Medical Supplies</b>
            <p>Consumed by: Army</p>
            <div className="flex flex-row gap-1">
                Produced by:
                <ClericsIconTT/>
            </div>
        </>}
    />
}