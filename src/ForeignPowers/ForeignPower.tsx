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
import { InputNumber } from "primereact/inputnumber";
import { ProgressBar } from "primereact/progressbar";

export default function ForeignPower({power,updateTariff}: {power: ForeignPowerInterface,updateTariff: (name: string, amount: number) => void}) {

    const knobColor = (value: number) => {
        if (value < 0) {return 'var(--red-500)'} 
        else if (value > 0) {return 'var(--green-500)';} 
        return 'var(--yellow-500)';
    }

    return(
        <Card title={power.name} className="md:w-25rem">
            <div className="flex flex-column gap-2">
                {/* Relations */}
                <div className="flex flex-row fflex-wrap gap-1">
                    <Knob value={power.relations} min={-5} max={5} readOnly size={75} valueColor={knobColor(power.relations)}/>
                    <Badge value={`${EconomyTypeData[power.economyType].name} Economy`}/>
                </div>
                {/* Badges */}
                <div className="flex flex-row flex-wrap gap-2">
                    <RecognitionBadge recognition={power.recognition}/>
                    <CombatantStatusBadge combatantStatus={power.combatantStatus}/>
                    <AllianceStatusBadge allianceStatus={power.allianceStatus}/>
                    <VassalStatusBadge vassalStatus={power.vassalStatus}/>
                    <MilitaryAccessBadge militaryAccess={power.militaryAccess}/>
                </div>
                {!power.isEmbargoed ?<div className="flex flex-column">
                    <div>
                    <label htmlFor="tariff-rate">Tarrif Rate: </label>
                    <InputNumber 
                        size={5}
                        min={0}
                        showButtons
                        suffix="%" 
                        id="tariff-rate" 
                        value={Math.round(power.tarriffs * 100)} 
                        onChange={e => updateTariff(power.name,(e.value ?? 0)/100)}/>
                    </div>
                    Retalitory Tariffs: {Math.round(power.retlaitory_tariffs * 100)} %
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
                </div>}
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
    )
}