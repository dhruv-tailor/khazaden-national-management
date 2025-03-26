import { FaBriefcaseMedical } from "react-icons/fa";
import ToolTips from "../TT";

export default function MedicalIconTT() {
    return <ToolTips 
        hover={<FaBriefcaseMedical/>}
        body={<>
            <b>Medical Supplies</b>
            <p>Consumed by: Army</p>
            <p>Produced by: Clerics</p>
        </>}
    />
}