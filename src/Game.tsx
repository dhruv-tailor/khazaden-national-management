import { useEffect, useState } from "react";
import { SettlementInterface } from "./Settlement/SettlementInterface";
import Settlement from "./Settlement/Settlement";
import { useNavigate, useParams } from "react-router";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "./utilities/SaveData";
import { Button } from "primereact/button";
import { NextTurn } from "./utilities/NextTurn";
import { Panel } from "primereact/panel";
import { FaCoins } from "react-icons/fa";
import PlusMinus from "./components/PlusMinus";

function Game() {
    const gameId = useParams().game;
    let navigate = useNavigate();

    const [settlements, setSettlements] = useState<SettlementInterface[]>([]);
    const [nationalFP, setNationalFP] = useState<number>(0);
    const [changeFP, setChangeFP] = useState<number>(0);

    const getSettlements = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<number>('Finance Points').then(value => setNationalFP(value ?? 0))
        const settlements = await store.get<SettlementInterface[]>('settlements');
        if (settlements) {
            setSettlements(settlements);
        }
        let delta_fp = 0
        settlements?.forEach(settlement => {
            delta_fp += Math.round(((settlement.rulers.tax_rate * settlement.rulers.taxed_productivity) +
            (settlement.archivists.tax_rate * settlement.archivists.taxed_productivity) +
            (settlement.engineers.tax_rate * settlement.engineers.taxed_productivity) +
            (settlement.rune_smiths.tax_rate * settlement.rune_smiths.taxed_productivity) +
            (settlement.craftsmen.tax_rate * settlement.craftsmen.taxed_productivity) +
            (settlement.merchants.tax_rate * settlement.merchants.taxed_productivity) +
            (settlement.clerics.tax_rate * settlement.clerics.taxed_productivity) +
            (settlement.miners.tax_rate * settlement.miners.taxed_productivity) +
            (settlement.farmers.tax_rate * settlement.farmers.taxed_productivity) +
            (settlement.warriors.tax_rate * settlement.warriors.taxed_productivity) +
            (settlement.foresters.tax_rate * settlement.foresters.taxed_productivity)) * (settlement.settlment_tax))
        })
        setChangeFP(delta_fp)
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
            <Panel header="National Stock" toggleable>
                <div className="flex flex-row flex-wrap gap-2">
                    <div className="flex flex-row gap-1">
                        <FaCoins/>
                        {nationalFP}
                        <PlusMinus value={changeFP}/>
                    </div>
                </div>
            </Panel>
            <div className="flex flex-row flex-wrap">
                {settlements.map(settlement => {
                    return <Settlement 
                        key={settlement.name} 
                        settlement={settlement} 
                        navigateSettlement={navigateSettlement}
                        updateParent={getSettlements}
                    />
                })}
            </div>
        </div>
    );
}

export default Game;