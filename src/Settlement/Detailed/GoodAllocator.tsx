import { Dispatch, ReactNode, SetStateAction } from "react";
import GoodAllocate from "./GoodAllocate";

export default function GoodAllocator(
    {capacity, assigned, setter, icon, natCap}: 
    {
        capacity: number, 
        assigned: number, 
        setter: Dispatch<SetStateAction<number>>,
        icon: ReactNode,
        natCap?: number,
    }
) {

    const whichOne = () => {
        if(natCap) {
            return (capacity < natCap ? capacity : natCap)
        }
        return capacity
    }

    return (
        <div>
            <div className='flex flex-row'>
                <div className="flex flex-grow-1"></div>
                <h2>{icon}</h2>
                <div className="flex flex-grow-1"></div>
            </div>
            <GoodAllocate capacity={whichOne()} assigned={assigned} setter={setter}/>
        </div>
    )

}