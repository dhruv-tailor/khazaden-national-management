import { ReactNode } from "react";
import PlusMinus from "../../components/PlusMinus";

export default function ShowGood({stock,consumption,icon}: {stock: number, consumption: number, icon: ReactNode}) {
    return (
        <>
        {
            (stock > 0) || (consumption > 0) ?
            <div className='flex flex-row gap-1'>
                {icon}
                {stock}
                <PlusMinus value={consumption}/>
            </div> : null
        }
        </>
    )
}