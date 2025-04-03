import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import MoneyIconTT from "../tooltips/goods/MoneyIconTT";
import { Button } from "primereact/button";
import { empty_goodsdist, goodsdist } from "../Goods/GoodsDist";
import FoodIconTT from "../tooltips/goods/FoodIconTT";
import BeerIconTT from "../tooltips/goods/BeerIconTT";
import LeatherIconTT from "../tooltips/goods/LeatherIconTT";
import ArtisinalIconTT from "../tooltips/goods/ArtisinalIconTT";
import LivestockIconTT from "../tooltips/goods/LivestockIconTT";
import OrnamentalIconTT from "../tooltips/goods/OrnamentalIconTT";
import EnchantedArmsIconTT from "../tooltips/goods/EnchantedArmsTT";
import TimberIconTT from "../tooltips/goods/TimberIconTT";
import ToolsIconTT from "../tooltips/goods/ToolsIconTT";
import CommonOresIconTT from "../tooltips/goods/CommonOresTT";
import MedicalIconTT from "../tooltips/goods/MedicalIconTT";
import RareOresIconTT from "../tooltips/goods/RareOresIconTT";
import GemsIconTT from "../tooltips/goods/GemsIconTT";
import RunesIconTT from "../tooltips/goods/RunesIconTT";
import ArmsIconTT from "../tooltips/goods/ArmsIconTT";
import BooksIconTT from "../tooltips/goods/BooksIconTT";
import CharcoalIconTT from "../tooltips/goods/CharcoalIconTT";

export default function ResourceDistribuition({goods_cap,updateFunc,existing_dist}:{goods_cap: goodsdist,updateFunc: (dist: goodsdist) => void,existing_dist?: goodsdist}) {
    
    const [goods,setGoods] = useState<goodsdist>({...empty_goodsdist});
    const boxSize = 3

    useEffect(() => {if(existing_dist) {setGoods({...existing_dist})}},[])

    return(
        <div className="flex flex-column gap-3">
            <div>
                <MoneyIconTT/>
                <InputNumber
                    value={goods.money} 
                    onValueChange={e => setGoods({...goods,money: e.value ?? 0})} 
                    showButtons 
                    min={0} 
                    max={goods_cap.money}/>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <FoodIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.food} 
                        onValueChange={e => setGoods({...goods,food: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.food}/>
                </div>
                <div>
                    <BeerIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.beer} 
                        onValueChange={e => setGoods({...goods,beer: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.beer}/>
                </div>
                <div>
                    <LeatherIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.leather} 
                        onValueChange={e => setGoods({...goods,leather: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.leather}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <ArtisinalIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.artisinal} 
                        onValueChange={e => setGoods({...goods,artisinal: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.artisinal}/>
                </div>
                <div>
                    <LivestockIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.livestock} 
                        onValueChange={e => setGoods({...goods,livestock: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.livestock}/>
                </div>
                <div>
                    <OrnamentalIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.ornamental} 
                        onValueChange={e => setGoods({...goods,ornamental: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.ornamental}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <EnchantedArmsIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.enchanted} 
                        onValueChange={e => setGoods({...goods,enchanted: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.enchanted}/>
                </div>
                <div>
                    <TimberIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.timber} 
                        onValueChange={e => setGoods({...goods,timber: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.timber}/>
                </div>
                <div>
                    <ToolsIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.tools} 
                        onValueChange={e => setGoods({...goods,tools: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.tools}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <CommonOresIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.common_ores} 
                        onValueChange={e => setGoods({...goods,common_ores: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.common_ores}/>
                </div>
                <div>
                    <MedicalIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.medical} 
                        onValueChange={e => setGoods({...goods,medical: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.medical}/>
                </div>
                <div>
                    <RareOresIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.rare_ores} 
                        onValueChange={e => setGoods({...goods,rare_ores: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.rare_ores}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <GemsIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.gems} 
                        onValueChange={e => setGoods({...goods,gems: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.gems}/>
                </div>
                <div>
                    <RunesIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.runes} 
                        onValueChange={e => setGoods({...goods,runes: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.runes}/>
                </div>
                <div>
                    <ArmsIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.arms} 
                        onValueChange={e => setGoods({...goods,arms: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.arms}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <BooksIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.books} 
                        onValueChange={e => setGoods({...goods,books: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.books}/>
                </div>
                <div>
                    <EnchantedArmsIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.enchanted_arms} 
                        onValueChange={e => setGoods({...goods,enchanted_arms: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.enchanted_arms}/>
                </div>
                <div>
                    <CharcoalIconTT/>
                    <InputNumber 
                        size={boxSize} 
                        value={goods.charcoal} 
                        onValueChange={e => setGoods({...goods,charcoal: e.value ?? 0})} 
                        showButtons 
                        min={0} 
                        max={goods_cap.charcoal}/>
                </div>
            </div>
            <Button label="Confirm" icon='pi pi-send' onClick={() => updateFunc(goods)}/>
        </div>
    )
}