import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ForeignPowerInterface } from "./Interface/ForeignPowerInterface"
import { saveLocation } from "../utilities/SaveData"
import { load } from "@tauri-apps/plugin-store"
import { Button } from "primereact/button"
import ForeignPower from "./ForeignPower"
import { FederalInterface } from "../utilities/FederalInterface"
import { empty_federal_interface } from "../utilities/FederalInterface" 

export default function ForeignPowers() {
    const gameId = useParams().game
    const [foreignPowers, setForeignPowers] = useState<ForeignPowerInterface[]>([])
    let navigate = useNavigate();

    const loadForeignPowers = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const federal = await store.get<FederalInterface>('Federal') ?? {...empty_federal_interface};
        setForeignPowers([...federal.foreign_powers])
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const federal = await store.get<FederalInterface>('Federal') ?? {...empty_federal_interface};
        await store.set('Federal', {...federal,foreign_powers: foreignPowers});
        store.save()
    }

    const goBack = async () => {
        await saveData()
        navigate(`/game/${gameId}`)
    }

    useEffect(() => {loadForeignPowers()}, [])

    return (
        <div className="flex flex-column gap-3 p-3">
            {/* Header Section */}
            <div className="flex flex-row align-items-center justify-content-between">
                <Button 
                    label='Go Back' 
                    icon='pi pi-angle-double-left' 
                    onClick={goBack}
                    severity="secondary"
                />
                <h1 className="m-0">Foreign Powers</h1>
            </div>

            {/* Foreign Powers Grid */}
            <div className="grid">
                {foreignPowers.map(power => (
                    <div key={power.name} className="col-12 md:col-6 lg:col-4">
                        <ForeignPower power={power} />
                    </div>
                ))}
            </div>
        </div>
    )
}