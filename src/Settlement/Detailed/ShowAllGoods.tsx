import { IoFastFood } from "react-icons/io5";
import { SettlementInterface } from "../SettlementInterface";
import ShowGood from "./showGood";
import { GiBeerStein, GiClothes, GiCoalWagon, GiCrystalBall, GiGems, GiMagicShield, GiPouringChalice, GiRuneStone, GiThrownCharcoal, GiWoodPile } from "react-icons/gi";
import { LuHandCoins } from "react-icons/lu";
import { PiCowFill } from "react-icons/pi";
import { FaBook, FaBriefcaseMedical, FaGem, FaShieldAlt, FaTools } from "react-icons/fa";

export default function ShowAllGoods({settlement}: {settlement :SettlementInterface}) {
    return (
        <div className="flex flex-row gap-2 flex-wrap">
            <ShowGood 
                stock={settlement.food_and_water.stock}
                consumption={
                    Math.round((settlement.farmers.food_and_water.produced + settlement.foresters.food_and_water.produced) * (1-settlement.production_quota))
                    - settlement.food_and_water.consumption_rate
                }
                icon={<IoFastFood/>}
            />
            <ShowGood 
                stock={settlement.beer.stock}
                consumption={Math.round(settlement.farmers.beer.produced * (1-settlement.production_quota)) - settlement.beer.consumption_rate}
                icon={<GiBeerStein/>}
            />
            <ShowGood 
                stock={settlement.leather_and_textiles.stock}
                consumption={Math.round(settlement.farmers.leather_and_textiles.produced * (1-settlement.production_quota)) - settlement.leather_and_textiles.consumption_rate}
                icon={<GiClothes/>}
            />
            <ShowGood 
                stock={settlement.artisinal_goods.stock}
                consumption={
                    Math.round((settlement.craftsmen.artisanal_goods.produced + settlement.foresters.artisanal_goods.produced)* (1-settlement.production_quota))
                    - settlement.artisinal_goods.consumption_rate
                }
                icon={<LuHandCoins/>}
            />
            <ShowGood 
                stock={settlement.livestock.stock}
                consumption={Math.round((settlement.farmers.livestock.produced) * (1-settlement.production_quota)) - settlement.livestock.consumption_rate}
                icon={<PiCowFill/>}
            />
            <ShowGood 
                stock={settlement.ornamental_luxuries.stock}
                consumption={Math.round(settlement.craftsmen.ornamental_luxuries.produced * (1-settlement.production_quota)) - settlement.ornamental_luxuries.consumption_rate}
                icon={<GiPouringChalice/>}
            />
            <ShowGood 
                stock={settlement.enchanted_luxuries.stock}
                consumption={Math.round(settlement.rune_smiths.enchanted_luxuries.produced * (1-settlement.production_quota)) - settlement.enchanted_luxuries.consumption_rate}
                icon={<GiCrystalBall/>}
            />
            <ShowGood 
                stock={settlement.timber.stock}
                consumption={Math.round(settlement.foresters.timber.produced * (1-settlement.production_quota)) - settlement.timber.consumption_rate}
                icon={<GiWoodPile/>}
            />
            <ShowGood 
                stock={settlement.tools.stock}
                consumption={Math.round(settlement.craftsmen.tools.produced * (1-settlement.production_quota)) - settlement.tools.consumption_rate}
                icon={<FaTools/>}
            />
            <ShowGood 
                stock={settlement.common_ores.stock}
                consumption={Math.round(settlement.miners.common_ores.produced * (1-settlement.production_quota)) - settlement.common_ores.consumption_rate}
                icon={<GiCoalWagon/>}
            />
            <ShowGood 
                stock={settlement.medical_supplies.stock}
                consumption={Math.round(settlement.clerics.medical_supplies.produced * (1-settlement.production_quota)) - settlement.medical_supplies.consumption_rate}
                icon={<FaBriefcaseMedical/>}
            />
            <ShowGood 
                stock={settlement.rare_ores.stock}
                consumption={Math.round(settlement.miners.rare_ores.produced * (1-settlement.production_quota)) - settlement.rare_ores.consumption_rate}
                icon={<FaGem/>}
            />
            <ShowGood 
                stock={settlement.gems.stock}
                consumption={Math.round(settlement.miners.gems.produced * (1-settlement.production_quota)) - settlement.gems.consumption_rate}
                icon={<GiGems/>}
            />
            <ShowGood 
                stock={settlement.runes.stock}
                consumption={Math.round(settlement.rune_smiths.runes.produced * (1-settlement.production_quota)) - settlement.runes.consumption_rate}
                icon={<GiRuneStone/>}
            />
            <ShowGood 
                stock={settlement.armaments.stock}
                consumption={Math.round(settlement.craftsmen.armaments.produced * (1-settlement.production_quota)) - settlement.armaments.consumption_rate}
                icon={<FaShieldAlt/>}
            />
            <ShowGood 
                stock={settlement.books.stock}
                consumption={Math.round((settlement.clerics.books.produced + settlement.archivists.books.produced) * (1-settlement.production_quota)) - settlement.books.consumption_rate}
                icon={<FaBook/>}
            />
            <ShowGood 
                stock={settlement.enchanted_armaments.stock}
                consumption={Math.round(settlement.rune_smiths.enchanted_armaments.produced * (1-settlement.production_quota)) - settlement.enchanted_armaments.consumption_rate}
                icon={<GiMagicShield/>}
            />
            <ShowGood 
                stock={settlement.enchanted_charcoal.stock}
                consumption={Math.round(settlement.foresters.enchanted_charcoal.produced * (1-settlement.production_quota)) - settlement.enchanted_charcoal.consumption_rate}
                icon={<GiThrownCharcoal/>}
            />
        </div>
    )
}