import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";
import { FederalInterface } from "../utilities/FederalInterface";
import { ReactNode } from "react";
import g0001_overcrowding from "./GenericEvents/0001_overcrowding";
import g0002_populationboom from "./GenericEvents/0002_populationboom";
import g0003_tax_revolt from "./GenericEvents/0003_tax_revolt";
import { ClanInterface } from "../Clans/ClanInterface/ClanInterface";
import g0005_high_productivity from "./GenericEvents/0005_high_productivity";
interface eventProps {
    id: number,
    conditional: (federal: FederalInterface) => boolean,
    event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => ReactNode
}

const random_events: eventProps[] = [
    {
        id: 1,
        conditional: (federal: FederalInterface) => federal.settlements.some(
            (settlement: SettlementInterface) => settlement.clans.reduce(
                (acc, clan) => acc + clan.population, 0
            ) >= settlement.pop_cap * 0.8
        ),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0001_overcrowding({federal, updateFunc})
    },
    {
        id: 2,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0002_populationboom({federal, updateFunc})
    },
    {
        id: 3,
        conditional: (federal: FederalInterface) => federal.settlements.some(
            (settlement: SettlementInterface) => settlement.clans.some((clan: ClanInterface) => clan.tax_rate > 0.75)
        ),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0003_tax_revolt({federal, updateFunc})
    },
    {
        id: 5,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0005_high_productivity({federal, updateFunc})
    }
]

export default random_events;