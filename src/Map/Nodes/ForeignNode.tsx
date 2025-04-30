import { Handle, Position } from "@xyflow/react";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';
import { Badge } from 'primereact/badge';
import { EconomyTypeData } from "../../Goods/EconomyTypes";
import { RecognitionBadge } from "../../ForeignPowers/badges/RecognitionBadge";
import { AllianceStatusBadge } from "../../ForeignPowers/badges/AllianceStatusBadge";
import { CombatantStatusBadge } from "../../ForeignPowers/badges/CombatantStatusBadge";
import { MilitaryAccessBadge } from "../../ForeignPowers/badges/MilitaryAccessBadge";
import { VassalStatusBadge } from "../../ForeignPowers/badges/VassalStatusBadge";
import { Divider } from 'primereact/divider';

type ForeignNodeData = {
    foreign: ForeignPowerInterface;
};

export default function ForeignNode({data}: {data: ForeignNodeData}) {
    if (!data?.foreign) return null;
    const { foreign } = data;

    const knobColor = (value: number) => {
        if (value < 0) {return 'var(--red-500)'} 
        else if (value > 0) {return 'var(--green-500)';} 
        return 'var(--yellow-500)';
    }

    return (
        <div className="foreign-node">
            {foreign.connections[0] && <Handle type={foreign.isSource[0] ? "source" : "target"} position={Position.Top} id='top' isConnectable={false}/>}
            {foreign.connections[1] && <Handle type={foreign.isSource[1] ? "source" : "target"} position={Position.Bottom} id='bottom' isConnectable={false}/>}
            {foreign.connections[2] && <Handle type={foreign.isSource[2] ? "source" : "target"} position={Position.Left} id='left' isConnectable={false}/>}
            {foreign.connections[3] && <Handle type={foreign.isSource[3] ? "source" : "target"} position={Position.Right} id='right' isConnectable={false}/>}
            
            <Card>
                <div className="flex flex-column gap-2 p-2">
                    {/* Header with Name and Economy */}
                    <div className="flex flex-column align-items-center gap-1">
                        <h3 className="m-0 text-lg font-semibold text-center">{foreign.name}</h3>
                        <Badge 
                            value={EconomyTypeData[foreign.economyType].name}
                            className="text-sm"
                            severity="info"
                        />
                    </div>

                    <Divider className="my-1" />

                    {/* Relations and Status */}
                    <div className="flex flex-row align-items-center justify-content-center gap-3">
                        <div className="flex flex-column align-items-center">
                            <span className="text-sm text-500 mb-1">Relations</span>
                            <Knob 
                                value={foreign.relations} 
                                min={-5} 
                                max={5} 
                                readOnly 
                                size={45} 
                                valueColor={knobColor(foreign.relations)}
                                className="mb-2"
                            />
                        </div>
                        <div className="flex flex-column gap-1 ml-2">
                            <RecognitionBadge recognition={foreign.recognition}/>
                            <CombatantStatusBadge combatantStatus={foreign.combatantStatus}/>
                            <AllianceStatusBadge allianceStatus={foreign.allianceStatus}/>
                            <VassalStatusBadge vassalStatus={foreign.vassalStatus}/>
                            <MilitaryAccessBadge militaryAccess={foreign.militaryAccess}/>
                        </div>
                    </div>

                    {/* Trade and Immigration */}
                    <div className="flex flex-column gap-2">
                        {foreign.isEmbargoed && (
                            <div className="flex align-items-center justify-content-center p-1 border-round" 
                                style={{
                                    backgroundColor: 'var(--red-500)',
                                    border: '1px solid var(--red-600)'
                                }}
                            >
                                <span className="text-white text-sm font-bold">EMBARGOED</span>
                            </div>
                        )}

                        {foreign.immigrationRate > 0 && (
                            <div className="flex align-items-center justify-content-between">
                                <span className="text-sm text-500">Immigration</span>
                                <span className="text-sm font-semibold">
                                    {(foreign.immigrationRate * 100).toFixed(1)}%
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}
