import { Card } from "primereact/card";
import { settlementChange, SettlementInterface, SettlementTierDetails } from "./SettlementInterface/SettlementInterface";
import PopulationIconTT from "../tooltips/PopulationIconTT";
import DisplayGoods from "../components/goodsDislay";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";

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

    const footer =  <Button label='Go To Settlement' icon="pi pi-arrow-right" onClick={()=>goTo(settlement.name)} />

    return(<Card className="md:w-25rem" title={settlement.visible_name} subTitle={SettlementTierDetails[settlement.tier].name} footer={footer}>
        <div className="flex flex-row gap-3">
            {/* Show Population */}
            <div className="flex flex-row gap-1">
                <PopulationIconTT/>
                {settlement.clans.map(clan => clan.population).reduce((sum,val) => sum + val)} / {settlement.pop_cap}
            </div>
        </div>
        <DisplayGoods 
            stock={settlement.stock} 
            change={settlementChange(settlement)} 
        />
        <Divider/>
        <div>
            <label htmlFor="tax-rate">Settlement Tax</label>
            <InputText id="tax-rate" value={Math.round(settlement.settlement_tax * 100).toString()}/>
            <Slider value={settlement.settlement_tax * 100} onChange={e => updateTax(settlement.name,(e.value as number)/100)} step={1}/>
        </div>
        <div>
            <label htmlFor="production-quota">Production Quota</label>
            <InputText id="production-quota" value={Math.round(settlement.production_quota * 100).toString()}/>
            <Slider value={settlement.production_quota * 100} onChange={e => updateQuota(settlement.name,(e.value as number)/100)} step={1}/>
        </div>
        <div>
            <Button label='Give Stimulus' icon='pi pi-box' onClick={()=>stimulus(settlement.name)}/>
        </div>
    </Card>)
}