import { IoFastFood } from "react-icons/io5";
import { empty_goodsdist, goodsdist } from "../components/ResourceDistribution";
import { FaBook, FaBriefcaseMedical, FaCoins, FaGem, FaShieldAlt, FaTools } from "react-icons/fa";
import OrderRow from "./OrderRow";
import { GiBeerStein, GiClothes, GiCoalWagon, GiCrystalBall, GiGems, GiMagicShield, GiPouringChalice, GiRuneStone, GiThrownCharcoal, GiWoodPile } from "react-icons/gi";
import { LuHandCoins } from "react-icons/lu";
import { PiCowFill } from "react-icons/pi";
import { useState } from "react";
import { goods } from "../Goods/good";
import { Button } from "primereact/button";

export default function PlaceOrder(
    {prices,available,updateFunc,merchantCapacity}:
    {prices: goodsdist,available:goodsdist,updateFunc: (units_ordered: goodsdist,capUsed: number) => void,merchantCapacity?: number}
) {

    const [order,setOrder] = useState<goodsdist>({...empty_goodsdist})
    const [capacityUsed, setCapacityUsed] = useState<number>(0)

    const whichOne = (capacity: number,natCap: number) => {
        if(natCap) {
            return (capacity < natCap ? capacity : natCap)
        }
        return capacity
    }

    const updateOrder = (units: number, type: goods) => {
        switch (type) {
            case goods.food:
                setOrder({...order,food: units});
                break;
            case goods.beer:
                setOrder({...order,beer: units});
                break;
            case goods.leather:
                setOrder({...order,leather: units});
                break;
            case goods.artisinal:
                setOrder({...order,artisinal: units});
                break;
            case goods.livestock:
                setOrder({...order,livestock: units});
                break;
            case goods.ornamenatal:
                setOrder({...order,ornamental: units});
                break;
            case goods.luxuries:
                setOrder({...order,enchanted: units});
                break;
            case goods.timber:
                setOrder({...order,timber: units});
                break;
            case goods.tools:
                setOrder({...order,tools: units});
                break;
            case goods.commonOres:
                setOrder({...order,common_ores: units});
                break;
            case goods.medical:
                setOrder({...order,medical: units});
                break;
            case goods.rareOres:
                setOrder({...order,rare_ores: units});
                break;
            case goods.gems:
                setOrder({...order,gems: units});
                break;
            case goods.runes:
                setOrder({...order,runes: units});
                break;
            case goods.arms:
                setOrder({...order,arms: units});
                break;
            case goods.books:
                setOrder({...order,books: units});
                break;
            case goods.enchantedArms:
                setOrder({...order,enchanted_arms: units});
                break;
            case goods.charcoal:
                setOrder({...order,charcoal: units});
                break;
        }
        let cap_used = 0
        cap_used += order.food
        cap_used += order.beer
        cap_used += order.leather
        cap_used += order.artisinal
        cap_used += order.livestock
        cap_used += order.ornamental
        cap_used += order.enchanted
        cap_used += order.timber
        cap_used += order.tools
        cap_used += order.common_ores
        cap_used += order.medical
        cap_used += order.rare_ores
        cap_used += order.gems
        cap_used += order.runes
        cap_used += order.arms
        cap_used += order.books
        cap_used += order.enchanted_arms
        cap_used += order.charcoal
        setCapacityUsed(cap_used)
    }

    return(<>
        <div className="flex flex-column gap-1">
            {available.food > 0 ? 
                <OrderRow
                    type={goods.food}
                    units={order.food} 
                    price={Math.round(prices.food)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.food) : available.food} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<IoFastFood/>}/>: null}
            {available.beer > 0 ? 
                <OrderRow 
                    units={order.beer}
                    type={goods.beer}
                    price={Math.round(prices.beer)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.beer) : available.beer} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiBeerStein/>}/>: null}
            {available.leather > 0 ? 
                <OrderRow 
                    units={order.leather}
                    type={goods.leather} 
                    price={Math.round(prices.leather)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.leather) : available.leather} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiClothes/>}/>: null}
            {available.artisinal > 0 ? 
                <OrderRow 
                    units={order.artisinal}
                    type={goods.artisinal} 
                    price={Math.round(prices.artisinal)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.artisinal) : available.artisinal}
                    updateFunc={updateOrder} 
                    capUsed={merchantCapacity ? true : false}
                    icon={<LuHandCoins/>}/>: null}
            {available.livestock > 0? 
                <OrderRow 
                    units={order.livestock} 
                    type={goods.livestock}
                    price={Math.round(prices.livestock)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.livestock) : available.livestock} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<PiCowFill/>}/>:null}
            {available.ornamental > 0? 
                <OrderRow 
                    units={order.ornamental} 
                    type={goods.ornamenatal}
                    price={Math.round(prices.ornamental)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.ornamental) : available.ornamental}
                    updateFunc={updateOrder} 
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiPouringChalice/>}/>:null}
            {available.enchanted > 0? 
                <OrderRow 
                    units={order.enchanted}
                    type={goods.luxuries} 
                    price={Math.round(prices.enchanted)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.enchanted) : available.enchanted} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiCrystalBall/>}/>:null}
            {available.timber > 0? 
                <OrderRow 
                    units={order.timber} 
                    type={goods.timber}
                    price={Math.round(prices.timber)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.timber) : available.timber}
                    updateFunc={updateOrder} 
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiWoodPile/>}/>:null}
            {available.tools > 0? 
                <OrderRow 
                    units={order.tools} 
                    type={goods.tools}
                    price={Math.round(prices.tools)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.tools) : available.tools} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<FaTools/>}/>:null}
            {available.common_ores > 0? 
                <OrderRow 
                    units={order.common_ores} 
                    type={goods.commonOres}
                    price={Math.round(prices.common_ores)}
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.common_ores) : available.common_ores} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiCoalWagon/>}/>:null}
            {available.medical > 0? 
                <OrderRow 
                    units={order.medical} 
                    type={goods.medical}
                    price={Math.round(prices.medical)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.common_ores) : available.common_ores} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<FaBriefcaseMedical/>}/>:null}
            {available.rare_ores > 0? 
                <OrderRow 
                    units={order.rare_ores} 
                    type={goods.rareOres}
                    price={Math.round(prices.rare_ores)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.rare_ores) : available.rare_ores} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<FaGem/>}/>:null}
            {available.gems > 0? 
                <OrderRow 
                    units={order.gems} 
                    type={goods.gems}
                    price={Math.round(prices.gems)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.gems) : available.gems} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiGems/>}/>:null}
            {available.runes > 0? 
                <OrderRow 
                    units={order.runes} 
                    type={goods.runes}
                    price={Math.round(prices.runes)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.runes) : available.runes} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiRuneStone/>}/>:null}
            {available.arms > 0? 
                <OrderRow 
                    units={order.arms} 
                    type={goods.arms}
                    price={Math.round(prices.arms)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.arms) : available.arms} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<FaShieldAlt/>}/>:null}
            {available.books > 0? 
                <OrderRow 
                    units={order.books} 
                    type={goods.books}
                    price={Math.round(prices.books)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.books) : available.books} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<FaBook/>}/>:null}
            {available.enchanted_arms > 0? 
                <OrderRow 
                    units={order.enchanted_arms} 
                    type={goods.enchantedArms}
                    price={Math.round(prices.enchanted_arms)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.enchanted_arms) : available.enchanted_arms} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiMagicShield/>}/>:null}
            {available.charcoal > 0? 
                <OrderRow 
                    units={order.charcoal} 
                    type={goods.charcoal}
                    price={Math.round(prices.charcoal)} 
                    max={merchantCapacity ? whichOne(merchantCapacity-capacityUsed,available.charcoal) : available.charcoal} 
                    updateFunc={updateOrder}
                    capUsed={merchantCapacity ? true : false}
                    icon={<GiThrownCharcoal/>}/>:null}
            <Button severity="success" icon='pi pi-shopping-cart' onClick={()=>{updateFunc(order,capacityUsed)}}>
                <div className="flex flex-row gap-1">
                    Purchase For  
                    <FaCoins/>
                    {
                        (order.food * Math.round(prices.food)) + 
                        (order.beer * Math.round(prices.beer)) + 
                        (order.leather * Math.round(prices.leather)) +
                        (order.artisinal * Math.round(prices.artisinal)) +
                        (order.livestock * Math.round(prices.livestock)) +
                        (order.ornamental * Math.round(prices.ornamental)) +
                        (order.enchanted * Math.round(prices.enchanted)) +
                        (order.timber * Math.round(prices.timber)) +
                        (order.tools * Math.round(prices.tools)) +
                        (order.common_ores * Math.round(prices.common_ores)) +
                        (order.medical * Math.round(prices.medical)) +
                        (order.rare_ores * Math.round(prices.rare_ores)) +
                        (order.gems * Math.round(prices.gems)) +
                        (order.runes * Math.round(prices.runes)) +
                        (order.arms * Math.round(prices.arms)) +
                        (order.books * Math.round(prices.books)) +
                        (order.enchanted_arms * Math.round(prices.enchanted_arms)) +
                        (order.charcoal * Math.round(prices.charcoal))
                    }
                </div>
            </Button>
            
        </div>
    </>)
}