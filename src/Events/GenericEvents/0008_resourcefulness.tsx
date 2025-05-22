import PlusMinus from "../../components/PlusMinus";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import ToolsIconTT from "../../tooltips/goods/ToolsIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0008_resourcefulness({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const sendSupplies = () => {
        updateFunc({
            ...federal,
            settlements: federal.settlements.map(s => {
                if (s.global_id !== rand_settlement.global_id) {return s}
                return {
                    ...s,
                    stock: {
                        ...s.stock,
                        tools: s.stock.tools - (rand_clan.population * 12),
                        books: s.stock.books - (rand_clan.population * 12),
                        money: s.stock.money - Math.round(rand_clan.population * 48 * (rand_settlement.prices.tools + rand_settlement.prices.books))
                    },
                    clans: s.clans.map(c => {
                        if (c.id !== rand_clan.id) {return c}
                        return {
                            ...c,
                            productivity_modifiers: [...c.productivity_modifiers,{name: 'Resourcefulness', value: 1, duration: 12}]
                        }
                    })
                }
            })
        })
    }

    const doNothing = () => updateFunc({...federal})
    

    return (
        <EventTemplate
            title="Resourcefulness"
            body={`The people of ${rand_clan.name} in ${rand_settlement.visible_name} have found a way to make more goods with less, granted we provide the nessesary supplies.`}
            effect_buttons={[
                {
                    title: "Send them supplies",
                    effect: sendSupplies,
                    tooltip: <div className="flex flex-column">
                        <p>The people of {rand_clan.name} in {rand_settlement.name} will have a productivity boost for one year.</p>
                        <div className="flex flex-row gap-2">
                            <BooksIconTT/>
                            {Math.round(rand_settlement.stock.books)}
                            <PlusMinus value={-(rand_clan.population * 12)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <ToolsIconTT/>
                            {Math.round(rand_settlement.stock.tools)}
                            <PlusMinus value={-(rand_clan.population * 12)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <MoneyIconTT/>
                            {Math.round(rand_settlement.stock.money)}
                            <PlusMinus value={-Math.round((rand_clan.population * 48) * (rand_settlement.prices.tools + rand_settlement.prices.books))}/>
                        </div>
                    </div>
                },
                {
                    title: "Deny Request",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <p>They can manage with what they have.</p>
                    </div>
                }
            ]}
        />
    )
}
