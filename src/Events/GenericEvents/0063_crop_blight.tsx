import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0063_crop_blight({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_foreign_power = federal.foreign_powers[Math.floor(Math.random() * federal.foreign_powers.length)]
    const doNothing = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.global_id !== rand_foreign_power.global_id) { return fp }
            return {
                ...fp,
                prices: {
                    ...fp.prices,
                    food: fp.prices.food * 1.2,
                    livestock: fp.prices.livestock * 1.2,
                },
                supply: {
                    ...fp.supply,
                    food: fp.supply.food * 0.8,
                    livestock: fp.supply.livestock * 0.8,
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Crop Blight"
            body={`A crop blight has hit ${rand_foreign_power.name}.`}
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