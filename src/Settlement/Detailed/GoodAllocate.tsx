import { InputNumber } from "primereact/inputnumber";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function GoodAllocate(
    {capacity, assigned, setter}: 
    {capacity: number, assigned: number, setter: Dispatch<SetStateAction<number>>}
) {

    const [value, setValue] = useState<number>(assigned)
    
    useEffect(()=>{setter(value)},[value])


    return (
        <>
        <InputNumber 
            value={value}
            showButtons
            buttonLayout="vertical"
            style={{width: '3rem'}}
            onValueChange={e => {
                setValue(e.value ?? 0)
            }}
            incrementButtonClassName="p-button-success"
            incrementButtonIcon='pi pi-plus'
            decrementButtonClassName="p-button-danger"
            decrementButtonIcon='pi pi-minus'
            min={0}
            max={capacity + assigned}
        />
        </>
    )
}