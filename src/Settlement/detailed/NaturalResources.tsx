import { goodsdist } from "../../Goods/GoodsDist";
import BeerIconTT from "../../tooltips/goods/BeerIconTT";
import CharcoalIconTT from "../../tooltips/goods/CharcoalIconTT";
import CommonOresIconTT from "../../tooltips/goods/CommonOresTT";
import FoodIconTT from "../../tooltips/goods/FoodIconTT";
import GemsIconTT from "../../tooltips/goods/GemsIconTT";
import LeatherIconTT from "../../tooltips/goods/LeatherIconTT";
import LivestockIconTT from "../../tooltips/goods/LivestockIconTT";
import RareOresIconTT from "../../tooltips/goods/RareOresIconTT";
import TimberIconTT from "../../tooltips/goods/TimberIconTT";

export default function NaturalResources({resources} : {resources: goodsdist}) {
    return(
    <div className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-row gap-1">
            <FoodIconTT/>
            {resources.food}
        </div>
        <div className="flex flex-row gap-1">
            <BeerIconTT/>
            {resources.beer}
        </div>
        <div className="flex flex-row gap-1">
            <LeatherIconTT/>
            {resources.leather}
        </div>
        <div className="flex flex-row gap-1">
            <LivestockIconTT/>
            {resources.livestock}
        </div>
        <div className="flex flex-row gap-1">
            <TimberIconTT/>
            {resources.timber}
        </div>
        <div className="flex flex-row gap-1">
            <CharcoalIconTT/>
            {resources.charcoal}
        </div>
        <div className="flex flex-row gap-1">
            <CommonOresIconTT/>
            {resources.common_ores}
        </div>
        <div className="flex flex-row gap-1">
            <GemsIconTT/>
            {resources.gems}
        </div>
        <div className="flex flex-row gap-1">
            <RareOresIconTT/>
            {resources.rare_ores}
        </div>
    </div>
    )
}