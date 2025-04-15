import { Card } from "primereact/card";
import { settlementChange, SettlementInterface, SettlementTierDetails } from "./SettlementInterface/SettlementInterface";
import PopulationIconTT from "../tooltips/PopulationIconTT";
import DisplayGoods from "../components/goodsDislay";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";

export default function Settlement(
    {settlement,updateTax,updateQuota, stimulus,goTo}: 
    {
        settlement: SettlementInterface,
        updateTax: (name: string, val: number) => void,
        updateQuota: (name: string, val: number) => void,
        stimulus: (name: string) => void,
        goTo: (name: string) => void
    }
) {
    const footer = (
        <div className="flex justify-content-end">
            <Button 
                label='Go To Settlement' 
                icon="pi pi-arrow-right" 
                onClick={()=>goTo(settlement.name)}
                className="p-button-primary"
            />
        </div>
    );

    return (
        <Card 
            className="md:w-25rem" 
            title={settlement.visible_name} 
            subTitle={SettlementTierDetails[settlement.tier].name} 
            footer={footer}
        >
            <div className="flex flex-column gap-1">
                {/* Population Section */}
                <div className="flex align-items-center gap-2">
                    <PopulationIconTT/>
                    <span className="text-lg">
                        {settlement.clans.map(clan => clan.population).reduce((sum,val) => sum + val)} / {settlement.pop_cap}
                    </span>
                </div>

                {/* Goods Section */}
                <Panel header="Goods" toggleable>
                    <DisplayGoods 
                        stock={settlement.stock} 
                        change={settlementChange(settlement)} 
                    />
                </Panel>

                {/* Economic Controls Section */}
                <Panel header="Economic Controls" toggleable>
                    <div className="flex flex-column gap-3">
                        {/* Tax Rate Control */}
                        <div className="flex flex-column gap-2">
                            <div className="flex justify-content-between align-items-center">
                                <label htmlFor="tax-rate" className="font-semibold">Settlement Tax</label>
                                <InputText 
                                    id="tax-rate" 
                                    value={`${Math.round(settlement.settlement_tax * 100)}%`}
                                    className="w-4rem text-right"
                                    disabled
                                />
                            </div>
                            <Slider 
                                value={settlement.settlement_tax * 100} 
                                onChange={e => updateTax(settlement.name,(e.value as number)/100)} 
                                step={1}
                                className="w-full"
                            />
                        </div>

                        {/* Production Quota Control */}
                        <div className="flex flex-column gap-2">
                            <div className="flex justify-content-between align-items-center">
                                <label htmlFor="production-quota" className="font-semibold">Production Quota</label>
                                <InputText 
                                    id="production-quota" 
                                    value={`${Math.round(settlement.production_quota * 100)}%`}
                                    className="w-4rem text-right"
                                    disabled
                                />
                            </div>
                            <Slider 
                                value={settlement.production_quota * 100} 
                                onChange={e => updateQuota(settlement.name,(e.value as number)/100)} 
                                step={1}
                                className="w-full"
                            />
                        </div>

                        {/* Stimulus Button */}
                        <Button 
                            label='Give Stimulus' 
                            icon='pi pi-box' 
                            onClick={()=>stimulus(settlement.name)}
                            className="p-button-help"
                        />
                    </div>
                </Panel>
            </div>
        </Card>
    );
}