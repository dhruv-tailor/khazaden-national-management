import { InputNumber } from "primereact/inputnumber";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaBook, FaBriefcaseMedical, FaGem, FaShieldAlt, FaTools } from "react-icons/fa";
import { GiBeerStein, GiClothes, GiCoalWagon, GiCrystalBall, GiGems, GiMagicShield, GiPouringChalice, GiRuneStone, GiThrownCharcoal, GiWoodPile } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { LuHandCoins } from "react-icons/lu";
import { PiCowFill } from "react-icons/pi";

export interface goodsdist {
    money: number;
    food: number;
    beer: number;
    leather: number;
    artisinal: number;
    livestock: number;
    ornamental: number;
    enchanted: number;
    timber: number;
    tools: number;
    common_ores: number;
    medical: number;
    rare_ores: number;
    gems: number;
    runes: number;
    arms: number;
    books: number;
    enchanted_arms: number;
    charcoal: number;
}

export const empty_goodsdist: goodsdist = {
    money: 0,
    food: 0,
    beer: 0,
    leather: 0,
    artisinal: 0,
    livestock: 0,
    ornamental: 0,
    enchanted: 0,
    timber: 0,
    tools: 0,
    common_ores: 0,
    medical: 0,
    rare_ores: 0,
    gems: 0,
    runes: 0,
    arms: 0,
    books: 0,
    enchanted_arms: 0,
    charcoal: 0
}

export default function ResourceDistribuition({goods_cap, updateFunc}:{goods_cap: goodsdist,updateFunc: Dispatch<SetStateAction<goodsdist>>}) {
    const [goods,setGoods] = useState<goodsdist>({
        money: 0,
        food: 0,
        beer: 0,
        leather: 0,
        artisinal: 0,
        livestock: 0,
        ornamental: 0,
        enchanted: 0,
        timber: 0,
        tools: 0,
        common_ores: 0,
        medical: 0,
        rare_ores: 0,
        gems: 0,
        runes: 0,
        arms: 0,
        books: 0,
        enchanted_arms: 0,
        charcoal: 0
    });

    useEffect(()=>{updateFunc(goods)},[goods]);

    return(
        <div className="flex flex-column gap-3">
            <div>
                <LuHandCoins/>
                <InputNumber
                    value={goods.money} 
                    onValueChange={e => setGoods({...goods,money: e.value ?? 0})} 
                    showButtons 
                    min={0} 
                    max={goods_cap.money}/>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <IoFastFood/>
                    <InputNumber 
                        size={2} 
                        value={goods.food} 
                        onValueChange={e => setGoods({...goods,food: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.food}/>
                </div>
                <div>
                    <GiBeerStein/>
                    <InputNumber 
                        size={2} 
                        value={goods.beer} 
                        onValueChange={e => setGoods({...goods,beer: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.beer}/>
                </div>
                <div>
                    <GiClothes/>
                    <InputNumber 
                        size={2} 
                        value={goods.leather} 
                        onValueChange={e => setGoods({...goods,leather: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.leather}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <LuHandCoins/>
                    <InputNumber 
                        size={2} 
                        value={goods.artisinal} 
                        onValueChange={e => setGoods({...goods,artisinal: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.artisinal}/>
                </div>
                <div>
                    <PiCowFill/>
                    <InputNumber 
                        size={2} 
                        value={goods.livestock} 
                        onValueChange={e => setGoods({...goods,livestock: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.livestock}/>
                </div>
                <div>
                    <GiPouringChalice/>
                    <InputNumber 
                        size={2} 
                        value={goods.ornamental} 
                        onValueChange={e => setGoods({...goods,ornamental: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.ornamental}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <GiCrystalBall/>
                    <InputNumber 
                        size={2} 
                        value={goods.enchanted} 
                        onValueChange={e => setGoods({...goods,enchanted: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.enchanted}/>
                </div>
                <div>
                    <GiWoodPile/>
                    <InputNumber 
                        size={2} 
                        value={goods.timber} 
                        onValueChange={e => setGoods({...goods,timber: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.timber}/>
                </div>
                <div>
                    <FaTools/>
                    <InputNumber 
                        size={2} 
                        value={goods.tools} 
                        onValueChange={e => setGoods({...goods,tools: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.tools}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <GiCoalWagon/>
                    <InputNumber 
                        size={2} 
                        value={goods.common_ores} 
                        onValueChange={e => setGoods({...goods,common_ores: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.common_ores}/>
                </div>
                <div>
                    <FaBriefcaseMedical/>
                    <InputNumber 
                        size={2} 
                        value={goods.medical} 
                        onValueChange={e => setGoods({...goods,medical: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.medical}/>
                </div>
                <div>
                    <FaGem/>
                    <InputNumber 
                        size={2} 
                        value={goods.rare_ores} 
                        onValueChange={e => setGoods({...goods,rare_ores: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.rare_ores}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <GiGems/>
                    <InputNumber 
                        size={2} 
                        value={goods.gems} 
                        onValueChange={e => setGoods({...goods,gems: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.gems}/>
                </div>
                <div>
                    <GiRuneStone/>
                    <InputNumber 
                        size={2} 
                        value={goods.runes} 
                        onValueChange={e => setGoods({...goods,runes: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.runes}/>
                </div>
                <div>
                    <FaShieldAlt/>
                    <InputNumber 
                        size={2} 
                        value={goods.arms} 
                        onValueChange={e => setGoods({...goods,arms: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.arms}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <FaBook/>
                    <InputNumber 
                        size={2} 
                        value={goods.books} 
                        onValueChange={e => setGoods({...goods,books: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.books}/>
                </div>
                <div>
                    <GiMagicShield/>
                    <InputNumber 
                        size={2} 
                        value={goods.enchanted_arms} 
                        onValueChange={e => setGoods({...goods,enchanted_arms: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.enchanted_arms}/>
                </div>
                <div>
                    <GiThrownCharcoal/>
                    <InputNumber 
                        size={2} 
                        value={goods.charcoal} 
                        onValueChange={e => setGoods({...goods,charcoal: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.charcoal}/>
                </div>
            </div>
        </div>
    )
}