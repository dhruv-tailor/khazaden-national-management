import { calcDevelopment } from "../../Clans/ClanInterface/ClanInterface";
import PlusMinus from "../../components/PlusMinus";
import DevelopmentIconTT from "../../tooltips/DevelopmentIconTT";
import EfficencyIconTT from "../../tooltips/EfficencyIconTT";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import TimberIconTT from "../../tooltips/goods/TimberIconTT";
import ToolsIconTT from "../../tooltips/goods/ToolsIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0010_infrastructure_decay({federal,updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const rand_clan = rand_settlement.clans.filter(clan => clan.population > 0)[Math.floor(Math.random() * rand_settlement.clans.filter(clan => clan.population > 0).length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                clans: s.clans.map(c => c.id === rand_clan.id ? {
                    ...c, 
                    development: c.development - Math.round(calcDevelopment(c,s) * 12),
                    efficency_modifiers: [...c.efficency_modifiers,{name: 'Infrastructure Decay', value: -1, duration: 12}]
                } : c)
            }
        })
    })

    const fixIt = () => {
        updateFunc({
            ...federal,
            settlements: federal.settlements.map(s => {
                if (s.global_id !== rand_settlement.global_id) {return s}
                return {
                    ...s,
                    stock: {
                        ...s.stock,
                        timber: s.stock.timber - (rand_clan.population * 12),
                        tools: s.stock.tools - (rand_clan.population * 12),
                        money: s.stock.money - Math.round((rand_settlement.prices.timber + rand_settlement.prices.tools) * (rand_clan.population * 12))
                    }
                }
            })
        })
    }

    return (
        <EventTemplate
            title="Infrastructure Decay"
            body={`The infrastructure of ${rand_clan.name} in ${rand_settlement.visible_name} is decaying.`}
            effect_buttons={[
                {
                    title: "Do Nothing",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <DevelopmentIconTT/>
                            <PlusMinus value={-Math.round(calcDevelopment(rand_clan,rand_settlement) * 12)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <EfficencyIconTT/>
                            <PlusMinus value={-1}/>
                            For {rand_clan.name} in {rand_settlement.name} one year
                        </div>
                    </div>
                },
                {
                    title: "Fix it",
                    effect: fixIt,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <TimberIconTT/>
                            <PlusMinus value={-(rand_clan.population * 12)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <ToolsIconTT/>
                            <PlusMinus value={-(rand_clan.population * 12)}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <MoneyIconTT/>
                            <PlusMinus value={-Math.round((rand_settlement.prices.timber + rand_settlement.prices.tools) * (rand_clan.population * 12))}/>
                        </div>
                    </div>
                }
            ]}
        />
    )
}
