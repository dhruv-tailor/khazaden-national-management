import PlusMinus from "../../components/PlusMinus";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0053_envoy_visit({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_foreign_power = federal.foreign_powers[Math.floor(Math.random() * federal.foreign_powers.length)]
    const doNothing = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.global_id !== rand_foreign_power.global_id) { return fp }
            return {
                ...fp,
                relations: fp.relations + 15
            }
        })
    })
    return (
        <EventTemplate
            title="Envoy Visit"
            body={`An envoy from ${rand_foreign_power.name} is visiting us.`} 
            effect_buttons={[
                {
                    title: "Accept",
                    effect: doNothing,
                    tooltip: <div>
                        <p>Accept the envoy's visit and gain a diplomatic relationship with them.</p>
                        <p>Relations with {rand_foreign_power.name} will increase by <PlusMinus value={15} /></p>
                    </div>
                }
            ]}        
        />
    )
}
