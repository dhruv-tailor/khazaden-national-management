import { InputNumber } from "primereact/inputnumber";
import { ReactNode } from "react";
import { FaCoins } from "react-icons/fa";
import { goods } from "../Goods/good";

export default function OrderRow(
    {price,max,icon,units,type,updateFunc,capUsed}:
    {price: number,max: number,icon:ReactNode,units: number,type:goods,updateFunc: (units: number, type: goods) => void,capUsed?: boolean}) {
    return(<>
        <div className="flex flex-row gap-2">
            {icon}
            <InputNumber onChange={(e) => updateFunc(e.value ?? 0,type)} min={0} max={capUsed ? max + units : max} value={units} size={4} showButtons/>
            X 
            <FaCoins/>
            {price}
            =
            <FaCoins/>
            {units * price}
        </div>
    </>)
}