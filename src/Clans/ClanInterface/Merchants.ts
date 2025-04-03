import { ClanInterface, clanTypes, empty_clan } from "./ClanInterface"

export const newMerchants = () => {
    const clan: ClanInterface = {...empty_clan}
    clan.name = 'Merchants'
    clan.id = clanTypes.merchants
    clan.consumption_rate = {
        money: 0,
        food: 1,
        beer: 1,
        leather: 1,
        artisinal: 1,
        ornamental: 1,
        livestock: 1,
        enchanted: 0,
        timber: 0,
        tools: 0,
        common_ores: 0,
        medical: 0,
        rare_ores: 0,
        gems: 0,
        runes: 0,
        arms: 0,
        books: 0,
        enchanted_arms: 0,
        charcoal: 0
    }
    clan.isProduced = {
        money: 0,
        food: 0,
        beer: 0,
        leather: 0,
        artisinal: 0,
        livestock: 0,
        ornamental: 0,
        enchanted: 0,
        timber: 0,
        tools: 0,
        common_ores: 0,
        medical: 0,
        rare_ores: 0,
        gems: 0,
        runes: 0,
        arms: 0,
        books: 0,
        enchanted_arms: 0,
        charcoal: 0
    }
    clan.productivity_rate = 4
    return clan;
}