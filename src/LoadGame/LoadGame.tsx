import { useEffect , useState } from "react";
import { getSavegames } from "../utilities/SaveData";
import GameName from "./GameName";

function LoadGame() {
    const [savegames, setSavegames] = useState<string[]>([]);

    const getSaves = async () => {
        const results = await getSavegames();
        setSavegames(results);
    }
    
    useEffect(() => {
        getSaves()
    }, []);
    return (
        <div className="flex flex-column">
            <div className='flex overflow-hidden flex-row'>
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