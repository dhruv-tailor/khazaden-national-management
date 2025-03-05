import { Card } from "primereact/card";
import { ClanInterface } from "../../Clans/ClanInterface";
import { ReactNode, useEffect, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { FaBook, FaBriefcaseMedical, FaGem, FaHeart, FaShieldAlt, FaTools } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import GoodAllocator from "./GoodAllocator";
import { GiBeerStein, GiClothes, GiCoalWagon, GiCrystalBall, GiGems, GiMagicShield, GiPouringChalice, GiRuneStone, GiThrownCharcoal, GiWoodPile } from "react-icons/gi";
import { PiCowFill } from "react-icons/pi";
import { LuHandCoins } from "react-icons/lu";
import { Button } from "primereact/button";


export default function ClanInfo({clan,icon}: {clan: ClanInterface,icon:ReactNode}) {
    const [goodsAssigned, setGoodsAssigned] = useState<number>(0);
    const [food,setFood] = useState<number>(clan.food_and_water.produced);
    const [beer,setBeer] = useState<number>(clan.beer.produced);
    const [leather,setLeather] = useState<number>(clan.leather_and_textiles.produced);
    const [artisanal,setArtisanal] = useState<number>(clan.artisanal_goods.produced);
    const [ornamental,setOrnamental] = useState<number>(clan.ornamental_luxuries.produced);
    const [livestock,setLivestock] = useState<number>(clan.livestock.produced);
    const [luxuries,setLuxuries] = useState<number>(clan.enchanted_luxuries.produced);
    const [timber,setTimber] = useState<number>(clan.timber.produced);
    const [tools,setTools] = useState<number>(clan.tools.produced);
    const [commonOres,setCommonOres] = useState<number>(clan.common_ores.produced);
    const [rareOres,setRareOres] = useState<number>(clan.rare_ores.produced);
    const [medical,setMedical] = useState<number>(clan.medical_supplies.produced);
    const [gems,setGems] = useState<number>(clan.gems.produced);
    const [runes,setRunes] = useState<number>(clan.runes.produced);
    const [arms,setArms] = useState<number>(clan.armaments.produced);
    const [books,setBooks] = useState<number>(clan.books.produced);
    const [enchantedArms,setEnchantedArms] = useState<number>(clan.enchanted_armaments.produced);
    const [charcoal,setCharcoal] = useState<number>(clan.enchanted_charcoal.produced);


    const header = (
        <div className="flex flex-row gap-1">
        {icon}{clan.name}
        </div>
    );

    const unassignedGoods = () => {
        let assigned = 0;
        assigned += food + beer + leather + artisanal + ornamental + livestock
        assigned += luxuries + timber + tools + commonOres + rareOres + medical
        assigned += gems + runes + arms + books + enchantedArms + charcoal
        setGoodsAssigned(clan.goods_produced - assigned)
    }

    useEffect(() => {
        unassignedGoods()
    },
    [food, beer, leather, artisanal, ornamental, livestock, 
        luxuries, timber, tools, commonOres, rareOres, medical, 
        gems, runes, arms, books, enchantedArms, charcoal])

    useEffect(() => {
        unassignedGoods()
    },[])

    const valueTemplate = (value: number) => (<>{value / 10}</>)

    return(
        <>
        <Card header={header} className="w-17rem">
            <div className="flex flex-row gap-1">
                <h3><IoIosPeople /></h3>
                <h3>{clan.population}</h3>
                
            </div>
            <div>
                <FaHeart /> Loyalty
                <ProgressBar value={clan.loyalty * 10} displayValueTemplate={valueTemplate}></ProgressBar>
            </div>
            <div>
                <FaGear /> Efficency
                <ProgressBar value={clan.efficency * 10} displayValueTemplate={valueTemplate}></ProgressBar>
            </div>

            <div className="flex flex-column gap-2">
                <p>Unassigned Production: {goodsAssigned}</p>
                <div className="flex flex-row flex-wrap gap-2">
                    {clan.food_and_water.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={food} 
                            setter={setFood} 
                            icon={<IoFastFood/>}
                            /> : null}
                    {clan.beer.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={beer} 
                            setter={setBeer} 
                            icon={<GiBeerStein/>}
                            /> : null}
                    {clan.leather_and_textiles.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={leather} 
                            setter={setLeather} 
                            icon={<GiClothes/>}
                            /> : null}
                    {clan.artisanal_goods.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={artisanal} 
                            setter={setArtisanal} 
                            icon={<LuHandCoins/>}
                            /> : null}
                    {clan.livestock.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={livestock} 
                            setter={setLivestock} 
                            icon={<PiCowFill/>}
                            /> : null}
                    {clan.ornamental_luxuries.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={ornamental} 
                            setter={setOrnamental} 
                            icon={<GiPouringChalice/>}
                            /> : null}
                    {clan.enchanted_luxuries.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={luxuries} 
                            setter={setLuxuries} 
                            icon={<GiCrystalBall/>}
                            /> : null}
                    {clan.timber.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={timber} 
                            setter={setTimber} 
                            icon={<GiWoodPile/>}
                            /> : null}
                    {clan.tools.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={tools} 
                            setter={setTools} 
                            icon={<FaTools/>}
                            /> : null}
                    {clan.common_ores.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={commonOres} 
                            setter={setCommonOres} 
                            icon={<GiCoalWagon/>}
                            /> : null}
                    {clan.medical_supplies.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={medical} 
                            setter={setMedical} 
                            icon={<FaBriefcaseMedical/>}
                            /> : null}
                    {clan.rare_ores.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={rareOres} 
                            setter={setRareOres} 
                            icon={<FaGem/>}
                            /> : null}
                    {clan.gems.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={gems} 
                            setter={setGems} 
                            icon={<GiGems/>}
                            /> : null}
                    {clan.runes.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={runes} 
                            setter={setRunes} 
                            icon={<GiRuneStone/>}
                            /> : null}
                    {clan.armaments.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={arms} 
                            setter={setArms} 
                            icon={<FaShieldAlt/>}
                            /> : null}
                    {clan.books.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={books} 
                            setter={setBooks} 
                            icon={<FaBook/>}
                            /> : null}
                    {clan.enchanted_armaments.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={enchantedArms} 
                            setter={setEnchantedArms} 
                            icon={<GiMagicShield/>}
                            /> : null}
                    {clan.enchanted_charcoal.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={charcoal} 
                            setter={setCharcoal} 
                            icon={<GiThrownCharcoal/>}
                            /> : null}
                </div>
                {goodsAssigned === 0  ? <Button label="Save Changes" size="small" icon="pi pi-check"/>: null}
            </div>

        </Card>
        </>
    )
}