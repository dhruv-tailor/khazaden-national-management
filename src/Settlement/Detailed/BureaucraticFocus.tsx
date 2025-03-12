import { ReactNode, useState } from "react";
import { clans } from "../../Goods/good";
import { Dropdown } from "primereact/dropdown";
import { load } from "@tauri-apps/plugin-store";
import { saveLocation } from "../../utilities/SaveData";
import { useParams } from "react-router";
import { SettlementInterface } from "../SettlementInterface";

interface allowProp {
    id: clans,
    name: string
}

export default function BureaucraticFocus(
    {type,allowlist,icon,currentSelection, updateFunction}: 
    {type: string,allowlist: allowProp[],icon:ReactNode,currentSelection: allowProp,updateFunction: () => Promise<void>}
) {
    const [selectedClan,setSelectedClan] = useState<allowProp>(allowlist.filter(allow => allow.id === currentSelection.id)[0])
    const gameId = useParams().game
    const settlementId = useParams().settlement

    const updateBonuses = async (id: clans) => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        settlements?.forEach(s => {
            if (s.name === settlementId) {
                if (type === 'Efficiency') {s.efficency_bonus = id}
                if (type === 'Loyalty') {s.loyalty_bonus = id}
                if (type === 'Corvee Labor') {s.corvee_bonus = id}
                if (type === 'Development Growth') {s.development_growth_bonus = id}
            }
        })
        store.set('settlements',settlements)
        store.save()
        console.log('presave')
        await updateFunction()
        console.log('postsave')
    }
    return(
        <div className="flex flex-column">
            <div className="flex flex-row gap-1">
                {icon}
                {type}
            </div>
            <Dropdown
                placeholder={currentSelection ? currentSelection.name : 'Select a Clan'}
                value={selectedClan} 
                optionLabel={'name'} 
                options={allowlist} 
                onChange={e => {
                    setSelectedClan(e.value)
                    updateBonuses(e.value ? e.value.id : clans.none)
                }}
            />
        </div>
    )
}