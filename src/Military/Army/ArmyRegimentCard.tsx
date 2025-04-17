import { RegimentInterface } from "../units/RegimentInterface";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { releventRegimentTT } from "../../tooltips/regiments/ReleventRegimentTT";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { ArmyInterface } from "./Army";

export default function ArmyRegimentCard({ 
    regiment, 
    onRename, 
    onDisband, 
    settlements,
    onTransfer,
    otherArmies
}: { 
    regiment: RegimentInterface, 
    onRename: (id: number, name: string) => void, 
    onDisband: (id: number, settlementName: string) => void,
    settlements: SettlementInterface[],
    onTransfer: (id: number, targetArmyId: number) => void,
    otherArmies: ArmyInterface[]
}) {
    const [renameDialogVisible, setRenameDialogVisible] = useState(false);
    const [disbandDialogVisible, setDisbandDialogVisible] = useState(false);
    const [transferDialogVisible, setTransferDialogVisible] = useState(false);
    const [newName, setNewName] = useState(regiment.name);
    const [selectedSettlement, setSelectedSettlement] = useState<SettlementInterface | null>(null);
    const [selectedArmy, setSelectedArmy] = useState<ArmyInterface | null>(null);

    // Calculate strength percentage
    const strengthPercentage = (regiment.pops_conusmed / regiment.max_pops) * 100;
    
    // Get the appropriate icon from releventRegimentTT
    const unitIcon = releventRegimentTT[regiment.type];

    const handleRename = () => {
        onRename(regiment.id, newName);
        setRenameDialogVisible(false);
    };

    const handleDisband = () => {
        if (selectedSettlement) {
            onDisband(regiment.id, selectedSettlement.name);
            setDisbandDialogVisible(false);
            setSelectedSettlement(null);
        }
    };

    const handleTransfer = () => {
        if (selectedArmy) {
            onTransfer(regiment.id, selectedArmy.id);
            setTransferDialogVisible(false);
            setSelectedArmy(null);
        }
    };

    return (
        <>
            <Card>
                <div className="flex flex-column gap-3">
                    {/* Unit Header */}
                    <div className="flex justify-content-between align-items-center">
                        <div className="flex align-items-center gap-2">
                            {unitIcon}
                            <span className="font-bold">{regiment.name}</span>
                        </div>
                        <div className="flex gap-1">
                            <Button 
                                icon="pi pi-pencil" 
                                className="p-button-rounded p-button-text" 
                                tooltip="Rename Regiment"
                                onClick={() => setRenameDialogVisible(true)}
                            />
                            <Button 
                                icon="pi pi-arrow-right-arrow-left" 
                                className="p-button-rounded p-button-text" 
                                tooltip="Transfer Regiment"
                                onClick={() => setTransferDialogVisible(true)}
                            />
                            <Button 
                                icon="pi pi-trash" 
                                className="p-button-rounded p-button-text p-button-danger" 
                                tooltip="Disband Regiment"
                                onClick={() => setDisbandDialogVisible(true)}
                            />
                        </div>
                    </div>

                    {/* Unit Stats */}
                    <div className="flex flex-column gap-2">
                        <div className="flex justify-content-between align-items-center">
                            <span className="text-500">Strength</span>
                            <span className="font-bold">{regiment.pops_conusmed} / {regiment.max_pops}</span>
                        </div>
                        <ProgressBar 
                            value={strengthPercentage} 
                            showValue={false}
                            className="h-1rem"
                        />
                    </div>
                </div>
            </Card>

            {/* Rename Dialog */}
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

            {/* Transfer Dialog */}
            <Dialog 
                header="Transfer Regiment" 
                visible={transferDialogVisible} 
                style={{ width: '30vw' }} 
                onHide={() => {
                    setTransferDialogVisible(false);
                    setSelectedArmy(null);
                }}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => {
                            setTransferDialogVisible(false);
                            setSelectedArmy(null);
                        }} className="p-button-text" />
                        <Button 
                            label="Transfer" 
                            icon="pi pi-exchange" 
                            autoFocus 
                            onClick={handleTransfer}
                            disabled={!selectedArmy || selectedArmy.units.length >= selectedArmy.max_units}
                        />
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <p>Select an army to transfer this regiment to:</p>
                    <div className="flex flex-column gap-2">
                        <span className="font-bold">{regiment.name}</span>
                        <span>Strength: {regiment.pops_conusmed} / {regiment.max_pops}</span>
                    </div>
                    <div className="p-field">
                        <label htmlFor="army" className="p-d-block">Target Army</label>
                        <Dropdown
                            id="army"
                            value={selectedArmy}
                            options={otherArmies}
                            onChange={(e) => setSelectedArmy(e.value)}
                            optionLabel="name"
                            placeholder="Select an army"
                            className="w-full"
                        />
                    </div>
                    {selectedArmy && selectedArmy.units.length >= selectedArmy.max_units && (
                        <span className="text-500">Selected army is at maximum capacity</span>
                    )}
                </div>
            </Dialog>

            {/* Disband Dialog */}
            <Dialog 
                header="Disband Regiment" 
                visible={disbandDialogVisible} 
                style={{ width: '30vw' }} 
                onHide={() => {
                    setDisbandDialogVisible(false);
                    setSelectedSettlement(null);
                }}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => {
                            setDisbandDialogVisible(false);
                            setSelectedSettlement(null);
                        }} className="p-button-text" />
                        <Button 
                            label="Disband" 
                            icon="pi pi-trash" 
                            className="p-button-danger"
                            autoFocus 
                            onClick={handleDisband}
                            disabled={!selectedSettlement}
                        />
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <p>Select a settlement to garrison this regiment:</p>
                    <div className="flex flex-column gap-2">
                        <span className="font-bold">{regiment.name}</span>
                        <span>Strength: {regiment.pops_conusmed} / {regiment.max_pops}</span>
                    </div>
                    <div className="p-field">
                        <label htmlFor="settlement" className="p-d-block">Settlement</label>
                        <Dropdown
                            id="settlement"
                            value={selectedSettlement}
                            options={settlements}
                            onChange={(e) => setSelectedSettlement(e.value)}
                            optionLabel="name"
                            placeholder="Select a settlement"
                            className="w-full"
                        />
                    </div>
                    <span className="text-500">This action cannot be undone.</span>
                </div>
            </Dialog>
        </>
    );
} 