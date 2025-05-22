import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import FoodIconTT from "../../tooltips/goods/FoodIconTT";
import LivestockIconTT from "../../tooltips/goods/LivestockIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0024_bountiful_harvest({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.farmers && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.farmers && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.filter(c => c.id === clanTypes.farmers)[0]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    food: s.stock.food + (12 * rand_clan.population),
                    livestock: s.stock.livestock + (12 * rand_clan.population)
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Bountiful Harvest"
            body={`A bountiful harvest has been reaped in ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "Let Nature Take its Course",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <FoodIconTT/>
                            {Math.round(rand_settlement.stock.food)}
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <LivestockIconTT/>
                            {Math.round(rand_settlement.stock.livestock)}
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
