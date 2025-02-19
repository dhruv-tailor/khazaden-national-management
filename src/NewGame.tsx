import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router";


function NewGame() {
    let navigate = useNavigate();

    const [saveName, setSaveName] = useState('')

    const startGame = () => {
        let initial_settlement = {
            name: 'Skarduhn',
            terrain_type: 'mountain',
            tier: 1
        }
    
        navigate('/Game', {state: {init_settlements: [initial_settlement]}})

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