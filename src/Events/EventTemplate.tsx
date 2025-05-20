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
        <div>
            <h1>{title}</h1>
            <p>{body}</p>
            <div className="flex flex-column gap-2">
                {effect_buttons.map((button) => (
                    <Button onClick={button.effect}>
                        <ToolTips hover={button.title} body={button.tooltip}/>
                    </Button>
                ))}
            </div>
        </div>
    )
}