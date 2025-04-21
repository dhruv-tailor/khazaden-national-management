import { ClanInterface, clanTypes, empty_clan } from "./ClanInterface"

export const newCraftsmen = () => {
    const clan: ClanInterface = {...empty_clan}
    clan.name = 'Craftsmen'
    clan.id = clanTypes.craftsmen
    clan.consumption_rate = {
        money: 0,
        food: 1,
        beer: 1,
        leather: 1,
        artisanal: 1,
        ornamental: 1,
        livestock: 0,
        enchanted: 0,
        timber: 1,
        tools: 0,
        common_ores: 5,
        medical: 0,
        rare_ores: 0,
        gems: 1,
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
        artisanal: 1,
        livestock: 0,
        ornamental: 1,
        enchanted: 0,
        timber: 0,
        tools: 1,
        common_ores: 0,
        medical: 0,
        rare_ores: 0,
        gems: 0,
        runes: 0,
        arms: 1,
        books: 0,
        enchanted_arms: 0,
        charcoal: 0
    }
    clan.productivity_rate = 5
    return clan;
}