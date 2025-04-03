import { OverlayPanel } from "primereact/overlaypanel";
import React, { ReactNode, useRef, useState } from "react";

export default function ToolTips({hover,body}: {hover: ReactNode, body: ReactNode}) {
    const op = useRef<OverlayPanel | null>(null)
    const targetRef = useRef<HTMLDivElement | null>(null)
    const [isSticky,setIsSticky] = useState<boolean>(false)

    const handleMouseOver = (e: React.MouseEvent) => {
        const target = e.currentTarget
        targetRef.current = target as HTMLDivElement
        if (op.current) {op.current.show(e,target)}
    }

    const handleMouseOut = () => {if (op.current && !isSticky) { op.current.hide(); }}

    return(
            <div onMouseLeave={handleMouseOut}>
                <div onMouseOver={handleMouseOver} onClick={() => setIsSticky(true)}>
                    {hover}
                </div>
                <OverlayPanel ref={op} onHide={() => setIsSticky(false)}>
                    {body}
                </OverlayPanel>
            </div>
        )
}