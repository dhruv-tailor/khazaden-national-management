import { load } from "@tauri-apps/plugin-store";
import { useEffect, useLayoutEffect, useState } from "react";

function LoadGame() {
    const [savegames, setSavegames] = useState<string[]>([]);
    
    useLayoutEffect(() => {
        async function fetchSavegames() {
            const store = await load('savegames.json', {autoSave: false});
            const savedGames = await store.get<string[]>('savegames');
            if (savedGames) {
                setSavegames(savedGames);
            }
        }
        fetchSavegames();
        console.log(savegames);
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