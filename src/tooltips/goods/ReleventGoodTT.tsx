import { ReactElement } from 'react';
import { goodsId } from "../../Goods/GoodsDist";
import ArmsIconTT from "./ArmsIconTT";
import ArtisinalIconTT from "./ArtisinalIconTT";
import BeerIconTT from "./BeerIconTT";
import BooksIconTT from "./BooksIconTT";
import CharcoalIconTT from "./CharcoalIconTT";
import CommonOresIconTT from "./CommonOresTT";
import EnchantedArmsIconTT from "./EnchantedArmsTT";
import EnchantedIconTT from "./EnchantedIconTT";
import FoodIconTT from "./FoodIconTT";
import GemsIconTT from "./GemsIconTT";
import LeatherIconTT from "./LeatherIconTT";
import LivestockIconTT from "./LivestockIconTT";
import MedicalIconTT from "./MedicalIconTT";
import MoneyIconTT from "./MoneyIconTT";
import OrnamentalIconTT from "./OrnamentalIconTT";
import RareOresIconTT from "./RareOresIconTT";
import RunesIconTT from "./RunesIconTT";
import TimberIconTT from "./TimberIconTT";
import ToolsIconTT from "./ToolsIconTT";

export type GoodTooltipMap = {
    [K in goodsId]: ReactElement;
};

export const releventGoodTT: GoodTooltipMap = {
    [goodsId.money]: <MoneyIconTT/>,
    [goodsId.food]: <FoodIconTT/>,
    [goodsId.beer]: <BeerIconTT/>,
    [goodsId.leather]: <LeatherIconTT/>,
    [goodsId.artisinal]: <ArtisinalIconTT/>,
    [goodsId.livestock]: <LivestockIconTT/>,
    [goodsId.ornamental]: <OrnamentalIconTT/>,
    [goodsId.enchanted]: <EnchantedIconTT/>,
    [goodsId.timber]: <TimberIconTT/>,
    [goodsId.tools]: <ToolsIconTT/>,
    [goodsId.common_ores]: <CommonOresIconTT/>,
    [goodsId.medical]: <MedicalIconTT/>,
    [goodsId.rare_ores]: <RareOresIconTT/>,
    [goodsId.gems]: <GemsIconTT/>,
    [goodsId.runes]: <RunesIconTT/>,
    [goodsId.arms]: <ArmsIconTT/>,
    [goodsId.books]: <BooksIconTT/>,
    [goodsId.enchanted_arms]: <EnchantedArmsIconTT/>,
    [goodsId.charcoal]: <CharcoalIconTT/>,
}