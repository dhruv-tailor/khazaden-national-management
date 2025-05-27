import { IoMdMale } from "react-icons/io";
import ToolTips from "../TT";

export default function MaleTT() {
    return <ToolTips
        hover={<IoMdMale />}
        body={<div>Male</div>}
    />
}