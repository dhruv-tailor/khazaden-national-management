import { goodsdist } from "../Goods/GoodsDist";
import ArmsIconTT from "../tooltips/goods/ArmsIconTT";
import ArtisinalIconTT from "../tooltips/goods/ArtisinalIconTT";
import BeerIconTT from "../tooltips/goods/BeerIconTT";
import BooksIconTT from "../tooltips/goods/BooksIconTT";
import CharcoalIconTT from "../tooltips/goods/CharcoalIconTT";
import CommonOresIconTT from "../tooltips/goods/CommonOresTT";
import EnchantedArmsIconTT from "../tooltips/goods/EnchantedArmsTT";
import EnchantedIconTT from "../tooltips/goods/EnchantedIconTT";
import FoodIconTT from "../tooltips/goods/FoodIconTT";
import GemsIconTT from "../tooltips/goods/GemsIconTT";
import LeatherIconTT from "../tooltips/goods/LeatherIconTT";
import LivestockIconTT from "../tooltips/goods/LivestockIconTT";
import MedicalIconTT from "../tooltips/goods/MedicalIconTT";
import MoneyIconTT from "../tooltips/goods/MoneyIconTT";
import OrnamentalIconTT from "../tooltips/goods/OrnamentalIconTT";
import RareOresIconTT from "../tooltips/goods/RareOresIconTT";
import RunesIconTT from "../tooltips/goods/RunesIconTT";
import TimberIconTT from "../tooltips/goods/TimberIconTT";
import ToolsIconTT from "../tooltips/goods/ToolsIconTT";
import PlusMinus from "./PlusMinus";

export default function DisplayGoods({stock,change}: {stock: goodsdist,change: goodsdist}) {
    
    return(<>
        <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row gap-1">
                <MoneyIconTT/>
                {stock.money}
                <PlusMinus value={change.money}/>
            </div>
            <div className="flex flex-row gap-1">
                <FoodIconTT/>
                {stock.food}
                <PlusMinus value={change.food}/>
            </div>
            <div className="flex flex-row gap-1">
                <BeerIconTT/>
                {stock.beer}
                <PlusMinus value={change.beer}/>
            </div>
            <div className="flex flex-row gap-1">
                <LeatherIconTT/>
                {stock.leather}
                <PlusMinus value={change.leather}/>
            </div>
            <div className="flex flex-row gap-1">
                <ArtisinalIconTT/>
                {stock.artisinal}
                <PlusMinus value={change.artisinal}/>
            </div>
            <div className="flex flex-row gap-1">
                <OrnamentalIconTT/>
                {stock.ornamental}
                <PlusMinus value={change.ornamental}/>
            </div>
            <div className="flex flex-row gap-1">
                <LivestockIconTT/>
                {stock.livestock}
                <PlusMinus value={change.livestock}/>
            </div>
            <div className="flex flex-row gap-1">
                <EnchantedIconTT/>
                {stock.enchanted}
                <PlusMinus value={change.enchanted}/>
            </div>
            <div className="flex flex-row gap-1">
                <TimberIconTT/>
                {stock.timber}
                <PlusMinus value={change.timber}/>
            </div>
            <div className="flex flex-row gap-1">
                <ToolsIconTT/>
                {stock.tools}
                <PlusMinus value={change.tools}/>
            </div>
            <div className="flex flex-row gap-1">
                <CommonOresIconTT/>
                {stock.common_ores}
                <PlusMinus value={change.common_ores}/>
            </div>
            <div className="flex flex-row gap-1">
                <MedicalIconTT/>
                {stock.medical}
                <PlusMinus value={change.medical}/>
            </div>
            <div className="flex flex-row gap-1">
                <RareOresIconTT/>
                {stock.rare_ores}
                <PlusMinus value={change.rare_ores}/>
            </div>
            <div className="flex flex-row gap-1">
                <GemsIconTT/>
                {stock.gems}
                <PlusMinus value={change.gems}/>
            </div>
            <div className="flex flex-row gap-1">
                <RunesIconTT/>
                {stock.runes}
                <PlusMinus value={change.runes}/>
            </div>
            <div className="flex flex-row gap-1">
                <ArmsIconTT/>
                {stock.arms}
                <PlusMinus value={change.arms}/>
            </div>
            <div className="flex flex-row gap-1">
                <BooksIconTT/>
                {stock.books}
                <PlusMinus value={change.books}/>
            </div>
            <div className="flex flex-row gap-1">
                <EnchantedArmsIconTT/>
                {stock.enchanted_arms}
                <PlusMinus value={change.enchanted_arms}/>
            </div>
            <div className="flex flex-row gap-1">
                <CharcoalIconTT/>
                {stock.charcoal}
                <PlusMinus value={change.charcoal}/>
            </div>
        </div>
    </>)
}