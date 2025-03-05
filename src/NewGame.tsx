import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createNewSave } from "./utilities/SaveData";


function NewGame() {
    let navigate = useNavigate();

    const [saveName, setSaveName] = useState('')

    const startGame = async () => {
        await createNewSave(saveName)
        navigate(`/game/${saveName}`)
    }

    const goBack = () => {
        navigate('/')
    }


    return (
        <div className="card flex justify-content-center">
            <Button label={'Go Back'} icon="pi pi-arrow-left" size='small' onClick={goBack}/>
           <form onSubmit={e => {
            e.preventDefault()
            startGame()
            }}>
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