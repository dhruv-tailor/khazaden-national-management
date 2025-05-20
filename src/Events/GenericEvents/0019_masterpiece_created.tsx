import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0019_masterpiece_created({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.craftsmen && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.craftsmen && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.filter(c => c.id === clanTypes.craftsmen)[0]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {...s.stock, money: s.stock.money + Math.round(rand_settlement.prices.artisanal * 12 * rand_clan.population)}
            }
        })
    })

    return (
        <EventTemplate
            title="Masterpiece Created"
            body={`A masterpiece has been created in ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "I smell profit",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <MoneyIconTT/>
                            <PlusMinus value={Math.round(rand_settlement.prices.artisanal * 12 * rand_clan.population)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
