import ToolTips from "../TT";

export default function MonthsStoredTT() {
    return <ToolTips hover={<>Months Stored: </>} body={
    <>
    <b>Months Stored</b>
    <br/>
    The number of months worth of goods that are stored and not available for purchase.
    </>
    } />
}