import { OverlayPanel } from "primereact/overlaypanel";
import React, { ReactNode, useRef } from "react";

export default function ToolTips({hover,body}: {hover: ReactNode, body: ReactNode}) {
    const op = useRef<OverlayPanel | null>(null)
    const targetRef = useRef<HTMLDivElement | null>(null)

    const handleMouseOver = (e: React.MouseEvent) => {
        const target = e.currentTarget
        targetRef.current = target as HTMLDivElement
        if (op.current) {op.current.show(e,target)}
    }

    const handleMouseOut = (e: React.MouseEvent) => {
        console.log('pit')
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            const direction = getMouseLeaveDirection(e.clientX, e.clientY, cx, cy)
            if(!direction){handleOverlayMouseOut()}
        }
    }
    
    const handleOverlayMouseOut = () => {
        if (op.current) { op.current.hide(); }
        
    }

    const getMouseLeaveDirection = (x: number, y: number, centerX: number, centerY: number) : boolean => {
        const dx = x - centerX;
        const dy = y - centerY;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI; // Get angle in degrees
        console.log(angle)
        return (angle >= 40 && angle < 90)
    };

    return(
            <div onMouseLeave={handleMouseOut}>
                <div onMouseOver={handleMouseOver}>
                    {hover}
                </div>
                <OverlayPanel ref={op} onMouseLeave={handleOverlayMouseOut}>
                    {body}
                </OverlayPanel>
            </div>
        )
}