import { Card } from "primereact/card";
import { ClanInterface, developmentBonus } from "../../Clans/ClanInterface";
import { ReactNode, useEffect, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { FaBook, FaBriefcaseMedical, FaCoins, FaGem, FaHeart, FaShieldAlt, FaTools } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import GoodAllocator from "./GoodAllocator";
import { GiBeerStein, GiClothes, GiCoalWagon, GiCrystalBall, GiGems, GiMagicShield, GiPouringChalice, GiRuneStone, GiThrownCharcoal, GiWoodPile } from "react-icons/gi";
import { PiCowFill } from "react-icons/pi";
import { LuHandCoins } from "react-icons/lu";
import { saveLocation } from "../../utilities/SaveData";
import { useParams } from "react-router";
import { SettlementInterface } from "../SettlementInterface";
import { load } from "@tauri-apps/plugin-store";
import { clans } from "../../Goods/good";
import { Slider } from 'primereact/slider';
import { InputText } from "primereact/inputtext";
import { Divider } from 'primereact/divider';
import { InputNumber } from "primereact/inputnumber";
import { BsBuildingFillGear } from "react-icons/bs";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";


export default function ClanInfo(
    {clan,icon,resources,updateParent,funds,updateFunds}: 
    {
        clan: ClanInterface,
        icon:ReactNode,
        resources: number[],
        updateParent: () => Promise<void>,
        funds: number,
        updateFunds: (id: clans, amount: number) => Promise<void>
    }) {
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
    const [taxRate, setTaxRate] = useState<number>(clan.tax_rate)
    const [invest, setInvest] = useState<number>(0)
    const [showInvest, setShowInvest] = useState<boolean>(false)

    const gameId = useParams().game
    const settlementId = useParams().settlement


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
        updateSave();
        
    }

    useEffect(() => {
        unassignedGoods()
        updateParent();
    },
    [food, beer, leather, artisanal, ornamental, livestock, 
        luxuries, timber, tools, commonOres, rareOres, medical, 
        gems, runes, arms, books, enchantedArms, charcoal])

    useEffect(() => {
        unassignedGoods()
    },[])

    useEffect(() => {
        updateFinances()
        updateParent()
    },[taxRate])

    const valueTemplate = (value: number) => (<>{value / 10}</>)
    const developmentTemplate = (value: number) => (<>{Math.round(value / 25)}</>)

    const updateSave = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlments = (await store.get<SettlementInterface[]>('settlements') ?? [])
        settlments.forEach(settle => {
            if(settle.name !== (settlementId ?? '')) {return}
            if (clan.id === clans.archivists) {
                settle.archivists.books.produced = books
            }
            else if (clan.id === clans.runeSmiths) {
                settle.rune_smiths.enchanted_luxuries.produced = luxuries
                settle.rune_smiths.runes.produced = runes
                settle.rune_smiths.enchanted_armaments.produced = enchantedArms
            }
            else if (clan.id === clans.craftsmen) {
                settle.craftsmen.artisanal_goods.produced = artisanal
                settle.craftsmen.ornamental_luxuries.produced = ornamental
                settle.craftsmen.tools.produced = tools
                settle.craftsmen.armaments.produced = arms
            }
            else if (clan.id === clans.clerics) {
                settle.clerics.medical_supplies.produced = medical
                settle.clerics.books.produced = books
            }
            else if (clan.id === clans.miners) {
                settle.miners.common_ores.produced = commonOres
                settle.miners.rare_ores.produced = rareOres
                settle.miners.gems.produced = gems
            }
            else if (clan.id === clans.farmers) {
                settle.farmers.food_and_water.produced = food
                settle.farmers.beer.produced = beer
                settle.farmers.leather_and_textiles.produced = leather
                settle.farmers.livestock.produced = livestock
            }
            else if (clan.id === clans.foresters) {
                settle.foresters.food_and_water.produced = food
                settle.foresters.artisanal_goods.produced = artisanal
                settle.foresters.timber.produced = timber
                settle.foresters.enchanted_charcoal.produced = charcoal
            }
        })
        store.set('settlements', settlments);
        await store.save();
    }

    const updateFinances = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlments = (await store.get<SettlementInterface[]>('settlements') ?? [])
        settlments.forEach(settle => {
            if(settle.name !== (settlementId ?? '')) {return}
            if ( clan.id === clans.rulers ) {settle.rulers.tax_rate = taxRate}
            else if (clan.id === clans.archivists) {settle.archivists.tax_rate = taxRate}
            else if (clan.id === clans.engineers) {settle.engineers.tax_rate = taxRate}
            else if (clan.id === clans.runeSmiths) {settle.rune_smiths.tax_rate = taxRate}
            else if (clan.id === clans.craftsmen) { settle.craftsmen.tax_rate = taxRate }
            else if (clan.id === clans.merchants) {settle.merchants.tax_rate = taxRate}
            else if (clan.id === clans.clerics) { settle.clerics.tax_rate = taxRate }
            else if (clan.id === clans.miners) { settle.miners.tax_rate = taxRate }
            else if (clan.id === clans.farmers) { settle.farmers.tax_rate = taxRate }
            else if (clan.id === clans.warriors) { settle.warriors.tax_rate = taxRate }
            else if (clan.id === clans.foresters) { settle.foresters.tax_rate = taxRate }
        })
        store.set('settlements', settlments);
        await store.save();
    }

    // const footer = (<Button label="Save Changes" icon="pi pi-check" size="small" onClick={updateSave}/>)


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
            <div>
            <BsBuildingFillGear /> Development
                <ProgressBar value={developmentBonus(clan) * 25} displayValueTemplate={developmentTemplate}></ProgressBar>
            </div>
            <Divider />
            <div>
                <label htmlFor="tax-rate">Tax Rate</label>
                <InputText id="tax-rate" value={Math.round((taxRate * 100)).toString()}/>
                <Slider value={taxRate * 100} onChange={(e) => setTaxRate((e.value as number)/100)} step={1}/>
            </div>

            <Divider />

            <div className="flex flex-column gap-2">
            Unassigned Production: {goodsAssigned}
                <div className="flex flex-row flex-wrap gap-2">
                    {clan.food_and_water.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={food} 
                            setter={setFood} 
                            natCap={resources[0]}
                            icon={<IoFastFood/>}
                            /> : null}
                    {clan.beer.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={beer} 
                            setter={setBeer}
                            natCap={resources[1]}
                            icon={<GiBeerStein/>}
                            /> : null}
                    {clan.leather_and_textiles.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={leather} 
                            setter={setLeather} 
                            natCap={resources[2]}
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
                            natCap={resources[3]}
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
                            natCap={resources[4]}
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
                            natCap={resources[6]}
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
                            natCap={resources[8]}
                            icon={<FaGem/>}
                            /> : null}
                    {clan.gems.is_produced ? 
                        <GoodAllocator
                            capacity={goodsAssigned} 
                            assigned={gems} 
                            setter={setGems} 
                            natCap={resources[7]}
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
                            natCap={resources[5]}
                            icon={<GiThrownCharcoal/>}
                            /> : null}
                </div>
            </div>
            <Divider />
            <Button label="Invest in Clan" onClick={()=>setShowInvest(true)}/>
            <Dialog 
                header={<>Invest in {icon} {clan.name}</>}
                visible={showInvest}
                onHide={() => {
                    setShowInvest(false)
                    setInvest(0)
                }}
                >
                <div className="flex flex-column gap-1">
                    <div>
                        Funds Available: <FaCoins/> {funds}
                    </div>
                    <div>
                        <FaCoins/>
                        <InputNumber min={0} max={funds} size={15} showButtons id="investment" value={invest} onChange={e => setInvest(e.value ?? 0)}/>
                    </div>
                    <Button label="Invest" onClick={() => {
                        updateFunds(clan.id,invest)
                        setShowInvest(false)
                        setInvest(0)
                    }}/>
                </div>
            </Dialog>
        </Card>
        </>
    )
}