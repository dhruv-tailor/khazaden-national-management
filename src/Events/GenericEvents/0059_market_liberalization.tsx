import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0059_market_liberalization({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_foreign_power = federal.foreign_powers[Math.floor(Math.random() * federal.foreign_powers.length)]

    const accept = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.global_id !== rand_foreign_power.global_id) { return fp }
            return {
                ...fp,
                market_access: fp.market_access + 0.05
            }
        })
    })
    return (
        <EventTemplate
            title="Market Liberalization"
            body={`${rand_foreign_power.name} has decided to liberalize their markets to us.`}
            effect_buttons={[
                {
                    title: "Accept",
                    effect: accept,
                    tooltip: <div>
                        <p>We don't need to do anything.</p>
                    </div>
                }
            ]}
        />
    )
}