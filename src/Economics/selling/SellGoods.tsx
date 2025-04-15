import { useEffect, useState } from "react";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { empty_goodsdist, goodsdist, goodsId } from "../../Goods/GoodsDist";
import SellOrder from "./SellOrder";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

export default function SellGoods(
    {foreignPowers,prices,competingPrices,supply,merchantCapacity,updateFunc}: 
    {foreignPowers: ForeignPowerInterface[],prices: goodsdist,competingPrices: goodsdist[],supply: goodsdist,merchantCapacity: number,updateFunc: (type: goodsId,units: number,name: string) => void}
) {
    const [beingSold,setBeingSold] = useState<goodsdist>({...empty_goodsdist})

    const orderPlaced = (type: goodsId,units: number,name: string) => {
        updateFunc(type,units,name)
    }

    // Price comparison effect
    useEffect(() => {
        let cheapest_prices = {...prices}
        
        competingPrices.forEach(s => {
            if(s.food < cheapest_prices.food) { cheapest_prices.food = s.food }
            if(s.beer < cheapest_prices.beer) { cheapest_prices.beer = s.beer }
            if(s.leather < cheapest_prices.leather) { cheapest_prices.leather = s.leather }
            if(s.artisinal < cheapest_prices.artisinal) { cheapest_prices.artisinal = s.artisinal }
            if(s.livestock < cheapest_prices.livestock) { cheapest_prices.livestock = s.livestock }
            if(s.ornamental < cheapest_prices.ornamental) { cheapest_prices.ornamental = s.ornamental }
            if(s.enchanted < cheapest_prices.enchanted) { cheapest_prices.enchanted = s.enchanted }
            if(s.timber < cheapest_prices.timber) { cheapest_prices.timber = s.timber }
            if(s.tools < cheapest_prices.tools) { cheapest_prices.tools = s.tools }
            if(s.common_ores < cheapest_prices.common_ores) { cheapest_prices.common_ores = s.common_ores }
            if(s.medical < cheapest_prices.medical) { cheapest_prices.medical = s.medical }
            if(s.rare_ores < cheapest_prices.rare_ores) { cheapest_prices.rare_ores = s.rare_ores }
            if(s.gems < cheapest_prices.gems) { cheapest_prices.gems = s.gems }
            if(s.runes < cheapest_prices.runes) { cheapest_prices.runes = s.runes }
            if(s.arms < cheapest_prices.arms) { cheapest_prices.arms = s.arms }
            if(s.books < cheapest_prices.books) { cheapest_prices.books = s.books }
            if(s.enchanted_arms < cheapest_prices.enchanted_arms) { cheapest_prices.enchanted_arms = s.enchanted_arms }
            if(s.charcoal < cheapest_prices.charcoal) { cheapest_prices.charcoal = s.charcoal }
        })
        
        const newBeingSold = {
            food: prices.food <= cheapest_prices.food ? 1 : 0,
            beer: prices.beer <= cheapest_prices.beer ? 1 : 0,
            leather: prices.leather <= cheapest_prices.leather ? 1 : 0,
            artisinal: prices.artisinal <= cheapest_prices.artisinal ? 1 : 0,
            livestock: prices.livestock <= cheapest_prices.livestock ? 1 : 0,
            ornamental: prices.ornamental <= cheapest_prices.ornamental ? 1 : 0,
            enchanted: prices.enchanted <= cheapest_prices.enchanted ? 1 : 0,
            timber: prices.timber <= cheapest_prices.timber ? 1 : 0,
            tools: prices.tools <= cheapest_prices.tools ? 1 : 0,
            common_ores: prices.common_ores <= cheapest_prices.common_ores ? 1 : 0,
            medical: prices.medical <= cheapest_prices.medical ? 1 : 0,
            rare_ores: prices.rare_ores <= cheapest_prices.rare_ores ? 1 : 0,
            gems: prices.gems <= cheapest_prices.gems ? 1 : 0,
            runes: prices.runes <= cheapest_prices.runes ? 1 : 0,
            arms: prices.arms <= cheapest_prices.arms ? 1 : 0,
            books: prices.books <= cheapest_prices.books ? 1 : 0,
            enchanted_arms: prices.enchanted_arms <= cheapest_prices.enchanted_arms ? 1 : 0,
            money: 0,
            charcoal: prices.charcoal <= cheapest_prices.charcoal ? 1 : 0,
        }
        setBeingSold({...newBeingSold})
    },[])

    return(
        <Card title="Sell Goods" className="w-full">
            <div className="flex flex-column gap-3">
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
                        {beingSold.artisinal === 1 && supply.artisinal > 0 ?<SellOrder 
                            key={goodsId.artisinal}
                            supply={supply} 
                            type={goodsId.artisinal} 
                            buyers={foreignPowers} 
                            merchantCapacity={merchantCapacity} 
                            price={prices.artisinal} 
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
