import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0051_cultural_exchange({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements.filter(s => s.trade_deals.some(td => td.outgoing.books > 0 && td.type === 'foreign'))[Math.floor(Math.random() * federal.settlements.filter(s => s.trade_deals.some(td => td.outgoing.books > 0 && td.type === 'foreign')).length)];
    const rand_trade_deal = rand_settlement.trade_deals.filter(td => td.outgoing.books > 0 && td.type === 'foreign')[Math.floor(Math.random() * rand_settlement.trade_deals.filter(td => td.outgoing.books > 0 && td.type === 'foreign').length)];

    const doNothing = () => updateFunc({...federal,
        foreign_powers: federal.foreign_powers.map(fp => {
            if (fp.trade_deals.some(td => td.trade_id === rand_trade_deal.trade_id)) {
                return {
                    ...fp,
                    relations: fp.relations + rand_trade_deal.outgoing.books
                }
            }
            return fp
        })
    })
    return (
        <EventTemplate
            title="Cultural Exchange"
            body={`Due to ${rand_settlement.visible_name}'s export of books, our culture has spread outside of our borders.`}
            effect_buttons={[
                {
                    title: `${rand_settlement.visible_name} Cultural Victory`,
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        Our culture has spread outside of our borders.
                    </div>
                }
            ]}
        />
    )
}