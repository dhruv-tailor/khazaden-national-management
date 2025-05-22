import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import BeerIconTT from "../../tooltips/goods/BeerIconTT";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import OrnamentalIconTT from "../../tooltips/goods/OrnamentalIconTT";
import LoyaltyIconTT from "../../tooltips/LoyaltyIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";
export default function g0074_archivist_festival({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.find(c => c.id === clanTypes.archivists)

    const doNothing = () => updateFunc({...federal})
    const fundFestival = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    ornamental: s.stock.ornamental - (rand_clan?.population ? rand_clan.population * 12 : 0),
                    beer: s.stock.beer - (rand_clan?.population ? rand_clan.population * 12 : 0),
                    books: s.stock.books - (rand_clan?.population ? rand_clan.population * 12 : 0)
                },
                clans: s.clans.map(c => {
                    if (c.id !== clanTypes.archivists) {return c}
                    return {
                        ...c,
                        loyalty_modifiers: [...c.loyalty_modifiers, {
                            name: "Archivist Festival",
                            value: 1,
                            duration: 12
                        }]
                    }
                })
            }
        })
    })
    return (
        <EventTemplate
            title="Archivist Festival"
            body={`The Archivists of ${rand_settlement.visible_name} want to host a festival to celebrate the release of their new book.`}
            effect_buttons={[
                {
                    title: "Fund Festival",
                    effect: fundFestival,
                    tooltip: <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <OrnamentalIconTT/>
                            {rand_settlement.stock.ornamental}
                            <PlusMinus value={rand_clan?.population ? -rand_clan.population * 12 : 0}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <BeerIconTT/>
                            {rand_settlement.stock.beer}
                            <PlusMinus value={rand_clan?.population ? -rand_clan.population * 12 : 0}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <BooksIconTT/>
                            {rand_settlement.stock.books}
                            <PlusMinus value={rand_clan?.population ? -rand_clan.population * 12 : 0}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <LoyaltyIconTT/>
                            {rand_clan?.loyalty}
                            <PlusMinus value={1}/>
                            For One Year
                        </div>
                    </div>
                },
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div><p>Waste of resources</p></div>
                }
            ]}
        />
    )
}

    