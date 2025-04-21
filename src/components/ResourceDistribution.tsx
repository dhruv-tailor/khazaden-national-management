import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import MoneyIconTT from "../tooltips/goods/MoneyIconTT";
import { Button } from "primereact/button";
import { empty_goodsdist, goodsdist } from "../Goods/GoodsDist";
import FoodIconTT from "../tooltips/goods/FoodIconTT";
import BeerIconTT from "../tooltips/goods/BeerIconTT";
import LeatherIconTT from "../tooltips/goods/LeatherIconTT";
import ArtisanalIconTT from "../tooltips/goods/ArtisanalIconTT";
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
import { Divider } from "primereact/divider";

export default function ResourceDistribuition({goods_cap,updateFunc,existing_dist}:{goods_cap: goodsdist,updateFunc: (dist: goodsdist) => void,existing_dist?: goodsdist}) {
    
    const [goods,setGoods] = useState<goodsdist>({...empty_goodsdist});
    const boxSize = 3;

    useEffect(() => {if(existing_dist) {setGoods({...existing_dist})}},[]);

    const renderResourceInput = (Icon: any, key: keyof goodsdist, label: string) => (
        <div className="flex flex-column align-items-center gap-1 p-2 surface-100 border-round">
            <div className="flex align-items-center gap-2">
                <Icon/>
                <span className="font-semibold">{label}</span>
            </div>
            <InputNumber 
                size={boxSize} 
                value={goods[key]} 
                onValueChange={e => setGoods({...goods,[key]: e.value ?? 0})} 
                showButtons 
                min={0} 
                max={goods_cap[key]}
                className="w-8rem"
            />
        </div>
    );

    return(
        <div className="flex flex-column gap-4">
            {/* Money Section */}
            <div className="flex align-items-center gap-3 p-2 surface-100 border-round">
                <MoneyIconTT/>
                <InputNumber
                    value={goods.money} 
                    onValueChange={e => setGoods({...goods,money: e.value ?? 0})} 
                    showButtons 
                    min={0} 
                    max={goods_cap.money}
                    className="w-8rem"
                />
            </div>

            {/* Basic Resources */}
            <div className="grid">
                <div className="col-12 md:col-4">
                    {renderResourceInput(FoodIconTT, 'food', 'Food')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(BeerIconTT, 'beer', 'Beer')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(LeatherIconTT, 'leather', 'Leather')}
                </div>
            </div>

            {/* Crafted Goods */}
            <div className="grid">
                <div className="col-12 md:col-4">
                    {renderResourceInput(ArtisanalIconTT, 'artisanal', 'Artisanal')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(LivestockIconTT, 'livestock', 'Livestock')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(OrnamentalIconTT, 'ornamental', 'Ornamental')}
                </div>
            </div>

            {/* Industrial Resources */}
            <div className="grid">
                <div className="col-12 md:col-4">
                    {renderResourceInput(EnchantedArmsIconTT, 'enchanted', 'Enchanted')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(TimberIconTT, 'timber', 'Timber')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(ToolsIconTT, 'tools', 'Tools')}
                </div>
            </div>

            {/* Raw Materials */}
            <div className="grid">
                <div className="col-12 md:col-4">
                    {renderResourceInput(CommonOresIconTT, 'common_ores', 'Common Ores')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(MedicalIconTT, 'medical', 'Medical')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(RareOresIconTT, 'rare_ores', 'Rare Ores')}
                </div>
            </div>

            {/* Luxury Goods */}
            <div className="grid">
                <div className="col-12 md:col-4">
                    {renderResourceInput(GemsIconTT, 'gems', 'Gems')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(RunesIconTT, 'runes', 'Runes')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(ArmsIconTT, 'arms', 'Arms')}
                </div>
            </div>

            {/* Special Items */}
            <div className="grid">
                <div className="col-12 md:col-4">
                    {renderResourceInput(BooksIconTT, 'books', 'Books')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(EnchantedArmsIconTT, 'enchanted_arms', 'Enchanted Arms')}
                </div>
                <div className="col-12 md:col-4">
                    {renderResourceInput(CharcoalIconTT, 'charcoal', 'Charcoal')}
                </div>
            </div>

            <Divider/>

            <Button 
                label="Confirm Distribution" 
                icon='pi pi-send' 
                onClick={() => updateFunc(goods)}
                className="p-button-primary w-full"
            />
        </div>
    );
}