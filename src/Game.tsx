import { useEffect, useState } from "react";
import { newSettlement, SettlementInterface, SettlementTier } from "./Settlement/SettlementInterface";
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
import { goodsdist, empty_goodsdist } from "./components/ResourceDistribution";
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
    const [selectedTerrain, setSelectedTerrain] = useState(null)
    const [newSettlmentName, setNewSettlementName] = useState<string>('');
    const [intialSettlerType,setInitalSettlerType] = useState<string>('');
    const [initialPops,setIntialPops] = useState<popdist>(default_popdist);
    const [resourceType,setResourceType] = useState<string>('');
    const [percentageGive, setPercentageGive] = useState<number>(0);

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

    const createNewSettlement = () => {
        const values = Object.values(TerrainType).filter(value => typeof value === "number") as number[];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        const new_settlement = newSettlement(`settlement${settlements.length+1}`,randomValue as TerrainType)
    }

    const setNewSettlmentOptions = () => {
        // Get a selection of 3 random terrains
        const terrain_count = Object.values(TerrainType).filter(value => typeof value === "number") as number[];
        const randVal = () => terrain_count[Math.floor(Math.random() * terrain_count.length)]
        const t1 = randVal() as TerrainType
        const t2 = randVal() as TerrainType
        const t3 = randVal() as TerrainType
        setTerrainOptions([{name: TerrainData[t1].name,value: t1},{name: TerrainData[t2].name,value: t2},{name: TerrainData[t3].name,value: t3}])
        setNewSettlementVisable(true)

    }

    return (
        <div className="flex flex-column gap-2">
            <Button label="Next Turn" onClick={processNextTurn} size="small" icon="pi pi-angle-double-right"/>
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
                    />
                })}
                {/* New Settlement Function */}
                <Button icon="pi pi-plus" onClick={()=>{
                    setNewSettlmentOptions()
                }}>
                    <div className="flex flex-row gap-1">
                        New Settlement
                        <FaCoins/>
                        {(settlements.length ** 2) * 4500}
                    </div>
                </Button>
                <Dialog 
                    header={'New Settlement'}
                    visible={newSettlementVisable} 
                    closable
                    onHide={()=>{
                        setNewSettlementVisable(false)
                        setTerrainOptions([])
                        setSelectedTerrain(null)
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
                        
                        <Button label="Settle Location" />
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default Game;