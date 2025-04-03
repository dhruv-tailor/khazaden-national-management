import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react"
import RulersIconTT from "../tooltips/clans/RulersIconTT";
import ArchivistsIconTT from "../tooltips/clans/ArchivistsIconTT";
import EngineersIconTT from "../tooltips/clans/EngineersIconTT";
import RuneSmithsIconTT from "../tooltips/clans/RuneSmithsIconTT";
import CraftsmenIconTT from "../tooltips/clans/CraftsmenIconTT";
import MerchantsIconTT from "../tooltips/clans/MerchantsIconTT";
import ClericsIconTT from "../tooltips/clans/ClericsIconTT";
import MinersIconTT from "../tooltips/clans/MinersIconTT";
import FarmersIconTT from "../tooltips/clans/FarmersIconTT";
import WarriorsIconTT from "../tooltips/clans/WarriorsIconTT";
import ForestersIconTT from "../tooltips/clans/ForestersIconTT";
import CriminalsIconTT from "../tooltips/clans/CriminalsIconTT";

export interface popdist {
    rulers: number;
    archivists: number;
    engineers: number;
    runeSmiths: number;
    craftsmen: number;
    merchants: number;
    clerics: number;
    miners: number;
    farmers: number;
    warriors: number;
    foresters: number;
    criminals: number;
}

export const default_popdist: popdist = {
    rulers: 0,
    archivists: 0,
    engineers: 0,
    runeSmiths: 0,
    craftsmen: 1,
    merchants: 1,
    clerics: 0,
    miners: 2,
    farmers: 6,
    warriors: 0,
    foresters: 0,
    criminals: 0
}

export const empty_popdist: popdist = {
    rulers: 0,
    archivists: 0,
    engineers: 0,
    runeSmiths: 0,
    craftsmen: 0,
    merchants: 0,
    clerics: 0,
    miners: 0,
    farmers: 0,
    warriors: 0,
    foresters: 0,
    criminals: 0
}

export default function PopDistribution({max_pops,updateFunc,existingPops} : {max_pops: number,updateFunc: (p: popdist) => void,existingPops: popdist}) {

    const [remaining,setRemaining] = useState<number>(max_pops);
    const [rulers,setRulers] = useState<number>(0);
    const [archivists,setArchivists] = useState<number>(0);
    const [engineers,setEngineers] = useState<number>(0);
    const [runeSmiths,setRuneSmiths] = useState<number>(0);
    const [craftsmen,setCraftsmen] = useState<number>(0);
    const [merchants,setMerchants] = useState<number>(0);
    const [clerics,setClerics] = useState<number>(0);
    const [miners,setMiners] = useState<number>(0);
    const [farmers,setFarmers] = useState<number>(0);
    const [warriors, setWarriors] = useState<number>(0);
    const [foresters,setForesters] = useState<number>(0);
    const [criminals,setCriminals] = useState<number>(0);

    useEffect(() => {
        setRulers(existingPops.rulers)
        setArchivists(existingPops.archivists)
        setEngineers(existingPops.engineers)
        setRuneSmiths(existingPops.runeSmiths)
        setCraftsmen(existingPops.craftsmen)
        setMerchants(existingPops.merchants)
        setClerics(existingPops.clerics)
        setMiners(existingPops.miners)
        setFarmers(existingPops.farmers)
        setWarriors(existingPops.warriors)
        setForesters(existingPops.foresters)
        setCriminals(existingPops.criminals)
    },[])

    useEffect(()=>{
        setRemaining(max_pops-rulers-archivists-engineers-runeSmiths-craftsmen-merchants-clerics-miners-farmers-warriors-foresters-criminals)
    },[rulers,archivists,engineers,runeSmiths,craftsmen,merchants,clerics,miners,farmers,warriors,foresters,criminals])

    return (
        <div className="flex flex-column gap-3">
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <RulersIconTT/>
                    <InputNumber 
                        size={2} 
                        value={rulers} 
                        onValueChange={e => setRulers(e.value ?? 0)} 
                        showButtons 
                        min={0} 
                        max={remaining+rulers}/>
                </div>
                <div>
                    <ArchivistsIconTT/>
                    <InputNumber 
                    size={2} 
                    value={archivists} 
                    onValueChange={e => setArchivists(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+archivists}/>
                </div>
                <div>
                    <EngineersIconTT/>
                    <InputNumber 
                    size={2} 
                    value={engineers} 
                    onValueChange={e => setEngineers(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+engineers}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <RuneSmithsIconTT/>
                    <InputNumber 
                    size={2} 
                    value={runeSmiths} 
                    onValueChange={e => setRuneSmiths(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+runeSmiths}/>
                </div>
                <div>
                    <CraftsmenIconTT/>
                    <InputNumber 
                    size={2} 
                    value={craftsmen} 
                    onValueChange={e => setCraftsmen(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+craftsmen}/>
                </div>
                <div>
                    <MerchantsIconTT/>
                    <InputNumber 
                    size={2} 
                    value={merchants} 
                    onValueChange={e => setMerchants(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+merchants}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <ClericsIconTT/>
                    <InputNumber 
                    size={2} 
                    value={clerics} 
                    onValueChange={e => setClerics(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+clerics}/>
                </div>
                <div>
                    <MinersIconTT/>
                    <InputNumber 
                    size={2} 
                    value={miners} 
                    onValueChange={e => setMiners(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+miners}/>
                </div>
                <div>
                    <FarmersIconTT/>
                    <InputNumber 
                    size={2} 
                    value={farmers} 
                    onValueChange={e => setFarmers(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+farmers}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <WarriorsIconTT/>
                    <InputNumber 
                    size={2} 
                    value={warriors} 
                    onValueChange={e => setWarriors(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+warriors}/>
                </div>
                <div>
                    <ForestersIconTT/>
                    <InputNumber 
                    size={2} 
                    value={foresters} 
                    onValueChange={e => setForesters(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+foresters}/>
                </div>
                <div>
                    <CriminalsIconTT/>
                    <InputNumber 
                    size={2} 
                    value={criminals} 
                    onValueChange={e => setCriminals(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+criminals}/>
                </div>
            </div>
            <Button label="Confirm" onClick={() => {
                updateFunc({
                    rulers: rulers,
                    archivists: archivists,
                    engineers: engineers,
                    runeSmiths: runeSmiths,
                    craftsmen: craftsmen,
                    merchants: merchants,
                    clerics: clerics,
                    miners: miners,
                    farmers: farmers,
                    warriors: warriors,
                    foresters: foresters,
                    criminals: criminals
                })
            }}/>
        </div>
    )
}