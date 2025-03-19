import { Card } from "primereact/card";
import { ForeignPowerInterface } from "./ForeignPowerInterface";
import { Knob } from "primereact/knob";
import { RecognitionBadge } from "./badges/RecognitionBadge";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import {CombatantStatusBadge} from "./badges/CombatantStatusBadge";
import { AllianceStatusBadge } from "./badges/AllianceStatusBadge";
import { VassalStatusBadge } from "./badges/VassalStatusBadge";
import { MilitaryAccessBadge } from "./badges/MilitaryAccessBadge";
import { Badge } from "primereact/badge";
import { EconomyTypeData } from "../Goods/EconomyTypes";

export default function ForeignPower({power,updateFunc}:{power: ForeignPowerInterface,updateFunc: (value: number, power: string) => void}) {

    const [tarrifRate, setTarrifRate] = useState<number>(power.tarriffs);

    const knobColor = (value: number) => {
        if (value < 0) {
            return 'var(--red-500)';
        } else if (value > 0) {
            return 'var(--green-500)';
        } else {
            return 'var(--yellow-500)';
        }
    }

    const updateTarrifs = (newTarrif: number) => {
        updateFunc(newTarrif,power.name)
    }
    return (
        <>
        <Card title={power.name} className="md:w-25rem">
            <div className="flex flex-column gap-2">
                <div className="flex flex-row flex-wrap gap-1">
                    <Knob value={power.relations} min={-5} max={5} readOnly size={75} valueColor={knobColor(power.relations)}/>
                    <Badge value={`${EconomyTypeData[power.economyType].name} Economy`}/>
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                    <RecognitionBadge recognition={power.recognition}/>
                    <CombatantStatusBadge combatantStatus={power.combatantStatus}/>
                    <AllianceStatusBadge allianceStatus={power.allianceStatus}/>
                    <VassalStatusBadge vassalStatus={power.vassalStatus}/>
                    <MilitaryAccessBadge militaryAccess={power.militaryAccess}/>
                </div>
                {!power.isEmbargoed ?<div>
                    <label htmlFor="tariff-rate">Tarrif Rate: </label>
                    <InputNumber 
                        size={5}
                        min={0}
                        showButtons
                        suffix="%" 
                        id="tariff-rate" 
                        value={Math.round(tarrifRate * 100)} 
                        onChange={e => updateTarrifs((e.value ?? 0)/100)}/>
                </div>:
                <div style={{
                    backgroundColor: 'var(--red-500)', 
                    textAlign: 'center', 
                    height: '2rem', 
                    alignItems: 'center', 
                    display: 'flex', 
                    justifyContent: 'center',
                    }}>
                    <h3>EMBARGOED</h3>
                </div>
                }
                {power.immigrationRate > 0 ? <div>
                    Immigration Rate:
                    <ProgressBar value={power.immigrationRate * 100} />
                </div>: 
                <div style={{
                    backgroundColor: 'var(--red-500)', 
                    textAlign: 'center', 
                    height: '2rem', 
                    alignItems: 'center', 
                    display: 'flex', 
                    justifyContent: 'center',
                    }}>
                    <h3>BORDER CLOSED</h3>
                </div>}
            </div>
        </Card>
        </>
    )
}