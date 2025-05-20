import PlusMinus from "../../components/PlusMinus";
import EnchantedIconTT from "../../tooltips/goods/EnchantedIconTT";
import RunesIconTT from "../../tooltips/goods/RunesIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0039_runic_storm({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    runes: s.stock.runes + (12 * rand_clan.population),
                },
                prices: {
                    ...s.prices,
                    enchanted: s.prices.enchanted * 1.2
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Runic Storm"
            body={`A runic storm has hit ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "Let the Storm Pass",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <RunesIconTT/>
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2"> 
                            <EnchantedIconTT/>
                            Prices increase by 20%
                        </div>
                    </div>
                }
            ]}
        />
    )
}
