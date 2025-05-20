import FoodIconTT from "../../tooltips/goods/FoodIconTT";
import LivestockIconTT from "../../tooltips/goods/LivestockIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0036_drought_looms({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    food: s.prices.food * 1.2,
                    livestock: s.prices.livestock * 1.2
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Drought Looms"
            body={`A drought is looming over ${rand_settlement.visible_name} causing panic in the market.`}
            effect_buttons={[
                {
                    title: "Bruh why is there always a Toilet Paper Shortage?",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <FoodIconTT/>
                            prices increase by 20%
                        </div>
                        <div className="flex flex-row gap-2">
                            <LivestockIconTT/>
                            prices increase by 20%
                        </div>
                    </div>
                }
            ]}
        />
    )
}
