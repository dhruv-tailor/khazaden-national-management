class Gyrobombers extends Regiment {
    pop_type: string = 'Kheled'
    pop_consumed: number = 20
    turns_to_levy: number = 6

    tools_consumed_modifier: number = 15
    medical_supplies_consumed_modifier: number = 0
    livestock_consumed_modifier: number = 0
    armaments_consumed_modifier: number = 4
    enchanted_armaments_consumed_modifier: number = 6
    upkeep_cost_modifier: number = 20
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}