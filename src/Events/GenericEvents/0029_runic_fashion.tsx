import PlusMinus from "../../components/PlusMinus";
import EnchantedArmsIconTT from "../../tooltips/goods/EnchantedArmsTT";
import EnchantedIconTT from "../../tooltips/goods/EnchantedIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0029_runic_fashion({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(c => c.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(c => c.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    enchanted: s.prices.enchanted * 1.2
                },
                stock: {
                    ...s.stock,
                    enchanted_arms: s.stock.enchanted_arms + (12 * rand_clan.population)
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Runic Fashion"
            body={`Carrying around enchanted weapons encrusted with enchanted luxuries is all the rage in ${rand_settlement.name} among the ${rand_clan.name}.`}
            effect_buttons={[
                {
                    title: "Let the Craze Pass",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <EnchantedIconTT/>
                            Prices increase by 20%
                        </div>
                        <div className="flex flex-row gap-2">
                            <EnchantedArmsIconTT/>
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}   
