import { useNavigate, useParams } from "react-router"
import { saveLocation } from "../../utilities/SaveData";
import { load } from "@tauri-apps/plugin-store";
import { emptySettlement, SettlementInterface, SettlementTier, tierModifier } from "../SettlementInterface";
import { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import ClanInfo from "./ClanInfo";
import { BiSolidCrown } from "react-icons/bi";
import { FaArchive, FaCoins, FaGem, FaHammer, FaHeart  } from "react-icons/fa";
import { MdEngineering, MdChurch } from "react-icons/md";
import { GiBlacksmith, GiFarmer, GiAxeInStump, GiBeerStein, GiWoodPile, GiThrownCharcoal, GiCoalWagon, GiGems, GiClothes, GiSlaveryWhip } from "react-icons/gi";
import { TbMoneybag, TbPick } from "react-icons/tb";
import { RiCriminalFill } from "react-icons/ri";
import ShowAllGoods from "./ShowAllGoods";
import { LuSword } from "react-icons/lu";
import { Button } from "primereact/button";
import { IoFastFood } from "react-icons/io5";
import { PiCowFill } from "react-icons/pi";
import PlusMinus from "../../components/PlusMinus";
import { TerrainData } from "../TerrainInterface";
import BureaucraticFocus from "./BureaucraticFocus";
import { clans } from "../../Goods/good";
import { FaGear } from "react-icons/fa6";
import { BsBuildingFillUp } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

interface allowProp {
    id: clans,
    name: string
}

export default function SettlementDetailed() {
    const gameId = useParams().game
    let navigate = useNavigate();
    const settlementId = useParams().settlement
    const [settlement, setSettlement] = useState<SettlementInterface>(emptySettlement);

    const [food,setFood] = useState(settlement.food_and_water.production_cap)
    const [beer,setBeer] = useState(settlement.beer.production_cap)
    const [leather,setLeather] = useState(settlement.leather_and_textiles.production_cap)
    const [livestock, setLivestock] = useState(settlement.livestock.production_cap)
    const [timber, setTimber] = useState(settlement.timber.production_cap)
    const [charcoal, setCharcoal] = useState(settlement.enchanted_charcoal.production_cap)
    const [commonOres, setCommonOres] = useState(settlement.common_ores.production_cap)
    const [gems, setGems] = useState(settlement.gems.production_cap)
    const [rareOres, setRareOres] = useState(settlement.rare_ores.production_cap)

    const [allowListTypeA,setAllowListTypeA] = useState<allowProp[]>([])
    const [allowListTypeB,setAllowListTypeB] = useState<allowProp[]>([])
    const [allowListTypeC,setAllowListTypeC] = useState<allowProp[]>([])

    const [efficencyBonus,setEfficencyBonus] = useState<allowProp>({id: clans.none, name: 'None'})
    const [loyaltyBonus, setLoyaltyBonus] = useState<allowProp>({id: clans.none, name: 'None'})
    const [corveeBonus,setCorveeBonus] = useState<allowProp>({id: clans.none, name: 'None'})
    const [developmentGrowthBonus, setDevelopmentGrowthBonus] = useState<allowProp>({id: clans.none, name: 'None'})
    const [popGrowthBonus, setPopGrowthBonus] = useState<allowProp>({id: clans.none, name: 'None'})

    const [renameSettlementDialog,setRenameSettlmentDialog] = useState<boolean>(false);
    const [settlmentName, setSettlementName] = useState<string>('');


    const getSettlementData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        const current_settlement = settlements?.find(settlement => settlement.name === settlementId)
        if(current_settlement) {
            setSettlement(current_settlement)
        }
        setAllowListTypeA([{id: clans.none,name:'None'}])
        setAllowListTypeB([{id: clans.none,name:'None'}])
        setAllowListTypeC([{id: clans.none,name:'None'}])
        if(settlement.rune_smiths.population > 0) {
            setAllowListTypeA((previtems) => [...previtems,{id: clans.runeSmiths,name:'Rune Smiths'}])
            setAllowListTypeC((previtems) => [...previtems,{id: clans.runeSmiths,name:'Rune Smiths'}])
        }
        if(settlement.craftsmen.population > 0){
            setAllowListTypeA((previtems) => [...previtems,{id: clans.craftsmen,name:'Craftsmen'}])
            setAllowListTypeC((previtems) => [...previtems,{id: clans.craftsmen,name:'Craftsmen'}])
        }
        if(settlement.merchants.population > 0) {
            setAllowListTypeA((previtems) => [...previtems,{id: clans.merchants,name:'Merchants'}])
        }
        if (settlement.miners.population > 0) {
            setAllowListTypeA((previtems) => [...previtems,{id: clans.miners,name:'Miners'}])
            setAllowListTypeB((previtems) => [...previtems,{id: clans.miners,name:'Miners'}])
            setAllowListTypeC((previtems) => [...previtems,{id: clans.miners,name:'Miners'}])
        }
        if (settlement.farmers.population > 0) {
            setAllowListTypeA((previtems) => [...previtems,{id: clans.farmers,name:'Farmers'}])
            setAllowListTypeB((previtems) => [...previtems,{id: clans.farmers,name:'Farmers'}])
            setAllowListTypeC((previtems) => [...previtems,{id: clans.farmers,name:'Farmers'}])
        }
        if (settlement.warriors.population > 0) {
            setAllowListTypeA((previtems) => [...previtems,{id: clans.warriors,name:'Warriors'}])
            setAllowListTypeB((previtems) => [...previtems,{id: clans.warriors,name:'Warriors'}])
            setAllowListTypeC((previtems) => [...previtems,{id: clans.warriors,name:'Warriors'}])
        }
        if (settlement.foresters.population > 0) {
            setAllowListTypeA((previtems) => [...previtems,{id: clans.foresters,name:'Foresters'}])
            setAllowListTypeB((previtems) => [...previtems,{id: clans.foresters,name:'Foresters'}])
            setAllowListTypeC((previtems) => [...previtems,{id: clans.foresters,name:'Foresters'}])
        }
        if (settlement.criminals.population > 0) {
            setAllowListTypeA((previtems) => [...previtems,{id: clans.criminals,name:'Criminals'}])
            setAllowListTypeB((previtems) => [...previtems,{id: clans.criminals,name:'Criminals'}])
            setAllowListTypeC((previtems) => [...previtems,{id: clans.criminals,name:'Criminals'}])
        }
        if(settlement.efficency_bonus === settlement.rune_smiths.id) {setEfficencyBonus({id: clans.runeSmiths,name: 'Rune Smiths'})}
        else if(settlement.efficency_bonus === settlement.craftsmen.id) {setEfficencyBonus({id: clans.craftsmen,name: 'Craftsmen'})}
        else if(settlement.efficency_bonus === settlement.merchants.id) {setEfficencyBonus({id: clans.merchants,name: 'Merchants'})}
        else if(settlement.efficency_bonus === settlement.miners.id) {setEfficencyBonus({id: clans.miners,name: 'Miners'})}
        else if(settlement.efficency_bonus === settlement.farmers.id) {setEfficencyBonus({id: clans.farmers,name: 'Farmers'})}
        else if(settlement.efficency_bonus === settlement.warriors.id) {setEfficencyBonus({id: clans.warriors,name: 'Warriors'})}
        else if(settlement.efficency_bonus === settlement.foresters.id) {setEfficencyBonus({id: clans.foresters,name: 'Foresters'})}
        else if(settlement.efficency_bonus === settlement.criminals.id) {setEfficencyBonus({id: clans.criminals,name: 'Criminals'})}
        else {setEfficencyBonus({id: clans.none,name: 'None'})}

        if(settlement.loyalty_bonus === settlement.rune_smiths.id) {setLoyaltyBonus({id: clans.runeSmiths,name: 'Rune Smiths'})}
        else if(settlement.loyalty_bonus === settlement.craftsmen.id) {setLoyaltyBonus({id: clans.craftsmen,name: 'Craftsmen'})}
        else if(settlement.loyalty_bonus === settlement.merchants.id) {setLoyaltyBonus({id: clans.merchants,name: 'Merchants'})}
        else if(settlement.loyalty_bonus === settlement.miners.id) {setLoyaltyBonus({id: clans.miners,name: 'Miners'})}
        else if(settlement.loyalty_bonus === settlement.farmers.id) {setLoyaltyBonus({id: clans.farmers,name: 'Farmers'})}
        else if(settlement.loyalty_bonus === settlement.warriors.id) {setLoyaltyBonus({id: clans.warriors,name: 'Warriors'})}
        else if(settlement.loyalty_bonus === settlement.foresters.id) {setLoyaltyBonus({id: clans.foresters,name: 'Foresters'})}
        else if(settlement.loyalty_bonus === settlement.criminals.id) {setLoyaltyBonus({id: clans.criminals,name: 'Criminals'})}
        else {setLoyaltyBonus({id: clans.none,name: 'None'})}

        if(settlement.corvee_bonus === settlement.miners.id) {setCorveeBonus({id: clans.miners,name: 'Miners'})}
        else if(settlement.corvee_bonus === settlement.farmers.id) {setCorveeBonus({id: clans.farmers,name: 'Farmers'})}
        else if(settlement.corvee_bonus === settlement.warriors.id) {setCorveeBonus({id: clans.warriors,name: 'Warriors'})}
        else if(settlement.corvee_bonus === settlement.foresters.id) {setCorveeBonus({id: clans.foresters,name: 'Foresters'})}
        else if(settlement.corvee_bonus === settlement.criminals.id) {setCorveeBonus({id: clans.criminals,name: 'Criminals'})}
        else {setCorveeBonus({id: clans.none,name: 'None'})}

        if(settlement.development_growth_bonus === settlement.rune_smiths.id) {setDevelopmentGrowthBonus({id: clans.runeSmiths,name: 'Rune Smiths'})}
        else if(settlement.development_growth_bonus === settlement.craftsmen.id) {setDevelopmentGrowthBonus({id: clans.craftsmen,name: 'Craftsmen'})}
        else if(settlement.development_growth_bonus === settlement.miners.id) {setDevelopmentGrowthBonus({id: clans.miners,name: 'Miners'})}
        else if(settlement.development_growth_bonus === settlement.farmers.id) {setDevelopmentGrowthBonus({id: clans.farmers,name: 'Farmers'})}
        else if(settlement.development_growth_bonus === settlement.warriors.id) {setDevelopmentGrowthBonus({id: clans.warriors,name: 'Warriors'})}
        else if(settlement.development_growth_bonus === settlement.foresters.id) {setDevelopmentGrowthBonus({id: clans.foresters,name: 'Foresters'})}
        else if(settlement.development_growth_bonus === settlement.criminals.id) {setDevelopmentGrowthBonus({id: clans.criminals,name: 'Criminals'})}
        else {setDevelopmentGrowthBonus({id: clans.none,name: 'None'})}

        if(settlement.population_growth_bonus === settlement.rune_smiths.id) {setPopGrowthBonus({id: clans.runeSmiths,name: 'Rune Smiths'})}
        else if(settlement.population_growth_bonus === settlement.craftsmen.id) {setPopGrowthBonus({id: clans.craftsmen,name: 'Craftsmen'})}
        else if(settlement.population_growth_bonus === settlement.miners.id) {setPopGrowthBonus({id: clans.miners,name: 'Miners'})}
        else if(settlement.population_growth_bonus === settlement.farmers.id) {setPopGrowthBonus({id: clans.farmers,name: 'Farmers'})}
        else if(settlement.population_growth_bonus === settlement.warriors.id) {setPopGrowthBonus({id: clans.warriors,name: 'Warriors'})}
        else if(settlement.population_growth_bonus === settlement.foresters.id) {setPopGrowthBonus({id: clans.foresters,name: 'Foresters'})}
        else if(settlement.population_growth_bonus === settlement.criminals.id) {setPopGrowthBonus({id: clans.criminals,name: 'Criminals'})}
        else {setPopGrowthBonus({id: clans.none,name: 'None'})}
    }

    const goBack = () => {navigate(`/game/${gameId}`)}

    useEffect(() => {
        getSettlementData()

    },[])

    useEffect(() => {
        setFood(
            settlement.food_and_water.production_cap - 
            (settlement.farmers.food_and_water.produced + settlement.foresters.food_and_water.produced)
        )
        setBeer(settlement.beer.production_cap - settlement.farmers.beer.produced)
        setLeather(settlement.leather_and_textiles.production_cap - settlement.farmers.leather_and_textiles.produced)
        setLivestock(settlement.livestock.production_cap - settlement.farmers.livestock.produced)
        setTimber(settlement.timber.production_cap - settlement.foresters.timber.produced)
        setCharcoal(settlement.enchanted_charcoal.production_cap - settlement.foresters.enchanted_charcoal.produced)
        setCommonOres(settlement.common_ores.production_cap - settlement.miners.common_ores.produced)
        setGems(settlement.gems.production_cap - settlement.miners.gems.produced)
        setRareOres(settlement.rare_ores.production_cap - settlement.miners.rare_ores.produced)
        getSettlementData()
    },[settlement])

    // Upgrade Settlment to Next Tier
    const upgradeSettlement = async () => {
        const cost = (settlement.tier ** 2) * 4000
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        settlements?.forEach(s => {
            if (s.name === settlementId) {
                s.finance_points -= cost
                s.tier += 1
                s.pop_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].reference_pop_cap)
                s.food_and_water.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].food_and_water_balancing)
                s.beer.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].beer_balancing)
                s.leather_and_textiles.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].leather_and_textiles_balancing)
                s.livestock.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].livestock_balancing)
                s.timber.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].timber_balancing)
                s.enchanted_charcoal.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].enchanted_charcoal_balancing)
                s.common_ores.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].common_ores_balancing)
                s.gems.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].gems_balancing)
                s.rare_ores.production_cap = Math.round(tierModifier(s.tier) * TerrainData[s.terrain_type].rare_ores_balancing)
            }
        })
        store.set('settlements',settlements)
        store.save()
        getSettlementData()
    }

    // Renames the Settlement
    const renameSettlment = async (new_name: string) => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        settlements?.forEach(s => {if (s.name === settlementId) {s.visable_name = new_name}})
        store.set('settlements',settlements)
        store.save()
        getSettlementData()
    }


    return(
        <div className="flex flex-column gap-2">
                <Button label={'Back to All Settlements'} icon="pi pi-arrow-left" size='small' onClick={goBack}/>
                {/* Settlement Name */}
                <div className="flex flex-row gap-2">
                    <h1>{settlement.visable_name}</h1>
                    <Button size="small" icon="pi pi-pencil" rounded text onClick={()=>setRenameSettlmentDialog(true)}/>
                    <Dialog 
                    header="Rename Settlement"
                    visible={renameSettlementDialog}
                    closable={false}
                    onHide={()=>{
                        setRenameSettlmentDialog(false)
                        setSettlementName('')
                    }}
                    >  
                        <div className="p-inputgroup flex-1">
                            <InputText value={settlmentName} onChange={e => setSettlementName(e.target.value)}/>
                            <Button className="p-button-success" icon="pi pi-check" onClick={() => {
                                renameSettlment(settlmentName)
                                setRenameSettlmentDialog(false)
                            }}/>
                        </div>
                    </Dialog>
                </div>
                {/* Upgrade Settlement Button */}
                {(settlement.tier < SettlementTier.Metropolis) && (settlement.finance_points >= ((settlement.tier ** 2) * 4000))?
                <Button severity="success" icon="pi pi-angle-double-up" onClick={upgradeSettlement}>
                    <div className="flex flex-row gap-2">
                    Upgrade Settlement
                    <FaCoins/>
                    {(settlement.tier ** 2) * 4000}
                    </div>
                </Button>: null}

                <div className="flex flex-row gap-2">

                    <Panel header={'Finances'} toggleable>
                        <div className="flex flex-row gap-1">
                            <FaCoins/>
                            {settlement.finance_points}
                            <PlusMinus value={
                                Math.round(((settlement.rulers.tax_rate * settlement.rulers.taxed_productivity) +
                                (settlement.archivists.tax_rate * settlement.archivists.taxed_productivity) +
                                (settlement.engineers.tax_rate * settlement.engineers.taxed_productivity) +
                                (settlement.rune_smiths.tax_rate * settlement.rune_smiths.taxed_productivity) +
                                (settlement.craftsmen.tax_rate * settlement.craftsmen.taxed_productivity) +
                                (settlement.merchants.tax_rate * settlement.merchants.taxed_productivity) +
                                (settlement.clerics.tax_rate * settlement.clerics.taxed_productivity) +
                                (settlement.miners.tax_rate * settlement.miners.taxed_productivity) +
                                (settlement.farmers.tax_rate * settlement.farmers.taxed_productivity) +
                                (settlement.warriors.tax_rate * settlement.warriors.taxed_productivity) +
                                (settlement.foresters.tax_rate * settlement.foresters.taxed_productivity)) * (1-settlement.settlment_tax))
                            }/>
                        </div>
                    </Panel>

                    <Panel header={'Current resources'} toggleable>
                        <ShowAllGoods settlement={settlement}/>
                    </Panel>

                    <Panel header={'Available Natural Resources'} toggleable>
                        <div className="flex flex-row flex-wrap gap-2">
                            <div className="flex flex-row gap-1">
                                <IoFastFood />
                                {food}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiBeerStein />
                                {beer}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiClothes />
                                {leather}
                            </div>
                            <div className="flex flex-row gap-1">
                                <PiCowFill />
                                {livestock}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiWoodPile />
                                {timber}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiThrownCharcoal />
                                {charcoal}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiCoalWagon />
                                {commonOres}
                            </div>
                            <div className="flex flex-row gap-1">
                                <GiGems />
                                {gems}
                            </div>
                            <div className="flex flex-row gap-1">
                                <FaGem />
                                {rareOres}
                            </div>
                        </div>
                    </Panel>

                </div>
                {/*  Bureaucacy Bonus Panel */}
                <Panel header={'Bureaucracy Bonus'} toggleable>
                    <div className="flex flex-row flex-wrap gap-3">
                        {settlement.rulers.population > 0 ? <BureaucraticFocus 
                            type={'Efficiency'}
                            allowlist={allowListTypeA}
                            icon={<FaGear/>}
                            currentSelection={efficencyBonus}
                            updateFunction={getSettlementData}
                        />: null}
                        {settlement.archivists.population > 0 ? <BureaucraticFocus 
                            type={'Loyalty'}
                            allowlist={allowListTypeA}
                            icon={<FaHeart/>}
                            currentSelection={loyaltyBonus}
                            updateFunction={getSettlementData}
                        />: null}
                        {settlement.engineers.population > 0 ? <BureaucraticFocus 
                            type={'Corvee Labor'}
                            allowlist={allowListTypeB}
                            icon={<GiSlaveryWhip />}
                            currentSelection={corveeBonus}
                            updateFunction={getSettlementData}
                        />: null}
                        {settlement.merchants.population > 0 ? <BureaucraticFocus 
                            type={'Development Growth'}
                            allowlist={allowListTypeC}
                            icon={<BsBuildingFillUp />}
                            currentSelection={developmentGrowthBonus}
                            updateFunction={getSettlementData}
                        />: null}
                        {settlement.clerics.population > 0 ? <BureaucraticFocus 
                            type={'Population Growth'}
                            allowlist={allowListTypeC}
                            currentSelection={popGrowthBonus}
                            icon={<IoIosPeople/>}
                            updateFunction={getSettlementData}
                        />: null}
                    </div>
                </Panel>


                <Panel header={'Clans'} toggleable>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {settlement.rulers.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.rulers}
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<BiSolidCrown/>}/> : null}
                        {settlement.archivists.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.archivists} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<FaArchive/>}/> : null}
                        {settlement.engineers.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.engineers}
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<MdEngineering/>}/> : null}
                        {settlement.rune_smiths.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.rune_smiths}
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<GiBlacksmith/>}/> : null}
                        {settlement.craftsmen.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.craftsmen} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<FaHammer/>}/> : null}
                        {settlement.merchants.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.merchants} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<TbMoneybag/>}/> : null}
                        {settlement.clerics.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.clerics} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<MdChurch/>}/> : null}
                        {settlement.miners.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.miners} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<TbPick/>}/> : null}
                        {settlement.farmers.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.farmers} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<GiFarmer/>}/> : null}
                        {settlement.warriors.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.warriors} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<LuSword/>}/> : null}
                        {settlement.foresters.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.foresters} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<GiAxeInStump/>}/> : null}
                        {settlement.criminals.population > 0 ? 
                            <ClanInfo 
                                clan={settlement.criminals} 
                                resources={[food,beer,leather,livestock,timber,charcoal,commonOres,gems,rareOres]}
                                updateParent={getSettlementData}
                                icon={<RiCriminalFill/>}/> : null}
                    </div>
                </Panel>
        </div>
        
    )
}
