import { LoanInterface } from "../Economics/loans/loanInterface";
import { initial_prices } from "../Economics/pricing/prices";
import { TradeDealInterface } from "../Economics/Trade/interface/TradeDealInterface";
import { ForeignPowerInterface } from "../ForeignPowers/Interface/ForeignPowerInterface";
import { empty_goodsdist, goodsdist } from "../Goods/GoodsDist";
import { ArmyInterface } from "../Military/Army/Army";
import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";

export interface FederalInterface {
    settlements: SettlementInterface[],
    reserve: goodsdist,
    foreign_powers: ForeignPowerInterface[],
    prices: goodsdist,
    price_history: goodsdist[],
    merchant_capacity: number,
    loans: LoanInterface[],
    armies: ArmyInterface[],
    trade_deals: TradeDealInterface[],
    random_events: number[],
    available_diplomats: number
}

export const empty_federal_interface: FederalInterface = {
    settlements: [],
    reserve: {...empty_goodsdist},
    foreign_powers: [],
    prices: {...initial_prices},
    price_history: [],
    merchant_capacity: 0,
    loans: [],
    armies: [],
    trade_deals: [],
    random_events: [],
    available_diplomats: 1
}
