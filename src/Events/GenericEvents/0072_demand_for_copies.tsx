import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0072_demand_for_copies({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0)).length)]
    const rand_foreign = federal.foreign_powers[Math.floor(Math.random() * federal.foreign_powers.length)]
    const rand_clan = rand_settlement.clans.find(c => c.id === clanTypes.archivists)

    const doNothing = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.global_id !== rand_foreign.global_id) {return fp}
            return {
                ...fp,
                relations: fp.relations - (rand_clan?.population ? rand_clan.population * 12 : 0)
            }
        })
    })

    const sellCopies = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    books: s.stock.books - (rand_clan?.population ? rand_clan.population * 12 : 0),
                    money: s.stock.money + (rand_clan?.population ? Math.round(rand_clan.population * 12 * rand_foreign.prices.books) : 0)
                }
            }
        })
    })

    return (
        <EventTemplate
            title="Demand for Copies"
            body={`The Archivists of ${rand_foreign.name} are requesting to buy copies of Arcane Lore from ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "Sell the copies",
                    effect: sellCopies,
                    tooltip: <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <BooksIconTT/>
                            {rand_settlement.stock.books}
                            <PlusMinus value={rand_clan?.population ? -rand_clan.population * 12 : 0}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <MoneyIconTT/>
                            {rand_settlement.stock.money}
                            <PlusMinus value={rand_clan?.population ? Math.round(rand_clan.population * 12 * rand_foreign.prices.books) : 0}/>
                        </div>
                    </div>
                },
                {
                    title: "Refuse the request",
                    effect: doNothing,
                    tooltip: <div>
                        <p>Relation with {rand_foreign.name} will decrease by {rand_clan?.population ? rand_clan.population * 12 : 0}.</p>
                    </div>
                }
            ]}
        />
    )
}