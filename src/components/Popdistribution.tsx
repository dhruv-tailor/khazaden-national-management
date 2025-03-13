import { InputNumber } from "primereact/inputnumber";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { BiSolidCrown } from "react-icons/bi";
import { FaArchive, FaHammer } from "react-icons/fa";
import { GiAxeInStump, GiBlacksmith, GiFarmer } from "react-icons/gi";
import { LuSword } from "react-icons/lu";
import { MdChurch, MdEngineering } from "react-icons/md";
import { RiCriminalFill } from "react-icons/ri";
import { TbMoneybag, TbPick } from "react-icons/tb";

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

export default function PopDistribution({max_pops,updateFunc} : {max_pops: number,updateFunc: Dispatch<SetStateAction<popdist>>}) {

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

    useEffect(()=>{
        setRemaining(max_pops-rulers-archivists-engineers-runeSmiths-craftsmen-merchants-clerics-miners-farmers-warriors-foresters-criminals)
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
    },[rulers,archivists,engineers,runeSmiths,craftsmen,merchants,clerics,miners,farmers,warriors,foresters,criminals])

    return (
        <div className="flex flex-column gap-3">
            <div className="flex flex-row flex-wrap gap-3">
                <div>
                    <BiSolidCrown/>
                    <InputNumber 
                        size={2} 
                        value={rulers} 
                        onValueChange={e => setRulers(e.value ?? 0)} 
                        showButtons 
                        min={0} 
                        max={remaining+rulers}/>
                </div>
                <div>
                    <FaArchive/>
                    <InputNumber 
                    size={2} 
                    value={archivists} 
                    onValueChange={e => setArchivists(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+archivists}/>
                </div>
                <div>
                    <MdEngineering/>
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
                    <GiBlacksmith/>
                    <InputNumber 
                    size={2} 
                    value={runeSmiths} 
                    onValueChange={e => setRuneSmiths(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+runeSmiths}/>
                </div>
                <div>
                    <FaHammer/>
                    <InputNumber 
                    size={2} 
                    value={craftsmen} 
                    onValueChange={e => setCraftsmen(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+craftsmen}/>
                </div>
                <div>
                    <TbMoneybag/>
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
                    <MdChurch/>
                    <InputNumber 
                    size={2} 
                    value={clerics} 
                    onValueChange={e => setClerics(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+clerics}/>
                </div>
                <div>
                    <TbPick/>
                    <InputNumber 
                    size={2} 
                    value={miners} 
                    onValueChange={e => setMiners(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+miners}/>
                </div>
                <div>
                    <GiFarmer/>
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
                    <LuSword/>
                    <InputNumber 
                    size={2} 
                    value={warriors} 
                    onValueChange={e => setWarriors(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+warriors}/>
                </div>
                <div>
                    <GiAxeInStump/>
                    <InputNumber 
                    size={2} 
                    value={foresters} 
                    onValueChange={e => setForesters(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+foresters}/>
                </div>
                <div>
                    <RiCriminalFill/>
                    <InputNumber 
                    size={2} 
                    value={criminals} 
                    onValueChange={e => setCriminals(e.value ?? 0)} 
                    showButtons 
                    min={0} 
                    max={remaining+criminals}/>
                </div>
            </div>
        </div>
    )
}