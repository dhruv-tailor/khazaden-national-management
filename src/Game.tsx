import { useEffect, useState } from "react";
import { newSettlement, SettlementInterface, updateGoodsProduction } from "./Settlement/SettlementInterface";
import Settlement from "./Settlement/Settlement";
import { useNavigate, useParams } from "react-router";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";
import { Button } from "primereact/button";
import { NextTurn } from "./utilities/NextTurn";
import { Panel } from "primereact/panel";
import { FaBook, FaBriefcaseMedical, FaCoins, FaGem, FaShieldAlt, FaTools } from "react-icons/fa";
import PlusMinus from "./components/PlusMinus";
import { TerrainData, TerrainType } from "./Settlement/TerrainInterface";
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import PopDistribution, { default_popdist, popdist } from "./components/Popdistribution";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import ResourceDistribuition, { goodsdist, empty_goodsdist } from "./components/ResourceDistribution";
import { IoFastFood } from "react-icons/io5";
import { GiBeerStein, GiClothes, GiCoalWagon, GiCrystalBall, GiGems, GiMagicShield, GiPouringChalice, GiRuneStone, GiThrownCharcoal, GiWoodPile } from "react-icons/gi";
import { LuHandCoins } from "react-icons/lu";
import { PiCowFill } from "react-icons/pi";

interface selectButtonTerrainInterface {
    name: string;
    value: TerrainType;
}


function Game() {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);
    const [newSettlementVisable,setNewSettlementVisable] = useState<boolean>(false);
    const [terrainOptions, setTerrainOptions] = useState<selectButtonTerrainInterface[]>([])
    const [selectedTerrain, setSelectedTerrain] = useState<TerrainType>(TerrainType.Mountain)
    const [newSettlmentName, setNewSettlementName] = useState<string>('');
    const [intialSettlerType,setInitalSettlerType] = useState<string>('');
    const [initialPops,setIntialPops] = useState<popdist>(default_popdist);
    const [resourceType,setResourceType] = useState<string>('');
    const [percentageGive, setPercentageGive] = useState<number>(0);
    const [resourceDistribution, setResourceDistribution] = useState<goodsdist>(empty_goodsdist);
    const [giveGoodsVisable,setGiveGoodsVisable] = useState<boolean>(false);
    //Who are you giving the stimulus package to
    const [whoToGive,setWhoToGive] = useState<string>('');

    // Federal Reserve
    const [reserveGoods,setReserveGoods] = useState<goodsdist>(empty_goodsdist);
    const [changeGoods,setChangeGoods] = useState<goodsdist>(empty_goodsdist);


    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<goodsdist>('Federal Reserve').then(value => {if (value) {setReserveGoods(value);}});
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

    const navigateSettlement = (name: string) => {
        navigate(`settlement/${name}`)
    }

    useEffect(() => {
        getSettlements();
    }, []);

    const processNextTurn = async () => {
        await NextTurn(gameId ?? '');
        getSettlements();
    }

    const createNewSettlement = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const new_settlement = newSettlement(`settlement${settlements.length+1}`,selectedTerrain)
        
        // Give Intial Resources
        if(resourceType === 'Percentage') {
            new_settlement.finance_points = Math.round(reserveGoods.money * percentageGive)
            new_settlement.food_and_water.stock = Math.round(reserveGoods.food * percentageGive)
            new_settlement.beer.stock = Math.round(reserveGoods.beer * percentageGive)
            new_settlement.leather_and_textiles.stock = Math.round(reserveGoods.leather * percentageGive)
            new_settlement.artisinal_goods.stock = Math.round(reserveGoods.artisinal * percentageGive)
            new_settlement.livestock.stock = Math.round(reserveGoods.livestock * percentageGive)
            new_settlement.ornamental_luxuries.stock = Math.round(reserveGoods.ornamental * percentageGive)
            new_settlement.enchanted_luxuries.stock = Math.round(reserveGoods.enchanted * percentageGive)
            new_settlement.timber.stock = Math.round(reserveGoods.timber * percentageGive)
            new_settlement.tools.stock = Math.round(reserveGoods.tools * percentageGive)
            new_settlement.common_ores.stock = Math.round(reserveGoods.common_ores * percentageGive)
            new_settlement.medical_supplies.stock = Math.round(reserveGoods.medical * percentageGive)
            new_settlement.rare_ores.stock = Math.round(reserveGoods.rare_ores * percentageGive)
            new_settlement.gems.stock = Math.round(reserveGoods.gems * percentageGive)
            new_settlement.runes.stock = Math.round(reserveGoods.runes * percentageGive)
            new_settlement.armaments.stock = Math.round(reserveGoods.arms * percentageGive)
            new_settlement.books.stock = Math.round(reserveGoods.books * percentageGive)
            new_settlement.enchanted_armaments.stock = Math.round(reserveGoods.enchanted_arms * percentageGive)
            new_settlement.enchanted_charcoal.stock = Math.round(reserveGoods.charcoal * percentageGive)
        } else if (resourceType === 'Discrete') {
            new_settlement.finance_points = resourceDistribution.money
            new_settlement.food_and_water.stock = resourceDistribution.food
            new_settlement.beer.stock = resourceDistribution.beer
            new_settlement.leather_and_textiles.stock = resourceDistribution.leather
            new_settlement.artisinal_goods.stock = resourceDistribution.artisinal
            new_settlement.livestock.stock = resourceDistribution.livestock
            new_settlement.ornamental_luxuries.stock = resourceDistribution.ornamental
            new_settlement.enchanted_luxuries.stock = resourceDistribution.enchanted
            new_settlement.timber.stock = resourceDistribution.timber
            new_settlement.tools.stock = resourceDistribution.tools
            new_settlement.common_ores.stock = resourceDistribution.common_ores
            new_settlement.medical_supplies.stock = resourceDistribution.medical
            new_settlement.rare_ores.stock = resourceDistribution.rare_ores
            new_settlement.gems.stock = resourceDistribution.gems
            new_settlement.runes.stock = resourceDistribution.runes
            new_settlement.armaments.stock = resourceDistribution.arms
            new_settlement.books.stock = resourceDistribution.books
            new_settlement.enchanted_armaments.stock = resourceDistribution.enchanted_arms
            new_settlement.enchanted_charcoal.stock = resourceDistribution.charcoal
        }
        setReserveGoods({
            money: reserveGoods.money - new_settlement.finance_points,
            food: reserveGoods.food - new_settlement.food_and_water.stock,
            beer: reserveGoods.beer - new_settlement.beer.stock,
            leather: reserveGoods.leather - new_settlement.leather_and_textiles.stock,
            artisinal: reserveGoods.artisinal - new_settlement.artisinal_goods.stock,
            livestock: reserveGoods.livestock - new_settlement.livestock.stock,
            ornamental: reserveGoods.ornamental - new_settlement.ornamental_luxuries.stock,
            enchanted: reserveGoods.enchanted - new_settlement.enchanted_luxuries.stock,
            timber: reserveGoods.timber - new_settlement.timber.stock,
            tools: reserveGoods.tools - new_settlement.tools.stock,
            common_ores: reserveGoods.common_ores - new_settlement.common_ores.stock,
            medical: reserveGoods.medical - new_settlement.medical_supplies.stock,
            rare_ores: reserveGoods.rare_ores - new_settlement.rare_ores.stock,
            gems: reserveGoods.gems - new_settlement.gems.stock,
            runes: reserveGoods.runes - new_settlement.runes.stock,
            arms: reserveGoods.arms - new_settlement.armaments.stock,
            books: reserveGoods.books - new_settlement.books.stock,
            enchanted_arms: reserveGoods.enchanted - new_settlement.enchanted_armaments.stock,
            charcoal: reserveGoods.charcoal - new_settlement.enchanted_charcoal.stock})
        // Give Inital Population
        if(intialSettlerType === 'Default') {
            new_settlement.craftsmen.population = 1
            new_settlement.merchants.population = 1
            new_settlement.miners.population = 2
            new_settlement.farmers.population = 6
        }
        else if (intialSettlerType === "I'm Feeling Lucky") {
            for (let index = 0; index < 10; index++) {
                const rand = Math.floor(Math.random() * 12);
                if(rand === 0) {new_settlement.rulers.population += 1}
                if(rand === 1) {new_settlement.archivists.population += 1}
                if(rand === 2) {new_settlement.engineers.population += 1}
                if(rand === 3) {new_settlement.rune_smiths.population += 1}
                if(rand === 4) {new_settlement.craftsmen.population += 1}
                if(rand === 5) {new_settlement.merchants.population += 1}
                if(rand === 6) {new_settlement.clerics.population += 1}
                if(rand === 7) {new_settlement.miners.population += 1}
                if(rand === 8) {new_settlement.farmers.population += 1}
                if(rand === 9) {new_settlement.warriors.population += 1}
                if(rand === 10) {new_settlement.foresters.population += 1}
                if(rand === 11) {new_settlement.criminals.population += 1}
            }
        }
        else if (intialSettlerType === 'Custom') {
            new_settlement.rulers.population = initialPops.rulers
            new_settlement.archivists.population = initialPops.archivists
            new_settlement.engineers.population = initialPops.engineers
            new_settlement.rune_smiths.population = initialPops.runeSmiths
            new_settlement.craftsmen.population = initialPops.craftsmen
            new_settlement.merchants.population = initialPops.merchants
            new_settlement.clerics.population = initialPops.clerics
            new_settlement.miners.population = initialPops.miners
            new_settlement.farmers.population = initialPops.farmers
            new_settlement.warriors.population = initialPops.warriors
            new_settlement.foresters.population = initialPops.foresters
            new_settlement.criminals.population = initialPops.criminals
        }
        updateGoodsProduction(new_settlement)
        new_settlement.projected_pop = 10
        new_settlement.visable_name = newSettlmentName
        store.set('settlements', [...settlements,new_settlement]);
        store.set('Federal Reserve',reserveGoods)
        store.save()
        getSettlements()
    }

    const setNewSettlmentOptions = () => {
        // Get a selection of 3 random terrains
        const terrain_count = Object.values(TerrainType).filter(value => typeof value === "number") as number[];
        const randVal = () => terrain_count[Math.floor(Math.random() * terrain_count.length)]
        const t1 = randVal() as TerrainType
        const t2 = randVal() as TerrainType
        setTerrainOptions([{name: TerrainData[TerrainType.Mountain].name,value: TerrainType.Mountain},{name: TerrainData[t1].name,value: t1},{name: TerrainData[t2].name,value: t2}])
        setNewSettlementVisable(true)

    }

    const giveGoods = (name:string) => {
        setWhoToGive(name)
        setGiveGoodsVisable(true)
    }

    const sendStimulus = async () => {
        setGiveGoodsVisable(false)
        setWhoToGive('')
        // Remove the Goods from the Federal Reserve
        setReserveGoods({
            money: reserveGoods.money - resourceDistribution.money,
            food: reserveGoods.food - resourceDistribution.food,
            beer: reserveGoods.beer - resourceDistribution.beer,
            leather: reserveGoods.leather - resourceDistribution.leather,
            artisinal: reserveGoods.artisinal - resourceDistribution.artisinal,
            livestock: reserveGoods.livestock - resourceDistribution.livestock,
            ornamental: reserveGoods.ornamental - resourceDistribution.ornamental,
            enchanted: reserveGoods.enchanted - resourceDistribution.enchanted,
            timber: reserveGoods.timber - resourceDistribution.timber,
            tools: reserveGoods.tools - resourceDistribution.tools,
            common_ores: reserveGoods.common_ores - resourceDistribution.common_ores,
            medical: reserveGoods.medical - resourceDistribution.medical,
            rare_ores: reserveGoods.rare_ores - resourceDistribution.rare_ores,
            gems: reserveGoods.gems - resourceDistribution.gems,
            runes: reserveGoods.runes - resourceDistribution.runes,
            arms: reserveGoods.arms - resourceDistribution.arms,
            books: reserveGoods.books - resourceDistribution.books,
            enchanted_arms: reserveGoods.enchanted_arms - resourceDistribution.enchanted_arms,
            charcoal: reserveGoods.charcoal - resourceDistribution.charcoal})
        // Give the Goods to the Settlement
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        settlements?.forEach(settlement => {
            if (settlement.name === whoToGive) {
                settlement.finance_points += resourceDistribution.money
                settlement.food_and_water.stock += resourceDistribution.food
                settlement.beer.stock += resourceDistribution.beer
                settlement.leather_and_textiles.stock += resourceDistribution.leather
                settlement.artisinal_goods.stock += resourceDistribution.artisinal
                settlement.livestock.stock += resourceDistribution.livestock
                settlement.ornamental_luxuries.stock += resourceDistribution.ornamental
                settlement.enchanted_luxuries.stock += resourceDistribution.enchanted
                settlement.timber.stock += resourceDistribution.timber
                settlement.tools.stock += resourceDistribution.tools
                settlement.common_ores.stock += resourceDistribution.common_ores
                settlement.medical_supplies.stock += resourceDistribution.medical
                settlement.rare_ores.stock += resourceDistribution.rare_ores
                settlement.gems.stock += resourceDistribution.gems
                settlement.runes.stock += resourceDistribution.runes
                settlement.armaments.stock += resourceDistribution.arms
                settlement.books.stock += resourceDistribution.books
                settlement.enchanted_armaments.stock += resourceDistribution.enchanted_arms
                settlement.enchanted_charcoal.stock += resourceDistribution.charcoal
            }})
        store.set('settlements',settlements)
        store.set('Federal Reserve',reserveGoods)
        store.save()

        setGiveGoodsVisable(false)
        setWhoToGive('')
        setResourceDistribution({...empty_goodsdist})
        getSettlements()
    }

    return (
        <div className="flex flex-column gap-2">
            <Button label="Next Turn" onClick={processNextTurn} size="small" icon="pi pi-angle-double-right"/>
            <Button severity="secondary" label='Foreign Powers' icon='pi pi-flag-fill' onClick={()=>{navigate(`foreignpowers`)}}/>
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
            {/* Show All Settlements */}
            <div className="flex flex-row flex-wrap gap-2">
                {settlements.map(settlement => {
                    return <Settlement 
                        key={settlement.name} 
                        settlement={settlement} 
                        navigateSettlement={navigateSettlement}
                        updateParent={getSettlements}
                        stimulus={giveGoods}
                    />
                })}
                {/* New Settlement Function */}
                {reserveGoods.money >= ((settlements.length ** 2) * 4500) ? 
                <Button icon="pi pi-plus" onClick={()=>{
                    setReserveGoods({...reserveGoods,money: reserveGoods.money - ((settlements.length ** 2) * 4500)})
                    setNewSettlmentOptions()
                }}>
                    <div className="flex flex-row gap-1">
                        New Settlement
                        <FaCoins/>
                        {(settlements.length ** 2) * 4500}
                    </div>
                </Button>: null}
                {/* New Settlment Form */}
                <Dialog 
                    header={'New Settlement'}
                    closable={false}
                    visible={newSettlementVisable} 
                    onHide={()=>{
                        setNewSettlementVisable(false)
                        setTerrainOptions([])
                        setSelectedTerrain(TerrainType.Mountain)
                        setNewSettlementName('')
                        setInitalSettlerType('')
                    }}>
                    <div className="flex flex-column gap-2">
                        Settlement Name
                        <InputText type="text" value={newSettlmentName} onChange={e => setNewSettlementName(e.target.value)}/>
                        Select Location
                        <SelectButton
                            value={selectedTerrain} 
                            onChange={(e) => setSelectedTerrain(e.value)} 
                            optionLabel="name" options={terrainOptions}/>
                        Initial Pops
                        <div className="flex gap-3 flex-row">
                            <div className="flex align-items-center">
                                <RadioButton inputId="poptype1" name="poptype" value="Default" onChange={e => setInitalSettlerType(e.value)} checked={intialSettlerType === 'Default'}/>
                                <label htmlFor="poptype1" className="ml-2">Default</label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="poptype2" name="poptype" value="I'm Feeling Lucky" onChange={e => setInitalSettlerType(e.value)} checked={intialSettlerType === "I'm Feeling Lucky"}/>
                                <label htmlFor="poptype2" className="ml-2">I'm Feeling Lucky</label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="poptype3" name="poptype" value="Custom" onChange={e => setInitalSettlerType(e.value)} checked={intialSettlerType === "Custom"}/>
                                <label htmlFor="poptype3" className="ml-2">Custom</label>
                            </div>
                        </div>
                        {intialSettlerType === 'Custom'? 
                        <div>
                            <PopDistribution max_pops={10} updateFunc={setIntialPops}/>
                        </div>:null}
                        Initial Resources
                        <div className="flex gap-3 flex-row">
                            <div className="flex align-items-center">
                                <RadioButton inputId="initresources1" name="initresources" value="Percentage" onChange={e => setResourceType(e.value)} checked={resourceType === 'Percentage'}/>
                                <label htmlFor="initresources1" className="ml-2">Federal Reserve Percentage</label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="initresources2" name="initresources" value="Discrete" onChange={e => setResourceType(e.value)} checked={resourceType === "Discrete"}/>
                                <label htmlFor="initresources2" className="ml-2">Discrete Count</label>
                            </div>
                        </div>
                        {resourceType === 'Percentage' ?
                        <>
                            <InputNumber value={percentageGive} onChange={e => setPercentageGive(e.value ?? 0)} min={0} max={100}/>
                            <Slider value={percentageGive} onChange={e => setPercentageGive(Array.isArray(e.value) ? e.value[0] : e.value)}/>
                        </>: null}
                        {resourceType === 'Discrete' ? <ResourceDistribuition goods_cap={reserveGoods} updateFunc={setResourceDistribution}/>:null}
                        {(newSettlmentName !== '') && (intialSettlerType !== '') && (resourceType !== '')?
                        <Button label="Settle Location" onClick={() => {
                            createNewSettlement()
                            setNewSettlementVisable(false)
                            setTerrainOptions([])
                            setSelectedTerrain(TerrainType.Mountain)
                            setNewSettlementName('')
                            setInitalSettlerType('')
                            setIntialPops({...default_popdist})
                            setResourceType('')
                            setPercentageGive(0)
                            setResourceDistribution({money: 0,
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
                                charcoal: 0})
                        }}/> : null}
                    </div>
                </Dialog>
                {/* Give Goods Dialog */}
                <Dialog header={`Stimulus`} visible={giveGoodsVisable} onHide={() => {
                    setGiveGoodsVisable(false)
                    setWhoToGive('')
                    setResourceDistribution({...empty_goodsdist})
                    }}>
                    <div className="flex flex-column gap-2">
                        <ResourceDistribuition goods_cap={reserveGoods} updateFunc={setResourceDistribution}/>
                        <Button label="Send Care Package" icon='pi pi-send' onClick={sendStimulus}/>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default Game;