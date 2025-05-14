import PlusMinus from "../../components/PlusMinus";
import RunesIconTT from "../../tooltips/goods/RunesIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0033_counterfeit_runes({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(c => c.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(c => c.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    runes: s.prices.runes * 1.2
                },
                stock: {
                    ...s.stock,
                    runes: s.stock.runes - (12 * rand_clan.population)
                }
            }
        })
    })

    return (
        <EventTemplate
            title="Counterfeit Runes"
            body={`Counterfeit Runes have been discovered in ${rand_settlement.name}.`}
            effect_buttons={[
                {
                    title: "Trash the Fakes",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <RunesIconTT/>
                            <PlusMinus value={-Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <RunesIconTT/>
                            Prices increase by 20%
                        </div>
                    </div>
                }
            ]}
        />
    )
}

