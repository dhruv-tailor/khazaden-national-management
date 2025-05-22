import EventTemplate from "../EventTemplate";
import { FederalInterface } from "../../utilities/FederalInterface";
import PlusMinus from "../../components/PlusMinus";
import LoyaltyIconTT from "../../tooltips/LoyaltyIconTT";
import EfficencyIconTT from "../../tooltips/EfficencyIconTT";
import ToolsIconTT from "../../tooltips/goods/ToolsIconTT";
import TimberIconTT from "../../tooltips/goods/TimberIconTT";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
export default function g0001_overcrowding({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    // gets random settlement that is overcrowded
    const settlement = federal.settlements.filter(
        (settlement) => settlement.clans.reduce((acc, clan) => acc + clan.population, 0) >= settlement.pop_cap * 0.8
    )[Math.floor(
        Math.random() * federal.settlements.filter(
            (settlement) => settlement.clans.reduce((acc, clan) => acc + clan.population, 0) >= settlement.pop_cap * 0.8
        ).length)]
    const overcrowding = Math.round(Math.abs(settlement.pop_cap - settlement.clans.reduce((acc, clan) => acc + clan.population, 0)))

    const doNothing = () => {
        updateFunc({
            ...federal,
            settlements: federal.settlements.map(s => {
                if (s.global_id !== settlement.global_id) {return s}
                return {
                    ...s,
                    clans: s.clans.map(c => {
                        return {
                            ...c,
                            efficency_modifiers: [...c.efficency_modifiers,{name: 'Overcrowding', value: -1, duration: 12}],
                            loyalty_modifiers: [...c.loyalty_modifiers,{name: 'Overcrowding', value: -1, duration: 12}],
                        }
                    })
                }
            })
        })
    }

    const buildTemporaryHousing = () => {
        updateFunc({
            ...federal,
            settlements: federal.settlements.map(s => {
                if (s.global_id !== settlement.global_id) {return s}
                return {
                    ...s,
                    stock: {
                        ...s.stock,
                        tools: s.stock.tools - overcrowding,
                        timber: s.stock.timber - overcrowding,
                        money: s.stock.money - Math.round((settlement.prices.tools + settlement.prices.timber) * overcrowding),
                    }
                }
            })
        })
    }

    return (
        <EventTemplate
            title="Overcrowding"
            body={`The population of ${settlement.visible_name} is too high and there isn't enough land to build much more permanent housing.`} 
            effect_buttons={[
                {
                    title: 'Do Nothing',
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <PlusMinus value={-1}/>
                            <LoyaltyIconTT/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <PlusMinus value={-1}/>
                            <EfficencyIconTT/>
                        </div>
                        <p>Across all clans for one year</p>
                    </div>
                },
                {
                    title: 'Build More Temporary Housing',
                    effect: buildTemporaryHousing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <ToolsIconTT/>
                            {Math.round(settlement.stock.tools)}
                            <PlusMinus value={-overcrowding}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <TimberIconTT/>
                            {Math.round(settlement.stock.timber)}
                            <PlusMinus value={-overcrowding}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <MoneyIconTT/>
                            {Math.round(settlement.stock.money)}
                            <PlusMinus value={-Math.round((settlement.prices.tools + settlement.prices.timber) * overcrowding)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
