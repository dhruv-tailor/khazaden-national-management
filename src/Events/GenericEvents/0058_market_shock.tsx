import { scaleGoods } from "../../Goods/GoodsDist";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0058_market_shock({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_foreign_power = federal.foreign_powers[Math.floor(Math.random() * federal.foreign_powers.length)]

    const doNothing = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.global_id !== rand_foreign_power.global_id) { return fp }
            return {
                ...fp,
                prices: scaleGoods(fp.prices, 1.2),
                demand: scaleGoods(fp.demand, 1.2)
            }
        })
    })
    return (
        <EventTemplate
            title="Market Shock"
            body={`The Markets of ${rand_foreign_power.name} have been shaken by a series of events.`}
            effect_buttons={[
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div>
                        <p>Sucks to suck.</p>
                    </div>
                }
            ]}
        />  
    )
}