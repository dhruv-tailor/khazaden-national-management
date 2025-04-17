import { useState } from "react";
import { addGoods, empty_goodsdist, goodsdist, goodsId, multiplyGoods, totalGoods } from "../../Goods/GoodsDist";
import OrderRow from "./OrderRow";
import { Button } from "primereact/button";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";

export default function PlaceOrder(
    {goods,prices,merchantCapacity,maxCost,updateFunc} : 
    {goods: goodsdist, prices: goodsdist, merchantCapacity: number,maxCost: number,updateFunc: (capUsed: number, order: goodsdist) => void}
) {
    const [capUsed,setCapUsed] = useState<number>(0)
    const [order,setOrder] = useState<goodsdist>({...empty_goodsdist})

    const whichOne = (nat: number, cap: number) => (cap < nat ? cap : nat)

    const updateOrder = (id: goodsId, units: number) => {
        const delta_goods: goodsdist = {
            money: 0,
            food: id === goodsId.food ? units - order.food: 0,
            beer: id === goodsId.beer ? units - order.beer : 0,
            leather: id === goodsId.leather ? units - order.leather: 0,
            artisinal: id === goodsId.artisinal ? units - order.artisinal : 0,
            livestock: id === goodsId.livestock ? units - order.livestock : 0,
            ornamental: id === goodsId.ornamental ? units - order.ornamental : 0,
            enchanted: id === goodsId.enchanted ? units - order.enchanted : 0,
            timber: id === goodsId.timber ? units - order.timber : 0,
            tools: id === goodsId.tools ? units - order.tools: 0,
            common_ores: id === goodsId.common_ores ? units - order.common_ores : 0,
            medical: id === goodsId.medical ? units - order.medical : 0,
            rare_ores: id === goodsId.rare_ores ? units - order.rare_ores : 0,
            gems: id === goodsId.gems ? units - order.gems : 0,
            runes: id === goodsId.runes ? units - order.runes : 0,
            arms: id === goodsId.arms ? units - order.arms : 0,
            books: id === goodsId.books ? units - order.books : 0,
            enchanted_arms: id === goodsId.enchanted_arms ? units - order.enchanted_arms : 0,
            charcoal: id === goodsId.charcoal ? units - order.charcoal : 0,
        }
        setOrder(addGoods(order,delta_goods))
        setCapUsed(capUsed + totalGoods(delta_goods))
        console.log(maxCost)
    }

    const totalCost = totalGoods(multiplyGoods(order,prices))
    const canAfford = maxCost >= totalCost
    const capacityPercentage = (capUsed / merchantCapacity) * 100

    return(
        <div className="flex flex-column gap-3">
            <Card className="surface-ground">
                <div className="flex flex-column gap-2">
                    <div className="flex flex-row justify-content-between align-items-center">
                        <span className="font-bold">Capacity Used: {capUsed} / {merchantCapacity}</span>
                        <span className="text-500">{Math.round(capacityPercentage)}%</span>
                    </div>
                    <ProgressBar 
                        value={capacityPercentage} 
                        showValue={false}
                        className={capacityPercentage > 90 ? 'p-progressbar-danger' : capacityPercentage > 70 ? 'p-progressbar-warning' : 'p-progressbar-success'}
                    />
                </div>
            </Card>

            <div className="grid">
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.food} 
                        units={order.food} 
                        price={prices.food} 
                        max={whichOne(merchantCapacity - capUsed,goods.food)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.beer} 
                        units={order.beer} 
                        price={prices.beer} 
                        max={whichOne(merchantCapacity - capUsed,goods.beer)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.leather} 
                        units={order.leather} 
                        price={prices.leather} 
                        max={whichOne(merchantCapacity - capUsed,goods.leather)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.artisinal} 
                        units={order.artisinal} 
                        price={prices.artisinal} 
                        max={whichOne(merchantCapacity - capUsed,goods.artisinal)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.livestock} 
                        units={order.livestock} 
                        price={prices.livestock} 
                        max={whichOne(merchantCapacity - capUsed,goods.livestock)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.ornamental} 
                        units={order.ornamental} 
                        price={prices.ornamental} 
                        max={whichOne(merchantCapacity - capUsed,goods.ornamental)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.enchanted} 
                        units={order.enchanted} 
                        price={prices.enchanted} 
                        max={whichOne(merchantCapacity - capUsed,goods.enchanted)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.timber} 
                        units={order.timber} 
                        price={prices.timber} 
                        max={whichOne(merchantCapacity - capUsed,goods.timber)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.tools} 
                        units={order.tools} 
                        price={prices.tools} 
                        max={whichOne(merchantCapacity - capUsed,goods.tools)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.common_ores} 
                        units={order.common_ores} 
                        price={prices.common_ores} 
                        max={whichOne(merchantCapacity - capUsed,goods.common_ores)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.medical} 
                        units={order.medical} 
                        price={prices.medical} 
                        max={whichOne(merchantCapacity - capUsed,goods.medical)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.rare_ores} 
                        units={order.rare_ores} 
                        price={prices.rare_ores} 
                        max={whichOne(merchantCapacity - capUsed,goods.rare_ores)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.gems} 
                        units={order.gems} 
                        price={prices.gems} 
                        max={whichOne(merchantCapacity - capUsed,goods.gems)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.runes} 
                        units={order.runes} 
                        price={prices.runes} 
                        max={whichOne(merchantCapacity - capUsed,goods.runes)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.arms} 
                        units={order.arms} 
                        price={prices.arms} 
                        max={whichOne(merchantCapacity - capUsed,goods.arms)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.books} 
                        units={order.books} 
                        price={prices.books} 
                        max={whichOne(merchantCapacity - capUsed,goods.books)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.enchanted_arms} 
                        units={order.enchanted_arms} 
                        price={prices.enchanted_arms} 
                        max={whichOne(merchantCapacity - capUsed,goods.enchanted_arms)} 
                        updateFunc={updateOrder}
                    />
                </div>
                <div className="col-12 md:col-6 lg:col-4">
                    <OrderRow 
                        goodType={goodsId.charcoal} 
                        units={order.charcoal} 
                        price={prices.charcoal} 
                        max={whichOne(merchantCapacity - capUsed,goods.charcoal)} 
                        updateFunc={updateOrder}
                    />
                </div>
            </div>

            <Card className="surface-ground">
                <div className="flex flex-column align-items-center gap-2">
                    <Button 
                        disabled={!canAfford} 
                        severity={canAfford ? 'success' : 'danger'}
                        icon='pi pi-shopping-cart'
                        onClick={() => updateFunc(capUsed,order)}
                        className="w-full"
                    >
                        <div className="flex flex-row align-items-center justify-content-center gap-2">
                            Purchase for
                            <MoneyIconTT/>
                            <span className="font-bold">{totalCost}</span>
                        </div>
                    </Button>
                    {!canAfford && (
                        <span className="text-danger">Insufficient funds</span>
                    )}
                </div>
            </Card>
        </div>
    )
}