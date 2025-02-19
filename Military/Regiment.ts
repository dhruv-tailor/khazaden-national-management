class Regiment {
    name: string
    pop_type: string = ''
    pop_consumed: number = 0
    turns_to_levy: number = 0
    tools_consumed: number = 0
    medical_supplies_consumed: number = 0
    livestock_consumed: number = 0
    armaments_consumed: number = 0
    enchanted_armaments_consumed: number = 0
    upkeep_cost: number = 0

    tools_factor: number = 20
    medical_supplies_factor: number = 20
    livestock_factor: number = 75
    armaments_factor: number = 10
    enchanted_armaments_factor: number = 10
    upkeep_factor: number = 10

    tools_consumed_modifier: number = 0
    medical_supplies_consumed_modifier: number = 0
    livestock_consumed_modifier: number = 0
    armaments_consumed_modifier: number = 0
    enchanted_armaments_consumed_modifier: number = 0
    upkeep_cost_modifier: number = 0

    elite_varient: EliteVarients;
    damage_taken: number = 0;
    months_left_to_levy: number;
    is_levied: boolean = false;
    months_left: number = 0;
    population_occupied: number;
    population_lost: number = 0;

    upkeep_modifier: number;


    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        this.elite_varient = elite_varient;
        this.upkeep_modifier = upkeep_modifier;
        this.name = name;
        const MODIFY = this.elite_varient.goods_decrease * this.elite_varient.standard_multiplier * this.upkeep_modifier;
        this.tools_consumed               = Math.round(this.tools_consumed_modifier * this.tools_factor  * MODIFY);
        this.medical_supplies_consumed    = Math.round(this.medical_supplies_consumed_modifier * this.medical_supplies_factor * MODIFY);
        this.livestock_consumed           = Math.round(this.livestock_consumed_modifier * this.livestock_factor * MODIFY);
        this.armaments_consumed           = Math.round(this.armaments_consumed_modifier  * this.armaments_factor * MODIFY);
        this.enchanted_armaments_consumed = Math.round(this.enchanted_armaments_consumed_modifier * this.enchanted_armaments_factor * MODIFY + this.elite_varient.enchanted_armaments_increase * upkeep_modifier);
        this.upkeep_cost = this.upkeep_cost_modifier * this.upkeep_factor * this.elite_varient.upkeep_increase * this.upkeep_modifier

        this.months_left_to_levy = Math.max(1,this.turns_to_levy + this.elite_varient.levy_increase)
        this.population_occupied = Math.round(this.pop_consumed * this.elite_varient.pop_consumed_modifier)
    }

    calculate_population_loss() {
        this.population_lost = Math.round(this.population_occupied * this.damage_taken)
    }


}