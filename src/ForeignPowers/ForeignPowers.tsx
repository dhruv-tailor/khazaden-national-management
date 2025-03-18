import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ForeignPowerInterface } from "./ForeignPowerInterface";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../utilities/SaveData";
import ForeignPower from "./ForeignPower";
import { Button } from "primereact/button";

export default function ForeignPowers() {
    const gameId = useParams().game;
    const [foreignpowers, setForeignPowers] = useState<ForeignPowerInterface[]>([]);
    let navigate = useNavigate();

    const loadForeignPowers = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const foreignpowers = await store.get<ForeignPowerInterface[]>('Foreign Powers')
        setForeignPowers(foreignpowers ?? [])
    }

    useEffect(() => {
        // Load the foreign powers
        loadForeignPowers();
    },[])

    const updateTarrif = (value: number, power: string) => {
        const f = foreignpowers
        f.forEach(p => {
            if(p.name === power){
                p.tarriffs = value
            }
        })
        setForeignPowers(f);
    }

    const saveChanges = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        await store.set('Foreign Powers',foreignpowers);
        store.save()
    }

    return (
        <>
            <h1>Foreign Powers</h1>
            <div className="flex flex-column gap-2">
                <Button label='Go Back' icon='pi pi-angle-double-left' onClick={()=>{
                    saveChanges()
                    navigate(`/game/${gameId}`)
                    }}/>
                <div className="flex flex-row flex-wrap gap-2">
                    {foreignpowers.map(power => <ForeignPower power={power} key={power.name} updateFunc={updateTarrif}/>)}
                </div>
            </div>
        </>
    )
}