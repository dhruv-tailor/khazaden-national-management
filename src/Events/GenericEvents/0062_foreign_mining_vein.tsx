import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0062_foreign_mining_vein({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_foreign_power = federal.foreign_powers[Math.floor(Math.random() * federal.foreign_powers.length)]

    const doNothing = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.global_id !== rand_foreign_power.global_id) { return fp }
            return {
                ...fp,
                prices: {
                    ...fp.prices,
                    rare_ores: fp.prices.rare_ores * 0.8,
                    gems: fp.prices.gems * 0.8,
                },
                supply: {
                    ...fp.supply,
                    rare_ores: fp.supply.rare_ores * 1.2,
                    gems: fp.supply.gems * 1.2,
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Foreign Mining Vein"
            body={`A new mining vein has been discovered in ${rand_foreign_power.name}.`}
            effect_buttons={[
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div>
                        <p>We don't need to do anything.</p>
                    </div>
                }
            ]}
        />
    )
}