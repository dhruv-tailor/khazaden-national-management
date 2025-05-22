import PlusMinus from "../../components/PlusMinus";
import GemsIconTT from "../../tooltips/goods/GemsIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0028_gems_craze({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    gems: s.prices.gems * 1.2
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Gems Craze"
            body={`A gems craze has been reported in ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "Let the Craze Pass",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <GemsIconTT/> 
                            <span>Prices</span>
                            {Math.round(rand_settlement.prices.gems)}
                            <PlusMinus value={Math.round(rand_settlement.prices.gems * 0.2)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}   
