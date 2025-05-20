import ArmsIconTT from "../../tooltips/goods/ArmsIconTT"
import CommonOresIconTT from "../../tooltips/goods/CommonOresTT"
import ToolsIconTT from "../../tooltips/goods/ToolsIconTT"
import { FederalInterface } from "../../utilities/FederalInterface"
import EventTemplate from "../EventTemplate"

export default function g0041_technological_revolution({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    tools: s.prices.tools * 0.8,
                    arms: s.prices.arms * 0.8,
                    common_ores: s.prices.common_ores * 0.8
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Technological Revolution"
            body={`A technological revolution has broken out in ${rand_settlement.visible_name}. The demand for outdated tools dwindles`}
            effect_buttons={[
                {
                    title: "Make the Most of the New Technology",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <ToolsIconTT/>
                            Prices decrease by 20%
                        </div>
                        <div className="flex flex-row gap-2">
                            <ArmsIconTT/>
                            Prices decrease by 20%
                        </div>
                        <div className="flex flex-row gap-2">
                            <CommonOresIconTT/>
                            Prices decrease by 20%
                        </div>
                    </div>
                }
            ]}
        />
    )
}

