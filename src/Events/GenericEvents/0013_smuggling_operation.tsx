import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0013_smuggling_operation({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                clans: s.clans.map(c => c.id === rand_clan.id ? {
                    ...c,
                    productivity_modifiers: [...c.productivity_modifiers,{name: 'Smuggling Operation', value: -1, duration: 12}]
                } : c)
            }
        })
    })
    
    return (
        <EventTemplate
            title="Smuggling Operation"
            body={`A smuggling operation has been discovered in ${rand_clan.name} of ${rand_settlement.name}.`}
            effect_buttons={[
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <p>Productivity of {rand_clan.name} in {rand_settlement.name} will decrease for a year</p>
                    </div>
                }
            ]}
        />
    )
    
}
