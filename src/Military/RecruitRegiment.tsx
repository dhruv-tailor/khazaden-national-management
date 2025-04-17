import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";
import { RegimentData, regiment_types, RegimentInterface } from "./units/RegimentInterface";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { releventRegimentTT } from "../tooltips/regiments/ReleventRegimentTT";
import { releventClanTT } from "../tooltips/clans/ReleventClanTT";
import DisplayGoods from "../components/goodsDislay";
import { scaleGoods } from "../Goods/GoodsDist";
import { clanTypes } from "../Clans/ClanInterface/ClanInterface";

export default function RecruitRegiment({settlement, onRecruit}: {settlement: SettlementInterface, onRecruit: (regiment: RegimentInterface) => void}) {
    const [selectedType, setSelectedType] = useState<regiment_types | null>(null);
    const [regimentName, setRegimentName] = useState("");

    // Group regiments by clan type
    const regimentOptions = Object.entries(regiment_types)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key]) => {
            const type = regiment_types[key as keyof typeof regiment_types];
            const regiment = RegimentData[type];
            return {
                label: regiment.name,
                value: type,
                icon: releventRegimentTT[type],
                clan: regiment.clan_type
            };
        })
        .reduce((groups, regiment) => {
            const clanName = clanTypes[regiment.clan] as string;
            const group = groups.find(g => g.label === clanName);
            if (group) {
                group.items.push(regiment);
            } else {
                groups.push({
                    label: clanName,
                    items: [regiment]
                });
            }
            return groups;
        }, [] as Array<{label: string, items: Array<{label: string, value: regiment_types, icon: React.ReactNode}>}>)
        .sort((a, b) => a.label.localeCompare(b.label));

    const itemTemplate = (option: { label: string, value: regiment_types, icon: React.ReactNode } | null) => {
        if (!option) return "Select Regiment Type";
        
        return (
            <div className="flex align-items-center gap-2">
                {option.icon}
                <span>{option.label}</span>
            </div>
        );
    };

    const groupTemplate = (option: { label: string }) => {
        return (
            <div className="flex align-items-center gap-2 font-bold">
                {releventClanTT[clanTypes[option.label.toLowerCase() as keyof typeof clanTypes]]}
                <span>{option.label}</span>
            </div>
        );
    };

    const selectedRegiment = selectedType !== null ? RegimentData[selectedType] : null;


    const handleRecruit = () => {
        if (!selectedType) return;
        
        const newRegiment = {
            ...RegimentData[selectedType],
            name: regimentName || `New ${RegimentData[selectedType].name}`
        };
        
        onRecruit(newRegiment);
    };

    return (
        <div className="flex flex-column gap-3">
            <div className="flex flex-column gap-2">
                <label htmlFor="regimentType">Regiment Type</label>
                <Dropdown
                    id="regimentType"
                    value={selectedType}
                    options={regimentOptions}
                    onChange={(e) => setSelectedType(e.value)}
                    placeholder="Select Regiment Type"
                    className="w-full"
                    itemTemplate={itemTemplate}
                    valueTemplate={itemTemplate}
                    optionGroupLabel="label"
                    optionGroupChildren="items"
                    optionGroupTemplate={groupTemplate}
                />
            </div>

            {selectedRegiment && selectedType && (
                <>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="regimentName">Regiment Name</label>
                        <InputText
                            id="regimentName"
                            value={regimentName}
                            onChange={(e) => setRegimentName(e.target.value)}
                            placeholder={`New ${selectedRegiment.name}`}
                            className="w-full"
                        />
                    </div>

                    <Card className="surface-ground">
                        <div className="flex flex-column gap-3">
                            <div className="flex flex-row gap-2 align-items-center">
                                {releventRegimentTT[selectedType]}
                                <h3 className="m-0">{regimentName || `New ${selectedRegiment.name}`}</h3>
                            </div>
                            
                            <div className="flex flex-row gap-2 align-items-center">
                                {releventClanTT[selectedRegiment.clan_type as clanTypes]}
                                <span className="text-sm">Clan Type</span>
                            </div>

                            <div className="flex flex-column gap-1">
                                <span className="text-sm">Population Required:</span>
                                <span className="font-bold">{selectedRegiment.pops_conusmed} / {settlement.clans.reduce((acc, clan) => {
                                    if (clan.id === selectedRegiment.clan_type) {
                                        return acc + clan.population
                                    }
                                    return acc
                                }, 0)}</span>
                            </div>

                            <div className="flex flex-column gap-1">
                                <span className="text-sm">Turns to Levy:</span>
                                <span className="font-bold">{selectedRegiment.turns_to_levy}</span>
                            </div>

                            <div className="flex flex-column gap-1">
                                <span className="text-sm">Consumption Rate:</span>
                                <DisplayGoods 
                                    stock={settlement.stock} 
                                    change={scaleGoods(selectedRegiment.consumption_rate, -1)}
                                />
                            </div>
                        </div>
                    </Card>

                    <div className="flex flex-row justify-content-end gap-2">
                        <Button 
                            label="Recruit" 
                            icon="pi pi-plus" 
                            onClick={handleRecruit}
                            disabled={!selectedType || settlement.garrison.length >= 20 || settlement.clans.reduce((acc, clan) => {
                                if (clan.id === selectedRegiment.clan_type) {
                                    return acc + clan.population
                                }
                                return acc
                            }, 0) < selectedRegiment.pops_conusmed}
                            tooltip={settlement.garrison.length >= 20 ? "Garrison is at maximum capacity" : undefined}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
