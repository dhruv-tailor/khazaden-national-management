import { goodsdist, empty_goodsdist } from "../../../Goods/GoodsDist";


export interface TradeDealInterface {
    id: string;
    name: string;
    type: 'foreign' | 'settlement' | 'federal';
    outgoing: goodsdist;
    incoming: goodsdist;
    duration: number;
}

export const empty_trade_deal: TradeDealInterface = {
    id: '',
    name: '',
    type: 'foreign',
    outgoing: {...empty_goodsdist},
    incoming: {...empty_goodsdist},
    duration: 0
}
