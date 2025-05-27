import { CharacterInterface, empty_character } from "./CharacterInterface";
import { positive_traits, vices } from "./traits";
import { negative_traits } from "./traits";
import { dwarf_family_names, dwarf_names_female } from "./names";
import { dwarf_names_male } from "./names";
import { gaussian_random } from "../../utilities/SimpleFunctions";

export const generate_random_character = (id: string, gender: "male" | "female" | "random", family_name?: string): CharacterInterface => {
    const character = {...empty_character};
    character.id = id;
    // Generate gender
    if (gender === "random") { character.gender = Math.random() < 0.5 ? "male" : "female"; } 
    else { character.gender = gender; }
    // Generate name
    character.name = generate_name(character.gender);
    character.family_name = family_name || generate_family_name();
    // Generate traits
    character.positive_traits = generate_traits(positive_traits);
    character.negative_traits = generate_traits(negative_traits);
    character.vices = generate_vices();
    const sexuality = Math.random();
    if (sexuality < 0.01) { character.sexuality = "asexual"; }
    else if (sexuality < 0.04) { character.sexuality = "bisexual"; }
    else if (sexuality < 0.08) { character.sexuality = "gay"; }
    else { character.sexuality = "straight"; }
    character.age = generate_age();
    character.birth_month = Math.floor(Math.random() * 12);
    return character;
}

const generate_name = (gender: "male" | "female"): string => {
    if (gender === "male") {
        return dwarf_names_male[Math.floor(Math.random() * dwarf_names_male.length)];
    } else {
        return dwarf_names_female[Math.floor(Math.random() * dwarf_names_female.length)];
    }
}

const generate_family_name = (): string => dwarf_family_names[Math.floor(Math.random() * dwarf_family_names.length)];

const generate_traits = (traits: string[]): string[] => {
    const number_of_traits = Math.floor(Math.random() * 5) + 1;
    const selected_traits: string[] = [];
    let traits_to_select = [...traits];
    for (let i = 0; i < number_of_traits; i++) {
        const trait = traits_to_select[Math.floor(Math.random() * traits_to_select.length)];
        selected_traits.push(trait);
        traits_to_select = traits_to_select.filter(t => t !== trait);
    }
    return selected_traits;
}

const generate_vices = (): string[] => {
    const d20_roll = Math.floor(Math.random() * 20) + 1;
    let number_of_vices = 0;
    if (d20_roll === 20) { number_of_vices = 5; }
    else { number_of_vices = d20_roll % 5 }
    const selected_vices: string[] = [];
    let vices_to_select = [...vices];
    for (let i = 0; i < number_of_vices; i++) {
        const vice = vices_to_select[Math.floor(Math.random() * vices_to_select.length)];
        selected_vices.push(vice);
        vices_to_select = vices_to_select.filter(t => t !== vice);
    }
    return selected_vices;
}

const generate_age = (): number => Math.abs(Math.round(gaussian_random(39, 20)))

const generate_parents = (id: number,character: CharacterInterface) => {
    // Parents
    let update_id = id;
    const father = generate_random_character(`c${update_id}`, 'male');
    update_id++;
    father.age = Math.abs(Math.floor(Math.random() * 10) + 20 + character.age);
    father.family_name = character.family_name;
    character.father = father.id;
    const mother = generate_random_character(`c${update_id}`, 'female');
    update_id++;
    mother.age = Math.abs(Math.floor(Math.random() * 10) + 20 + character.age);
    father.spouse = mother.id;
    mother.spouse = father.id;
    character.mother = mother.id;
    return [father,mother];
}


export const generate_family = (id: number) => {
    const family = []
    let update_id = id;
    const main_character = generate_random_character(`c${update_id}`, 'random');
    family.push(main_character);
    update_id++;
    // Parents
    const [father,mother] = generate_parents(update_id,main_character);
    main_character.father = father.id;
    family.push(father);
    main_character.mother = mother.id;
    family.push(mother);
    update_id += 2
    // Spouse
    if (main_character.age >= 18) {
        const spouse = generate_random_character(`c${update_id}`, main_character.gender === 'male' ? 'female' : 'male');
        update_id++;
        spouse.age = Math.max(Math.round(gaussian_random(main_character.age, 10)), 18);
        spouse.spouse = main_character.id;
        main_character.spouse = spouse.id;
        family.push(spouse);
        const number_of_children = Math.floor(Math.random() * 4);
        for (let i = 0; i < number_of_children; i++) {
            const child = generate_random_character(`c${update_id}`, 'random');
            update_id++;
            child.family_name = main_character.family_name;
            child.father = spouse.gender === 'male' ? spouse.id : main_character.id;
            child.mother = spouse.gender === 'female' ? spouse.id : main_character.id;
            child.age = Math.max(Math.floor(Math.random() * 5) - 18 + main_character.age, 0);
            main_character.children.push(child.id);
            spouse.children.push(child.id);
            family.push(child);
        }
    }
    // Siblings
    const number_of_siblings = Math.floor(Math.random() * 4);
    for (let i = 0; i < number_of_siblings; i++) {
        const sibling = generate_random_character(`c${update_id}`, 'random');
        sibling.age = Math.max(Math.floor(Math.random() * 20) - 10 + main_character.age, 0);
        update_id++;
        sibling.family_name = main_character.family_name;
        sibling.father = father.id;
        sibling.mother = mother.id;
        family.push(sibling);
        // If the sibling is older than 18, they can have children and a spouse
        if (sibling.age >= 18) {
            const spouse = generate_random_character(`c${update_id}`, sibling.gender === 'male' ? 'female' : 'male');
            update_id++;
            spouse.age = Math.max(Math.round(gaussian_random(sibling.age, 10)), 18);
            spouse.spouse = sibling.id; 
            sibling.spouse = spouse.id;
            const number_of_children = Math.floor(Math.random() * 4);
            for (let i = 0; i < number_of_children; i++) {
                const child = generate_random_character(`c${update_id}`, 'random');
                update_id++;
                child.family_name = sibling.family_name;
                child.father = sibling.gender === 'male' ? sibling.id : spouse.id;
                child.mother = sibling.gender === 'female' ? sibling.id : spouse.id;
                child.age = Math.max(Math.floor(Math.random() * 5) - 18 + sibling.age, 0);
                sibling.children.push(child.id);
                spouse.children.push(child.id);
                family.push(child);
            }
        }
    }
    return family;
}
