import { FaBook } from "react-icons/fa";
import ToolTips from "../TT";

export default function BooksIconTT() {
    return <ToolTips 
        hover={<FaBook/>}
        body={<>
            <b>Books</b>
            <p>Consumed by: Rulers Engineers Rune Smiths</p>
            <p>Produced by: Archivists Clerics</p>
        </>}
    />
}