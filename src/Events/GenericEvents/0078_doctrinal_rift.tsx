import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import OrnamentalIconTT from "../../tooltips/goods/OrnamentalIconTT";
import LoyaltyIconTT from "../../tooltips/LoyaltyIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0078_doctrinal_rift({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.clerics && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.clerics && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.find(c => c.id === clanTypes.clerics)

    const resolveRift = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    books: s.stock.books - (rand_clan?.population ? rand_clan.population * 12 : 0),
                    ornamental: s.stock.ornamental - (rand_clan?.population ? rand_clan.population * 12 : 0)
                }
            }
        })
    })
    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                clans: s.clans.map(c => {
                    if (c.id !== clanTypes.clerics) {return c}
                    return {
                        ...c,
                        loyalty_modifiers: [...c.loyalty_modifiers, {
                            name: "Doctrinal Rift",
                            value: -1,
                            duration: 12
                        }]
                    }
                })
            }
        })
    })
    return(
        <EventTemplate
            title="Doctrinal Rift"
            body={`A doctrinal rift has broken out between the Clerics of ${rand_settlement.visible_name}`}
            effect_buttons={[
                {
                    title: "Begin Conclave",
                    effect: resolveRift,
                    tooltip: <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <BooksIconTT/>
                            {rand_settlement.stock.books}
                            <PlusMinus value={rand_clan?.population ? -rand_clan.population * 12 : 0}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <OrnamentalIconTT/>
                            {rand_settlement.stock.ornamental}
                            <PlusMinus value={rand_clan?.population ? -rand_clan.population * 12 : 0}/>
                        </div>
                    </div>

                },
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <LoyaltyIconTT/>
                        {rand_clan?.loyalty}
                        <PlusMinus value={-1}/>
                        For One Year
                        </div>
                    </div>
                }
            ]}
        />

    )
}