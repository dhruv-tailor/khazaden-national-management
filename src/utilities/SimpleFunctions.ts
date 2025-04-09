import { LoanInterface } from "../Economics/loans/loanInterface"
import { roundGoods, scaleGoods, addGoods, goodsdist, empty_goodsdist } from "../Goods/GoodsDist"
import { MonthsStoreGetChange, SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface"

// Makes sure the number is not NaN or None
export const ensureNumber = (value: number): number => isNaN(value) ? 0 : value
export const clampValue = (value: number, min: number, max: number) => Math.max(min,Math.min(max,value))

export const FederalChange = (settlements: SettlementInterface[],loans: LoanInterface[]) => {
    if (settlements.length === 0) {return {...empty_goodsdist}}
    let change_reserve = settlements.map(settlement => {
        return settlement.clans.map(
            clan => roundGoods(scaleGoods(clan.production,settlement.production_quota))
        ).reduce((sum,val) => addGoods(sum,val))
    }).reduce((sum,val) => addGoods(sum,val))

    change_reserve.money = Math.round(settlements.map(settlement => {
        return settlement.clans.map(
            clan => clan.tax_rate * clan.taxed_productivity
        ).reduce((sum,val) => sum + val) * settlement.settlement_tax
     }).reduce((sum,val) => sum + val)) - loans.map(loan => Math.round(loan.amount / loan.months_left)).reduce((sum,val) => sum + val)

     return(change_reserve)
}

export const GetFederalGoodsStored = (settlements: SettlementInterface[],months: number,loans: LoanInterface[]): goodsdist => {
    const store_per_turn = FederalChange(settlements,loans)
    return scaleGoods(MonthsStoreGetChange(store_per_turn),months)
}
