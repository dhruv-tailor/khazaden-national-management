import { clanTypes } from "../../../Clans/ClanInterface/ClanInterface";
import { SettlementInterface } from "../../SettlementInterface/SettlementInterface";
import { BBFocusSetter } from "./BBFocusSetter";
import DevelopmentIconTT from "../../../tooltips/DevelopmentIconTT";
import EfficencyIconTT from "../../../tooltips/EfficencyIconTT";
import LoyaltyIconTT from "../../../tooltips/LoyaltyIconTT";
import CorveeLaborIconTT from "../../../tooltips/CorveeLaborIconTT";
import PopulationIconTT from "../../../tooltips/PopulationIconTT";

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
            {settlement.clans.filter(clan => (clan.id === clanTypes.rulers) && (clan.population > 0)).length > 0? 
            <BBFocusSetter
                allowlist={typeA}
                selected={settlement.efficency_bonus}
                updateFunc={setbonus}
                type={'efficency'}
                tt={
                <div className="flex flex-row gap-1">
                    <EfficencyIconTT/>
                    Efficency Bonus
                </div>
                }
            />: null}
            {settlement.clans.filter(clan => (clan.id === clanTypes.archivists) && (clan.population > 0)).length > 0? 
            <BBFocusSetter
                allowlist={typeA}
                selected={settlement.loyalty_bonus}
                updateFunc={setbonus}
                type={'loyalty'}
                tt={
                <div className="flex flex-row gap-1">
                    <LoyaltyIconTT/>
                    Loyalty Bonus
                </div>
                }
            />: null}
            {settlement.clans.filter(clan => (clan.id === clanTypes.engineers) && (clan.population > 0)).length > 0? 
            <BBFocusSetter
                allowlist={typeB}
                selected={settlement.corvee_bonus}
                updateFunc={setbonus}
                type={'corvee'}
                tt={
                <div className="flex flex-row gap-1">
                    <CorveeLaborIconTT/>
                    Corvee Labor Bonus
                </div>
                }
            />: null}
            {settlement.clans.filter(clan => (clan.id === clanTypes.merchants) && (clan.population > 0)).length > 0? 
            <BBFocusSetter
                allowlist={typeC}
                selected={settlement.development_growth_bonus}
                updateFunc={setbonus}
                type={'development'}
                tt={
                <div className="flex flex-row gap-1">
                    <DevelopmentIconTT/>
                    Development Growth Bonus
                </div>
                }
            />: null}
            {settlement.clans.filter(clan => (clan.id === clanTypes.clerics) && (clan.population > 0)).length > 0? 
            <BBFocusSetter
                allowlist={typeC}
                selected={settlement.population_growth_bonus}
                updateFunc={setbonus}
                type={'population'}
                tt={
                <div className="flex flex-row gap-1">
                    <PopulationIconTT/>
                    Population Growth Bonus
                </div>
                }
            />: null}
        </div>
    )
}