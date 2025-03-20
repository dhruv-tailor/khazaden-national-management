import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router";
import { SettlementInterface } from "../Settlement/SettlementInterface";
import { useEffect, useState } from "react";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../utilities/SaveData";
import { empty_goodsdist, goodsdist } from "../components/ResourceDistribution";
import { Panel } from "primereact/panel";
import { FaCoins, FaTools, FaBriefcaseMedical, FaGem, FaShieldAlt, FaBook } from "react-icons/fa";
import { GiBeerStein, GiClothes, GiPouringChalice, GiCrystalBall, GiWoodPile, GiCoalWagon, GiGems, GiRuneStone, GiMagicShield, GiThrownCharcoal } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { LuHandCoins } from "react-icons/lu";
import { PiCowFill } from "react-icons/pi";
import PriceChart, { priceChartDataProp, priceChartOptionsProp } from "./PriceChart";
import PlusMinus from "../components/PlusMinus";
import PriceCard from "./PriceCard";
import { calcPriceChange, price_volitility } from "./priceChanges";

export default function Economy() {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);
    const [federalPrices,setFederalPrices] = useState<goodsdist>({...empty_goodsdist});
    const [priceHistory,setPriceHistory] = useState<goodsdist[]>([])

    // Federal Reserve
    const [reserveGoods,setReserveGoods] = useState<goodsdist>(empty_goodsdist);
    const [changeGoods,setChangeGoods] = useState<goodsdist>(empty_goodsdist);

    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        store.get<goodsdist>('Federal Prices').then(value => {if (value) {setFederalPrices(value);}})
        store.get<goodsdist[]>('Price History').then(value => {if (value) {setPriceHistory(value);}})
        const settlements = await store.get<SettlementInterface[]>('settlements');
        if (settlements) {
            setSettlements(settlements);
        }
        let changeReserve: goodsdist = {
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
        settlements?.forEach(settlement => {
            // Money
            changeReserve.money += Math.round(((settlement.rulers.tax_rate * settlement.rulers.taxed_productivity) +
            (settlement.archivists.tax_rate * settlement.archivists.taxed_productivity) +
            (settlement.engineers.tax_rate * settlement.engineers.taxed_productivity) +
            (settlement.rune_smiths.tax_rate * settlement.rune_smiths.taxed_productivity) +
            (settlement.craftsmen.tax_rate * settlement.craftsmen.taxed_productivity) +
            (settlement.merchants.tax_rate * settlement.merchants.taxed_productivity) +
            (settlement.clerics.tax_rate * settlement.clerics.taxed_productivity) +
            (settlement.miners.tax_rate * settlement.miners.taxed_productivity) +
            (settlement.farmers.tax_rate * settlement.farmers.taxed_productivity) +
            (settlement.warriors.tax_rate * settlement.warriors.taxed_productivity) +
            (settlement.foresters.tax_rate * settlement.foresters.taxed_productivity)) * (settlement.settlment_tax))
            //Goods
            changeReserve.food += Math.round((settlement.farmers.food_and_water.produced + settlement.foresters.food_and_water.produced) * (settlement.production_quota))
            changeReserve.beer += Math.round(settlement.farmers.beer.produced * settlement.production_quota)
            changeReserve.leather += Math.round(settlement.farmers.leather_and_textiles.produced * settlement.production_quota)
            changeReserve.artisinal += Math.round((settlement.craftsmen.artisanal_goods.produced + settlement.foresters.artisanal_goods.produced) * settlement.production_quota)
            changeReserve.livestock += Math.round((settlement.farmers.livestock.produced) * settlement.production_quota)
            changeReserve.ornamental += Math.round(settlement.craftsmen.ornamental_luxuries.produced * settlement.production_quota)
            changeReserve.enchanted += Math.round(settlement.rune_smiths.enchanted_luxuries.produced * settlement.production_quota)
            changeReserve.timber += Math.round(settlement.foresters.timber.produced * settlement.production_quota)
            changeReserve.tools += Math.round(settlement.craftsmen.tools.produced * settlement.production_quota)
            changeReserve.common_ores += Math.round(settlement.miners.common_ores.produced * settlement.production_quota)
            changeReserve.medical += Math.round(settlement.clerics.medical_supplies.produced * settlement.production_quota)
            changeReserve.rare_ores += Math.round(settlement.miners.rare_ores.produced * settlement.production_quota)
            changeReserve.gems += Math.round(settlement.miners.gems.produced * settlement.production_quota)
            changeReserve.runes += Math.round(settlement.rune_smiths.runes.produced * settlement.production_quota)
            changeReserve.arms += Math.round(settlement.craftsmen.armaments.produced * settlement.production_quota)
            changeReserve.books += Math.round((settlement.clerics.books.produced + settlement.archivists.books.produced) * settlement.production_quota)
            changeReserve.enchanted_arms += Math.round(settlement.rune_smiths.enchanted_armaments.produced * settlement.production_quota)
            changeReserve.charcoal += Math.round(settlement.foresters.enchanted_charcoal.produced * settlement.production_quota)
        })
        setChangeGoods(changeReserve)
    }

    const updateInventory = (units_ordered: goodsdist, prices: goodsdist,type: 'Settlement' | 'Federal' | 'Foreign',realname: string) => {
        if(type === 'Settlement') {
            settlementPurchase(units_ordered,prices,realname)
        }
    }

    const settlementPurchase = (units_ordered: goodsdist, prices: goodsdist,realname: string) => {
        settlements.forEach(s => {
            if(s.name === realname) {
                let old_stock = s.food_and_water.stock
                let new_stock = s.food_and_water.stock - units_ordered.food
                let price_change = s.prices.food
                s.prices.food = calcPriceChange(price_change,old_stock,new_stock,price_volitility.food)
                s.food_and_water.stock = new_stock
                s.finance_points += units_ordered.food * Math.round(prices.food)

                old_stock = s.beer.stock
                new_stock = s.beer.stock - units_ordered.beer
                price_change = s.prices.beer
                s.prices.beer = calcPriceChange(price_change,old_stock,new_stock,price_volitility.beer)
                s.beer.stock = new_stock
                s.finance_points += units_ordered.beer * Math.round(prices.beer)

                old_stock = s.leather_and_textiles.stock
                new_stock = s.leather_and_textiles.stock - units_ordered.leather
                price_change = s.prices.leather
                s.prices.leather = calcPriceChange(price_change,old_stock,new_stock,price_volitility.leather)
                s.beer.stock = new_stock
                s.finance_points += units_ordered.leather * Math.round(prices.leather)

                old_stock = s.artisinal_goods.stock
                new_stock = s.artisinal_goods.stock - units_ordered.artisinal
                price_change = s.prices.artisinal
                s.prices.artisinal = calcPriceChange(price_change,old_stock,new_stock,price_volitility.artisinal)
                s.artisinal_goods.stock = new_stock
                s.finance_points += units_ordered.artisinal * Math.round(prices.artisinal)

                old_stock = s.livestock.stock
                new_stock = s.livestock.stock - units_ordered.livestock
                price_change = s.prices.livestock
                s.prices.livestock = calcPriceChange(price_change,old_stock,new_stock,price_volitility.livestock)
                s.livestock.stock = new_stock
                s.finance_points += units_ordered.livestock * Math.round(prices.livestock)

                old_stock = s.ornamental_luxuries.stock
                new_stock = s.ornamental_luxuries.stock - units_ordered.ornamental
                price_change = s.prices.ornamental
                s.prices.ornamental = calcPriceChange(price_change,old_stock,new_stock,price_volitility.ornamental)
                s.ornamental_luxuries.stock = new_stock

                old_stock = s.enchanted_luxuries.stock
                new_stock = s.enchanted_luxuries.stock - units_ordered.enchanted
                price_change = s.prices.enchanted
                s.prices.enchanted = calcPriceChange(price_change,old_stock,new_stock,price_volitility.enchanted)
                s.enchanted_luxuries.stock = new_stock

                old_stock = s.timber.stock
                new_stock = s.timber.stock - units_ordered.timber
                price_change = s.prices.timber
                s.prices.timber = calcPriceChange(price_change,old_stock,new_stock,price_volitility.timber)
                s.timber.stock = new_stock

                old_stock = s.tools.stock
                new_stock = s.tools.stock - units_ordered.tools
                price_change = s.prices.tools
                s.prices.tools = calcPriceChange(price_change,old_stock,new_stock,price_volitility.tools)
                s.tools.stock = new_stock

                old_stock = s.common_ores.stock
                new_stock = s.common_ores.stock - units_ordered.common_ores
                price_change = s.prices.common_ores
                s.prices.common_ores = calcPriceChange(price_change,old_stock,new_stock,price_volitility.common_ores)
                s.common_ores.stock = new_stock

                old_stock = s.medical_supplies.stock
                new_stock = s.medical_supplies.stock - units_ordered.medical
                price_change = s.prices.medical
                s.prices.medical = calcPriceChange(price_change,old_stock,new_stock,price_volitility.medical)
                s.medical_supplies.stock = new_stock

                old_stock = s.rare_ores.stock
                new_stock = s.rare_ores.stock - units_ordered.rare_ores
                price_change = s.prices.rare_ores
                s.prices.rare_ores = calcPriceChange(price_change,old_stock,new_stock,price_volitility.rare_ores)
                s.medical_supplies.stock = new_stock

                old_stock = s.gems.stock
                new_stock = s.gems.stock - units_ordered.gems
                price_change = s.prices.gems
                s.prices.gems = calcPriceChange(price_change,old_stock,new_stock,price_volitility.gems)
                s.gems.stock = new_stock

                old_stock = s.runes.stock
                new_stock = s.runes.stock - units_ordered.runes
                price_change = s.prices.runes
                s.prices.runes = calcPriceChange(price_change,old_stock,new_stock,price_volitility.runes)
                s.runes.stock = new_stock

                old_stock = s.armaments.stock
                new_stock = s.armaments.stock - units_ordered.arms
                price_change = s.prices.arms
                s.prices.arms = calcPriceChange(price_change,old_stock,new_stock,price_volitility.arms)
                s.armaments.stock = new_stock

                old_stock = s.books.stock
                new_stock = s.books.stock - units_ordered.books
                price_change = s.prices.books
                s.prices.books = calcPriceChange(price_change,old_stock,new_stock,price_volitility.books)
                s.books.stock = new_stock
                
                old_stock = s.enchanted_armaments.stock
                new_stock = s.enchanted_armaments.stock - units_ordered.enchanted_arms
                price_change = s.prices.enchanted_arms
                s.prices.enchanted_arms = calcPriceChange(price_change,old_stock,new_stock,price_volitility.enchanted_arms)
                s.enchanted_armaments.stock = new_stock

                old_stock = s.enchanted_charcoal.stock
                new_stock = s.enchanted_charcoal.stock - units_ordered.charcoal
                price_change = s.prices.charcoal
                s.prices.charcoal = calcPriceChange(price_change,old_stock,new_stock,price_volitility.charcoal)
                s.enchanted_charcoal.stock = new_stock

            }
        })
    }

    useEffect(() => {
        getSettlements();
        
    }, []);

    return (
        <div className="flex flex-column gap-2">
            <Button label='Go Back' icon='pi pi-angle-double-left' onClick={()=>{
                navigate(`/game/${gameId}`)
                }}/>
            {/* National Stock */}
            <Panel header="Federal Reserve" toggleable>
                <div className="flex flex-row flex-wrap gap-2">
                    <div className="flex flex-row gap-1">
                        <FaCoins/>
                        {reserveGoods.money}
                        <PlusMinus value={changeGoods.money}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <IoFastFood/>
                        {reserveGoods.food}
                        <PlusMinus value={changeGoods.food}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiBeerStein/>
                        {reserveGoods.beer}
                        <PlusMinus value={changeGoods.beer}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiClothes/>
                        {reserveGoods.leather}
                        <PlusMinus value={changeGoods.leather}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <LuHandCoins/>
                        {reserveGoods.artisinal}
                        <PlusMinus value={changeGoods.artisinal}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <PiCowFill/>
                        {reserveGoods.livestock}
                        <PlusMinus value={changeGoods.livestock}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiPouringChalice/>
                        {reserveGoods.ornamental}
                        <PlusMinus value={changeGoods.ornamental}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiCrystalBall/>
                        {reserveGoods.enchanted}
                        <PlusMinus value={changeGoods.enchanted}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiWoodPile/>
                        {reserveGoods.timber}
                        <PlusMinus value={changeGoods.timber}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <FaTools/>
                        {reserveGoods.tools}
                        <PlusMinus value={changeGoods.tools}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiCoalWagon/>
                        {reserveGoods.common_ores}
                        <PlusMinus value={changeGoods.common_ores}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <FaBriefcaseMedical/>
                        {reserveGoods.medical}
                        <PlusMinus value={changeGoods.medical}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <FaGem/>
                        {reserveGoods.rare_ores}
                        <PlusMinus value={changeGoods.rare_ores}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiGems/>
                        {reserveGoods.gems}
                        <PlusMinus value={changeGoods.gems}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiRuneStone/>
                        {reserveGoods.runes}
                        <PlusMinus value={changeGoods.runes}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <FaShieldAlt/>
                        {reserveGoods.arms}
                        <PlusMinus value={changeGoods.arms}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <FaBook/>
                        {reserveGoods.books}
                        <PlusMinus value={changeGoods.books}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiMagicShield/>
                        {reserveGoods.enchanted_arms}
                        <PlusMinus value={changeGoods.enchanted_arms}/>
                    </div>
                    <div className="flex flex-row gap-1">
                        <GiThrownCharcoal/>
                        {reserveGoods.charcoal}
                        <PlusMinus value={changeGoods.charcoal}/>
                    </div>
                </div>
            </Panel>
            <Panel header='Prices' toggleable>
                <PriceChart data={priceChartDataProp(priceHistory,federalPrices)} options={priceChartOptionsProp()}/>
            </Panel>
            <Panel toggleable header='Local Goods'>
                <div className="flex flex-row gap-2 flex-wrap">
                    {settlements.map(s => {
                        let available: goodsdist = {
                            money: 0,
                            food: s.food_and_water.stock,
                            beer: s.beer.stock,
                            leather: s.leather_and_textiles.stock,
                            artisinal: s.artisinal_goods.stock,
                            livestock: s.livestock.stock,
                            ornamental: s.ornamental_luxuries.stock,
                            enchanted: s.enchanted_luxuries.stock,
                            timber: s.timber.stock,
                            tools: s.tools.stock,
                            common_ores: s.common_ores.stock,
                            medical: s.medical_supplies.stock,
                            rare_ores: s.rare_ores.stock,
                            gems: s.gems.stock,
                            runes: s.runes.stock,
                            arms: s.armaments.stock,
                            books: s.books.stock,
                            enchanted_arms: s.enchanted_armaments.stock,
                            charcoal: s.enchanted_charcoal.stock
                        }
                        return(
                            <PriceCard 
                                prices={s.prices} 
                                availableGoods={available} 
                                name={s.visable_name} 
                                realname={s.name}
                                type="Settlement"
                                updateFunc={updateInventory}
                            />
                        )
                    })}
                </div>
            </Panel>
        </div>
    )
}