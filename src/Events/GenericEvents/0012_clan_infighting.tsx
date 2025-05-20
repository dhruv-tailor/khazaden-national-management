import PlusMinus from "../../components/PlusMinus";
import LoyaltyIconTT from "../../tooltips/LoyaltyIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0012_clan_infighting({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                clans: s.clans.map(c => c.id === rand_clan.id ? {
                    ...c,
                    loyalty_modifiers: [...c.loyalty_modifiers,{name: 'Clan Infighting', value: -1, duration: 12}]
                } : c)
            }
        })
    })
    return (
        <EventTemplate
            title="Clan Infighting"
            body={`There is clan infighting within the ${rand_clan.name} of ${rand_settlement.visible_name}.`}  
            effect_buttons={[
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <LoyaltyIconTT/>
                            <PlusMinus value={-1}/>
                            For {rand_clan.name} in {rand_settlement.name} one year
                        </div>
                    </div>
                }
            ]}
        />
    )
}
