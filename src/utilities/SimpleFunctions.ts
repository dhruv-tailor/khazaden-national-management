import { roundGoods, addGoods, goodsdist, empty_goodsdist, subtractGoods, multiplyGoods } from "../Goods/GoodsDist"
import { FederalInterface } from "./FederalInterface"

// Makes sure the number is not NaN or None
export const ensureNumber = (value: number): number => isNaN(value) ? 0 : value
export const clampValue = (value: number, min: number, max: number) => Math.max(min,Math.min(max,value))

export const FederalChange = (federal: FederalInterface): goodsdist => {
    if (federal.settlements.length === 0) {return {...empty_goodsdist}}
    let change_reserve = federal.settlements.map(settlement => {
        return settlement.clans.map(
            clan => roundGoods(multiplyGoods(clan.production,settlement.taxation))
        ).reduce((sum,val) => addGoods(sum,val))
    }).reduce((sum,val) => addGoods(sum,val))

    change_reserve.money = Math.round(federal.settlements.map(settlement => {
        return settlement.clans.map(
            clan => clan.tax_rate * clan.taxed_productivity
        ).reduce((sum,val) => sum + val) * settlement.taxation.money
     }).reduce((sum,val) => sum + val))

     if (federal.loans.length > 0) {
        change_reserve.money -= federal.loans.map(loan => Math.round(loan.amount / loan.months_left)).reduce((sum,val) => sum + val)
     } 

     change_reserve = subtractGoods(change_reserve,
        federal.armies.reduce((sum,army) => addGoods(sum,army.units.reduce((ssum,unit) => addGoods(ssum,unit.consumption_rate),{...empty_goodsdist})),{...empty_goodsdist})
     )

     federal.trade_deals.forEach(deal => {
        if(deal.active === 'active') {
            change_reserve = subtractGoods(change_reserve,deal.outgoing)
            change_reserve = addGoods(change_reserve,deal.incoming)
        }
     })

     return(change_reserve)
}
