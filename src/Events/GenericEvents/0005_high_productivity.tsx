import PlusMinus from "../../components/PlusMinus";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0005_high_productivity({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => {
        updateFunc({
            ...federal,
            settlements: federal.settlements.map(s => {
                if (s.global_id !== rand_settlement.global_id) {return s}
                return {
                    ...s,
                    clans: s.clans.map(c => {
                        if (c.id !== rand_clan.id) {return c}
                        return {
                            ...c,
                            productivity_modifiers: [...c.productivity_modifiers,{name: 'High Productivity', value: 1, duration: 12}]
                        }
                    })
                }
            })
        })
    }
    return (
        <EventTemplate
            title="High Productivity"
            body={`The productivity of ${rand_clan.name} in ${rand_settlement.name} is high.`}
            effect_buttons={[
                {
                    title: 'Great News!',
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <p>The productivity of ${rand_clan.name} in ${rand_settlement.name} is high.</p>
                        <div className="flex flex-row gap-2">
                            <PlusMinus value={1}/>
                            Productivity Rate for {rand_clan.name} in {rand_settlement.name} for one year
                        </div>
                    </div>
                }
            ]}
        />
    )
}
