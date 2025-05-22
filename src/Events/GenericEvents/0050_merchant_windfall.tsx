import { totalGoods } from "../../Goods/GoodsDist";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export const g0050_merchant_windfall = ({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) => {
    const rand_settlement = federal.settlements.filter(s => s.trade_deals.length > 0)[Math.floor(Math.random() * federal.settlements.filter(s => s.trade_deals.length > 0).length)];
    const rand_trade_deal = rand_settlement.trade_deals[Math.floor(Math.random() * rand_settlement.trade_deals.length)];

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                trade_deals: s.trade_deals.map(td => {
                    if (td.trade_id !== rand_trade_deal.trade_id) {return td}
                    return {
                        ...td,
                        incoming: {
                            ...td.incoming,
                            money: td.incoming.money + (totalGoods(td.incoming) * 10)
                        }
                    }
                })
            }
        })
    })
    return (
        <EventTemplate
            title="Merchant Windfall"
            body={`The merchants of ${rand_settlement.visible_name} have managed to improve one of their trade deals.`}
            effect_buttons={[
                {
                    title: "More Money, less problems",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            A Random trade deal is improved
                        </div>
                    </div>
                }
            ]}
        />
    )
}

