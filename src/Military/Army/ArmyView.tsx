import { ArmyInterface } from "./Army";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import DisplayGoods from "../../components/goodsDislay";
import { addGoods, empty_goodsdist, scaleGoods } from "../../Goods/GoodsDist";
import FederalRegimentRecruit from "./FederalRegimentRecruit";
import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { RegimentInterface } from "../units/RegimentInterface";
import ArmyRegimentCard from "./ArmyRegimentCard";
import { ProgressBar } from "primereact/progressbar";

export default function ArmyView(
    {army,renameFunc, disbandFunc, settlements,recruitFunc,regimentRenameFunc,regimentDisbandFunc,transferRegimentFunc,otherArmies}: 
    {
        army: ArmyInterface, 
        renameFunc: (name: string,id: number) => void, 
        disbandFunc: (id: number) => void, 
        settlements: SettlementInterface[],
        recruitFunc: (regiment: RegimentInterface, settlementName: string, armyId: number) => void, 
        regimentRenameFunc: (id: number, name: string, armyId: number) => void, 
        regimentDisbandFunc: (id: number, settlementName: string, armyId: number) => void,
        transferRegimentFunc: (regimentId: number, sourceArmyId: number, targetArmyId: number) => void,
        otherArmies: ArmyInterface[]
    }) {
    const [renameDialogVisible, setRenameDialogVisible] = useState(false);
    const [disbandDialogVisible, setDisbandDialogVisible] = useState(false);
    const [newName, setNewName] = useState(army.name);
    const [recruitDialogVisible, setRecruitDialogVisible] = useState(false);

    const handleRename = () => {
        renameFunc(newName, army.id);
        setRenameDialogVisible(false);
    };

    const handleRecruit = (regiment: RegimentInterface, settlementName: string) => {
        recruitFunc(regiment, settlementName, army.id);
        setRecruitDialogVisible(false);
    };

    const handleRegimentRename = (id: number, newName: string) => {
        regimentRenameFunc(id, newName, army.id);
    };

    const handleRegimentDisband = (id: number, settlementName: string) => {
        regimentDisbandFunc(id, settlementName, army.id);
    };

    // Calculate total population and unit count
    const totalPopulation = army.units.reduce((sum, unit) => sum + unit.pops_conusmed, 0);
    const maxPopulation = army.units.reduce((sum, unit) => sum + unit.max_pops, 0);
    const strengthPercentage = maxPopulation > 0 ? (totalPopulation / maxPopulation) * 100 : 0;
    const unitCount = army.units.length;

    return (
        <div className="flex flex-column gap-4 p-4">
            {/* Army Header */}
            <Card className="shadow-2 surface-ground">
                <div className="flex justify-content-between align-items-center">
                    <div className="flex align-items-center gap-3">
                        <i className="pi pi-shield text-4xl text-primary"></i>
                        <div className="flex flex-column">
                            <h2 className="m-0 text-2xl">{army.name}</h2>
                            <span className="text-500">Federal Army</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            icon="pi pi-pencil" 
                            className="p-button-rounded p-button-text" 
                            tooltip="Rename Army"
                            onClick={() => setRenameDialogVisible(true)}
                        />
                        <Button 
                            icon="pi pi-trash" 
                            className="p-button-rounded p-button-text p-button-danger" 
                            tooltip="Disband Army"
                            onClick={() => setDisbandDialogVisible(true)}
                        />
                    </div>
                </div>
            </Card>

            {/* Army Stats */}
            <div className="grid">
                <div className="col-12 md:col-6">
                    <Panel header="Army Statistics" className="h-full surface-ground">
                        <div className="flex flex-column gap-4">
                            <div className="flex flex-column gap-2">
                                <div className="flex justify-content-between align-items-center">
                                    <span className="text-500">Unit Capacity</span>
                                    <span className="font-bold text-xl">{unitCount} / {army.max_units}</span>
                                </div>
                                <ProgressBar 
                                    value={(unitCount / army.max_units) * 100} 
                                    showValue={false}
                                    className="h-1rem"
                                />
                            </div>
                            <Divider className="my-2" />
                            <div className="flex flex-column gap-2">
                                <div className="flex justify-content-between align-items-center">
                                    <span className="text-500">Army Strength</span>
                                    <span className="font-bold text-xl">{totalPopulation} / {maxPopulation}</span>
                                </div>
                                <ProgressBar 
                                    value={strengthPercentage} 
                                    showValue={false}
                                    className="h-1rem"
                                />
                            </div>
                        </div>
                    </Panel>
                </div>
                <div className="col-12 md:col-6">
                    <Panel header="Resource Consumption" className="h-full surface-ground">
                        <DisplayGoods 
                            stock={empty_goodsdist} 
                            change={scaleGoods(army.units.reduce((acc, regiment) => addGoods(acc, regiment.consumption_rate), empty_goodsdist),-1)}
                        />
                    </Panel>
                </div>
            </div>

            {/* Army Units */}
            <Panel header="Army Units" className="surface-ground">
                <div className="flex flex-column gap-4">
                    <div className="flex justify-content-between align-items-center">
                        <span className="text-500">Manage your army's regiments</span>
                        <Button 
                            label="Recruit Regiment" 
                            icon="pi pi-plus" 
                            onClick={() => setRecruitDialogVisible(true)}
                            disabled={unitCount >= army.max_units}
                            severity={unitCount >= army.max_units ? "secondary" : "success"}
                        />
                    </div>
                    {army.units.length > 0 ? (
                        <div className="flex flex-column gap-1">
                            {army.units.map((regiment) => (
                                <ArmyRegimentCard 
                                    key={regiment.id} 
                                    regiment={regiment}
                                    settlements={settlements}
                                    onRename={(id, newName) => handleRegimentRename(id, newName)}
                                    onDisband={(id, settlementName) => handleRegimentDisband(id, settlementName)}
                                    onTransfer={(id, targetArmyId) => transferRegimentFunc(id, army.id, targetArmyId)}
                                    otherArmies={otherArmies}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-500 p-5 border-round surface-section">
                            <i className="pi pi-users text-4xl mb-3"></i>
                            <p className="m-0">No units assigned to this army</p>
                            <p className="text-sm mt-2">Click the recruit button to add regiments to your army</p>
                        </div>
                    )}
                </div>
            </Panel>

            {/* Rename Dialog */}
            <Dialog 
                header="Rename Army" 
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
                    <label htmlFor="armyName" className="p-d-block">New Name</label>
                    <InputText 
                        id="armyName" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                        className="p-d-block w-full"
                    />
                </div>
            </Dialog>

            {/* Disband Dialog */}
            <Dialog 
                header="Disband Army" 
                visible={disbandDialogVisible} 
                style={{ width: '30vw' }} 
                onHide={() => setDisbandDialogVisible(false)}
                footer={
                    <div>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setDisbandDialogVisible(false)} className="p-button-text" />
                        <Button 
                            label="Disband" 
                            icon="pi pi-trash" 
                            className="p-button-danger"
                            autoFocus 
                            onClick={() => {
                                disbandFunc(army.id);
                                setDisbandDialogVisible(false);
                            }}
                        />
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <p>Are you sure you want to disband this army?</p>
                    <div className="flex flex-column gap-2">
                        <span className="font-bold">{army.name}</span>
                        <span>Unit Capacity: {unitCount} / {army.max_units}</span>
                        <span className="text-500">This action cannot be undone.</span>
                    </div>
                </div>
            </Dialog>

            <Dialog 
                header="Recruit Regiment" 
                visible={recruitDialogVisible} 
                onHide={() => setRecruitDialogVisible(false)}
            >
                <FederalRegimentRecruit settlements={settlements} onRecruit={handleRecruit}/>
            </Dialog>
        </div>
    );
}
