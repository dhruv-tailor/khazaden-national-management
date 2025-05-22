import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import ToolsIconTT from "../../tooltips/goods/ToolsIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0018_structural_collapse({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.engineers && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.engineers && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                clans: s.clans.map(c => {
                    if (c.id !== rand_clan.id) {return c}
                    return {
                        ...c,
                        productivity_modifiers: [...c.productivity_modifiers,{name: 'Structural Collapse', value: -1, duration: 12}]
                    }
                })
            }
        })
    })
    const sendEngineers = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {...s.stock, tools: s.stock.tools - rand_clan.population * 12}
            }
        })
    })

    return (
        <EventTemplate
            title="Structural Collapse"
            body={`A structural collapse has occurred in a ${rand_clan.name} district of ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <p>Productivity will drop for a year</p>
                    </div>
                },
                {
                    title: "Send in Engineers",
                    effect: sendEngineers,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <ToolsIconTT/>
                            {Math.round(rand_settlement.stock.tools)}
                            <PlusMinus value={-(rand_clan.population * 12)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
