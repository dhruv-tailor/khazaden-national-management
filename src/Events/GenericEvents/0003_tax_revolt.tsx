import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";
import PlusMinus from "../../components/PlusMinus";
import LoyaltyIconTT from "../../tooltips/LoyaltyIconTT";


export default function g0003_tax_revolt({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {

    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0 && clan.tax_rate > 0.75)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0 && clan.tax_rate > 0.75).length)]

    const doNothing = () => {
        updateFunc({
            ...federal,
            settlements: federal.settlements.map(s => {
                if (s.global_id !== rand_settlement.global_id) {return s}
                return {
                    ...s,
                    clans: s.clans.map(c => {
                        if (c.id !== rand_clan.id) {return c}
                        return {
                            ...c,
                            loyalty_modifiers: [...c.loyalty_modifiers,{name: 'Tax Revolt', value: -1, duration: 12}]
                        }
                    })
                }
            })
        })
    }

    return (
        <EventTemplate
            title="Tax Revolt"
            body={`The people of ${rand_clan.name} in ${rand_settlement.name} are revolting against the tax rate of ${rand_clan.tax_rate}.`}
            effect_buttons={[
                {
                    title: "I'll consider it",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <p>The people of ${rand_clan.name} in ${rand_settlement.name} will be unhappy for one year.</p>
                        <div className="flex flex-row gap-2">
                            <PlusMinus value={-1}/>
                            <LoyaltyIconTT/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
