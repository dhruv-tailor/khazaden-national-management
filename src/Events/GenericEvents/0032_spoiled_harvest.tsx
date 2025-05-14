import PlusMinus from "../../components/PlusMinus";
import FoodIconTT from "../../tooltips/goods/FoodIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0032_spoiled_harvest({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(c => c.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(c => c.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    food: s.prices.food * 1.2
                },
                stock: {
                    ...s.stock,
                    food: s.stock.food + (12 * rand_clan.population)
                }
            }
        })
    })

    return (
        <EventTemplate
            title="Spoiled Harvest"
            body={`${rand_settlement.name} has experinced a string of spoiled harvests.`}
            effect_buttons={[
                {
                    title: "Food is food",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <FoodIconTT/>
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <FoodIconTT/>
                            Prices increase by 20%
                        </div>
                    </div>
                }
            ]}
        />
    )
}
    
