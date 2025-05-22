import PlusMinus from "../../components/PlusMinus"
import EfficencyIconTT from "../../tooltips/EfficencyIconTT"
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT"
import OrnamentalIconTT from "../../tooltips/goods/OrnamentalIconTT"
import LoyaltyIconTT from "../../tooltips/LoyaltyIconTT"
import { FederalInterface } from "../../utilities/FederalInterface"
import EventTemplate from "../EventTemplate"

export default function g0014_open_lottery({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => updateFunc({...federal})
    const buildCasino = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => s.global_id === rand_settlement.global_id ? {
            ...s,
            stock: {
                ...s.stock,
                ornamental: s.stock.ornamental - rand_clan.population * 12,
                money: s.stock.money - Math.round(rand_clan.population * 12 * rand_settlement.prices.ornamental)
            },
            clans: s.clans.map(c => c.id === rand_clan.id ? {
                ...c,
                efficency_modifiers: [...c.efficency_modifiers,{name: 'Casino', value: 1, duration: 12}],
                loyalty_modifiers: [...c.loyalty_modifiers,{name: 'Casino', value: 1, duration: 12}]
            } : c)
        } : s)
    })

    return (
        <EventTemplate
            title="Open Casino"
            body={`The ${rand_clan.name} of ${rand_settlement.visible_name} want to build a casino for themselves. Should we build one?`}
            effect_buttons={[
                {
                    title: "Yes",
                    effect: buildCasino,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <EfficencyIconTT/>
                            {Math.round(rand_clan.efficency)}
                            <PlusMinus value={1}/>
                            For {rand_clan.name} in {rand_settlement.name} one year
                        </div>
                        <div className="flex flex-row gap-2">
                            <LoyaltyIconTT/>
                            {Math.round(rand_clan.loyalty)}
                            <PlusMinus value={1}/>
                            For {rand_clan.name} in {rand_settlement.name} one year
                        </div>
                        <div className="flex flex-row gap-2">
                            <MoneyIconTT/>
                            {Math.round(rand_settlement.stock.money)}
                            <PlusMinus value={-Math.round(rand_clan.population * 12 * rand_settlement.prices.ornamental)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <OrnamentalIconTT/>
                            {Math.round(rand_settlement.stock.ornamental)}
                            <PlusMinus value={-(rand_clan.population * 12)}/>
                        </div>
                    </div>
                },
                {
                    title: "No",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <p>The {rand_clan.name} of {rand_settlement.name} will not get a casino.</p>
                    </div>
                }
            ]}
        />
    )
}

