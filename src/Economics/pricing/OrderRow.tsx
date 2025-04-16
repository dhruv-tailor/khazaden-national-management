import { InputNumber } from "primereact/inputnumber";
import { goodsId } from "../../Goods/GoodsDist";
import { releventGoodTT } from "../../tooltips/goods/ReleventGoodTT";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import { Card } from "primereact/card";

export default function OrderRow(
    {goodType,units, max,price,updateFunc} : 
    {goodType: goodsId,units: number, max: number,price: number,updateFunc: (id: goodsId, units: number) => void}
) {
    return(
        <Card className="surface-ground">
            <div className="flex flex-row align-items-center justify-content-between gap-3">
                <div className="flex flex-row align-items-center gap-2">
                    <span className="font-bold">{releventGoodTT[goodType]}</span>
                    <InputNumber 
                        value={units} 
                        min={0} 
                        max={max + units} 
                        size={4} 
                        showButtons
                        buttonLayout="vertical"
                        incrementButtonClassName="p-button-success"
                        decrementButtonClassName="p-button-danger"
                        onChange={e => updateFunc(goodType,e.value ?? 0)}
                    />
                </div>
                <div className="flex flex-row align-items-center gap-2">
                    <span className="text-500">Price:</span>
                    <MoneyIconTT/>
                    <span>{price}</span>
                    <span className="text-500">Total:</span>
                    <MoneyIconTT/>
                    <span className="font-bold">{units * price}</span>
                </div>
            </div>
        </Card>
    )
}