import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { load } from '@tauri-apps/plugin-store';


function NewGame() {
    let navigate = useNavigate();

    const [saveName, setSaveName] = useState('')


    const startGame = async () => {
        let initial_settlement = {
            name: 'Skarduhn',
            terrain_type: 'mountain',
            tier: 1
        }

        const store = await load(`${saveName}.json`,{autoSave: false})
        await store.set('settlements', [initial_settlement])
        await store.save()

        const savestore = await load('savegames.json', {autoSave: false});
        let savegames = await savestore.get<string[]>('savegames');
        if (!savegames) {
            savegames = []
        }
        savegames.push(saveName)
        await savestore.set('savegames', savegames)
        await savestore.save()
        
        navigate('/Game')

    }


    return (
        <div className="card flex justify-content-center">
           <form onSubmit={startGame}>
            <FloatLabel>
                <InputText type="text" id="savename" required onChange={e => setSaveName(e.target.value)}/>
                <label htmlFor="savename">Save File</label>
            </FloatLabel>
                <Button label="Start Game" icon="pi pi-fw pi-plus" />
           </form>
        </div>
    );
}

export default NewGame;