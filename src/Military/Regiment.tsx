import { RegimentInterface } from "./units/RegimentInterface";
import { Card } from "primereact/card";
import { releventRegimentTT } from "../tooltips/regiments/ReleventRegimentTT";
import { releventClanTT } from "../tooltips/clans/ReleventClanTT";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

export default function Regiment({regiment, onRename, availablePops, onReplenish, onDisband}: {
    regiment: RegimentInterface, 
    onRename: (newName: string, id: number) => void, 
    availablePops: number,
    onReplenish: (amount: number, id: number) => void,
    onDisband: (id: number) => void
}) {
    const regimentIcon = releventRegimentTT[regiment.type];
    const clanIcon = releventClanTT[regiment.clan_type];
    const [renameDialogVisible, setRenameDialogVisible] = useState(false);
    const [replenishDialogVisible, setReplenishDialogVisible] = useState(false);
    const [disbandDialogVisible, setDisbandDialogVisible] = useState(false);
    const [newName, setNewName] = useState(regiment.name);
    const [replenishAmount, setReplenishAmount] = useState(0);

    const handleRename = () => {
        onRename(newName, regiment.id);
        setRenameDialogVisible(false);
    };

    const handleReplenish = () => {
        if (replenishAmount > 0) {
            onReplenish(replenishAmount, regiment.id);
            setReplenishDialogVisible(false);
            setReplenishAmount(0);
        }
    };

    const handleDisband = () => {
        onDisband(regiment.id);
        setDisbandDialogVisible(false);
    };

    const maxReplenish = Math.min(
        regiment.max_pops - regiment.pops_conusmed,
        availablePops
    );

    return (
        <>
            <Card className="w-full">
                <div className="flex flex-row justify-content-between align-items-center">
                    {/* Left Section - Regiment Info */}
                    <div className="flex flex-row gap-3 align-items-center">
                        {regimentIcon}
                        <div className="flex flex-column">
                            <h3 className="m-0">{regiment.name}</h3>
                            <div className="flex flex-row gap-2 align-items-center">
                                {clanIcon}
                                <span className="text-sm">Clan Type</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Stats and Actions */}
                    <div className="flex flex-row gap-4 align-items-center">
                        <div className="flex flex-column align-items-end">
                            <span className="text-sm">Population:</span>
                            <span className="font-bold">{regiment.pops_conusmed}/{regiment.max_pops}</span>
                        </div>
                        
                        <Divider layout="vertical" className="mx-2" />
                        
                        <div className="flex flex-row gap-2">
                            <Button 
                                icon="pi pi-pencil" 
                                className="p-button-rounded p-button-text p-button-sm" 
                                tooltip="Rename"
                                onClick={() => setRenameDialogVisible(true)}
                            />
                            <Button 
                                icon="pi pi-refresh" 
                                className="p-button-rounded p-button-text p-button-sm" 
                                tooltip="Replenish"
                                onClick={() => setReplenishDialogVisible(true)}
                                disabled={maxReplenish === 0}
                            />
                            <Button 
                                icon="pi pi-trash" 
                                className="p-button-rounded p-button-text p-button-sm p-button-danger" 
                                tooltip="Disband"
                                onClick={() => setDisbandDialogVisible(true)}
                            />
                        </div>
                    </div>
                </div>

                {/* Recruitment Progress */}
                {regiment.turns_to_levy > 0 && (
                    <div className="mt-3">
                        <div className="flex flex-row justify-content-between align-items-center">
                            <span className="text-sm">Recruitment Progress</span>
                            <span className="text-sm font-bold">{regiment.turns_to_levy} turns remaining</span>
                        </div>
                    </div>
                )}
            </Card>

            <Dialog 
                header="Rename Regiment" 
                visible={renameDialogVisible} 
                style={{ width: '25vw' }} 
                onHide={() => setRenameDialogVisible(false)}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setRenameDialogVisible(false)} className="p-button-text" />
                        <Button label="Save" icon="pi pi-check" onClick={handleRename} autoFocus />
                    </div>
                }
            >
                <div className="p-field">
                    <label htmlFor="regimentName" className="p-d-block">New Name</label>
                    <InputText 
                        id="regimentName" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                        className="p-d-block w-full"
                    />
                </div>
            </Dialog>

            <Dialog 
                header="Replenish Regiment" 
                visible={replenishDialogVisible}  
                onHide={() => setReplenishDialogVisible(false)}
                style={{ width: '30vw' }}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setReplenishDialogVisible(false)} className="p-button-text" />
                        <Button 
                            label="Replenish" 
                            icon="pi pi-check" 
                            onClick={handleReplenish} 
                            disabled={replenishAmount === 0}
                            autoFocus 
                        />
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="replenishAmount">Replenishment Amount</label>
                        <InputNumber 
                            id="replenishAmount"
                            value={replenishAmount} 
                            onValueChange={(e) => setReplenishAmount(e.value || 0)} 
                            min={0}
                            max={maxReplenish}
                            showButtons
                            className="w-full"
                        />
                        <small className="text-500">
                            Available Population: {availablePops} | Maximum: {maxReplenish}
                        </small>
                    </div>
                </div>
            </Dialog>

            <Dialog 
                header="Disband Regiment" 
                visible={disbandDialogVisible}  
                onHide={() => setDisbandDialogVisible(false)}
                style={{ width: '30vw' }}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setDisbandDialogVisible(false)} className="p-button-text" />
                        <Button 
                            label="Disband" 
                            icon="pi pi-trash" 
                            onClick={handleDisband} 
                            className="p-button-danger"
                            autoFocus 
                        />
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <p>Are you sure you want to disband this regiment?</p>
                    <div className="flex flex-column gap-2">
                        <span className="font-bold">{regiment.name}</span>
                        <span>Population: {regiment.pops_conusmed}/{regiment.max_pops}</span>
                        <span className="text-500">This action cannot be undone.</span>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
