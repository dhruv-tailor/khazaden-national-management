import { InputNumber } from "primereact/inputnumber";
import { goodsId } from "../../Goods/GoodsDist";
import { releventGoodTT } from "../../tooltips/goods/ReleventGoodTT";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";

export default function OrderRow(
    {goodType,units, max,price,updateFunc} : 
    {goodType: goodsId,units: number, max: number,price: number,updateFunc: (id: goodsId, units: number) => void}
) {

    return(
        <div className="flex flex-row gap-2">
            {releventGoodTT[goodType]}
            <InputNumber value={units} min={0} max={max + units} size={4} showButtons onChange={e => updateFunc(goodType,e.value ?? 0)}/>
            X
            <MoneyIconTT/>
            {price}
            =
            <MoneyIconTT/>
            {units * price}
        </div>
    )
}