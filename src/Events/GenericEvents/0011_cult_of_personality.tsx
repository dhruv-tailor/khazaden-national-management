import PlusMinus from "../../components/PlusMinus";
import LoyaltyIconTT from "../../tooltips/LoyaltyIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0011_cult_of_personality({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                clans: s.clans.map(c => c.id === rand_clan.id ? {
                    ...c,
                    loyalty_modifiers: [...c.loyalty_modifiers,{name: 'Cult of Personality', value: 1, duration: 12}]
                } : c)
            }
        })
    })

    return (
        <EventTemplate
            title="Cult of Personality"
            body={`A cult of personality has arisen in ${rand_clan.name} in ${rand_settlement.name}.`}
            effect_buttons={[
                {
                    title: "Whatever works",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <LoyaltyIconTT/>
                            <PlusMinus value={1}/>
                            For {rand_clan.name} in {rand_settlement.name} one year
                        </div>
                    </div>
                }
            ]}
        />
    )
}
