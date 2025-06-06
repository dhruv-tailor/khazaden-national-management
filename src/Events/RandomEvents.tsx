import { SettlementInterface } from "../Settlement/SettlementInterface/SettlementInterface";
import { FederalInterface } from "../utilities/FederalInterface";
import { ReactNode } from "react";
import g0001_overcrowding from "./GenericEvents/0001_overcrowding";
import g0002_populationboom from "./GenericEvents/0002_populationboom";
import g0003_tax_revolt from "./GenericEvents/0003_tax_revolt";
import { ClanInterface, clanTypes } from "../Clans/ClanInterface/ClanInterface";
import g0005_high_productivity from "./GenericEvents/0005_high_productivity";
import g0006_burnout from "./GenericEvents/0006_burnout";
import g0007_sabatoge from "./GenericEvents/0007_sabatoge";
import g0008_resourcefulness from "./GenericEvents/0008_resourcefulness";
import g0009_guildschools from "./GenericEvents/0009_guildschools";
import g0010_infrastructure_decay from "./GenericEvents/0010_infrastructure_decay";
import g0011_cult_of_personality from "./GenericEvents/0011_cult_of_personality";
import g0012_clan_infighting from "./GenericEvents/0012_clan_infighting";
import g0013_smuggling_operation from "./GenericEvents/0013_smuggling_operation";
import g0014_open_lottery from "./GenericEvents/0014_open_lottery";
import g0016_disease from "./GenericEvents/0016_disease";
import g0017_lost_lore from "./GenericEvents/0017_lost_lore";
import g0018_structural_collapse from "./GenericEvents/0018_structural_collapse";
import g0019_masterpiece_created from "./GenericEvents/0019_masterpiece_created";
import g0020_trade_opportunity from "./GenericEvents/0020_trade_opportunity";
import g0023_locust_swarm from "./GenericEvents/0023_locust_swarm";
import g0024_bountiful_harvest from "./GenericEvents/0024_bountiful_harvest";
import g0026_sacred_grove from "./GenericEvents/0026_sacred_grove";
import g0027_crime_bust from "./GenericEvents/0027_crime_bust";
import g0028_gems_craze from "./GenericEvents/0028_gems_craze";
import g0029_runic_fashion from "./GenericEvents/0029_runic_fashion";
import g0030_war_profiteering from "./GenericEvents/0030_war_profiteering";
import g0031_oversupply from "./GenericEvents/0031_oversupply";
import g0032_spoiled_harvest from "./GenericEvents/0032_spoiled_harvest";
import g0033_counterfeit_runes from "./GenericEvents/0033_counterfeit_runes";
import g0034_charcoal_shortage from "./GenericEvents/0034_charcoal_shortage";
import g0035_merchants_flood_market from "./GenericEvents/0035_merchants_flood_market";
import g0036_drought_looms from "./GenericEvents/0036_drought_looms";
import g0037_new_healing_rite from "./GenericEvents/0037_new_healing_rite";
import g0039_runic_storm from "./GenericEvents/0039_runic_storm";
import g0040_cultural_renaissance from "./GenericEvents/0040_cultural_renaissance";
import g0041_technological_revolution from "./GenericEvents/0041_technological_revolution";
import { g0050_merchant_windfall } from "./GenericEvents/0050_merchant_windfall";
import g0051_cultural_exchange from "./GenericEvents/0051_cultural_exchange";
import g0053_envoy_visit from "./GenericEvents/0053_envoy_visit";
import g0054_insulted_banquet from "./GenericEvents/0054_insulted_banquet";
import g0055_international_summit from "./GenericEvents/0055_internation_summit";
import g0058_market_shock from "./GenericEvents/0058_market_shock";
import g0059_market_liberalization from "./GenericEvents/0059_market_liberalization";
import g0062_foreign_mining_vein from "./GenericEvents/0062_foreign_mining_vein";
import g0063_crop_blight from "./GenericEvents/0063_crop_blight";
import g0064_economic_sanctions from "./GenericEvents/0064_economic_sanctions";
import g0068_market_manipulation from "./GenericEvents/0068_market_manipulation";
import g0071_arcane_dispute from "./GenericEvents/0071_arcane_dispute";
import g0072_demand_for_copies from "./GenericEvents/0072_demand_for_copies";
import g0074_archivist_festival from "./GenericEvents/0074_archivist_festival";
import g0078_doctrinal_rift from "./GenericEvents/0078_doctrinal_rift";
interface eventProps {
    id: number,
    conditional: (federal: FederalInterface) => boolean,
    event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => ReactNode
}

export const getRandomEventId = (federal: FederalInterface) => {
    const events = random_events.filter(event => event.conditional(federal))
    return events[Math.floor(Math.random() * events.length)].id
}

export const random_events: eventProps[] = [
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
    },
    {
        id: 6,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0006_burnout({federal, updateFunc})
    },
    {
        id: 7,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.productivity_rate + c.productivity_modifiers.reduce((sum,val) => sum + val.value,0) > 1)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0007_sabatoge({federal, updateFunc})
    },
    {
        id: 8,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0008_resourcefulness({federal, updateFunc})
    },
    {
        id: 9,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0009_guildschools({federal, updateFunc})
    },
    {
        id: 10,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0010_infrastructure_decay({federal, updateFunc})
    },
    {
        id: 11,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0011_cult_of_personality({federal, updateFunc})
    },
    {
        id: 12,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0012_clan_infighting({federal, updateFunc})
    },
    {
        id: 13,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0013_smuggling_operation({federal, updateFunc})
    },
    {
        id: 14,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0014_open_lottery({federal, updateFunc})
    },
    {
        id: 16,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0016_disease({federal, updateFunc})
    },
    {
        id: 17,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0017_lost_lore({federal, updateFunc})
    },
    {
        id: 18,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.engineers && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0018_structural_collapse({federal, updateFunc})
    },
    {
        id: 19,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.craftsmen && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0019_masterpiece_created({federal, updateFunc})
    },
    {
        id: 20,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.merchants && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0020_trade_opportunity({federal, updateFunc})
    },
    {
        id: 23,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.farmers && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0023_locust_swarm({federal, updateFunc})
    },
    {
        id: 24,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.farmers && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0024_bountiful_harvest({federal, updateFunc})
    },
    {
        id: 26,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.foresters && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0026_sacred_grove({federal, updateFunc})
    },
    {
        id: 27,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.foresters && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0027_crime_bust({federal, updateFunc})
    },
    {
        id: 28,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0028_gems_craze({federal, updateFunc})
    },
    {
        id: 29,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0029_runic_fashion({federal, updateFunc})
    },
    {
        id: 30,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0030_war_profiteering({federal, updateFunc})
    },
    {
        id: 31,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0031_oversupply({federal, updateFunc})
    },
    {
        id: 32,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0032_spoiled_harvest({federal, updateFunc})
    },
    {
        id: 33,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0033_counterfeit_runes({federal, updateFunc})
    },
    {
        id: 34,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0034_charcoal_shortage({federal, updateFunc})
    },
    {
        id: 35,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.merchants && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0035_merchants_flood_market({federal, updateFunc})
    },
    {
        id: 36,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0036_drought_looms({federal, updateFunc})
    },
    {
        id: 37,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.clerics && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0037_new_healing_rite({federal, updateFunc})
    },
    {
        id: 39,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0039_runic_storm({federal, updateFunc})
    },
    {
        id: 40,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0040_cultural_renaissance({federal, updateFunc})
    },
    {
        id: 41,
        conditional: (_federal: FederalInterface) => true,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0041_technological_revolution({federal, updateFunc})
    },
    {
        id: 50,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.trade_deals.length > 0),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0050_merchant_windfall({federal, updateFunc})
    },
    {
        id: 51,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.trade_deals.some(td => td.outgoing.books > 0 && td.type === 'foreign')),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0051_cultural_exchange({federal, updateFunc})
    },
    {
        id: 53,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0053_envoy_visit({federal, updateFunc})
    },
    {
        id: 54,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0054_insulted_banquet({federal, updateFunc})
    },
    {
        id: 55,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0055_international_summit({federal, updateFunc})
    },
    {
        id: 58,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0058_market_shock({federal, updateFunc})
    },
    {
        id: 59,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0059_market_liberalization({federal, updateFunc})
    },
    {
        id: 62,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0062_foreign_mining_vein({federal, updateFunc})
    },
    {
        id: 63,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0063_crop_blight({federal, updateFunc})
    },
    {
        id: 64,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0064_economic_sanctions({federal, updateFunc})
    },
    {
        id: 68,
        conditional: (federal: FederalInterface) => federal.foreign_powers.length > 0,
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0068_market_manipulation({federal, updateFunc})
    },
    {
        id: 71,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0071_arcane_dispute({federal, updateFunc})
    },
    {
        id: 72,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0072_demand_for_copies({federal, updateFunc})
    },
    {
        id: 74,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.archivists && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0074_archivist_festival({federal, updateFunc})
    },
    {
        id: 78,
        conditional: (federal: FederalInterface) => federal.settlements.some(s => s.clans.some(c => c.id === clanTypes.clerics && c.population > 0)),
        event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => g0078_doctrinal_rift({federal, updateFunc})
    }
]
