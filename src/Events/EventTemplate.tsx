import { Button } from "primereact/button";
import { ReactNode } from "react";
import ToolTips from "../tooltips/TT";

export interface EffectButtons {
    title: string,
    effect: () => void,
    tooltip: ReactNode
}

export default function EventTemplate({title, body, effect_buttons}: {title: string, body: string, effect_buttons: EffectButtons[]}) {
    return(
        <div className="flex flex-column gap-4">
                <div className="flex flex-column gap-2">
                    <h2 className="text-2xl font-bold m-0">{title}</h2>
                    <p className="text-lg line-height-3 m-0">{body}</p>
                </div>
                
                <div className="flex flex-column gap-3">
                    {effect_buttons.map((button, index) => (
                        <Button 
                            key={index}
                            onClick={button.effect}
                            className="p-button-lg w-full"
                            severity={index === 0 ? "success" : "secondary"}
                        >
                            <div className="flex align-items-center justify-content-center gap-2">
                                <ToolTips hover={button.title} body={button.tooltip}/>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
    )
}