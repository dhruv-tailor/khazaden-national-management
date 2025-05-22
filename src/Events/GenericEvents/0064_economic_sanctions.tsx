import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0064_economic_sanctions({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_foreign_power = federal.foreign_powers[Math.floor(Math.random() * federal.foreign_powers.length)]
    const doNothing = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.global_id !== rand_foreign_power.global_id) { return fp }
            return {
                ...fp,
                market_access: fp.market_access - 0.05
            }
        })
    })
    return (
        <EventTemplate
            title="Economic Sanctions"
            body={`${rand_foreign_power.name} has imposed economic sanctions on us.`}
            effect_buttons={[
                {
                    title: "Those Rats",
                    effect: doNothing,
                    tooltip: <div>
                        <p>Market access in {rand_foreign_power.name} has been reduced by 5%.</p>
                    </div>
                }
            ]}
        />
    )
}