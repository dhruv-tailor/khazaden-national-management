import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import EfficencyIconTT from "../../tooltips/EfficencyIconTT";
import RareOresIconTT from "../../tooltips/goods/RareOresIconTT";
import RunesIconTT from "../../tooltips/goods/RunesIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0071_arcane_dispute({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0)).length)]
    const clan = rand_settlement.clans.find(c => c.id === clanTypes.archivists)

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                clans: s.clans.map(c => {
                    if (c.id !== clanTypes.archivists) {return c}
                    return {
                        ...c,
                        efficency_modifiers: [...c.efficency_modifiers, {
                            name: "Arcane Dispute",
                            value: -1,
                            duration: 12
                        }]
                    }
                })
            }
        })
    })
    const settleDispute = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    runes: s.stock.runes - (clan?.population ? clan.population * 12 : 0),
                    rare_ores: s.stock.rare_ores - (clan?.population ? clan.population * 12 : 0)
                }
            }
        })
    })
    return (
        <EventTemplate
            title="Arcane Dispute"
            body={`A dispute has broken out between the Archivists of ${rand_settlement.visible_name} over a new arcane technology.`}
            effect_buttons={[
                {
                    title: "Settle the dispute",
                    effect: () => settleDispute,
                    tooltip: <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <RunesIconTT/>
                            {rand_settlement.stock.runes}
                            <PlusMinus value={clan?.population ? -clan.population * 12 : 0}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <RareOresIconTT/>
                            {rand_settlement.stock.rare_ores}
                            <PlusMinus value={clan?.population ? -clan.population * 12 : 0}/>
                        </div>
                    </div>
                },
                {
                    title: "Let them fight",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <EfficencyIconTT/>
                            {clan?.efficency}
                            <PlusMinus value={-1}/>
                            For one Year
                        </div>
                    </div>

                }
            ]}
        />
    )
}
