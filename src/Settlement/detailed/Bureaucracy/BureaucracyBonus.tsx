import { clanTypes } from "../../../Clans/ClanInterface/ClanInterface";
import { SettlementInterface } from "../../SettlementInterface/SettlementInterface";
import { BBFocusSetter } from "./BBFocusSetter";
import DevelopmentIconTT from "../../../tooltips/DevelopmentIconTT";
import EfficencyIconTT from "../../../tooltips/EfficencyIconTT";
import LoyaltyIconTT from "../../../tooltips/LoyaltyIconTT";
import CorveeLaborIconTT from "../../../tooltips/CorveeLaborIconTT";
import PopulationIconTT from "../../../tooltips/PopulationIconTT";
import { Card } from "primereact/card";

export default function BureaucracyBonus({settlement,updateFunc}: {settlement: SettlementInterface,updateFunc: (id: clanTypes, type: string) => void}) {
    const typeA = [
        {id: clanTypes.none,name:'None'},
        {id: clanTypes.runeSmiths,name:'Rune Smiths'},
        {id: clanTypes.craftsmen,name:'Craftsmen'},
        {id: clanTypes.merchants,name:'Merchants'},
        {id: clanTypes.miners,name:'Miners'},
        {id: clanTypes.farmers,name:'Farmers'},
        {id: clanTypes.warriors,name:'Warriors'},
        {id: clanTypes.foresters,name:'Foresters'},
        {id: clanTypes.criminals,name:'Criminals'},
    ]

    const typeB = [
        {id: clanTypes.none,name:'None'},
        {id: clanTypes.farmers,name:'Farmers'},
        {id: clanTypes.warriors,name:'Warriors'},
        {id: clanTypes.foresters,name:'Foresters'},
        {id: clanTypes.criminals,name:'Criminals'},
    ]

    const typeC = [
        {id: clanTypes.none,name:'None'},
        {id: clanTypes.runeSmiths,name:'Rune Smiths'},
        {id: clanTypes.craftsmen,name:'Craftsmen'},
        {id: clanTypes.miners,name:'Miners'},
        {id: clanTypes.farmers,name:'Farmers'},
        {id: clanTypes.warriors,name:'Warriors'},
        {id: clanTypes.foresters,name:'Foresters'},
        {id: clanTypes.criminals,name:'Criminals'},
    ]

    const setbonus = (id: clanTypes,type : string) => updateFunc(id,type)

    return(
        <div className="flex flex-row flex-wrap gap-3">
            {settlement.clans.filter(clan => (clan.id === clanTypes.rulers) && (clan.population > 0)).length > 0 && (
                <Card className="surface-ground">
                    <BBFocusSetter
                        allowlist={typeA}
                        selected={settlement.efficency_bonus}
                        updateFunc={setbonus}
                        type={'efficency'}
                        tt={
                            <div className="flex flex-row gap-1 align-items-center">
                                <EfficencyIconTT/>
                                <span className="font-bold">Efficency Bonus</span>
                            </div>
                        }
                    />
                </Card>
            )}
            {settlement.clans.filter(clan => (clan.id === clanTypes.archivists) && (clan.population > 0)).length > 0 && (
                <Card className="surface-ground">
                    <BBFocusSetter
                        allowlist={typeA}
                        selected={settlement.loyalty_bonus}
                        updateFunc={setbonus}
                        type={'loyalty'}
                        tt={
                            <div className="flex flex-row gap-1 align-items-center">
                                <LoyaltyIconTT/>
                                <span className="font-bold">Loyalty Bonus</span>
                            </div>
                        }
                    />
                </Card>
            )}
            {settlement.clans.filter(clan => (clan.id === clanTypes.engineers) && (clan.population > 0)).length > 0 && (
                <Card className="surface-ground">
                    <BBFocusSetter
                        allowlist={typeB}
                        selected={settlement.corvee_bonus}
                        updateFunc={setbonus}
                        type={'corvee'}
                        tt={
                            <div className="flex flex-row gap-1 align-items-center">
                                <CorveeLaborIconTT/>
                                <span className="font-bold">Corvee Labor Bonus</span>
                            </div>
                        }
                    />
                </Card>
            )}
            <Card className="surface-ground">
                <BBFocusSetter
                    allowlist={typeC}
                    selected={settlement.development_growth_bonus}
                    updateFunc={setbonus}
                    type={'development'}
                    tt={
                        <div className="flex flex-row gap-1 align-items-center">
                            <DevelopmentIconTT/>
                            <span className="font-bold">Development Growth Bonus</span>
                        </div>
                    }
                />
            </Card>
            {settlement.clans.filter(clan => (clan.id === clanTypes.clerics) && (clan.population > 0)).length > 0 && (
                <Card className="surface-ground">
                    <BBFocusSetter
                        allowlist={typeC}
                        selected={settlement.population_growth_bonus}
                        updateFunc={setbonus}
                        type={'population'}
                        tt={
                            <div className="flex flex-row gap-1 align-items-center">
                                <PopulationIconTT/>
                                <span className="font-bold">Population Growth Bonus</span>
                            </div>
                        }
                    />
                </Card>
            )}
        </div>
    )
}