import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import ArtisanalIconTT from "../../tooltips/goods/ArtisanalIconTT";
import LeatherIconTT from "../../tooltips/goods/LeatherIconTT";
import LivestockIconTT from "../../tooltips/goods/LivestockIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0035_merchants_flood_market({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.merchants && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.merchants && c.population > 0)).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    leather: s.prices.leather * 0.8,
                    livestock: s.prices.livestock * 0.8,
                    artisanal: s.prices.artisanal * 0.8
                }
            }
        })
    })

    return (
        <EventTemplate
            title="Merchants Flood Market"
            body={`Merchants in ${rand_settlement.name} are flooding the local market.`}
            effect_buttons={[
                {
                    title: "Paper Hands Much?",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <LeatherIconTT/>
                            prices decrease by 20%
                        </div>
                        <div className="flex flex-row gap-2">
                            <LivestockIconTT/>
                            prices decrease by 20%
                        </div>
                        <div className="flex flex-row gap-2">
                            <ArtisanalIconTT/>
                            prices decrease by 20%
                        </div>
                    </div>
                }
            ]}
        />
    )
}