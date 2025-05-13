import PlusMinus from "../../components/PlusMinus";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";
import EfficencyIconTT from "../../tooltips/EfficencyIconTT";

export default function g0002_populationboom({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
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
                            pop_growth_modifiers: [...c.pop_growth_modifiers,{name: 'Population Boom', value: 1.2, duration: 12}]
                        }
                    })
                }
            })
        })
    }
    return (
        <EventTemplate
            title="Population Boom"
            body={`The population of ${rand_clan.name} in ${rand_settlement.name} is increasing at a faster rate than expected causing a strain on their efficency.`}
            effect_buttons={[
                {
                    title: 'I See',
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <p>The population of ${rand_clan.name} in ${rand_settlement.name} is increasing at a faster rate for one year.</p>
                        <div className="flex flex-row gap-2">
                            <PlusMinus value={-1}/>
                            <EfficencyIconTT/>
                            For {rand_clan.name} in {rand_settlement.name} one year
                        </div>
                    </div>
                }
            ]}
        />
    )
}
