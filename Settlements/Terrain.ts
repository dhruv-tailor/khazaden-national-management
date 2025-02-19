class Terrain {
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

    constructor(name: string, 
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
            ) {
        this.name = name;
        this.reference_pop_cap = reference_pop_cap;
        this.food_and_water       = this.reference_pop_cap * food_and_water_factor;
        this.beer                 = this.reference_pop_cap * beer_factor;
        this.leather_and_textiles = this.reference_pop_cap * leather_and_textiles_factor;
        this.livestock            = this.reference_pop_cap * livestock_factor;
        this.timber               = this.reference_pop_cap * timber_factor;
        this.enchanted_charcoal   = this.reference_pop_cap * enchanted_charcoal_factor;
        this.common_ores          = this.reference_pop_cap * common_ores_factor;
        this.gems                 = this.reference_pop_cap * gems_factor;
        this.rare_ores            = this.reference_pop_cap * rare_ores_factor;
        this.food_and_water_balancing = this.reference_pop_cap * food_and_water_balancing;
        this.beer_balancing = this.reference_pop_cap * beer_balancing;
        this.leather_and_textiles_balancing = this.reference_pop_cap * leather_and_textiles_balancing;
        this.livestock_balancing = this.reference_pop_cap * livestock_balancing;
        this.timber_balancing = this.reference_pop_cap * timber_balancing;
        this.enchanted_charcoal_balancing = this.reference_pop_cap * enchanted_charcoal_balancing;
        this.common_ores_balancing = this.reference_pop_cap * common_ores_balancing;
        this.gems_balancing = this.reference_pop_cap * gems_balancing;
        this.rare_ores_balancing = this.reference_pop_cap * rare_ores_balancing;
    }
}

enum TerrainType {
    Mountain,
    Forest,
    Enchanted_Forest,
    Farmland
}