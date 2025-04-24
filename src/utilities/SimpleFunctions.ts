import { LoanInterface } from "../Economics/loans/loanInterface"
import { roundGoods, addGoods, goodsdist, empty_goodsdist, subtractGoods, multiplyGoods } from "../Goods/GoodsDist"
import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface"
import { ArmyInterface } from "../Military/Army/Army"
import { TradeDealInterface } from "../Economics/Trade/interface/TradeDealInterface"

// Makes sure the number is not NaN or None
export const ensureNumber = (value: number): number => isNaN(value) ? 0 : value
export const clampValue = (value: number, min: number, max: number) => Math.max(min,Math.min(max,value))

export const FederalChange = (settlements: SettlementInterface[],loans: LoanInterface[],armies: ArmyInterface[],trade_deals: TradeDealInterface[]): goodsdist => {
    if (settlements.length === 0) {return {...empty_goodsdist}}
    let change_reserve = settlements.map(settlement => {
        return settlement.clans.map(
            clan => roundGoods(multiplyGoods(clan.production,settlement.taxation))
        ).reduce((sum,val) => addGoods(sum,val))
    }).reduce((sum,val) => addGoods(sum,val))

    change_reserve.money = Math.round(settlements.map(settlement => {
        return settlement.clans.map(
            clan => clan.tax_rate * clan.taxed_productivity
        ).reduce((sum,val) => sum + val) * settlement.taxation.money
     }).reduce((sum,val) => sum + val))

     if (loans.length > 0) {
        change_reserve.money -= loans.map(loan => Math.round(loan.amount / loan.months_left)).reduce((sum,val) => sum + val)
     } 

     change_reserve = subtractGoods(change_reserve,
        armies.reduce((sum,army) => addGoods(sum,army.units.reduce((ssum,unit) => addGoods(ssum,unit.consumption_rate),{...empty_goodsdist})),{...empty_goodsdist})
     )

     trade_deals.forEach(deal => {
        if(deal.active === 'active') {
            change_reserve = subtractGoods(change_reserve,deal.outgoing)
            change_reserve = addGoods(change_reserve,deal.incoming)
        }
     })

     return(change_reserve)
}
