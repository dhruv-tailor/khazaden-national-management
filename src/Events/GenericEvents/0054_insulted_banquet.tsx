import PlusMinus from "../../components/PlusMinus";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0054_insulted_banquet({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_foreign_power = federal.foreign_powers[Math.floor(Math.random() * federal.foreign_powers.length)]

    const doNothing = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.global_id !== rand_foreign_power.global_id) { return fp }
            return {
                ...fp,
                relations: fp.relations - 20
            }
        })
    })
    return (
        <EventTemplate
            title="Insulted at a Banquet"
            body={`We were invited to a banquet hosted by ${rand_foreign_power.name}. However, we ended up insulting the host and had to leave.`}
            effect_buttons={[
                {
                    title: "They deserved it",
                    effect: doNothing,
                    tooltip: <div>
                        <p>Relations with {rand_foreign_power.name} will change by <PlusMinus value={-20} /></p>
                    </div>
                }
            ]}
        />
    )
}