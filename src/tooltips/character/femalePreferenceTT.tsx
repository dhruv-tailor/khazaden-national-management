import ToolTips from "../TT";
import { PiGenderFemaleFill } from "react-icons/pi";
import FemaleTT from "./femaleTT";

export default function FemalePreferenceTT() {
    return <ToolTips
        hover={<PiGenderFemaleFill />}
        body={<div className="flex flex-row gap-1">This Character is attracted to <FemaleTT /></div>}
    />
}