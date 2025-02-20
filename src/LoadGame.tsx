import { useEffect , useState } from "react";
import { getSavegames } from "./utilities/SaveData";

function LoadGame() {
    const [savegames, setSavegames] = useState<string[]>([]);

    const getSaves = async () => {
        const results = await getSavegames();
        setSavegames(results);
        console.log('results', results);
    }
    
    useEffect(() => {
        getSaves()
    }, []);
    return (
        <div>
           {savegames.map((savegame) => {
               return <div>
                <p>{savegame}</p>
                </div>
           })}
        </div>
    );
}

export default LoadGame;