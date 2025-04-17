import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArmyInterface, empty_army } from "./Army";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../../utilities/SaveData";   
import ArmyView from "./ArmyView";
import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { RegimentInterface } from "../units/RegimentInterface";
import { Dialog } from "primereact/dialog";
export default function FederalMilitary() {
    const gameId = useParams().game
    const navigate = useNavigate()

    const [armies, setArmies] = useState<ArmyInterface[]>([])
    const [settlements, setSettlements] = useState<SettlementInterface[]>([])

    const loadData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.get<ArmyInterface[]>('armies').then(value => {if (value) {setArmies(value)}});
        store.get<SettlementInterface[]>('settlements').then(value => {if (value) {setSettlements(value)}});
    }

    useEffect(() => {
        loadData()
    }, [])

    const navigateTo = async (location: string) => {
        await saveData()
        navigate(location)
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        store.set('armies', armies)
        store.set('settlements', settlements)
    }

    const newArmy = () => {
        setArmies([...armies, {...empty_army, name: 'New Army', id: armies.length + 1}])
    }

    const renameArmy = (name: string, id: number) => {
        setArmies([...armies.map(army => {
            if (army.id !== id) {return army}
            return {...army, name: name}
        })])
    }

    const disbandArmy = (id: number) => {
        // Find the army to disband
        const armyToDisband = armies.find(army => army.id === id);
        if (!armyToDisband) return;

        // Get all settlements that can accept regiments (not at max capacity)
        const availableSettlements = settlements.filter(settlement => settlement.garrison.length < 20);
        if (availableSettlements.length === 0) return; // No settlements can accept regiments

        // Randomly distribute regiments across available settlements
        const updatedSettlements = [...settlements];
        armyToDisband.units.forEach(regiment => {
            // Randomly select a settlement
            const randomIndex = Math.floor(Math.random() * availableSettlements.length);
            const targetSettlement = availableSettlements[randomIndex];
            
            // Add regiment to the settlement's garrison
            const settlementIndex = updatedSettlements.findIndex(s => s.name === targetSettlement.name);
            if (settlementIndex !== -1) {
                updatedSettlements[settlementIndex] = {
                    ...updatedSettlements[settlementIndex],
                    garrison: [...updatedSettlements[settlementIndex].garrison, regiment]
                };
            }
        });

        // Update settlements and remove the army
        setSettlements(updatedSettlements);
        setArmies(armies.filter(army => army.id !== id));
    }

    const recruitRegiment = (regiment: RegimentInterface, settlementName: string, armyId: number) => {
        setArmies([...armies.map(army => {
            if (army.id !== armyId) {return army}
            return {...army, units: [...army.units, {...regiment}]}
        })])
        setSettlements([...settlements.map(settlement => {
            if (settlement.name !== settlementName) {return settlement}
            return {...settlement, garrison: [...settlement.garrison.filter(regiment => regiment.id !== regiment.id)]}
        })])
    }

    const regimentRename = (id: number, name: string, armyId: number) => {
        setArmies([...armies.map(army => {
            if (army.id !== armyId) {return army}
            return {...army, 
                units: [...army.units.map(regiment => {
                    if (regiment.id !== id) {return regiment}
                    return {...regiment, name: name}
            })]}
        })])
    }

    const regimentDisband = (id: number, settlementName: string, armyId: number) => {
        const regiment = armies.find(army => army.id === armyId)?.units.find(regiment => regiment.id === id)
        if (regiment) {
            setArmies([...armies.map(army => {
                if (army.id !== armyId) {return army}
                return {...army, units: [...army.units.filter(regiment => regiment.id !== id)]}
            })])
            setSettlements([...settlements.map(settlement => {
                if (settlement.name !== settlementName) {return settlement}
                return {...settlement, garrison: [...settlement.garrison, {...regiment}]}
            })])
        }
    }

    const transferRegiment = (regimentId: number, sourceArmyId: number, targetArmyId: number) => {
        // Find the regiment to transfer
        const sourceArmy = armies.find(army => army.id === sourceArmyId);
        const regiment = sourceArmy?.units.find(regiment => regiment.id === regimentId);
        
        if (!regiment || !sourceArmy) return;

        // Check if target army has space
        const targetArmy = armies.find(army => army.id === targetArmyId);
        if (!targetArmy || targetArmy.units.length >= targetArmy.max_units) return;

        // Update armies
        setArmies(armies.map(army => {
            if (army.id === sourceArmyId) {
                // Remove regiment from source army
                return {
                    ...army,
                    units: army.units.filter(r => r.id !== regimentId)
                };
            } else if (army.id === targetArmyId) {
                // Add regiment to target army
                return {
                    ...army,
                    units: [...army.units, {...regiment}]
                };
            }
            return army;
        }));
    }

    return (
        <div className="flex flex-column gap-2">
            <div className="flex flex-row gap-2">
                <Button label="Back" icon="pi pi-arrow-left" size="small" onClick={() => navigateTo(`/game/${gameId}`)}/>
            </div>
            <Panel header="Armies">
                <div className="grid">
                    {armies.map((army) => (
                        <div key={army.id} className="col-12 md:col-6">
                            <ArmyView 
                                army={army} 
                                renameFunc={renameArmy} 
                                disbandFunc={disbandArmy} 
                                settlements={settlements} 
                                recruitFunc={recruitRegiment} 
                                regimentRenameFunc={regimentRename} 
                                regimentDisbandFunc={regimentDisband}
                                transferRegimentFunc={transferRegiment}
                                otherArmies={armies.filter(a => a.id !== army.id)}
                            />
                        </div>
                    ))}
                    <div className="col-12 md:col-6">
                        <Button 
                            label="Create Army" 
                            icon="pi pi-plus" 
                            size="small" 
                            onClick={newArmy}
                            className="w-full"
                        />
                    </div>
                </div>
            </Panel>
        </div>
    )
}
