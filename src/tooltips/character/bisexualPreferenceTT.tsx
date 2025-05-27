import ToolTips from "../TT";
import { PiGenderIntersexFill } from "react-icons/pi";
import MaleTT from "./maleTT";
import FemaleTT from "./femaleTT";

export default function BisexualPreferenceTT() {
    return <ToolTips
        hover={<PiGenderIntersexFill />}
        body={<div className="flex flex-row gap-1">This Character is attracted to both <MaleTT /> and <FemaleTT /></div>}
    />
}