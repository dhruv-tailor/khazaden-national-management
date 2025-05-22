import PlusMinus from "../../components/PlusMinus";
import ArmsIconTT from "../../tooltips/goods/ArmsIconTT";
import EnchantedArmsIconTT from "../../tooltips/goods/EnchantedArmsTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0030_war_profiteering({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(c => c.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(c => c.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    enchanted_arms: s.prices.enchanted_arms * 1.2
                },
                stock: {
                    ...s.stock,
                    arms: s.stock.arms + (12 * rand_clan.population),
                }
            }
        })
    })

    return (
        <EventTemplate
            title="War Profiteering"
            body={`A war has broken out in the region. The ${rand_clan.name} of ${rand_settlement.visible_name} are profiteering off of the war.`}
            effect_buttons={[
                {
                    title: "Ethics Who?",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <ArmsIconTT/>
                            {Math.round(rand_settlement.stock.arms)}
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <EnchantedArmsIconTT/> 
                            <span>Prices</span>
                            {Math.round(rand_settlement.prices.enchanted_arms)}
                            <PlusMinus value={Math.round(rand_settlement.prices.enchanted_arms * 0.2)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
