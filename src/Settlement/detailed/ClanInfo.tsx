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
            <div className="flex flex-column gap-3">
                {/* Header Section */}
                <div className="flex flex-column gap-2">
                    <div className="flex flex-row align-items-center gap-2">
                        <span className="text-2xl">{icon}</span>
                        <h2 className="m-0">{clan.name}</h2>
                    </div>
                    <div className="flex flex-row align-items-center gap-2">
                        <PopulationIconTT/>
                        <span className="text-xl">{clan.population}</span>
                        <span className="text-sm">population</span>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex flex-column gap-2">
                    <div className="flex flex-column gap-1">
                        <div className="flex flex-row align-items-center gap-2">
                            <LoyaltyIconTT/>
                            <span>Loyalty</span>
                        </div>
                        <ProgressBar 
                            value={clan.loyalty * 10} 
                            displayValueTemplate={valueTemplate}
                            className="h-1rem"
                        />
                    </div>

                    <div className="flex flex-column gap-1">
                        <div className="flex flex-row align-items-center gap-2">
                            <EfficencyIconTT/>
                            <span>Efficiency</span>
                        </div>
                        <ProgressBar 
                            value={clan.efficency * 10} 
                            displayValueTemplate={valueTemplate}
                            className="h-1rem"
                        />
                    </div>

                    <div className="flex flex-column gap-1">
                        <div className="flex flex-row align-items-center gap-2">
                            <DevelopmentIconTT/>
                            <span>Development Level</span>
                        </div>
                        <ProgressBar 
                            value={developmentBonus(clan) * 25} 
                            displayValueTemplate={developmentTemplate}
                            className="h-1rem"
                        />
                    </div>
                </div>

                <Divider/>

                {/* Tax Section */}
                <div className="flex flex-column gap-2">
                    <div className="flex flex-row justify-content-between align-items-center">
                        <span>Tax Rate</span>
                        <InputText 
                            value={Math.round(clan.tax_rate * 100).toString()} 
                            className="w-4rem text-right"
                            disabled
                        />
                    </div>
                    <Slider 
                        value={clan.tax_rate * 100} 
                        onChange={e => updateTax(clan.id,(e.value as number)/100)} 
                        step={1}
                        className="w-full"
                    />
                </div>

                {/* Goods Allocation */}
                <GoodsAllocation 
                    clan={clan}
                    natCap={natCap}
                    updateFunc={changeInProduction}
                />

                <Divider/>

                {/* Development Section */}
                <div className="flex flex-column gap-2">
                    <div className="flex flex-column gap-1">
                        <div className="flex flex-row align-items-center gap-2">
                            <DevelopmentIconTT/>
                            <span>Development Progress</span>
                        </div>
                        <ProgressBar
                            value={(clan.development/(((developmentBonus(clan) + 2) ** 3) * 8 * clan.population)) * 100} 
                            displayValueTemplate={developmentProgress}
                            className="h-1rem"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <span>Invest in Clan</span>
                        <div className="p-inputgroup">
                            <InputNumber 
                                value={investment} 
                                onChange={e => setInvestment(e.value ?? 0)}
                                max={settlmentFunds}
                                min={0}
                                className="w-full"
                                placeholder="Amount to invest"
                            />
                            <Button 
                                className="p-button-success" 
                                icon="pi pi-check" 
                                onClick={() => {
                                    updateDevelopment(clan.id,investment)
                                    setInvestment(0)
                                }}
                                tooltip="Confirm investment"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}