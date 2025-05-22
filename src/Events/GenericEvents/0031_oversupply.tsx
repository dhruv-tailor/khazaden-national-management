import PlusMinus from "../../components/PlusMinus";
import ToolsIconTT from "../../tooltips/goods/ToolsIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0031_oversupply({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(c => c.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(c => c.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    tools: s.prices.tools * 0.8
                },
                stock: {
                    ...s.stock,
                    tools: s.stock.tools + (12 * rand_clan.population)
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Oversupply"
            body={`The ${rand_clan.name} of ${rand_settlement.visible_name} are experiencing an oversupply of Tools.`}
            effect_buttons={[
                {
                    title: "More Scythes for the Harvest",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <ToolsIconTT/>
                            {Math.round(rand_settlement.stock.tools)}
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <ToolsIconTT/> 
                            <span>Prices</span>
                            {Math.round(rand_settlement.prices.tools)}
                            <PlusMinus value={Math.round(rand_settlement.prices.tools * 0.2)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
