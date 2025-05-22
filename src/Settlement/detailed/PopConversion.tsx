import { ClanInterface } from "../../Clans/ClanInterface/ClanInterface";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useState } from "react";
import { Card } from "primereact/card";
import RulersIconTT from "../../tooltips/clans/RulersIconTT";
import ArchivistsIconTT from "../../tooltips/clans/ArchivistsIconTT";
import EngineersIconTT from "../../tooltips/clans/EngineersIconTT";
import RuneSmithsIconTT from "../../tooltips/clans/RuneSmithsIconTT";
import CraftsmenIconTT from "../../tooltips/clans/CraftsmenIconTT";
import MerchantsIconTT from "../../tooltips/clans/MerchantsIconTT";
import ClericsIconTT from "../../tooltips/clans/ClericsIconTT";
import MinersIconTT from "../../tooltips/clans/MinersIconTT";
import FarmersIconTT from "../../tooltips/clans/FarmersIconTT";
import WarriorsIconTT from "../../tooltips/clans/WarriorsIconTT";
import ForestersIconTT from "../../tooltips/clans/ForestersIconTT";
import CriminalsIconTT from "../../tooltips/clans/CriminalsIconTT";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";

const clanIcons: { [key: string]: React.ComponentType } = {
    "Rulers": RulersIconTT,
    "Archivists": ArchivistsIconTT,
    "Engineers": EngineersIconTT,
    "Rune Smiths": RuneSmithsIconTT,
    "Craftsmen": CraftsmenIconTT,
    "Merchants": MerchantsIconTT,
    "Clerics": ClericsIconTT,
    "Miners": MinersIconTT,
    "Farmers": FarmersIconTT,
    "Warriors": WarriorsIconTT,
    "Foresters": ForestersIconTT,
    "Criminals": CriminalsIconTT
};

const conversionCosts: { [key: string]: number } = {
    "Rulers": 40,
    "Archivists": 27,
    "Engineers": 27,
    "Rune Smiths": 27,
    "Craftsmen": 13,
    "Merchants": 13,
    "Clerics": 13,
    "Miners": 7,
    "Farmers": 7,
    "Warriors": 7,
    "Foresters": 7,
    "Criminals": 0 
};

export default function PopConversion({clans, updateFunc}: {clans: ClanInterface[], updateFunc: (sourceClan: string, targetClan: string, amount: number, cost: number) => void}) {
    const [sourceClan, setSourceClan] = useState<ClanInterface | null>(null);
    const [targetClan, setTargetClan] = useState<ClanInterface | null>(null);
    const [amount, setAmount] = useState<number>(0);

    const availableSourceClans = clans.filter(clan => clan.population > 0);
    const availableTargetClans = clans.filter(clan => clan !== sourceClan);

    const handleConversion = () => {
        if (!sourceClan || !targetClan || amount <= 0) return;
        updateFunc(sourceClan.name, targetClan.name, amount, calculatedCost);
    };

    const maxAmount = sourceClan ? sourceClan.population : 0;
    const calculatedCost = amount * 50 * ( targetClan ? (conversionCosts[targetClan.name]) : 0);

    const clanOptionTemplate = (option: ClanInterface) => {
        const Icon = clanIcons[option.name];
        return (
            <div className="flex align-items-center gap-2">
                {Icon && <Icon />}
                <span>{option.name}</span>
            </div>
        );
    };

    const selectedClanTemplate = (option: ClanInterface | null) => {
        if (!option) return <span>Select a clan</span>;
        const Icon = clanIcons[option.name];
        return (
            <div className="flex align-items-center gap-2">
                {Icon && <Icon />}
                <span>{option.name}</span>
            </div>
        );
    };

    return (
        <Card title="Population Conversion" className="w-full">
            <div className="flex flex-column gap-4">
                {/* Source Clan Selection */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="sourceClan" className="font-semibold">Source Clan</label>
                    <Dropdown
                        id="sourceClan"
                        value={sourceClan}
                        onChange={(e) => setSourceClan(e.value)}
                        options={availableSourceClans}
                        optionLabel="name"
                        placeholder="Select source clan"
                        className="w-full"
                        itemTemplate={clanOptionTemplate}
                        valueTemplate={selectedClanTemplate}
                    />
                    {sourceClan && (
                        <div className="flex align-items-center gap-2 text-sm text-500">
                            <span>Available Population:</span>
                            <span>{sourceClan.population}</span>
                        </div>
                    )}
                </div>

                {/* Target Clan Selection */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="targetClan" className="font-semibold">Target Clan</label>
                    <Dropdown
                        id="targetClan"
                        value={targetClan}
                        onChange={(e) => setTargetClan(e.value)}
                        options={availableTargetClans}
                        optionLabel="name"
                        placeholder="Select target clan"
                        className="w-full"
                        disabled={!sourceClan}
                        itemTemplate={clanOptionTemplate}
                        valueTemplate={selectedClanTemplate}
                    />
                </div>

                {/* Amount Selection */}
                <div className="flex flex-column gap-2">
                    <label htmlFor="amount" className="font-semibold">Amount to Convert</label>
                    <InputNumber
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.value ?? 0)}
                        min={0}
                        max={maxAmount}
                        showButtons
                        buttonLayout="horizontal"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        className="w-full"
                        disabled={!sourceClan || !targetClan}
                    />
                    {sourceClan && targetClan && amount > 0 && (
                        <div className="flex align-items-center gap-2 text-sm">
                            <span className="font-semibold">Conversion Cost:</span>
                            <span className="flex flex-row gap-1">
                            <MoneyIconTT/>{calculatedCost} 
                            </span>
                        </div>
                    )}
                </div>

                {/* Convert Button */}
                <Button
                    label="Convert Population"
                    icon="pi pi-exchange"
                    onClick={handleConversion}
                    className="w-full"
                    disabled={!sourceClan || !targetClan || amount <= 0}
                />
            </div>
        </Card>
    );
}
