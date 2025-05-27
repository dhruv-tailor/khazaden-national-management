import ToolTips from "../TT";
import { PiGenderMaleFill } from "react-icons/pi";
import MaleTT from "./maleTT";

export default function MalePreferenceTT() {
    return <ToolTips
        hover={<PiGenderMaleFill  />}
        body={<div className="flex flex-row gap-1">This Character is attracted to <MaleTT /></div>}
    />
}