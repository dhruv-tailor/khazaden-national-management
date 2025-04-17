import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { RegimentInterface } from "../units/RegimentInterface";
import { useState } from "react";
import RegimentCard from "./RegimentCard";

export default function FederalRegimentRecruit({settlements, onRecruit}: {settlements: SettlementInterface[], onRecruit: (regiment: RegimentInterface, settlementName: string) => void}) {
    const [selectedSettlement, setSelectedSettlement] = useState<SettlementInterface | null>(null);

    const handleRecruit = (regiment: RegimentInterface) => {
        onRecruit(regiment,selectedSettlement?.name ?? '')
        setSelectedSettlement(null)
    }
    return (
        <div className="flex flex-row gap-3">
            {/* Left Section - Settlement Selection */}
            <div className="flex-none" style={{ width: '300px' }}>
                <Card className="h-full">
                    <div className="flex flex-column gap-3">
                        <h3 className="m-0">Select Settlement</h3>
                        <Divider />
                        <div className="flex flex-column gap-2">
                            {settlements.map((settlement) => (
                                <Button
                                    key={settlement.name}
                                    label={settlement.visible_name}
                                    icon="pi pi-building"
                                    className={`w-full justify-content-start ${selectedSettlement?.name === settlement.name ? 'p-button-primary' : ''}`}
                                    onClick={() => setSelectedSettlement(settlement)}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Right Section - Regiment Listing */}
            <div className="flex-1">
                <Card className="h-full">
                    <div className="flex flex-column gap-3">
                        <div className="flex justify-content-between align-items-center">
                            <h3 className="m-0">
                                {selectedSettlement ? `Available Regiments - ${selectedSettlement.visible_name}` : 'Select a Settlement'}
                            </h3>
                        </div>
                        <Divider />
                        
                        {selectedSettlement ? (
                            <div className="flex flex-row gap-3 overflow-x-auto pb-2">
                                {selectedSettlement.garrison.map((regiment) => {
                                    if(regiment.turns_to_levy > 0) { return( <></>)}
                                    return <RegimentCard 
                                        key={regiment.id} 
                                        regiment={regiment} 
                                        onRecruit={handleRecruit}
                                    />
                                })}
                            </div>
                        ) : (
                            <div className="flex align-items-center justify-content-center p-5">
                                <span className="text-500">Please select a settlement to view available regiments</span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}