import { ReactNode } from "react";
import { clans } from "../../Goods/good";

export default function BureaucraticFocus(
    {type,allowlist}: 
    {
        type: string,
        allowlist: {
            id: clans,
            name: string,
            icon?: ReactNode
        }[]
    }
) {
    return(
        <div>
        {type}
        </div>
    )
}