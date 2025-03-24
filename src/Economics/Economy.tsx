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
import { ForeignPowerInterface } from "../ForeignPowers/ForeignPowerInterface";

export default function Economy() {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);
    const [federalPrices,setFederalPrices] = useState<goodsdist>({...empty_goodsdist});
    const [priceHistory,setPriceHistory] = useState<goodsdist[]>([])
    const [foreignPowers,setForeignPowers] = useState<ForeignPowerInterface[]>([])

    // Federal Reserve
    const [reserveGoods,setReserveGoods] = useState<goodsdist>(empty_goodsdist);
    const [changeGoods,setChangeGoods] = useState<goodsdist>(empty_goodsdist);
    const [merchantCapacity,setMerchantCapacity] = useState<number>(0);

    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
        store.get<goodsdist>('Federal Prices').then(value => {if (value) {setFederalPrices(value);}})
        store.get<goodsdist[]>('Price History').then(value => {if (value) {setPriceHistory(value);}})
        store.get<ForeignPowerInterface[]>('Foreign Powers').then(value => {if (value) {setForeignPowers(value)}});
        store.get<number>('Merchant Capacity').then(value => {if (value) {setMerchantCapacity(value)}});
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


    const updateInventory = (units_ordered: goodsdist, prices: goodsdist,type: 'Settlement' | 'Federal' | 'Foreign',realname: string,capUsed: number) => {
        if(type === 'Settlement') {
            settlementPurchase(units_ordered,prices,realname)
        }
        else if (type === 'Foreign') {
            foreignPurchase(units_ordered,realname)
        }
        setMerchantCapacity(merchantCapacity - capUsed)
        let old_stock = reserveGoods.food
        let new_stock = reserveGoods.food + units_ordered.food
        let price_change = federalPrices.food
        federalPrices.food = calcPriceChange(price_change,old_stock,new_stock,price_volitility.food)
        reserveGoods.food = new_stock
        reserveGoods.money -= units_ordered.food * Math.round(prices.food)

        old_stock = reserveGoods.beer
        new_stock = reserveGoods.beer + units_ordered.beer
        price_change = federalPrices.beer
        federalPrices.beer = calcPriceChange(price_change,old_stock,new_stock,price_volitility.beer)
        reserveGoods.beer = new_stock
        reserveGoods.money -= units_ordered.beer * Math.round(prices.beer)

        old_stock = reserveGoods.leather
        new_stock = reserveGoods.leather + units_ordered.leather
        price_change = federalPrices.leather
        federalPrices.leather = calcPriceChange(price_change,old_stock,new_stock,price_volitility.leather)
        reserveGoods.leather = new_stock
        reserveGoods.money -= units_ordered.leather * Math.round(prices.leather)

        old_stock = reserveGoods.artisinal
        new_stock = reserveGoods.artisinal + units_ordered.artisinal
        price_change = federalPrices.artisinal
        federalPrices.artisinal = calcPriceChange(price_change,old_stock,new_stock,price_volitility.artisinal)
        reserveGoods.artisinal = new_stock
        reserveGoods.money -= units_ordered.artisinal * Math.round(prices.artisinal)

        old_stock = reserveGoods.livestock
        new_stock = reserveGoods.livestock + units_ordered.livestock
        price_change = federalPrices.livestock
        federalPrices.livestock = calcPriceChange(price_change,old_stock,new_stock,price_volitility.livestock)
        reserveGoods.livestock = new_stock
        reserveGoods.money -= units_ordered.livestock * Math.round(prices.livestock)

        old_stock = reserveGoods.ornamental
        new_stock = reserveGoods.ornamental + units_ordered.ornamental
        price_change = federalPrices.ornamental
        federalPrices.ornamental = calcPriceChange(price_change,old_stock,new_stock,price_volitility.ornamental)
        reserveGoods.ornamental = new_stock
        reserveGoods.money -= units_ordered.ornamental * Math.round(prices.ornamental)

        old_stock = reserveGoods.enchanted
        new_stock = reserveGoods.enchanted + units_ordered.enchanted
        price_change = federalPrices.enchanted
        federalPrices.enchanted = calcPriceChange(price_change,old_stock,new_stock,price_volitility.enchanted)
        reserveGoods.enchanted = new_stock
        reserveGoods.money -= units_ordered.enchanted * Math.round(prices.enchanted)

        old_stock = reserveGoods.timber
        new_stock = reserveGoods.timber + units_ordered.timber
        price_change = federalPrices.timber
        federalPrices.timber = calcPriceChange(price_change,old_stock,new_stock,price_volitility.timber)
        reserveGoods.timber = new_stock
        reserveGoods.money -= units_ordered.timber * Math.round(prices.timber)

        old_stock = reserveGoods.tools
        new_stock = reserveGoods.tools + units_ordered.tools
        price_change = federalPrices.tools
        federalPrices.tools = calcPriceChange(price_change,old_stock,new_stock,price_volitility.tools)
        reserveGoods.tools = new_stock
        reserveGoods.money -= units_ordered.tools * Math.round(prices.tools)

        old_stock = reserveGoods.tools
        new_stock = reserveGoods.tools + units_ordered.tools
        price_change = federalPrices.tools
        federalPrices.tools = calcPriceChange(price_change,old_stock,new_stock,price_volitility.tools)
        reserveGoods.tools = new_stock
        reserveGoods.money -= units_ordered.tools * Math.round(prices.tools)

        old_stock = reserveGoods.common_ores
        new_stock = reserveGoods.common_ores + units_ordered.common_ores
        price_change = federalPrices.common_ores
        federalPrices.common_ores = calcPriceChange(price_change,old_stock,new_stock,price_volitility.common_ores)
        reserveGoods.common_ores = new_stock
        reserveGoods.money -= units_ordered.common_ores * Math.round(prices.common_ores)

        old_stock = reserveGoods.medical
        new_stock = reserveGoods.medical + units_ordered.medical
        price_change = federalPrices.medical
        federalPrices.medical = calcPriceChange(price_change,old_stock,new_stock,price_volitility.medical)
        reserveGoods.medical = new_stock
        reserveGoods.money -= units_ordered.medical * Math.round(prices.medical)

        old_stock = reserveGoods.rare_ores
        new_stock = reserveGoods.rare_ores + units_ordered.rare_ores
        price_change = federalPrices.rare_ores
        federalPrices.rare_ores = calcPriceChange(price_change,old_stock,new_stock,price_volitility.rare_ores)
        reserveGoods.rare_ores = new_stock
        reserveGoods.money -= units_ordered.rare_ores * Math.round(prices.rare_ores)

        old_stock = reserveGoods.gems
        new_stock = reserveGoods.gems + units_ordered.gems
        price_change = federalPrices.gems
        federalPrices.gems = calcPriceChange(price_change,old_stock,new_stock,price_volitility.gems)
        reserveGoods.gems = new_stock
        reserveGoods.money -= units_ordered.gems * Math.round(prices.gems)

        old_stock = reserveGoods.runes
        new_stock = reserveGoods.runes + units_ordered.runes
        price_change = federalPrices.runes
        federalPrices.runes = calcPriceChange(price_change,old_stock,new_stock,price_volitility.runes)
        reserveGoods.runes = new_stock
        reserveGoods.money -= units_ordered.runes * Math.round(prices.runes)

        old_stock = reserveGoods.arms
        new_stock = reserveGoods.arms + units_ordered.arms
        price_change = federalPrices.arms
        federalPrices.arms = calcPriceChange(price_change,old_stock,new_stock,price_volitility.arms)
        reserveGoods.arms = new_stock
        reserveGoods.money -= units_ordered.arms * Math.round(prices.arms)

        old_stock = reserveGoods.books
        new_stock = reserveGoods.books + units_ordered.books
        price_change = federalPrices.books
        federalPrices.books = calcPriceChange(price_change,old_stock,new_stock,price_volitility.books)
        reserveGoods.books = new_stock
        reserveGoods.money -= units_ordered.books * Math.round(prices.books)

        old_stock = reserveGoods.enchanted_arms
        new_stock = reserveGoods.enchanted_arms + units_ordered.enchanted_arms
        price_change = federalPrices.enchanted_arms
        federalPrices.enchanted_arms = calcPriceChange(price_change,old_stock,new_stock,price_volitility.enchanted_arms)
        reserveGoods.enchanted_arms = new_stock
        reserveGoods.money -= units_ordered.enchanted_arms * Math.round(prices.enchanted_arms)

        old_stock = reserveGoods.charcoal
        new_stock = reserveGoods.charcoal + units_ordered.charcoal
        price_change = federalPrices.charcoal
        federalPrices.charcoal = calcPriceChange(price_change,old_stock,new_stock,price_volitility.charcoal)
        reserveGoods.charcoal = new_stock
        reserveGoods.money -= units_ordered.charcoal * Math.round(prices.charcoal)
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
                s.finance_points += units_ordered.enchanted * Math.round(prices.enchanted)

                old_stock = s.timber.stock
                new_stock = s.timber.stock - units_ordered.timber
                price_change = s.prices.timber
                s.prices.timber = calcPriceChange(price_change,old_stock,new_stock,price_volitility.timber)
                s.timber.stock = new_stock
                s.finance_points += units_ordered.timber * Math.round(prices.timber)

                old_stock = s.tools.stock
                new_stock = s.tools.stock - units_ordered.tools
                price_change = s.prices.tools
                s.prices.tools = calcPriceChange(price_change,old_stock,new_stock,price_volitility.tools)
                s.tools.stock = new_stock
                s.finance_points += units_ordered.tools * Math.round(prices.tools)

                old_stock = s.common_ores.stock
                new_stock = s.common_ores.stock - units_ordered.common_ores
                price_change = s.prices.common_ores
                s.prices.common_ores = calcPriceChange(price_change,old_stock,new_stock,price_volitility.common_ores)
                s.common_ores.stock = new_stock
                s.finance_points += units_ordered.common_ores * Math.round(prices.common_ores)

                old_stock = s.medical_supplies.stock
                new_stock = s.medical_supplies.stock - units_ordered.medical
                price_change = s.prices.medical
                s.prices.medical = calcPriceChange(price_change,old_stock,new_stock,price_volitility.medical)
                s.medical_supplies.stock = new_stock
                s.finance_points += units_ordered.medical * Math.round(prices.medical)

                old_stock = s.rare_ores.stock
                new_stock = s.rare_ores.stock - units_ordered.rare_ores
                price_change = s.prices.rare_ores
                s.prices.rare_ores = calcPriceChange(price_change,old_stock,new_stock,price_volitility.rare_ores)
                s.medical_supplies.stock = new_stock
                s.finance_points += units_ordered.rare_ores * Math.round(prices.rare_ores)

                old_stock = s.gems.stock
                new_stock = s.gems.stock - units_ordered.gems
                price_change = s.prices.gems
                s.prices.gems = calcPriceChange(price_change,old_stock,new_stock,price_volitility.gems)
                s.gems.stock = new_stock
                s.finance_points += units_ordered.gems * Math.round(prices.gems)

                old_stock = s.runes.stock
                new_stock = s.runes.stock - units_ordered.runes
                price_change = s.prices.runes
                s.prices.runes = calcPriceChange(price_change,old_stock,new_stock,price_volitility.runes)
                s.runes.stock = new_stock
                s.finance_points += units_ordered.runes * Math.round(prices.runes)

                old_stock = s.armaments.stock
                new_stock = s.armaments.stock - units_ordered.arms
                price_change = s.prices.arms
                s.prices.arms = calcPriceChange(price_change,old_stock,new_stock,price_volitility.arms)
                s.armaments.stock = new_stock
                s.finance_points += units_ordered.arms * Math.round(prices.arms)

                old_stock = s.books.stock
                new_stock = s.books.stock - units_ordered.books
                price_change = s.prices.books
                s.prices.books = calcPriceChange(price_change,old_stock,new_stock,price_volitility.books)
                s.books.stock = new_stock
                s.finance_points += units_ordered.books * Math.round(prices.books)
                
                old_stock = s.enchanted_armaments.stock
                new_stock = s.enchanted_armaments.stock - units_ordered.enchanted_arms
                price_change = s.prices.enchanted_arms
                s.prices.enchanted_arms = calcPriceChange(price_change,old_stock,new_stock,price_volitility.enchanted_arms)
                s.enchanted_armaments.stock = new_stock
                s.finance_points += units_ordered.enchanted_arms * Math.round(prices.enchanted_arms)
                
                old_stock = s.enchanted_charcoal.stock
                new_stock = s.enchanted_charcoal.stock - units_ordered.charcoal
                price_change = s.prices.charcoal
                s.prices.charcoal = calcPriceChange(price_change,old_stock,new_stock,price_volitility.charcoal)
                s.enchanted_charcoal.stock = new_stock
                s.finance_points += units_ordered.charcoal * Math.round(prices.charcoal)

            }
        })
    }

    const foreignPurchase = (units_ordered: goodsdist,realname: string) => {
        foreignPowers.forEach(f => {
            if (f.name === realname) {
                f.available_supply.food -= units_ordered.food
                f.available_supply.beer -= units_ordered.beer
                f.available_supply.leather -= units_ordered.leather
                f.available_supply.artisinal -= units_ordered.artisinal
                f.available_supply.ornamental -= units_ordered.ornamental
                f.available_supply.livestock -= units_ordered.livestock
                f.available_supply.enchanted -= units_ordered.enchanted
                f.available_supply.timber -= units_ordered.timber
                f.available_supply.tools -= units_ordered.tools
                f.available_supply.common_ores -= units_ordered.common_ores
                f.available_supply.medical -= units_ordered.medical
                f.available_supply.rare_ores -= units_ordered.rare_ores
                f.available_supply.gems -= units_ordered.gems
                f.available_supply.runes -= units_ordered.runes
                f.available_supply.arms -= units_ordered.arms
                f.available_supply.books -= units_ordered.books
                f.available_supply.enchanted_arms -= units_ordered.enchanted_arms
                f.available_supply.charcoal -= units_ordered.charcoal
            }
        })
    }

    const updateSave = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.set('Federal Reserve',reserveGoods);
        store.set('Federal Prices',federalPrices)
        store.set('Price History',priceHistory)
        store.set('settlements',settlements);
        store.set('Foreign Powers',foreignPowers)
        store.set('Merchant Capacity',merchantCapacity)
    }

    useEffect(() => {
        getSettlements();
        
    }, []);

    return (
        <div className="flex flex-column gap-2">
            <Button label='Go Back' icon='pi pi-angle-double-left' onClick={()=>{
                updateSave()
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
            erchant Capactiy: {merchantCapacity}
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
                                merchantCapacity={merchantCapacity}
                            />
                        )
                    })}
                </div>
            </Panel>
            <Panel header="Global Goods" toggleable>
                Merchant Capactiy: {merchantCapacity}
                <div className='flex flex-row gap-2 flex-wrap'>
                    {foreignPowers.map(f => {
                        return(
                            !f.isEmbargoed ?<PriceCard
                                prices={f.prices}
                                availableGoods={f.available_supply}
                                name={f.name}
                                realname={f.name}
                                type="Foreign"
                                merchantCapacity={merchantCapacity}
                                updateFunc={updateInventory}
                            />:<></>
                        )
                    })}
                </div>
            </Panel>
        </div>
    )
}