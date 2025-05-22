import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import CharcoalIconTT from "../../tooltips/goods/CharcoalIconTT";
import EnchantedIconTT from "../../tooltips/goods/EnchantedIconTT";
import TimberIconTT from "../../tooltips/goods/TimberIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0026_sacred_grove({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.foresters && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.foresters && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.filter(c => c.id === clanTypes.foresters)[0]

    const harvest = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    enchanted: s.stock.enchanted + (12 * rand_clan.population),
                    charcoal: s.stock.charcoal + (12 * rand_clan.population)
                }
            }
        })
    })

    const chop = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    timber: s.stock.timber + (24 * rand_clan.population)
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Sacred Grove"
            body={`A sacred grove has been discovered in ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "Harvest the Fruits of the Grove",
                    effect: harvest,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <EnchantedIconTT/>
                            {Math.round(rand_settlement.stock.enchanted)}
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <CharcoalIconTT/>
                            {Math.round(rand_settlement.stock.charcoal)}
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                    </div>
                },
                {
                    title: "Chop Down the Trees",
                    effect: chop,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <TimberIconTT/>
                            {Math.round(rand_settlement.stock.timber)}
                            <PlusMinus value={Math.round(24 * rand_clan.population)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
