import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ForeignPowerInterface } from "./Interface/ForeignPowerInterface"
import { saveLocation } from "../utilities/SaveData"
import { load } from "@tauri-apps/plugin-store"
import { Button } from "primereact/button"
import ForeignPower from "./ForeignPower"

export default function ForeignPowers () {

    const gameId = useParams().game
    const [foreignPowers,setForeignPowers] = useState<ForeignPowerInterface[]>([])
    let navigate = useNavigate();

    const loadForeignPowers = async () => {
        const store = await load(await saveLocation(gameId ?? ''),{autoSave: false});
        const foreign_powers = await store.get<ForeignPowerInterface[]>('Foreign Powers') ?? []
        setForeignPowers([...foreign_powers])
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        await store.set('Foreign Powers',foreignPowers);
        store.save()
    }

    const goBack = async () => {
        await saveData()
        navigate(`/game/${gameId}`)
    }

    const updateTariff = (name: string, amount: number): void => {
        const updatedPowers = foreignPowers.map(power => {
            if (power.name === name) {return { ...power, tarriffs: amount };}
            return {...power};
        });
        setForeignPowers([...updatedPowers]);
    }

    useEffect(() => {loadForeignPowers()},[])
    return(
        <div className="flex flex-column gap-2">
            <Button label='Go Back' icon='pi pi-angle-double-left' onClick={goBack}/>
            <h1>Foreign Powers</h1>
            <div className="flex flex-row flex-wrap gap-2">
                {foreignPowers.map(power => <ForeignPower 
                    power={power} 
                    key={power.name}
                    updateTariff={updateTariff}
                />)}
            </div>
        </div>
    )
}