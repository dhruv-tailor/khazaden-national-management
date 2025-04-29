import { Card } from "primereact/card";
import { ForeignPowerInterface } from "./Interface/ForeignPowerInterface";
import { Knob } from "primereact/knob";
import { Badge } from "primereact/badge";
import { EconomyTypeData } from "../Goods/EconomyTypes";
import { RecognitionBadge } from "./badges/RecognitionBadge";
import { AllianceStatusBadge } from "./badges/AllianceStatusBadge";
import { CombatantStatusBadge } from "./badges/CombatantStatusBadge";
import { MilitaryAccessBadge } from "./badges/MilitaryAccessBadge";
import { VassalStatusBadge } from "./badges/VassalStatusBadge";
import { ProgressBar } from "primereact/progressbar";
import { Divider } from "primereact/divider";

export default function ForeignPower({power}: {power: ForeignPowerInterface}) {
    const knobColor = (value: number) => {
        if (value < 0) {return 'var(--red-500)'} 
        else if (value > 0) {return 'var(--green-500)';} 
        return 'var(--yellow-500)';
    }

    return(
        <Card title={power.name} className="md:w-25rem">
            <div className="flex flex-column gap-3">
                {/* Relations and Economy Type */}
                <div className="flex flex-column align-items-center gap-2">
                    <div className="flex flex-row align-items-center gap-3">
                        <div className="flex flex-column align-items-center">
                            <span className="text-sm text-500">Relations</span>
                            <Knob 
                                value={power.relations} 
                                min={-5} 
                                max={5} 
                                readOnly 
                                size={75} 
                                valueColor={knobColor(power.relations)}
                            />
                        </div>
                        <Badge 
                            value={`${EconomyTypeData[power.economyType].name} Economy`}
                            className="text-lg"
                        />
                    </div>
                </div>

                <Divider />

                {/* Status Badges */}
                <div className="flex flex-column gap-2">
                    <span className="text-sm text-500">Status</span>
                    <div className="flex flex-row flex-wrap gap-2">
                        <RecognitionBadge recognition={power.recognition}/>
                        <CombatantStatusBadge combatantStatus={power.combatantStatus}/>
                        <AllianceStatusBadge allianceStatus={power.allianceStatus}/>
                        <VassalStatusBadge vassalStatus={power.vassalStatus}/>
                        <MilitaryAccessBadge militaryAccess={power.militaryAccess}/>
                    </div>
                </div>

                <Divider />

                {/* Trade and Immigration */}
                <div className="flex flex-column gap-3">
                    {!power.isEmbargoed ? (
                        <></>
                    ) : (
                        <div className="flex align-items-center justify-content-center p-2 border-round" style={{backgroundColor: 'var(--red-500)'}}>
                            <span className="text-white font-bold">EMBARGOED</span>
                        </div>
                    )}

                    {power.immigrationRate > 0 ? (
                        <div className="flex flex-column gap-1">
                            <span className="text-sm text-500">Immigration Rate</span>
                            <ProgressBar 
                                value={power.immigrationRate * 100}
                                showValue={false}
                                className="h-1rem"
                            />
                        </div>
                    ) : (
                        <div className="flex align-items-center justify-content-center p-2 border-round" style={{backgroundColor: 'var(--red-500)'}}>
                            <span className="text-white font-bold">BORDER CLOSED</span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}