import { ClanInterface, clanTypes } from "../../../Clans/ClanInterface/ClanInterface";
import { goodsdist, goodsId } from "../../../Goods/GoodsDist";
import GoodsAllocator from "./GoodsAllocator";

export default function GoodsAllocation({clan,natCap,updateFunc}: {clan: ClanInterface,natCap:goodsdist,updateFunc: (goods: goodsdist) => void}) {

    const available = clan.goods_produced - (clan.production.food + clan.production.beer + clan.production.leather + clan.production.livestock) - 
                    (clan.production.artisanal + clan.production.ornamental + clan.production.enchanted + clan.production.timber) -
                    (clan.production.tools + clan.production.common_ores + clan.production.medical + clan.production.rare_ores) -
                    (clan.production.gems + clan.production.runes + clan.production.arms + clan.production.books + clan.production.enchanted_arms) -
                    (clan.production.charcoal)

    const whichOne = (nat: number, cap: number) => {
        if (nat !== -1) {return (cap < nat ? cap : nat)}
        return cap
    }

    const updateAllocation = (id: goodsId, amount: number) => {
        const delta_goods: goodsdist = {
            money: 0,
            food: id === goodsId.food ? amount - clan.production.food : 0,
            beer: id === goodsId.beer ? amount - clan.production.beer : 0,
            leather: id === goodsId.leather ? amount - clan.production.leather : 0,
            artisanal: id === goodsId.artisanal ? amount - clan.production.artisanal : 0,
            livestock: id === goodsId.livestock ? amount - clan.production.livestock : 0,
            ornamental: id === goodsId.ornamental ? amount - clan.production.ornamental : 0,
            enchanted: id === goodsId.enchanted ? amount - clan.production.enchanted : 0,
            timber: id === goodsId.timber ? amount - clan.production.timber : 0,
            tools: id === goodsId.tools ? amount - clan.production.tools : 0,
            common_ores: id === goodsId.common_ores ? amount - clan.production.common_ores : 0,
            medical: id === goodsId.medical ? amount - clan.production.medical : 0,
            rare_ores: id === goodsId.rare_ores ? amount - clan.production.rare_ores : 0,
            gems: id === goodsId.gems ? amount - clan.production.gems : 0,
            runes: id === goodsId.runes ? amount - clan.production.runes : 0,
            arms: id === goodsId.arms ? amount - clan.production.arms : 0,
            books: id === goodsId.books ? amount - clan.production.books : 0,
            enchanted_arms: id === goodsId.enchanted_arms ? amount - clan.production.enchanted_arms : 0,
            charcoal: id === goodsId.charcoal ? amount - clan.production.charcoal : 0,
        }
        updateFunc(delta_goods)
    }
    
    return(
        <div className="flex flex-column">
            {(clan.id !== clanTypes.rulers) &&
            (clan.id !== clanTypes.engineers) &&
            (clan.id !== clanTypes.merchants) &&
            (clan.id !== clanTypes.warriors) &&
            (clan.id !== clanTypes.criminals)? <>Unused Production: {available}</> : <></>}
            <div className="flex flex-row gap-2">
                {clan.isProduced.food ? <GoodsAllocator 
                    max={whichOne(natCap.food,available)} 
                    id={goodsId.food}
                    assigned={clan.production.food}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.beer ? <GoodsAllocator 
                    max={whichOne(natCap.beer,available)} 
                    id={goodsId.beer}
                    assigned={clan.production.beer}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.leather ? <GoodsAllocator 
                    max={whichOne(natCap.leather,available)} 
                    id={goodsId.leather}
                    assigned={clan.production.leather}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.artisanal ? <GoodsAllocator 
                    max={whichOne(natCap.artisanal,available)} 
                    id={goodsId.artisanal}
                    assigned={clan.production.artisanal}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.livestock ? <GoodsAllocator 
                    max={whichOne(natCap.livestock,available)} 
                    id={goodsId.livestock}
                    assigned={clan.production.livestock}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.ornamental ? <GoodsAllocator 
                    max={whichOne(natCap.ornamental,available)} 
                    id={goodsId.ornamental}
                    assigned={clan.production.ornamental}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.enchanted ? <GoodsAllocator 
                    max={whichOne(natCap.enchanted,available)} 
                    id={goodsId.enchanted}
                    assigned={clan.production.enchanted}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.timber ? <GoodsAllocator 
                    max={whichOne(natCap.timber,available)} 
                    id={goodsId.timber}
                    assigned={clan.production.timber}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.tools ? <GoodsAllocator 
                    max={whichOne(natCap.tools,available)} 
                    id={goodsId.tools}
                    assigned={clan.production.tools}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.common_ores ? <GoodsAllocator 
                    max={whichOne(natCap.common_ores,available)} 
                    id={goodsId.common_ores}
                    assigned={clan.production.common_ores}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.medical ? <GoodsAllocator 
                    max={whichOne(natCap.medical,available)} 
                    id={goodsId.medical}
                    assigned={clan.production.medical}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.rare_ores ? <GoodsAllocator 
                    max={whichOne(natCap.rare_ores,available)} 
                    id={goodsId.rare_ores}
                    assigned={clan.production.rare_ores}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.gems ? <GoodsAllocator 
                    max={whichOne(natCap.gems,available)} 
                    id={goodsId.gems}
                    assigned={clan.production.gems}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.runes ? <GoodsAllocator 
                    max={whichOne(natCap.runes,available)} 
                    id={goodsId.runes}
                    assigned={clan.production.runes}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.arms ? <GoodsAllocator 
                    max={whichOne(natCap.arms,available)} 
                    id={goodsId.arms}
                    assigned={clan.production.arms}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.books ? <GoodsAllocator 
                    max={whichOne(natCap.books,available)} 
                    id={goodsId.books}
                    assigned={clan.production.books}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.enchanted_arms ? <GoodsAllocator 
                    max={whichOne(natCap.enchanted_arms,available)} 
                    id={goodsId.enchanted_arms}
                    assigned={clan.production.enchanted_arms}
                    updateFunc={updateAllocation}
                />:null}
                {clan.isProduced.charcoal ? <GoodsAllocator 
                    max={whichOne(natCap.charcoal,available)} 
                    id={goodsId.charcoal}
                    assigned={clan.production.charcoal}
                    updateFunc={updateAllocation}
                />:null}
            </div>
        </div>
    )
}