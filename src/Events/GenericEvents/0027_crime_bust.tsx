import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import EnchantedIconTT from "../../tooltips/goods/EnchantedIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0027_crime_bust({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.foresters && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.foresters && c.population > 0)).length)]
    const rand_clan = rand_settlement.clans.filter(c => c.id === clanTypes.foresters)[0]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    enchanted: s.stock.enchanted + (12 * rand_clan.population)
                }
            }
        })
    })

    return (
        <EventTemplate
            title="Crime Bust"
            body={`A crime bust has been conducted in ${rand_settlement.name}.`}
            effect_buttons={[
                {
                    title: "It's Payday!",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <EnchantedIconTT/>
                            <PlusMinus value={Math.round(12 * rand_clan.population)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}   
