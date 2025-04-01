import { Card } from "primereact/card";
import { ClanInterface, clanTypes, developmentBonus } from "../../Clans/ClanInterface/ClanInterface";
import { releventClanTT } from "../../tooltips/clans/ReleventClanTT";
import PopulationIconTT from "../../tooltips/PopulationIconTT";
import LoyaltyIconTT from "../../tooltips/LoyaltyIconTT";
import { ProgressBar } from "primereact/progressbar";
import EfficencyIconTT from "../../tooltips/EfficencyIconTT";
import DevelopmentIconTT from "../../tooltips/DevelopmentIconTT";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import GoodsAllocation from "./GoodsAllocation/GoodsAllocation";
import { goodsdist } from "../../Goods/GoodsDist";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

export default function ClanInfo(
    {clan,updateTax,natCap,updateGoods,settlmentFunds,updateDevelopment}: 
    {
        clan: ClanInterface,
        updateTax: (id: clanTypes, newRate: number) => void,
        natCap: goodsdist,
        updateGoods: (id: clanTypes, goods: goodsdist) => void,
        settlmentFunds: number,
        updateDevelopment: (id: clanTypes, amount: number) => void,

    }) {
    const icon = releventClanTT[clan.id]
    const valueTemplate = (value: number) => <>{Math.round(value/10)}</>
    const developmentTemplate = (value: number) => <>{Math.round(value / 25)}</>
    const changeInProduction = (goods: goodsdist) => {updateGoods(clan.id,goods)}
    const developmentProgress = () => <>{Math.round(clan.development)}/{(((developmentBonus(clan) + 2) ** 3) * 8 * clan.population)}</>

    const [investment,setInvestment] = useState<number>(0)

    return(
        <Card className="w-17rem">
            <div className="flex flex-column">
                
                {/* Clan Name */}
                <div className="flex flex-row gap-1">
                    <h3>{icon}</h3>
                    <h3>{clan.name}</h3>
                </div>
                {/* Population */}
                <div className="flex flex-row gap-1">
                    <h3><PopulationIconTT/></h3>
                    <h3>{clan.population}</h3>
                </div>
                {/* Loyalty */}
                <div>
                    <div className="flex flex-row gap-1">
                        <LoyaltyIconTT/>
                        Loyalty
                    </div>
                    <ProgressBar value={clan.loyalty * 10} displayValueTemplate={valueTemplate}></ProgressBar>
                </div>
                {/* Efficency */}
                <div>
                    <div className="flex flex-row gap-1">
                        <EfficencyIconTT/>
                        Efficency
                    </div>
                    <ProgressBar value={clan.efficency * 10} displayValueTemplate={valueTemplate}></ProgressBar>
                </div>
                {/* Development */}
                <div>
                    <div className="flex flex-row gap-1">
                        <DevelopmentIconTT/>
                        Devlopment Level
                    </div>
                    <ProgressBar value={developmentBonus(clan) * 25} displayValueTemplate={developmentTemplate}></ProgressBar>
                </div>
                <Divider/>
                {/* Taxes */}
                <div>
                    <label htmlFor="tax-rate">Tax Rate</label>
                    <InputText id="tax-rate" value={Math.round(clan.tax_rate * 100).toString()}/>
                    <Slider value={clan.tax_rate * 100} onChange={e => updateTax(clan.id,(e.value as number)/100)} step={1}/>
                </div>
                <GoodsAllocation 
                    clan={clan}
                    natCap={natCap}
                    updateFunc={changeInProduction}
                />
                <Divider/>
                <div>
                    <div className="flex flex-row gap-1">
                        <DevelopmentIconTT/>
                        Development Progress
                    </div>
                    <ProgressBar
                        value={(clan.development/(((developmentBonus(clan) + 2) ** 3) * 8 * clan.population)) * 100} 
                        displayValueTemplate={developmentProgress}></ProgressBar>
                </div>
                <label htmlFor="investments"> Invest in Clan</label>
                <div className="p-inputgroup flex-1">
                    <InputNumber 
                        id="investments" 
                        value={investment} 
                        onChange={e => setInvestment(e.value ?? 0)}
                        max={settlmentFunds}
                        min={0}
                    />
                    <Button className="p-button-success" icon="pi pi-check" onClick={() => {
                        updateDevelopment(clan.id,investment)
                        setInvestment(0)
                    }}/>
                </div>
            </div>
        </Card>
    )
}