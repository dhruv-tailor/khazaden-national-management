import { goodsdist } from "../Goods/GoodsDist";
import ArmsIconTT from "../tooltips/goods/ArmsIconTT";
import ArtisanalIconTT from "../tooltips/goods/ArtisanalIconTT";
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
                {Math.round(stock.money)}
                <PlusMinus value={Math.round(change.money)}/>
            </div>
            <div className="flex flex-row gap-1">
                <FoodIconTT/>
                {Math.round(stock.food)}
                <PlusMinus value={Math.round(change.food)}/>
            </div>
            <div className="flex flex-row gap-1">
                <BeerIconTT/>
                {Math.round(stock.beer)}
                <PlusMinus value={Math.round(change.beer)}/>
            </div>
            <div className="flex flex-row gap-1">
                <LeatherIconTT/>
                {Math.round(stock.leather)}
                <PlusMinus value={Math.round(change.leather)}/>
            </div>
            <div className="flex flex-row gap-1">
                <ArtisanalIconTT/>
                {Math.round(stock.artisanal)}
                <PlusMinus value={Math.round(change.artisanal)}/>
            </div>
            <div className="flex flex-row gap-1">
                <OrnamentalIconTT/>
                {Math.round(stock.ornamental)}
                <PlusMinus value={Math.round(change.ornamental)}/>
            </div>
            <div className="flex flex-row gap-1">
                <LivestockIconTT/>
                {Math.round(stock.livestock)}
                <PlusMinus value={Math.round(change.livestock)}/>
            </div>
            <div className="flex flex-row gap-1">
                <EnchantedIconTT/>
                {Math.round(stock.enchanted)}
                <PlusMinus value={Math.round(change.enchanted)}/>
            </div>
            <div className="flex flex-row gap-1">
                <TimberIconTT/>
                {Math.round(stock.timber)}
                <PlusMinus value={Math.round(change.timber)}/>
            </div>
            <div className="flex flex-row gap-1">
                <ToolsIconTT/>
                {Math.round(stock.tools)}
                <PlusMinus value={Math.round(change.tools)}/>
            </div>
            <div className="flex flex-row gap-1">
                <CommonOresIconTT/>
                {Math.round(stock.common_ores)}
                <PlusMinus value={Math.round(change.common_ores)}/>
            </div>
            <div className="flex flex-row gap-1">
                <MedicalIconTT/>
                {Math.round(stock.medical)}
                <PlusMinus value={Math.round(change.medical)}/>
            </div>
            <div className="flex flex-row gap-1">
                <RareOresIconTT/>
                {Math.round(stock.rare_ores)}
                <PlusMinus value={Math.round(change.rare_ores)}/>
            </div>
            <div className="flex flex-row gap-1">
                <GemsIconTT/>
                {Math.round(stock.gems)}
                <PlusMinus value={Math.round(change.gems)}/>
            </div>
            <div className="flex flex-row gap-1">
                <RunesIconTT/>
                {Math.round(stock.runes)}
                <PlusMinus value={Math.round(change.runes)}/>
            </div>
            <div className="flex flex-row gap-1">
                <ArmsIconTT/>
                {Math.round(stock.arms)}
                <PlusMinus value={Math.round(change.arms)}/>
            </div>
            <div className="flex flex-row gap-1">
                <BooksIconTT/>
                {Math.round(stock.books)}
                <PlusMinus value={Math.round(change.books)}/>
            </div>
            <div className="flex flex-row gap-1">
                <EnchantedArmsIconTT/>
                {Math.round(stock.enchanted_arms)}
                <PlusMinus value={Math.round(change.enchanted_arms)}/>
            </div>
            <div className="flex flex-row gap-1">
                <CharcoalIconTT/>
                {Math.round(stock.charcoal)}
                <PlusMinus value={Math.round(change.charcoal)}/>
            </div>
        </div>
    </>)
}