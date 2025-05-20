import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0007_sabatoge({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => {
        return s.clans.some(clan => (clan.productivity_rate + clan.productivity_modifiers.reduce((sum,val) => sum + val.value,0)) > 1)
    })[Math.floor(Math.random() * federal.settlements.filter(s => {
        return s.clans.some(clan => (clan.productivity_rate + clan.productivity_modifiers.reduce((sum,val) => sum + val.value,0)) > 1)
    }).length)]

    const rand_clan = rand_settlement.clans.filter(clan => (clan.productivity_rate + clan.productivity_modifiers.reduce(
        (sum,val) => sum + val.value,0)
    ) > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => (clan.productivity_rate + clan.productivity_modifiers.reduce(
        (sum,val) => sum + val.value,0
    )) > 0).length)]

    const doNothing = () => {
        updateFunc({
            ...federal,
            settlements: federal.settlements.map(s => s.global_id === rand_settlement.global_id ? {...s, clans: s.clans.map(c => c.id === rand_clan.id ? {...c, productivity_modifiers: [...c.productivity_modifiers,{name: 'Sabotage', value: -1, duration: 12}]} : c)} : s)
        })
    }
    return (
        <EventTemplate
            title="Sabotage"
            body={`The people of ${rand_clan.name} in ${rand_settlement.visible_name} have been sabatoged by unknown forces.`}
            effect_buttons={[
                {
                    title: "We'll send a force to investigate",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <p>The people of ${rand_clan.name} in ${rand_settlement.name} will have a productivity loss for one year.</p>
                    </div>
                }
            ]}
        />
    )
}
