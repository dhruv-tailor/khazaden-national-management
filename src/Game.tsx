import { useState } from "react";
import { SettlementInterface } from "./Settlement/SettlementInterface";
import Settlement from "./Settlement/Settlement";

function Game() {

    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);

    return (
        <div>
            <h1>Game</h1>
        </div>
    );
}

export default Game;