import PlusMinus from "../../components/PlusMinus";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import MedicalIconTT from "../../tooltips/goods/MedicalIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0016_disease({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                projected_pop: s.projected_pop - rand_clan.population * 12 * (rand_clan.pop_growth_modifiers.reduce((sum,val) => sum + val.value,0)),
                clans: s.clans.map(c => {
                    if (c.id !== rand_clan.id) {return c}
                    return {
                        ...c,
                        productivity_modifiers: [...c.productivity_modifiers,{name: 'Disease', value: -1, duration: 12}]
                    }
                })
            }
        })
    })
    const sendClinicalAid = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                stock: {
                    ...s.stock,
                    books: s.stock.books - rand_clan.population * 12,
                    medical: s.stock.medical - rand_clan.population * 12
                }
            }
        })
    })

    return (
        <EventTemplate
            title="Disease"
            body={`A disease has broken out in ${rand_clan.name} of ${rand_settlement.name}.`}
            effect_buttons={[
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div className="flex flex-col">
                        <p>Population growth will be reduced for a while and producitivity will drop for a year</p>
                    </div>
                },
                {
                    title: "Send in Clinical Aid",
                    effect: sendClinicalAid,
                    tooltip: <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <MedicalIconTT/>
                            <PlusMinus value={-(rand_clan.population * 12)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <BooksIconTT/>
                            <PlusMinus value={-(rand_clan.population * 12)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
