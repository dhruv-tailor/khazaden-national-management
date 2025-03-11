import { useEffect, useState } from "react";
import { SettlementInterface } from "./Settlement/SettlementInterface";
import Settlement from "./Settlement/Settlement";
import { useNavigate, useParams } from "react-router";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";
import { Button } from "primereact/button";
import { NextTurn } from "./utilities/NextTurn";

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

    const processNextTurn = async () => {
        await NextTurn(gameId ?? '');
        getSettlements();
    }

    return (
        <div className="flex flex-column gap-2">
            <Button label="Next Turn" onClick={processNextTurn} size="small" icon="pi pi-angle-double-right"/>
            <div className="flex flex-row flex-wrap">
                {settlements.map(settlement => {
                    return <Settlement key={settlement.name} settlement={settlement} navigateSettlement={navigateSettlement}/>
                })}
            </div>
        </div>
    );
}

export default Game;