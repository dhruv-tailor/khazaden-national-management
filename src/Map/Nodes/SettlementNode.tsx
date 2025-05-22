import { settlementChange, SettlementInterface, SettlementTierDetails } from "../../Settlement/SettlementInterface/SettlementInterface";
import { Handle, Position } from "@xyflow/react";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { TerrainData, TerrainType } from "../../Settlement/SettlementInterface/TerrainInterface";
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { useState } from 'react';
import { goodsdist, roundGoods, totalGoods } from "../../Goods/GoodsDist";
import DisplayGoods from "../../components/goodsDislay";
import { Dialog } from "primereact/dialog";
import SettlementTaxation from "../../Economics/settlement/SettlementTaxation";
import { FederalInterface } from "../../utilities/FederalInterface";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GiMountainCave, GiPineTree, GiMagicSwirl, GiWheat, GiFactory } from "react-icons/gi";
import { Tooltip } from 'primereact/tooltip';
import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { ProgressBar } from 'primereact/progressbar';

type SettlementNodeData = {
    settlement: SettlementInterface;
    goTo: (name: string) => Promise<void>;
    updateTaxation: (name: string, taxation: goodsdist) => void;
    setMerchantTax: (name: string, merchant_tax: number) => void;
    federal: FederalInterface;
    stimulus: (name: string) => void
};

const getTerrainIcon = (terrain: TerrainType) => {
    switch (terrain) {
        case TerrainType.Mountain:
            return <GiMountainCave className="text-xl" />;
        case TerrainType.Forest:
            return <GiPineTree className="text-xl" />;
        case TerrainType.Enchanted_Forest:
            return <GiMagicSwirl className="text-xl" />;
        case TerrainType.Farmland:
            return <GiWheat className="text-xl" />;
        default:
            return <FaMapMarkedAlt className="text-xl" />;
    }
};

const getTerrainSeverity = (terrain: TerrainType): 'success' | 'warning' | 'info' | 'danger' | 'secondary' | 'contrast' => {
    switch (terrain) {
        case TerrainType.Mountain:
            return 'warning';
        case TerrainType.Forest:
            return 'info';
        case TerrainType.Enchanted_Forest:
            return 'secondary';
        case TerrainType.Farmland:
            return 'success';
        default:
            return 'info';
    }
};

export default function SettlementNode({data}: {data: SettlementNodeData}) {
    if (!data?.settlement) return null;
    
    const { settlement } = data;
    const totalPopulation = settlement.clans.reduce((sum, clan) => sum + clan.population, 0);
    const populationPercentage = Math.round((totalPopulation / settlement.pop_cap) * 100);
    const [showTaxation, setShowTaxation] = useState(false);

    const setTaxation = (taxation: goodsdist) => data.updateTaxation(settlement.name,taxation);
    const setMerchantTax = (merchant_tax: number) => data.setMerchantTax(settlement.name,merchant_tax);

    const unused_production : boolean = settlement.clans.filter(c => {
        return(
            (c.population > 0) && 
            (c.goods_produced - totalGoods(c.production) > 0) && 
            (c.id !== clanTypes.rulers) &&
            (c.id !== clanTypes.engineers) &&
            (c.id !== clanTypes.merchants) &&
            (c.id !== clanTypes.warriors) &&
            (c.id !== clanTypes.criminals)
        )}).length > 0 

    const pending_deals = data.settlement.trade_deals.find(deal => deal.active === 'checking') ? true : false

    return (
        <div>
            {settlement.connections[0] && <Handle  type={settlement.isSource[0] ? "source" : "target"} position={Position.Top} id='top' />}
            {settlement.connections[1] && <Handle  type={settlement.isSource[1] ? "source" : "target"} position={Position.Bottom} id='bottom' />}
            {settlement.connections[2] && <Handle  type={settlement.isSource[2] ? "source" : "target"} position={Position.Left} id='left' />}
            {settlement.connections[3] && <Handle type={settlement.isSource[3] ? "source" : "target"} position={Position.Right} id='right' />}
            
            <Card 
                style={{ maxWidth: '420px', minWidth: '320px', margin: '0 auto' }}
                className="settlement-card"
                title={
                    <div className="flex gap-2 align-items-center justify-content-between">
                        <span className="text-xl font-bold">{settlement.visible_name}</span>
                        <div className="flex gap-2">
                            {unused_production && (
                                <Tooltip target=".unused-production-badge" content="Unused Production" />
                            )}
                            {unused_production && <Badge severity="warning" value={<GiFactory />} className="unused-production-badge" />}
                            {pending_deals && (
                                <Tooltip target=".pending-deals-badge" content="Pending Trade Deals" />
                            )}
                            {pending_deals && <Badge severity="info" value={<i className="pi pi-sync" />} className="pending-deals-badge" />}
                        </div>
                    </div>
                }
            >
                <div className="flex flex-column gap-2">
                    <div className="section-header">
                        <i className="pi pi-users text-primary"></i>
                        Population
                    </div>
                    <div className="population-label">
                        {totalPopulation} / {settlement.pop_cap}
                    </div>
                    <ProgressBar 
                        value={populationPercentage} 
                        showValue={false}
                        className="population-bar"
                        color={populationPercentage > 90 ? 'var(--red-500)' : populationPercentage > 70 ? 'var(--orange-500)' : 'var(--primary-color)'}
                    />

                    <div className="flex flex-wrap gap-1 mb-1">
                        <Tag severity={getTerrainSeverity(settlement.terrain_type)}>
                            <span className="mr-2">{getTerrainIcon(settlement.terrain_type)}</span>
                            {TerrainData[settlement.terrain_type].name}
                        </Tag>
                        <Tag 
                            value={SettlementTierDetails[settlement.tier].name} 
                            severity={settlement.tier >= 4 ? "success" : settlement.tier >= 2 ? "info" : "warning"}
                        />
                    </div>

                    <div className="divider" />

                    <div className="section-header">
                        <i className="pi pi-box text-primary"></i>
                        Goods
                    </div>
                    <div className="compact-goods">
                        <DisplayGoods 
                            stock={roundGoods(settlement.stock)} 
                            change={roundGoods(settlementChange(settlement))} 
                        />
                    </div>

                    <div className="flex gap-1 justify-content-end mt-1">
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
