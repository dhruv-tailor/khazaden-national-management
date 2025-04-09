import ToolTips from "../TT";

export default function TariffRateTT() {
    return <ToolTips hover={<>Tariff Rate: </>} body={
    <>
    <b>Tariff Rate</b>
    <br/>
    The Tariff Rate is the percentage of the price that is added
    <br/>
    to the price of goods when they are imported.
    <br/>
    <br/>
    All Tariffs paid by settlements are added to the National Reserve
    </>
    } />
}