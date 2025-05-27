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
    birth_month: 0
}



