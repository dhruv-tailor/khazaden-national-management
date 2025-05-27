import { IoMdFemale } from "react-icons/io";
import ToolTips from "../TT";

export default function FemaleTT() {
    return <ToolTips
        hover={<IoMdFemale />}
        body={<div>Female</div>}
    />
}