import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import MedicalIconTT from "../../tooltips/goods/MedicalIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0037_new_healing_rite({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.clerics && c.population > 0))[Math.floor(Math.random() * federal.settlements.filter(s => s.clans.some(c => c.id === clanTypes.clerics && c.population > 0)).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    medical: s.prices.medical * 0.8,
                    books: s.prices.books * 1.2
                }
            }
        })
    })
    return (
        <EventTemplate
            title="New Healing Rite"
            body={`A new healing rite has been discovered by the Clerics of ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "Let's Pray",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <MedicalIconTT/> Prices
                            {Math.round(rand_settlement.prices.medical)}
                            <PlusMinus value={Math.round(rand_settlement.prices.medical * 0.2)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <BooksIconTT/> Prices
                            {Math.round(rand_settlement.prices.books)}
                            <PlusMinus value={Math.round(rand_settlement.prices.books * 0.2)}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
