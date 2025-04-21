import { Card } from "primereact/card";
import { settlementChange, SettlementInterface, SettlementTierDetails } from "./SettlementInterface/SettlementInterface";
import PopulationIconTT from "../tooltips/PopulationIconTT";
import DisplayGoods from "../components/goodsDislay";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { goodsdist, roundGoods } from "../Goods/GoodsDist";
import SettlementTaxation from "../Economics/settlement/SettlementTaxation";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { FederalChangeProps } from "../Game";
export default function Settlement(
    {settlement, stimulus,goTo,updateTaxation,updateMerchantTax,federal_reserve,FederalProps}: 
    {
        settlement: SettlementInterface,
        stimulus: (name: string) => void,
        goTo: (name: string) => void,
        updateTaxation: (name: string, taxation: goodsdist) => void,
        updateMerchantTax: (name: string, merchant_tax: number) => void,
        federal_reserve: goodsdist,
        FederalProps: FederalChangeProps
    }
) {
    const [showTaxation, setShowTaxation] = useState(false);
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

    const setTaxation = (taxation: goodsdist) => updateTaxation(settlement.name,taxation);
    const setMerchantTax = (merchant_tax: number) => updateMerchantTax(settlement.name,merchant_tax);

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
                        stock={roundGoods(settlement.stock)} 
                        change={roundGoods(settlementChange(settlement))} 
                    />
                </Panel>

                {/* Economic Controls Section */}
                <Panel header="Economic Controls" toggleable>
                    <div className="flex flex-column gap-3">
                        <Button 
                            label="Taxation" 
                            icon="pi pi-money-bill" 
                            onClick={()=>setShowTaxation(true)}
                        />

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
                    federal_reserve={federal_reserve}
                    FederalProps={FederalProps}
                />
            </Dialog>
        </Card>
    );
}