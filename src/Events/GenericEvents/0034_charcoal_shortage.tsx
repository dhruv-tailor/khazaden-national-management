import PlusMinus from "../../components/PlusMinus";
import ArmsIconTT from "../../tooltips/goods/ArmsIconTT";
import CharcoalIconTT from "../../tooltips/goods/CharcoalIconTT";
import ToolsIconTT from "../../tooltips/goods/ToolsIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0034_charcoal_shortage({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    charcoal: s.prices.charcoal * 1.2,
                    tools: s.prices.tools * 1.2,
                    arms: s.prices.arms * 1.2
                }
            }
        })
    }) 

    return (
        <EventTemplate
            title="Charcoal Shortage"
            body={`${rand_settlement.visible_name} is experiencing a shortage of Charcoal based tools and weapons.`}
            effect_buttons={[
                {
                    title: "Charcoal is Charcoal",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <CharcoalIconTT/> 
                            <span>Prices</span>
                            {Math.round(rand_settlement.prices.charcoal)}
                            <PlusMinus value={Math.round(rand_settlement.prices.charcoal * 0.2)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <ToolsIconTT/> 
                            <span>Prices</span>
                            {Math.round(rand_settlement.prices.tools)}
                            <PlusMinus value={Math.round(rand_settlement.prices.tools * 0.2)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <ArmsIconTT/> 
                            <span>Prices</span>
                            {Math.round(rand_settlement.prices.arms)}
                            <PlusMinus value={Math.round(rand_settlement.prices.arms * 0.2)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
    
}

