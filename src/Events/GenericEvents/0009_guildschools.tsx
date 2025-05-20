import { calcDevelopment } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import DevelopmentIconTT from "../../tooltips/DevelopmentIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0009_guildschools({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
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
                            development: c.development + Math.round(calcDevelopment(rand_clan,rand_settlement) * 12),
                            productivity_modifiers: [...c.productivity_modifiers,{name: 'Guild Schools', value: 1, duration: 12}]
                        }
                    })
                }
            })
        })
    }
    return (
        <EventTemplate
            title="Guild Schools"
            body={`The people of ${rand_clan.name} in ${rand_settlement.visible_name} have built guild schools.`}
            effect_buttons={[
                {
                    title: "Good for them",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <p>The people of ${rand_clan.name} in ${rand_settlement.name} will have a productivity boost for one year.</p>
                        <div className="flex flex-row gap-2">
                            <DevelopmentIconTT/>
                            <PlusMinus value={Math.round(calcDevelopment(rand_clan,rand_settlement) * 12)}/>
                        </div>
                    </div>
                }   
            ]}
        />
    )
}
