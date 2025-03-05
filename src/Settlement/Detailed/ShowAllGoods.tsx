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
                consumption={settlement.food_and_water.consumption_rate}
                icon={<IoFastFood/>}
            />
            <ShowGood 
                stock={settlement.beer.stock}
                consumption={settlement.beer.consumption_rate}
                icon={<GiBeerStein/>}
            />
            <ShowGood 
                stock={settlement.leather_and_textiles.stock}
                consumption={settlement.leather_and_textiles.consumption_rate}
                icon={<GiClothes/>}
            />
            <ShowGood 
                stock={settlement.artisinal_goods.stock}
                consumption={settlement.artisinal_goods.consumption_rate}
                icon={<LuHandCoins/>}
            />
            <ShowGood 
                stock={settlement.livestock.stock}
                consumption={settlement.livestock.consumption_rate}
                icon={<PiCowFill/>}
            />
            <ShowGood 
                stock={settlement.ornamental_luxuries.stock}
                consumption={settlement.ornamental_luxuries.consumption_rate}
                icon={<GiPouringChalice/>}
            />
            <ShowGood 
                stock={settlement.enchanted_luxuries.stock}
                consumption={settlement.enchanted_luxuries.consumption_rate}
                icon={<GiCrystalBall/>}
            />
            <ShowGood 
                stock={settlement.timber.stock}
                consumption={settlement.timber.consumption_rate}
                icon={<GiWoodPile/>}
            />
            <ShowGood 
                stock={settlement.tools.stock}
                consumption={settlement.tools.consumption_rate}
                icon={<FaTools/>}
            />
            <ShowGood 
                stock={settlement.enchanted_charcoal.stock}
                consumption={settlement.enchanted_charcoal.consumption_rate}
                icon={<GiThrownCharcoal/>}
            />
            <ShowGood 
                stock={settlement.common_ores.stock}
                consumption={settlement.common_ores.consumption_rate}
                icon={<GiCoalWagon/>}
            />
            <ShowGood 
                stock={settlement.medical_supplies.stock}
                consumption={settlement.medical_supplies.consumption_rate}
                icon={<FaBriefcaseMedical/>}
            />
            <ShowGood 
                stock={settlement.gems.stock}
                consumption={settlement.gems.consumption_rate}
                icon={<GiGems/>}
            />
            <ShowGood 
                stock={settlement.rare_ores.stock}
                consumption={settlement.rare_ores.consumption_rate}
                icon={<FaGem/>}
            />
            <ShowGood 
                stock={settlement.books.stock}
                consumption={settlement.books.consumption_rate}
                icon={<FaBook/>}
            />
            <ShowGood 
                stock={settlement.runes.stock}
                consumption={settlement.runes.consumption_rate}
                icon={<GiRuneStone/>}
            />
            <ShowGood 
                stock={settlement.armaments.stock}
                consumption={settlement.armaments.consumption_rate}
                icon={<FaShieldAlt/>}
            />
            <ShowGood 
                stock={settlement.enchanted_armaments.stock}
                consumption={settlement.enchanted_armaments.consumption_rate}
                icon={<GiMagicShield/>}
            />
        </div>
    )
}