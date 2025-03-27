import { useEffect, useState } from "react";
import { TerrainData, TerrainType } from "./SettlementInterface/TerrainInterface";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PopDistribution, { default_popdist, empty_popdist, popdist } from "../components/Popdistribution";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import ResourceDistribuition from "../components/ResourceDistribution";
import { empty_goodsdist, goodsdist, roundGoods, scaleGoods } from "../Goods/GoodsDist";
import { newSettlement, SettlementInterface } from "./SettlementInterface/SettlementInterface";
import { clanTypes } from "../Clans/ClanInterface/ClanInterface";

interface selectButtonTerrainInterface {
    name: string;
    value: TerrainType;
}

export default function NewSettlement({max_resources,updateFunc}: {max_resources: goodsdist,updateFunc: (s: SettlementInterface) => void}) {
    const [terrainOptions, setTerrainOptions] = useState<selectButtonTerrainInterface[]>([])
    const [name,setName] = useState<string>('')
    const [terrain,setTerrain] = useState<TerrainType>(TerrainType.Mountain)
    const [settlerType, setSettlerType] = useState<string>('')
    const [popSelectVisible,setPopSelectVisible] = useState<boolean>(false)
    const [pops, setPopDist] = useState<popdist>({...empty_popdist})
    const [resourceType,setResourceType] = useState<string>('')
    const [percentageGive,setPercentageGive] = useState<number>(0)
    const [resourceSelectVisible,setResourceSelectVisable] = useState<boolean>(false)
    const [resources,setResources] = useState<goodsdist>({...empty_goodsdist})

    useEffect(() => {
        const terrain_count = Object.values(TerrainType).filter(value => typeof value === 'number') as number[]
        const randVal = () => terrain_count[Math.floor(Math.random() * terrain_count.length)]
        const t1 = randVal() as TerrainType
        const t2 = randVal() as TerrainType
        setTerrainOptions([
            {name: TerrainData[TerrainType.Mountain].name, value: TerrainType.Mountain},
            {name: TerrainData[t1].name, value: t1},
            {name: TerrainData[t2].name, value: t2}
        ])
    },[])

    const setStartingPops = (p: popdist) => {
        setPopSelectVisible(false)
        setPopDist({...p})
    }

    const updateGoods = (g : goodsdist) => {
        setResourceSelectVisable(false)
        setResources({...g})
    }

    const generateSettlement = () => {
        let s = newSettlement(name,terrain,name)
        // I have no idea why this is happening but yo need to do it like this otherwise nothing happens
        if(settlerType === 'Default') {
            s.clans.forEach(clan => {
                if (clan.id === clanTypes.rulers) {clan.population = default_popdist.rulers}
                else if (clan.id === clanTypes.archivists) {clan.population = default_popdist.archivists}
                else if (clan.id === clanTypes.engineers) {clan.population = default_popdist.engineers}
                else if (clan.id === clanTypes.runeSmiths) {clan.population = default_popdist.runeSmiths}
                else if (clan.id === clanTypes.craftsmen) {clan.population = default_popdist.craftsmen}
                else if (clan.id === clanTypes.merchants) {clan.population = default_popdist.merchants}
                else if (clan.id === clanTypes.clerics) {clan.population = default_popdist.clerics}
                else if (clan.id === clanTypes.miners) {clan.population = default_popdist.miners}
                else if (clan.id === clanTypes.farmers) {clan.population = default_popdist.farmers}
                else if (clan.id === clanTypes.warriors) {clan.population = default_popdist.warriors}
                else if (clan.id === clanTypes.foresters) {clan.population = default_popdist.foresters}
                else if (clan.id === clanTypes.criminals) {clan.population = default_popdist.criminals}
            })
        }
        else if (settlerType === "I'm Feeling Lucky") {
            const randPops = {...empty_popdist}
            for (let index = 0; index < 10; index++) {
                const rand = Math.floor(Math.random() * 12);
                if(rand === 0) {randPops.rulers += 1}
                if(rand === 1) {randPops.archivists += 1}
                if(rand === 2) {randPops.engineers += 1}
                if(rand === 3) {randPops.runeSmiths += 1}
                if(rand === 4) {randPops.craftsmen += 1}
                if(rand === 5) {randPops.merchants += 1}
                if(rand === 6) {randPops.clerics += 1}
                if(rand === 7) {randPops.miners += 1}
                if(rand === 8) {randPops.farmers += 1}
                if(rand === 9) {randPops.warriors += 1}
                if(rand === 10) {randPops.foresters += 1}
                if(rand === 11) {randPops.criminals += 1}
            }
            s.clans.forEach(clan => {
                if (clan.id === clanTypes.rulers) {clan.population = randPops.rulers}
                else if (clan.id === clanTypes.archivists) {clan.population = randPops.archivists}
                else if (clan.id === clanTypes.engineers) {clan.population = randPops.engineers}
                else if (clan.id === clanTypes.runeSmiths) {clan.population = randPops.runeSmiths}
                else if (clan.id === clanTypes.craftsmen) {clan.population = randPops.craftsmen}
                else if (clan.id === clanTypes.merchants) {clan.population = randPops.merchants}
                else if (clan.id === clanTypes.clerics) {clan.population = randPops.clerics}
                else if (clan.id === clanTypes.miners) {clan.population = randPops.miners}
                else if (clan.id === clanTypes.farmers) {clan.population = randPops.farmers}
                else if (clan.id === clanTypes.warriors) {clan.population = randPops.warriors}
                else if (clan.id === clanTypes.foresters) {clan.population = randPops.foresters}
                else if (clan.id === clanTypes.criminals) {clan.population = randPops.criminals}
            })
        }
        else {
            s.clans.forEach(clan => {
                if (clan.id === clanTypes.rulers) {clan.population = pops.rulers}
                else if (clan.id === clanTypes.archivists) {clan.population = pops.archivists}
                else if (clan.id === clanTypes.engineers) {clan.population = pops.engineers}
                else if (clan.id === clanTypes.runeSmiths) {clan.population = pops.runeSmiths}
                else if (clan.id === clanTypes.craftsmen) {clan.population = pops.craftsmen}
                else if (clan.id === clanTypes.merchants) {clan.population = pops.merchants}
                else if (clan.id === clanTypes.clerics) {clan.population = pops.clerics}
                else if (clan.id === clanTypes.miners) {clan.population = pops.miners}
                else if (clan.id === clanTypes.farmers) {clan.population = pops.farmers}
                else if (clan.id === clanTypes.warriors) {clan.population = pops.warriors}
                else if (clan.id === clanTypes.foresters) {clan.population = pops.foresters}
                else if (clan.id === clanTypes.criminals) {clan.population = pops.criminals}
            })
        }
        if(resourceType === 'Percentage') {s.stock = roundGoods(scaleGoods(max_resources,percentageGive/100))}
        else if (resourceType === 'Discrete') {s.stock = {...resources}}
        s.projected_pop = 10
        updateFunc(s)
    }

    return(
        <div className="flex flex-column gap-2">
            Settlement Name
            <InputText type="text" value={name} onChange={e => setName(e.target.value)}/>

            Select Location
            <SelectButton
                value={terrain}
                onChange={e => setTerrain(e.value)}
                optionLabel='name'
                options={terrainOptions}
            />

            Initial Pops
            <div className="flex flex-row gap-3">
                <div className="flex align-items-center">
                    <RadioButton 
                        inputId="poptype1" 
                        name="poptype" 
                        value="Default" 
                        onChange={e => setSettlerType(e.value)} 
                        checked={settlerType === 'Default'}/>
                    <label htmlFor="poptype1" className="ml-2">Default</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton 
                        inputId="poptype2" 
                        name="poptype" 
                        value="I'm Feeling Lucky" 
                        onChange={e => setSettlerType(e.value)} 
                        checked={settlerType === "I'm Feeling Lucky"}/>
                    <label htmlFor="poptype1" className="ml-2">I'm Feeling Lucky</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton 
                        inputId="poptype3" 
                        name="poptype" 
                        value="Custom" 
                        onChange={e => setSettlerType(e.value)} 
                        checked={settlerType === "Custom"}/>
                    <label htmlFor="poptype1" className="ml-2">Custom</label>
                </div>
            </div>
            {settlerType === 'Custom' ? <Button label="Set Starting Pops" onClick={() => setPopSelectVisible(true)}/>: null}
            <Dialog header="Starting Pops" visible={popSelectVisible} onHide={() => setPopSelectVisible(false)} closable={false}>
                <PopDistribution max_pops={10} updateFunc={setStartingPops} existingPops={pops}/>
            </Dialog>

            Inital Resources
            <div className="flex gap-3 flex-row">
                <div className="flex align-items-center">
                    <RadioButton 
                        inputId="initresources1" 
                        name='initresources' 
                        value='Percentage' 
                        onChange={e => setResourceType(e.value)} 
                        checked={resourceType === 'Percentage'}/>
                    <label htmlFor="initresources1" className="ml-2">Federal Reserve Percentage</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton 
                        inputId="initresources2" 
                        name='initresources' 
                        value='Discrete' 
                        onChange={e => setResourceType(e.value)} 
                        checked={resourceType === 'Discrete'}/>
                    <label htmlFor="initresources1" className="ml-2">Discrete Count</label>
                </div>
            </div>
            {resourceType === 'Percentage' ? 
                <>
                    <InputNumber value={percentageGive} onChange={e=> setPercentageGive(e.value ?? 0)} min={0} max={100}/>
                    <Slider value={percentageGive} onChange={e => setPercentageGive(e.value as number)}/>
                </>: null}
            {resourceType === 'Discrete' ? <Button label="Set Resouces" onClick={() => setResourceSelectVisable(true)}/>:null}
            <Dialog visible={resourceSelectVisible} onHide={() => setResourceSelectVisable(false)} closable={false}>
                <ResourceDistribuition goods_cap={max_resources} updateFunc={updateGoods} existing_dist={resources}/>
            </Dialog>
            {(name !== '') && (settlerType !== '') && (resourceType !== '') ? 
            <Button label="Settle Location" onClick={generateSettlement}/>:null}
        </div>
    )
}