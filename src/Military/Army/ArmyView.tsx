import { ArmyInterface } from "./Army";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import DisplayGoods from "../../components/goodsDislay";
import { empty_goodsdist } from "../../Goods/GoodsDist";

export default function ArmyView({army,renameFunc}: {army: ArmyInterface, renameFunc: (name: string,id: number) => void}) {
    const [renameDialogVisible, setRenameDialogVisible] = useState(false);
    const [newName, setNewName] = useState(army.name);

    const handleRename = () => {
        renameFunc(newName,army.id)
        setRenameDialogVisible(false);
    };

    return (
        <div className="flex flex-column gap-3 p-3">
            {/* Army Header */}
            <Card className="shadow-2">
                <div className="flex justify-content-between align-items-center">
                    <div className="flex align-items-center gap-3">
                        <i className="pi pi-shield text-3xl"></i>
                        <h2 className="m-0">{army.name}</h2>
                    </div>
                    <Button 
                        icon="pi pi-pencil" 
                        className="p-button-rounded p-button-text" 
                        tooltip="Rename Army"
                        onClick={() => setRenameDialogVisible(true)}
                    />
                </div>
            </Card>

            {/* Army Stats */}
            <div className="grid">
                <div className="col-12 md:col-6">
                    <Panel header="Army Statistics" className="h-full">
                        <div className="flex flex-column gap-3">
                            <div className="flex justify-content-between align-items-center">
                                <span>Unit Capacity</span>
                                <span className="font-bold">{0} / {army.max_units}</span>
                            </div>
                            <Divider className="my-2" />
                            <div className="flex justify-content-between align-items-center">
                                <span>Total Population</span>
                                <span className="font-bold">0</span>
                            </div>
                        </div>
                    </Panel>
                </div>
                <div className="col-12 md:col-6">
                    <Panel header="Resource Consumption" className="h-full">
                        <DisplayGoods 
                            stock={empty_goodsdist} 
                            change={empty_goodsdist}
                        />
                    </Panel>
                </div>
            </div>

            {/* Army Units */}
            <Panel header="Army Units">
                <div className="flex flex-column gap-3">
                    {/* TODO: Map through army units when available */}
                    <div className="text-center text-500 p-5">
                        <i className="pi pi-users text-4xl mb-3"></i>
                        <p className="m-0">No units assigned to this army</p>
                    </div>
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
        </div>
    );
}
