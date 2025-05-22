import { Handle, Position } from "@xyflow/react";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { Card } from 'primereact/card';
import { Knob } from 'primereact/knob';
import { Divider } from 'primereact/divider';
import { SplitButton } from 'primereact/splitbutton';

type ForeignNodeData = {
    foreign: ForeignPowerInterface;
    sendDiplomat: (id: string) => void;
    recallDiplomat: (id: string) => void;
    increaseImmigrantion: (id: string) => void;
    increaseMarketAccess: (id: string) => void;
    availableDiplomats: boolean;
};

export default function ForeignNode({data}: {data: ForeignNodeData}) {
    if (!data?.foreign) return null;
    const { foreign } = data;

    const knobColor = (value: number) => {
        if (value < 0) {return 'var(--red-500)'} 
        else if (value > 0) {return 'var(--green-500)';} 
        return 'var(--yellow-500)';
    }

    const splitItems = [
        {
            label: 'Increase Immigration',
            icon: 'pi pi-arrow-up',
            disabled: foreign.relations < 20,
            command: () => data.increaseImmigrantion(foreign.global_id)
        },
        {
            label: 'Increase Market Access',
            icon: 'pi pi-chart-line',
            disabled: foreign.relations < 20,
            command: () => data.increaseMarketAccess(foreign.global_id)
        }
    ];

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
                    </div>

                    <Divider className="my-1" />

                    {/* Relations and Status */}
                    <div className="flex flex-row align-items-center justify-content-center gap-3">
                        <div className="flex flex-column align-items-center">
                            <Knob 
                                value={foreign.relations} 
                                min={-100} 
                                max={100} 
                                readOnly 
                                size={45} 
                                valueColor={knobColor(foreign.relations)}
                                className="mb-2"
                            />
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
                                    {(foreign.immigrationRate * 100).toFixed(0)}%
                                </span>
                            </div>
                        )}

                        <div className="flex align-items-center justify-content-between">
                            <span className="text-sm text-500">Market Access</span>
                            <span className="text-sm font-semibold">
                                {foreign.market_access * 100}%
                            </span>
                        </div>

                        <Divider className="my-2" />
                        <div className="flex justify-content-end mt-1">
                            <SplitButton
                                label={!foreign.diplomat_sent ? 'Send Diplomat' : 'Recall Diplomat'}
                                icon={!foreign.diplomat_sent ? 'pi pi-user-plus' : 'pi pi-user-minus'}
                                className="p-button-primary p-button-sm"
                                model={splitItems}
                                disabled={!data.availableDiplomats && !foreign.diplomat_sent}
                                onClick={() => {
                                    if (!foreign.diplomat_sent) {
                                        data.sendDiplomat(foreign.global_id);
                                    } else {
                                        data.recallDiplomat(foreign.global_id);
                                    }
                                }}
                                tooltip={!foreign.diplomat_sent ? 'Send a diplomat to this nation' : 'Recall your diplomat from this nation'}
                                tooltipOptions={{ position: 'top' }}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
