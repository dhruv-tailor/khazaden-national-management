import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import { empty_goodsdist, goodsdist } from "../../Goods/GoodsDist";

export interface CharacterInterface {
    name: string;
    family_name: string;
    title: string;
    age: number;
    gender: "male" | "female";
    sexuality: "straight" | "gay" | "bisexual" | "asexual";
    id: string;
    positive_traits: string[];
    negative_traits: string[];
    vices: string[];
    mother: string | null;
    father: string | null;
    children: string[];
    spouse: string | null;
    alive: boolean;
    birth_month: number;
    // Only relevant for Clan leaders
    desired_max_tax_rate: number;
    // Only relevant for Governers
    desired_min_clan_tax_rates: { [key in clanTypes]?: { tax_rate: number }};
    desired_max_federal_tax_rates: goodsdist;
    // Only relevant for Kings
    desired_min_federal_tax_rates: goodsdist;
}

export const empty_character: CharacterInterface = {
    name: "",
    family_name: "",
    title: "",
    age: 20,
    gender: "male",
    sexuality: "straight",
    id: "",
    positive_traits: [],
    negative_traits: [],
    vices: [],
    mother: null,
    father: null,
    children: [],
    spouse: null,
    alive: true,
    birth_month: 0,
    desired_max_tax_rate: 0,
    desired_min_clan_tax_rates: {},
    desired_max_federal_tax_rates: {...empty_goodsdist},
    desired_min_federal_tax_rates: {...empty_goodsdist}
}



