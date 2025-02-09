class Settlement {
    name: string;
    terrain_type: Terrain;
    tier: SettlementTier;
    pop_cap: number;
    expansion_cost: number;
    initial_cl: number;

    // Resource Caps
    food_and_water_cap: number = 0;
    beer_cap: number = 0;
    leather_and_textiles_cap: number = 0;
    livestock_cap: number = 0;
    timber_cap: number = 0;
    enchanted_charcoal_cap: number = 0;
    common_ores_cap: number = 0;
    gems_cap: number = 0;
    rare_ores_cap: number = 0;

    constructor(name: string, terrain_type: Terrain, tier: SettlementTier = SettlementTier.Hamlet,expansion_factor: number, initial_cl: number = 0) {
        this.name = name;
        this.terrain_type = terrain_type;
        this.tier = tier;
        this.pop_cap = (2 ** (this.tier-1)) * this.terrain_type.reference_pop_cap;
        this.expansion_cost = (2 ** (this.tier-1)) ** 2 * expansion_factor;
        this.initial_cl = initial_cl;
        this.set_resource_caps();
    }

    set_resource_caps() {
        this.food_and_water_cap = this.terrain_type.food_and_water_balancing * (2 ** (this.tier - 1))
        this.beer_cap = this.terrain_type.beer_balancing * (2 ** (this.tier - 1))
        this.leather_and_textiles_cap = this.terrain_type.leather_and_textiles_balancing * (2 ** (this.tier - 1))
        this.livestock_cap = this.terrain_type.livestock_balancing * (2 ** (this.tier - 1))
        this.timber_cap = this.terrain_type.timber_balancing * (2 ** (this.tier - 1))
        this.enchanted_charcoal_cap = this.terrain_type.enchanted_charcoal_balancing * (2 ** (this.tier - 1))
        this.common_ores_cap = this.terrain_type.common_ores_balancing * (2 ** (this.tier - 1))
        this.gems_cap = this.terrain_type.gems_balancing * (2 ** (this.tier - 1))
        this.rare_ores_cap = this.terrain_type.rare_ores_balancing * (2 ** (this.tier - 1))
    }
}

enum SettlementTier {
    Hamlet,
    Village,
    Town,
    City,
    Metropolis,
}