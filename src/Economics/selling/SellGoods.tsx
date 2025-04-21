import { useEffect, useState } from "react";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { empty_goodsdist, goodsdist, goodsId, roundGoods } from "../../Goods/GoodsDist";
import SellOrder from "./SellOrder";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import DisplayGoods from "../../components/goodsDislay";

export default function SellGoods(
    {foreignPowers,prices,competingPrices,supply,merchantCapacity,updateFunc,currentChange}: 
    {foreignPowers: ForeignPowerInterface[],prices: goodsdist,competingPrices: goodsdist[],supply: goodsdist,merchantCapacity: number,updateFunc: (type: goodsId,units: number,name: string) => void,currentChange: goodsdist}
) {
    const [beingSold,setBeingSold] = useState<goodsdist>({...empty_goodsdist})

    const orderPlaced = (type: goodsId,units: number,name: string) => {
        updateFunc(type,units,name)
    }

    // Price comparison effect
    useEffect(() => {
        let cheapest_prices = {...roundGoods(prices)}
        
        competingPrices.forEach(s => {
            if(Math.round(s.food) < Math.round(cheapest_prices.food)) { cheapest_prices.food = Math.round(s.food) }
            if(Math.round(s.beer) < Math.round(cheapest_prices.beer)) { cheapest_prices.beer = Math.round(s.beer) }
            if(Math.round(s.leather) < Math.round(cheapest_prices.leather)) { cheapest_prices.leather = Math.round(s.leather) }
            if(Math.round(s.artisanal) < Math.round(cheapest_prices.artisanal)) { cheapest_prices.artisanal = Math.round(s.artisanal) }
            if(Math.round(s.livestock) < Math.round(cheapest_prices.livestock)) { cheapest_prices.livestock = Math.round(s.livestock) }
            if(Math.round(s.ornamental) < Math.round(cheapest_prices.ornamental)) { cheapest_prices.ornamental = Math.round(s.ornamental) }
            if(Math.round(s.enchanted) < Math.round(cheapest_prices.enchanted)) { cheapest_prices.enchanted = Math.round(s.enchanted) }
            if(Math.round(s.timber) < Math.round(cheapest_prices.timber)) { cheapest_prices.timber = Math.round(s.timber) }
            if(Math.round(s.tools) < Math.round(cheapest_prices.tools)) { cheapest_prices.tools = Math.round(s.tools) }
            if(Math.round(s.common_ores) < Math.round(cheapest_prices.common_ores)) { cheapest_prices.common_ores = Math.round(s.common_ores) }
            if(Math.round(s.medical) < Math.round(cheapest_prices.medical)) { cheapest_prices.medical = Math.round(s.medical) }
            if(Math.round(s.rare_ores) < Math.round(cheapest_prices.rare_ores)) { cheapest_prices.rare_ores = Math.round(s.rare_ores) }
            if(Math.round(s.gems) < Math.round(cheapest_prices.gems)) { cheapest_prices.gems = Math.round(s.gems) }
            if(Math.round(s.runes) < Math.round(cheapest_prices.runes)) { cheapest_prices.runes = Math.round(s.runes) }
            if(Math.round(s.arms) < Math.round(cheapest_prices.arms)) { cheapest_prices.arms = Math.round(s.arms) }
            if(Math.round(s.books) < Math.round(cheapest_prices.books)) { cheapest_prices.books = Math.round(s.books) }
            if(Math.round(s.enchanted_arms) < Math.round(cheapest_prices.enchanted_arms)) { cheapest_prices.enchanted_arms = Math.round(s.enchanted_arms) }
            if(Math.round(s.charcoal) < Math.round(cheapest_prices.charcoal)) { cheapest_prices.charcoal = Math.round(s.charcoal) }
        })
        
        const newBeingSold = {
            food: Math.round(prices.food) <= Math.round(cheapest_prices.food) ? 1 : 0,
            beer: Math.round(prices.beer) <= Math.round(cheapest_prices.beer) ? 1 : 0,
            leather: Math.round(prices.leather) <= Math.round(cheapest_prices.leather) ? 1 : 0,
            artisanal: Math.round(prices.artisanal) <= Math.round(cheapest_prices.artisanal) ? 1 : 0,
            livestock: Math.round(prices.livestock) <= Math.round(cheapest_prices.livestock) ? 1 : 0,
            ornamental: Math.round(prices.ornamental) <= Math.round(cheapest_prices.ornamental) ? 1 : 0,
            enchanted: Math.round(prices.enchanted) <= Math.round(cheapest_prices.enchanted) ? 1 : 0,
            timber: Math.round(prices.timber) <= Math.round(cheapest_prices.timber) ? 1 : 0,
            tools: Math.round(prices.tools) <= Math.round(cheapest_prices.tools) ? 1 : 0,
            common_ores: Math.round(prices.common_ores) <= Math.round(cheapest_prices.common_ores) ? 1 : 0,
            medical: Math.round(prices.medical) <= Math.round(cheapest_prices.medical) ? 1 : 0,
            rare_ores: Math.round(prices.rare_ores) <= Math.round(cheapest_prices.rare_ores) ? 1 : 0,
            gems: Math.round(prices.gems) <= Math.round(cheapest_prices.gems) ? 1 : 0,
            runes: Math.round(prices.runes) <= Math.round(cheapest_prices.runes) ? 1 : 0,
            arms: Math.round(prices.arms) <= Math.round(cheapest_prices.arms) ? 1 : 0,
            books: Math.round(prices.books) <= Math.round(cheapest_prices.books) ? 1 : 0,
            enchanted_arms: Math.round(prices.enchanted_arms) <= Math.round(cheapest_prices.enchanted_arms) ? 1 : 0,
            money: 0,
            charcoal: Math.round(prices.charcoal) <= Math.round(cheapest_prices.charcoal) ? 1 : 0,
        }
        setBeingSold({...newBeingSold})
    },[])

    return(
        <Card className="w-full">
            <div className="flex flex-column gap-3">
                <Card header="Current Goods" className="sticky top-0 z-5 bg-black shadow-2">
                    <DisplayGoods 
                        stock={roundGoods(supply)} 
                        change={roundGoods(currentChange)}
                />
                </Card>
                <div className="flex flex-column gap-2">
                    <span className="text-sm text-500">Available Goods for Sale</span>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {beingSold.food === 1 && supply.food > 0 ?<SellOrder 
                            key={goodsId.food}
                            supply={supply} 
                            type={goodsId.food} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.food} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.beer === 1 && supply.beer > 0 ?<SellOrder 
                            key={goodsId.beer}
                            supply={supply} 
                            type={goodsId.beer} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.beer} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.leather === 1 && supply.leather > 0 ?<SellOrder 
                            key={goodsId.leather}
                            supply={supply} 
                            type={goodsId.leather} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.leather} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.artisanal === 1 && supply.artisanal > 0 ?<SellOrder 
                            key={goodsId.artisanal}
                            supply={supply} 
                            type={goodsId.artisanal} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.artisanal} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.livestock === 1 && supply.livestock > 0 ?<SellOrder 
                            key={goodsId.livestock}
                            supply={supply} 
                            type={goodsId.livestock} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.livestock} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.ornamental === 1 && supply.ornamental > 0 ?<SellOrder 
                            key={goodsId.ornamental}
                            supply={supply} 
                            type={goodsId.ornamental} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.ornamental} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.enchanted === 1 && supply.enchanted > 0 ?<SellOrder 
                            key={goodsId.enchanted}
                            supply={supply} 
                            type={goodsId.enchanted} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.enchanted} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.timber === 1 && supply.timber > 0 ?<SellOrder 
                            key={goodsId.timber}
                            supply={supply} 
                            type={goodsId.timber} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.timber} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.tools === 1 && supply.tools > 0 ?<SellOrder 
                            key={goodsId.tools}
                            supply={supply} 
                            type={goodsId.tools} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.tools} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.common_ores === 1 && supply.common_ores > 0 ?<SellOrder 
                            key={goodsId.common_ores}
                            supply={supply} 
                            type={goodsId.common_ores} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.common_ores} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.medical === 1 && supply.medical > 0 ?<SellOrder 
                            key={goodsId.medical}
                            supply={supply} 
                            type={goodsId.medical} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.medical} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.rare_ores === 1 && supply.rare_ores > 0 ?<SellOrder 
                            key={goodsId.rare_ores}
                            supply={supply} 
                            type={goodsId.rare_ores} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.rare_ores} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.gems === 1 && supply.gems > 0 ?<SellOrder 
                            key={goodsId.gems}
                            supply={supply} 
                            type={goodsId.gems} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.gems} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.runes === 1 && supply.runes > 0 ?<SellOrder 
                            key={goodsId.runes}
                            supply={supply} 
                            type={goodsId.runes} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.runes} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.arms === 1 && supply.arms > 0 ?<SellOrder 
                            key={goodsId.arms}
                            supply={supply} 
                            type={goodsId.arms} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.arms} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.books === 1 && supply.books > 0 ?<SellOrder 
                            key={goodsId.books}
                            supply={supply} 
                            type={goodsId.books} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.books} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.enchanted_arms === 1 && supply.enchanted_arms > 0 ?<SellOrder 
                            key={goodsId.enchanted_arms}
                            supply={supply} 
                            type={goodsId.enchanted_arms} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.enchanted_arms} 
                            updateFunc={orderPlaced}
                        />: <></>}
                        {beingSold.charcoal === 1 && supply.charcoal > 0 ?<SellOrder 
                            key={goodsId.charcoal}
                            supply={supply} 
                            type={goodsId.charcoal} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.charcoal} 
                            updateFunc={orderPlaced}
                        />: <></>}
                    </div>
                </div>
                <Divider />
                <div className="flex flex-column gap-2">
                    <span className="text-sm text-500">Merchant Capacity</span>
                    <span className="text-lg">{merchantCapacity} units</span>
                </div>
            </div>
        </Card>
    )
}
