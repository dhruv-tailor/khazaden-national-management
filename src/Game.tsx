import { useEffect, useState } from "react";
import { SettlementInterface } from "./Settlement/SettlementInterface";
import Settlement from "./Settlement/Settlement";
import { useNavigate, useParams } from "react-router";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";

function Game() {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);

    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        if (settlements) {
            setSettlements(settlements);
        }
    }

    const navigateSettlement = (name: string) => {
        navigate(`settlement/${name}`)
    }

    useEffect(() => {
        getSettlements();
    }, []);

    return (
        <div>
            <h1>{settlements.map(settlement => {
                return <Settlement key={settlement.name} settlement={settlement} navigateSettlement={navigateSettlement}/>
            })}</h1>
        </div>
    );
}

export default Game;