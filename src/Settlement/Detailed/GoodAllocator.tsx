import { Dispatch, ReactNode, SetStateAction } from "react";
import GoodAllocate from "./GoodAllocate";

export default function GoodAllocator(
    {capacity, assigned, setter, icon}: 
    {
        capacity: number, 
        assigned: number, 
        setter: Dispatch<SetStateAction<number>>,
        icon: ReactNode
    }
) {

    return (
        <div>
            <div className='flex flex-row'>
                <div className="flex flex-grow-1"></div>
                <h2>{icon}</h2>
                <div className="flex flex-grow-1"></div>
            </div>
            <GoodAllocate capacity={capacity} assigned={assigned} setter={setter}/>
        </div>
    )

}