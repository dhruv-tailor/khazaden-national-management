import { useEffect , useState } from "react";
import { getSavegames } from "../utilities/SaveData";
import GameName from "./GameName";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

function LoadGame() {
    const [savegames, setSavegames] = useState<string[]>([]);
    let navigate = useNavigate();

    const getSaves = async () => {
        const results = await getSavegames();
        setSavegames(results);
    }

    const goBack = () => {
        navigate('/')
    }
    
    useEffect(() => {
        getSaves()
    }, []);
    return (
        <div className="flex flex-column">
            <div className='flex flex-row'>
                <Button label={'Go Back'} icon="pi pi-arrow-left" size='small' onClick={goBack}/>
                <div className="flex flex-grow-1"></div>
                <h1>Load Game</h1>
                <div className="flex flex-grow-1"></div>
            </div>
           {savegames.map((savegame) => {
               return <GameName key={savegame} name={savegame} updateCall={getSaves}/>
           })}
        </div>
    );
}

export default LoadGame;