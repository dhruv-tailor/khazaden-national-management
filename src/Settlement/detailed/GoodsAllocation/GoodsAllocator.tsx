import { InputNumber } from "primereact/inputnumber";
import { goodsId } from "../../../Goods/GoodsDist";
import { releventGoodTT } from "../../../tooltips/goods/ReleventGoodTT";

export default function GoodsAllocator({id,max,assigned,updateFunc}: {id:goodsId,max:number,assigned: number,updateFunc: (id: goodsId, amount: number) => void}) {
    return(
    
    <div className="flex flex-column">
        <div className='flex flex-row'>
            <div className="flex flex-grow-1"></div>
            <h3>{releventGoodTT[id]}</h3>
            <div className="flex flex-grow-1"></div>
        </div>
        <InputNumber
            showButtons
            buttonLayout="vertical"
            style={{width: '3rem'}}
            incrementButtonClassName="p-button-success"
            incrementButtonIcon='pi pi-plus'
            decrementButtonClassName="p-button-danger"
            decrementButtonIcon='pi pi-minus'
            min={0}
            max={max + assigned}
            value={assigned}
            onChange={e => updateFunc(id,e.value ?? 0)}
        />
    </div>)
}