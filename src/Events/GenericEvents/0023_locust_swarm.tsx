import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import CharcoalIconTT from "../../tooltips/goods/CharcoalIconTT";
import FoodIconTT from "../../tooltips/goods/FoodIconTT";
import RunesIconTT from "../../tooltips/goods/RunesIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0023_locust_swarm({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.farmers && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.farmers && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.filter(c => c.id === clanTypes.farmers)[0]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {...s.stock, food: s.stock.food - 24 * (rand_clan.population)}
            }
        })  
    })
    const mitigate = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {...s.stock, 
                    charcoal: s.stock.charcoal - (12 * rand_clan.population),
                    runes: s.stock.runes - (12 * rand_clan.population)
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Locust Swarm"
            body={`A locust swarm has been spotted in ${rand_settlement.name}.`}
            effect_buttons={[
                {
                    title: "Let Nature Take its Course",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <FoodIconTT/>
                            <PlusMinus value={Math.round(24 * rand_clan.population)}/>
                        </div>
                    </div>
                },
                {
                    title: "Try to Mitigate the Damage",
                    effect: mitigate,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <CharcoalIconTT/>
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <RunesIconTT/>
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )   
}
