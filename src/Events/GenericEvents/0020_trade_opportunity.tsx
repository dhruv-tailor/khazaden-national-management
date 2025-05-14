import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import EnchantedArmsIconTT from "../../tooltips/goods/EnchantedArmsTT";
import EnchantedIconTT from "../../tooltips/goods/EnchantedIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";
import GemsIconTT from "../../tooltips/goods/GemsIconTT";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";

export default function g0020_trade_opportunity({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.merchants && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.merchants && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.filter(c => c.id === clanTypes.merchants)[0]

    const doNothing = () => updateFunc({...federal})
    const acceptOffer = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {...s.stock, 
                    enchanted_arms: s.stock.enchanted_arms + 12 * rand_clan.population,
                    enchanted: s.stock.enchanted + 12 * rand_clan.population,
                    books: s.stock.books - 12 * rand_clan.population,
                    gems: s.stock.gems - 12 * rand_clan.population
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Trade Opportunity"
            body="A trade opportunity has been discovered."
            effect_buttons={[
                {
                    title: "Accept the offer",
                    effect: acceptOffer,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <EnchantedArmsIconTT/>
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <EnchantedIconTT/>
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <BooksIconTT/>
                            <PlusMinus value={-Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <GemsIconTT/>
                            <PlusMinus value={-Math.round(12 * rand_clan.population)}/>
                        </div>
                    </div>
                },
                {
                    title: "Reject the offer",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <p>The trade opportunity will be lost.</p>
                    </div>
                }
            ]}
        />
    )
}
