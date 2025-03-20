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

export default function PlaceOrder({prices,available,updateFunc}:{prices: goodsdist,available:goodsdist,updateFunc: (units_ordered: goodsdist) => void}) {

    const [order,setOrder] = useState<goodsdist>({...empty_goodsdist})

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
    }

    return(<>
        <div className="flex flex-column gap-1">
            {available.food > 0 ? 
                <OrderRow
                    type={goods.food}
                    units={order.food} 
                    price={Math.round(prices.food)} 
                    max={available.food} 
                    updateFunc={updateOrder}
                    icon={<IoFastFood/>}/>: null}
            {available.beer > 0 ? 
                <OrderRow 
                    units={order.beer}
                    type={goods.beer}
                    price={Math.round(prices.beer)} 
                    max={available.beer} 
                    updateFunc={updateOrder}
                    icon={<GiBeerStein/>}/>: null}
            {available.leather > 0 ? 
                <OrderRow 
                    units={order.leather}
                    type={goods.leather} 
                    price={Math.round(prices.leather)} 
                    max={available.leather} 
                    updateFunc={updateOrder}
                    icon={<GiClothes/>}/>: null}
            {available.artisinal > 0 ? 
                <OrderRow 
                    units={order.artisinal}
                    type={goods.artisinal} 
                    price={Math.round(prices.artisinal)} 
                    max={available.artisinal}
                    updateFunc={updateOrder} 
                    icon={<LuHandCoins/>}/>: null}
            {available.livestock > 0? 
                <OrderRow 
                    units={order.livestock} 
                    type={goods.livestock}
                    price={Math.round(prices.livestock)} 
                    max={available.livestock} 
                    updateFunc={updateOrder}
                    icon={<PiCowFill/>}/>:null}
            {available.ornamental > 0? 
                <OrderRow 
                    units={order.ornamental} 
                    type={goods.ornamenatal}
                    price={Math.round(prices.ornamental)} 
                    max={available.ornamental}
                    updateFunc={updateOrder} 
                    icon={<GiPouringChalice/>}/>:null}
            {available.enchanted > 0? 
                <OrderRow 
                    units={order.enchanted}
                    type={goods.luxuries} 
                    price={Math.round(prices.enchanted)} 
                    max={available.enchanted} 
                    updateFunc={updateOrder}
                    icon={<GiCrystalBall/>}/>:null}
            {available.timber > 0? 
                <OrderRow 
                    units={order.timber} 
                    type={goods.timber}
                    price={Math.round(prices.timber)} 
                    max={available.timber}
                    updateFunc={updateOrder} 
                    icon={<GiWoodPile/>}/>:null}
            {available.tools > 0? 
                <OrderRow 
                    units={order.tools} 
                    type={goods.tools}
                    price={Math.round(prices.tools)} 
                    max={available.tools} 
                    updateFunc={updateOrder}
                    icon={<FaTools/>}/>:null}
            {available.common_ores > 0? 
                <OrderRow 
                    units={order.common_ores} 
                    type={goods.commonOres}
                    price={Math.round(prices.common_ores)}
                    max={available.common_ores} 
                    updateFunc={updateOrder}
                    icon={<GiCoalWagon/>}/>:null}
            {available.medical > 0? 
                <OrderRow 
                    units={order.medical} 
                    type={goods.medical}
                    price={Math.round(prices.medical)} 
                    max={available.medical} 
                    updateFunc={updateOrder}
                    icon={<FaBriefcaseMedical/>}/>:null}
            {available.rare_ores > 0? 
                <OrderRow 
                    units={order.rare_ores} 
                    type={goods.rareOres}
                    price={Math.round(prices.rare_ores)} 
                    max={available.rare_ores} 
                    updateFunc={updateOrder}
                    icon={<FaGem/>}/>:null}
            {available.gems > 0? 
                <OrderRow 
                    units={order.gems} 
                    type={goods.gems}
                    price={Math.round(prices.gems)} 
                    max={available.gems} 
                    updateFunc={updateOrder}
                    icon={<GiGems/>}/>:null}
            {available.runes > 0? 
                <OrderRow 
                    units={order.runes} 
                    type={goods.runes}
                    price={Math.round(prices.runes)} 
                    max={available.runes} 
                    updateFunc={updateOrder}
                    icon={<GiRuneStone/>}/>:null}
            {available.arms > 0? 
                <OrderRow 
                    units={order.arms} 
                    type={goods.arms}
                    price={Math.round(prices.arms)} 
                    max={available.arms} 
                    updateFunc={updateOrder}
                    icon={<FaShieldAlt/>}/>:null}
            {available.books > 0? 
                <OrderRow 
                    units={order.books} 
                    type={goods.books}
                    price={Math.round(prices.books)} 
                    max={available.books} 
                    updateFunc={updateOrder}
                    icon={<FaBook/>}/>:null}
            {available.enchanted_arms > 0? 
                <OrderRow 
                    units={order.enchanted_arms} 
                    type={goods.enchantedArms}
                    price={Math.round(prices.enchanted_arms)} 
                    max={available.enchanted_arms} 
                    updateFunc={updateOrder}
                    icon={<GiMagicShield/>}/>:null}
            {available.charcoal > 0? 
                <OrderRow 
                    units={order.charcoal} 
                    type={goods.charcoal}
                    price={Math.round(prices.charcoal)} 
                    max={available.charcoal} 
                    updateFunc={updateOrder}
                    icon={<GiThrownCharcoal/>}/>:null}
            <Button severity="success" icon='pi pi-shopping-cart' onClick={()=>{updateFunc(order)}}>
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