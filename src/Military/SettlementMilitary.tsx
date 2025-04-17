import { useEffect, useState } from "react"
import { saveLocation } from "../utilities/SaveData";
import { useNavigate, useParams } from "react-router"
import { empty_settlement, SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface"
import { load } from "@tauri-apps/plugin-store";
import { Button } from "primereact/button";
import Regiment from "./Regiment";
import { Panel } from "primereact/panel";
import DisplayGoods from "../components/goodsDislay";
import { empty_goodsdist } from "../Goods/GoodsDist";
import { subtractGoods } from "../Goods/GoodsDist";
import { Dialog } from "primereact/dialog";
import RecruitRegiment from "./RecruitRegiment";
import { RegimentInterface } from "./units/RegimentInterface";
import { ClanInterface, clanTypes } from "../Clans/ClanInterface/ClanInterface";

export default function SettlementMilitary() {
    const gameId = useParams().game
    const settlementId = useParams().settlement

    const [settlement, setSettlement] = useState<SettlementInterface>({...empty_settlement})
    const [recruitDialogVisible, setRecruitDialogVisible] = useState(false);
    let navigate = useNavigate();

    const getSettlement = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        const current_settlement = settlements?.find(settlement => settlement.name === settlementId)
        if(current_settlement) {setSettlement(current_settlement)}
    }
    useEffect(() => {
        getSettlement()
    }, [])

    const renameRegiment = (newName: string, id: number) => {
        const updatedGarrison = settlement.garrison.map(r => r.id === id ? {...r, name: newName} : r)
        setSettlement({...settlement, garrison: updatedGarrison})
    }

    const handleRecruit = (newRegiment: RegimentInterface) => {
        if (settlement.garrison.length >= 20) return;
        
        setSettlement({
            ...settlement,
            projected_pop: settlement.projected_pop - newRegiment.pops_conusmed,
            garrison: [...settlement.garrison, newRegiment],
            clans: [...settlement.clans.map(c => {
                if (c.id !== newRegiment.clan_type) {return {...c} as ClanInterface}
                return {...c, population: c.population - newRegiment.pops_conusmed}
            })]
        });
        setRecruitDialogVisible(false);
    }

    const replenishRegiment = (amount: number, id: number) => {
        let clan_type = 0
        const updatedGarrison = settlement.garrison.map(r =>  {
            if (r.id !== id) {return {...r} as RegimentInterface}
            clan_type = r.clan_type
            return {...r, pops_conusmed: r.pops_conusmed + amount}
        })
        const updatedClans = settlement.clans.map(c => {
            if (c.id !== clan_type as clanTypes) {return {...c} as ClanInterface}
            return {...c, population: c.population - amount}
        })
        setSettlement({...settlement, garrison: updatedGarrison, clans: updatedClans, projected_pop: settlement.projected_pop - amount})
    }

    const saveData = async () => {
        const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
        const settlements = await store.get<SettlementInterface[]>('settlements');
        const updatedSettlements = settlements?.map(s => {
            if(s.name === settlement.name) {return {...settlement}}
            return s
        })
        store.set('settlements', updatedSettlements)
        store.save()
    }

    const navigateTo = async (path: string) => {
        await saveData()
        navigate(path)
    }

    const disbandRegiment = (id: number) => {
        const clan_type = settlement.garrison.find(r => r.id === id)?.clan_type
        const population = settlement.garrison.find(r => r.id === id)?.pops_conusmed
        const updatedGarrison = settlement.garrison.filter(r => r.id !== id)
        const updatedClans = settlement.clans.map(c => {
            if (c.id !== clan_type as clanTypes) {return {...c} as ClanInterface}
            return {...c, population: c.population + (population ?? 0)}
        })
        setSettlement({...settlement, 
            garrison: updatedGarrison,
            clans: updatedClans,
            projected_pop: settlement.projected_pop + (population ?? 0)
        })
    }

    return (
        <div className="flex flex-column gap-3 p-3">
            <div className="flex flex-row justify-content-between align-items-center">
                <Button 
                    label={`Back to ${settlement.visible_name}`} 
                    icon="pi pi-arrow-left" 
                    size="small" 
                    onClick={() => navigateTo(`/game/${gameId}/settlement/${settlementId}`)} 
                />
                <div className="flex flex-row gap-2 align-items-center">
                    <span className="text-lg">Garrison Size: {settlement.garrison.length} / 20</span>
                    <Button 
                        label="Recruit Regiment" 
                        icon="pi pi-plus" 
                        onClick={() => setRecruitDialogVisible(true)}
                        disabled={settlement.garrison.length >= 20}
                        tooltip={settlement.garrison.length >= 20 ? "Garrison is at maximum capacity" : undefined}
                    />
                </div>
            </div>

            <Panel header='Military Consumption'>
                <DisplayGoods 
                    stock={settlement.stock} 
                    change={settlement.garrison.reduce((sum,val) => subtractGoods(sum,val.consumption_rate),{...empty_goodsdist})}
                />
            </Panel>

            <Panel header='Garrison'>
                <div className="flex flex-column gap-3">
                    {settlement.garrison.map(r => (
                        <div key={r.id}>
                            <Regiment regiment={r} onRename={(newName) => renameRegiment(newName, r.id)} availablePops={settlement.clans.reduce((sum,val) => {
                                if (val.id === r.clan_type) {return sum + val.population}
                                return sum
                            }, 0)} onReplenish={replenishRegiment} onDisband={disbandRegiment}/>
                        </div>
                    ))}
                </div>
            </Panel>

            <Dialog 
                header="Recruit Regiment" 
                visible={recruitDialogVisible} 
                onHide={() => setRecruitDialogVisible(false)}
                style={{ width: '50vw' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            >
                <RecruitRegiment 
                    settlement={settlement} 
                    onRecruit={handleRecruit}
                />
            </Dialog>
        </div>
    )
}
