import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import RunesIconTT from "../../tooltips/goods/RunesIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0017_lost_lore({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.filter(c => c.id === clanTypes.archivists)[0]

    const keepRunes = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (rand_settlement.global_id !== s.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    runes: s.stock.runes + rand_clan.population * 12
                }
            }
        })
    })
    const sellRunes = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (rand_settlement.global_id !== s.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    money: s.stock.money + Math.round(rand_clan.population * 12 * rand_settlement.prices.runes)
                }
            }
        })
    })

    return (
        <EventTemplate
            title="Lost Runes Discovered"
            body={`A pile of lost runes has been discovered in ${rand_settlement.name}.`}
            effect_buttons={[
                {
                    title: "Keep it",
                    effect: keepRunes,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <RunesIconTT/>
                            <PlusMinus value={rand_clan.population * 12}/>
                        </div>
                    </div>
                },
                {
                    title: "Sell it",
                    effect: sellRunes,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <RunesIconTT/>
                            <PlusMinus value={Math.round(rand_clan.population * 12 * rand_settlement.prices.runes)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
