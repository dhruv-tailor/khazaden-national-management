import { IoIosPeople } from "react-icons/io";
import ToolTips from "./TT";

export default function PopulationIconTT() {
    return <ToolTips hover={<IoIosPeople/>} body={<b>Population</b>} />
}