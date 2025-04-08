import { useEffect, useState } from "react";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { empty_goodsdist, goodsdist, goodsId } from "../../Goods/GoodsDist";
import SellOrder from "./SellOrder";

export default function SellGoods(
    {foreignPowers,prices,competingPrices,supply,merchantCapacity,updateFunc}: 
    {foreignPowers: ForeignPowerInterface[],prices: goodsdist,competingPrices: goodsdist[],supply: goodsdist,merchantCapacity: number,updateFunc: (type: goodsId,units: number,name: string) => void}
) {
    const [beingSold,setBeingSold] = useState<goodsdist>({...empty_goodsdist})

    const orderPlaced = (type: goodsId,units: number,name: string) => {
        updateFunc(type,units,name)
    }

    useEffect(() => {
        const cheapest_prices = {...prices}
        competingPrices.forEach(s => {
            if(s.food < cheapest_prices.food) {
                cheapest_prices.food = s.food
            }
            if(s.beer < cheapest_prices.beer) {
                cheapest_prices.beer = s.beer
            }
            if(s.leather < cheapest_prices.leather) {
                cheapest_prices.leather = s.leather
            }
            if(s.artisinal < cheapest_prices.artisinal) {
                cheapest_prices.artisinal = s.artisinal
            }
            if(s.livestock < cheapest_prices.livestock) {
                cheapest_prices.livestock = s.livestock
            }
            if(s.ornamental < cheapest_prices.ornamental) {
                cheapest_prices.ornamental = s.ornamental
            }
            if(s.enchanted < cheapest_prices.enchanted) {
                cheapest_prices.enchanted = s.enchanted
            }   
            if(s.timber < cheapest_prices.timber) {
                cheapest_prices.timber = s.timber
            }
            if(s.tools < cheapest_prices.tools) {
                cheapest_prices.tools = s.tools
            }   
            if(s.common_ores < cheapest_prices.common_ores) {
                cheapest_prices.common_ores = s.common_ores
            }
            if(s.medical < cheapest_prices.medical) {
                cheapest_prices.medical = s.medical
            }   
            if(s.rare_ores < cheapest_prices.rare_ores) {
                cheapest_prices.rare_ores = s.rare_ores
            }
            if(s.gems < cheapest_prices.gems) {
                cheapest_prices.gems = s.gems
            }   
            if(s.runes < cheapest_prices.runes) {
                cheapest_prices.runes = s.runes
            }
            if(s.arms < cheapest_prices.arms) {
                cheapest_prices.arms = s.arms
            }       
            if(s.books < cheapest_prices.books) {
                cheapest_prices.books = s.books
            }
            if(s.enchanted_arms < cheapest_prices.enchanted_arms) {
                cheapest_prices.enchanted_arms = s.enchanted_arms
            }
            if(s.charcoal < cheapest_prices.charcoal) {
                cheapest_prices.charcoal = s.charcoal
            }
        })
        setBeingSold({
            food: cheapest_prices.food < prices.food ? 0 : 1,
            beer: cheapest_prices.beer < prices.beer ? 0 : 1,
            leather: cheapest_prices.leather < prices.leather ? 0 : 1,
            artisinal: cheapest_prices.artisinal < prices.artisinal ? 0 : 1,
            livestock: cheapest_prices.livestock < prices.livestock ? 0 : 1,
            ornamental: cheapest_prices.ornamental < prices.ornamental ? 0 : 1,
            enchanted: cheapest_prices.enchanted < prices.enchanted ? 0 : 1,
            timber: cheapest_prices.timber < prices.timber ? 0 : 1,
            tools: cheapest_prices.tools < prices.tools ? 0 : 1,
            common_ores: cheapest_prices.common_ores < prices.common_ores ? 0 : 1,
            medical: cheapest_prices.medical < prices.medical ? 0 : 1,
            rare_ores: cheapest_prices.rare_ores < prices.rare_ores ? 0 : 1,
            gems: cheapest_prices.gems < prices.gems ? 0 : 1,
            runes: cheapest_prices.runes < prices.runes ? 0 : 1,
            arms: cheapest_prices.arms < prices.arms ? 0 : 1,
            books: cheapest_prices.books < prices.books ? 0 : 1,
            enchanted_arms: cheapest_prices.enchanted_arms < prices.enchanted_arms ? 0 : 1,
            money: 0,
            charcoal: cheapest_prices.charcoal < prices.charcoal ? 0 : 1,
        })
    },[])
    return(
        <div className="flex flex-row gap-2 flex-wrap">
            {beingSold.food === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.food} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.food} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.beer === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.beer} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.beer} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.leather === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.leather} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.leather} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.artisinal === 1 ? 
                <SellOrder 
                    supply={supply} 
                    type={goodsId.artisinal} 
                    buyers={foreignPowers} 
                    merchantCapacity={merchantCapacity} 
                    price={prices.artisinal} 
                    updateFunc={orderPlaced}/> : null}
            {beingSold.livestock === 1 ? 
                <SellOrder 
                    supply={supply} 
                    type={goodsId.livestock} 
                    buyers={foreignPowers} 
                    merchantCapacity={merchantCapacity} 
                    price={prices.livestock} 
                    updateFunc={orderPlaced}/> : null}
            {beingSold.ornamental === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.ornamental} 
                buyers={foreignPowers}
                merchantCapacity={merchantCapacity} 
                price={prices.ornamental} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.enchanted === 1 ?
                <SellOrder 
                    supply={supply} 
                    type={goodsId.enchanted} 
                    buyers={foreignPowers} 
                    merchantCapacity={merchantCapacity} 
                    price={prices.enchanted} 
                    updateFunc={orderPlaced}/> : null}
            {beingSold.timber === 1 ? 
                <SellOrder 
                    supply={supply} 
                    type={goodsId.timber} 
                    buyers={foreignPowers} 
                    merchantCapacity={merchantCapacity} 
                    price={prices.timber} 
                    updateFunc={orderPlaced}/> : null}
            {beingSold.tools === 1 ? 
                <SellOrder 
                    supply={supply} 
                    type={goodsId.tools} 
                    buyers={foreignPowers} 
                    merchantCapacity={merchantCapacity} 
                    price={prices.tools} 
                    updateFunc={orderPlaced}/> : null}
            {beingSold.common_ores === 1 ? 
                <SellOrder 
                    supply={supply} 
                    type={goodsId.common_ores} 
                    buyers={foreignPowers} 
                    merchantCapacity={merchantCapacity} 
                    price={prices.common_ores} 
                    updateFunc={orderPlaced}/> : null}
            {beingSold.medical === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.medical} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.medical} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.rare_ores === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.rare_ores} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.rare_ores} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.gems === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.gems} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.gems} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.runes === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.runes} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.runes} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.arms === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.arms} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.arms} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.books === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.books} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.books} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.enchanted_arms === 1 ? 
                <SellOrder 
                supply={supply} 
                type={goodsId.enchanted_arms} 
                buyers={foreignPowers} 
                merchantCapacity={merchantCapacity} 
                price={prices.enchanted_arms} 
                updateFunc={orderPlaced}/> : null}
            {beingSold.charcoal === 1 ? 
                <SellOrder 
                    supply={supply} 
                    type={goodsId.charcoal} 
                    buyers={foreignPowers} 
                    merchantCapacity={merchantCapacity} 
                    price={prices.charcoal} 
                    updateFunc={orderPlaced}/> : null}    
        </div>
    )
}
