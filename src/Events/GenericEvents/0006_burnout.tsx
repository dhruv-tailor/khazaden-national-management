import PlusMinus from "../../components/PlusMinus";
import EfficencyIconTT from "../../tooltips/EfficencyIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0006_burnout({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => {
        updateFunc({
            ...federal,
            settlements: federal.settlements.map(s => s.global_id === rand_settlement.global_id ? {...s, clans: s.clans.map(c => c.id === rand_clan.id ? {...c, efficency_modifiers: [...c.efficency_modifiers,{name: 'Burnout', value: -1, duration: 12}]} : c)} : s)
        })
    }
    return (
        <EventTemplate
            title="Burnout"
            body={`The people of ${rand_clan.name} in ${rand_settlement.visible_name} are burned out.`}
            effect_buttons={[
                {
                    title: "They should just grind harder",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <p>The people of {rand_clan.name} in {rand_settlement.name} will be burned out for one year.</p>
                        <div className="flex flex-row gap-2">
                            <EfficencyIconTT/>
                            {Math.round(rand_clan.efficency)}
                            <PlusMinus value={-1}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
