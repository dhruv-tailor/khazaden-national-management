import ToolTips from "../TT";
import { PiGenderNeuterFill } from "react-icons/pi";

export default function AsexualPreferenceTT() {
    return <ToolTips
        hover={<PiGenderNeuterFill />}
        body={<div>This Character is asexual</div>}
    />
}