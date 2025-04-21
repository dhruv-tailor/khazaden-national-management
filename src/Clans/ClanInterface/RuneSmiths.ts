import { ClanInterface, clanTypes, empty_clan } from "./ClanInterface"

export const newRuneSmiths = () => {
    const clan: ClanInterface = {...empty_clan}
    clan.name = 'Rune Smiths'
    clan.id = clanTypes.runeSmiths
    clan.consumption_rate = {
        money: 0,
        food: 1,
        beer: 1,
        leather: 1,
        artisanal: 1,
        ornamental: 1,
        livestock: 1,
        enchanted: 0,
        timber: 0,
        tools: 0,
        common_ores: 0,
        medical: 0,
        rare_ores: 1,
        gems: 1,
        runes: 0,
        arms: 0,
        books: 1,
        enchanted_arms: 0,
        charcoal: 1
    }
    clan.isProduced = {
        money: 0,
        food: 0,
        beer: 0,
        leather: 0,
        artisanal: 0,
        livestock: 0,
        ornamental: 0,
        enchanted: 1,
        timber: 0,
        tools: 0,
        common_ores: 0,
        medical: 0,
        rare_ores: 0,
        gems: 0,
        runes: 1,
        arms: 0,
        books: 0,
        enchanted_arms: 1,
        charcoal: 0
    }
    clan.productivity_rate = 5
    return clan;
}