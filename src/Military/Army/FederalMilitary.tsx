import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArmyInterface, empty_army } from "./Army";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../../utilities/SaveData";   
import ArmyView from "./ArmyView";
export default function FederalMilitary() {
    const gameId = useParams().game
    const navigate = useNavigate()

    const [armies, setArmies] = useState<ArmyInterface[]>([])

    const loadData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<ArmyInterface[]>('armies').then(value => {if (value) {setArmies(value)}});
    }

    useEffect(() => {
        loadData()
    }, [])

    const navigateTo = async (location: string) => {
        await saveData()
        navigate(location)
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.set('armies', armies)
    }

    const newArmy = () => {
        setArmies([...armies, {...empty_army, name: 'New Army', id: armies.length + 1}])
    }

    const renameArmy = (name: string, id: number) => {
        setArmies([...armies.map(army => {
            if (army.id !== id) {return army}
            return {...army, name: name}
        })])
    }

    return (
        <div className="flex flex-column gap-2">
            <div className="flex flex-row gap-2">
                <Button label="Back" icon="pi pi-arrow-left" size="small" onClick={() => navigateTo(`/game/${gameId}`)}/>
            </div>
            <Panel header="Armies">
                <div className="flex flex-row gap-2">
                    {armies.map((army) => (
                        <ArmyView army={army} renameFunc={renameArmy}/>
                    ))}
                    <Button label="Create Army" icon="pi pi-plus" size="small" onClick={newArmy}/>
                </div>
            </Panel>
        </div>
    )
}
