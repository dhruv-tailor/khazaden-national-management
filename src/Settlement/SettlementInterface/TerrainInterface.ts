export enum TerrainType {
    Mountain,
    Forest,
    Enchanted_Forest,
    Farmland
}

interface TerrainDetails {
    name: string;
    reference_pop_cap: number;
    food_and_water: number;
    beer: number;
    leather_and_textiles: number;
    livestock: number;
    timber: number;
    enchanted_charcoal: number;
    common_ores: number;
    gems: number;
    rare_ores: number;
    //Used to change production cap balancing
    food_and_water_balancing: number;
    beer_balancing: number;
    leather_and_textiles_balancing: number;
    livestock_balancing: number;
    timber_balancing: number;
    enchanted_charcoal_balancing: number;
    common_ores_balancing: number;
    gems_balancing: number;
    rare_ores_balancing: number;
}

const newTerrain = (
    name: string, 
    reference_pop_cap: number, 
    food_and_water_factor: number, 
    beer_factor: number, 
    leather_and_textiles_factor: number, 
    livestock_factor: number, 
    timber_factor: number, 
    enchanted_charcoal_factor: number, 
    common_ores_factor: number, 
    gems_factor: number, 
    rare_ores_factor: number,
    food_and_water_balancing: number,
    beer_balancing: number,
    leather_and_textiles_balancing: number,
    livestock_balancing: number,
    timber_balancing: number,
    enchanted_charcoal_balancing: number,
    common_ores_balancing: number,
    gems_balancing: number,
    rare_ores_balancing: number
) => {
    let terrain: TerrainDetails = {
        name: name,
        reference_pop_cap: reference_pop_cap,
        food_and_water: reference_pop_cap * food_and_water_factor,
        beer: reference_pop_cap * beer_factor,
        leather_and_textiles: reference_pop_cap * leather_and_textiles_factor,
        livestock: reference_pop_cap * livestock_factor,
        timber: reference_pop_cap * timber_factor,
        enchanted_charcoal: reference_pop_cap * enchanted_charcoal_factor,
        common_ores: reference_pop_cap * common_ores_factor,
        gems: reference_pop_cap * gems_factor,
        rare_ores: reference_pop_cap * rare_ores_factor,
        food_and_water_balancing: reference_pop_cap * food_and_water_balancing,
        beer_balancing: reference_pop_cap * beer_balancing,
        leather_and_textiles_balancing: reference_pop_cap * leather_and_textiles_balancing,
        livestock_balancing: reference_pop_cap * livestock_balancing,
        timber_balancing: reference_pop_cap * timber_balancing,
        enchanted_charcoal_balancing: reference_pop_cap * enchanted_charcoal_balancing,
        common_ores_balancing: reference_pop_cap * common_ores_balancing,
        gems_balancing: reference_pop_cap * gems_balancing,
        rare_ores_balancing: reference_pop_cap * rare_ores_balancing
    }
    return terrain;
}

export const TerrainData = {
    [TerrainType.Mountain]: newTerrain('Mountain', 75, 1.2, 2, 0, 0, 0, 0, 5, 3, 4,0.6,0.6,0.4,0.4,0.13,0,1.2,1.2,0.6),
    [TerrainType.Forest]: newTerrain('Forest', 25, 1.4, 1.4, 0, 0, 15, 0, 0, 0, 0,1,1,0,0,10,0,0,0,0),
    [TerrainType.Enchanted_Forest]: newTerrain('Enchanted Forest', 10, 1.5, 1.5, 0, 0, 10, 20, 0, 0, 0,1,1,0,0,5,15,0,0,0),
    [TerrainType.Farmland]: newTerrain('Farmland', 40, 3, 1.5, 3, 1.5, 0, 0, 0, 0, 0,1.75,1.75,2.25,1.75,0,0,0,0,0)
}