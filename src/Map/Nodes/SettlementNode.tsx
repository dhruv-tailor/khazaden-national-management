import { settlementChange, SettlementInterface, SettlementTierDetails } from "../../Settlement/SettlementInterface/SettlementInterface";
import { Handle, Position } from "@xyflow/react";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { TerrainData } from "../../Settlement/SettlementInterface/TerrainInterface";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { goodsdist, roundGoods } from "../../Goods/GoodsDist";
import DisplayGoods from "../../components/goodsDislay";
import { Dialog } from "primereact/dialog";
import SettlementTaxation from "../../Economics/settlement/SettlementTaxation";
import { FederalInterface } from "../../utilities/FederalInterface";

type SettlementNodeData = {
    settlement: SettlementInterface;
    goTo: (name: string) => Promise<void>;
    updateTaxation: (name: string, taxation: goodsdist) => void;
    setMerchantTax: (name: string, merchant_tax: number) => void;
    federal: FederalInterface;
    stimulus: (name: string) => void
};

export default function SettlementNode({data}: {data: SettlementNodeData}) {
    if (!data?.settlement) return null;
    
    const { settlement } = data;
    const totalPopulation = settlement.clans.reduce((sum, clan) => sum + clan.population, 0);
    const populationPercentage = Math.round((totalPopulation / settlement.pop_cap) * 100);
    const op = useRef<OverlayPanel>(null);

    const [showTaxation, setShowTaxation] = useState(false);

    const setTaxation = (taxation: goodsdist) => data.updateTaxation(settlement.name,taxation);
    const setMerchantTax = (merchant_tax: number) => data.setMerchantTax(settlement.name,merchant_tax);

    return (
        <div>
            {settlement.connections[0] && <Handle  type={settlement.isSource[0] ? "source" : "target"} position={Position.Top} id='top' />}
            {settlement.connections[1] && <Handle  type={settlement.isSource[1] ? "source" : "target"} position={Position.Bottom} id='bottom' />}
            {settlement.connections[2] && <Handle  type={settlement.isSource[2] ? "source" : "target"} position={Position.Left} id='left' />}
            {settlement.connections[3] && <Handle type={settlement.isSource[3] ? "source" : "target"} position={Position.Right} id='right' />}
            
            <Card 
                title={
                    <div className="flex gap-2 align-items-center justify-content-between">
                        <span className="text-xl font-bold">{settlement.visible_name}</span>
                    </div>
                }
            >
                <div className="flex flex-column gap-3">
                    <div className="flex flex-column gap-1">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-users text-500"></i>
                            <span className="text-sm font-medium">Population</span>
                        </div>
                        <div className="flex align-items-center justify-content-between">
                            <span className="text-sm">{totalPopulation.toLocaleString()} / {settlement.pop_cap.toLocaleString()}</span>
                            <span className="text-sm text-500">{populationPercentage}%</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Tag 
                            value={TerrainData[settlement.terrain_type].name} 
                            severity="info"
                            className="text-sm"
                        />
                        <Tag 
                            value={SettlementTierDetails[settlement.tier].name} 
                            severity={settlement.tier >= 4 ? "success" : settlement.tier >= 2 ? "info" : "warning"}
                        />
                    </div>

                    <div className="flex gap-2 justify-content-end">
                        <Button 
                            icon="pi pi-info-circle" 
                            rounded 
                            text 
                            onClick={(e) => op.current?.toggle(e)}
                            aria-label="View Details"
                            className="p-button-info"
                            label="Details"
                        />
                        <Button 
                            icon="pi pi-arrow-right" 
                            rounded 
                            text 
                            onClick={() => {data.goTo(settlement.name)}}
                            aria-label="Go to Settlement"
                            className="p-button-success"
                            label="Go To"
                        />
                    </div>
                </div>
            </Card>

            <OverlayPanel ref={op} className="w-25rem" showCloseIcon>
                <DisplayGoods 
                    stock={roundGoods(settlement.stock)} 
                    change={roundGoods(settlementChange(settlement))} 
                />
                <div className="flex gap-2 justify-content-end mt-3">
                    <Button 
                        icon="pi pi-money-bill" 
                        rounded 
                        text 
                        label="Taxation"
                        aria-label="Taxation"
                        className="p-button-primary"
                        onClick={()=>setShowTaxation(true)}
                    />
                    <Button 
                        icon="pi pi-box" 
                        rounded 
                        text 
                        label="Stimulus"
                        aria-label="Stimulus"
                        className="p-button-help"
                        onClick={()=>data.stimulus(settlement.name)}
                    />
                </div>
            </OverlayPanel>

            <Dialog 
                header="Taxation" 
                visible={showTaxation} 
                onHide={()=>setShowTaxation(false)}
                className="w-8"
            >
                <SettlementTaxation 
                    settlement={settlement} 
                    updateTaxation={setTaxation} 
                    setMerchantTax={setMerchantTax} 
                    federal_reserve={data.federal.reserve}
                    FederalProps={data.federal}
                />
            </Dialog>
        </div>
    )
}
