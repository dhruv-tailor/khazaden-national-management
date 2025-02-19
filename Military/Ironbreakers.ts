class Ironbreakers extends Regiment {
    pop_type: string = 'Baruk'
    pop_consumed: number = 20
    turns_to_levy: number = 6

    tools_consumed_modifier: number = 1
    medical_supplies_consumed_modifier: number = 1
    livestock_consumed_modifier: number = 2
    armaments_consumed_modifier: number = 5
    enchanted_armaments_consumed_modifier: number = 3
    upkeep_cost_modifier: number = 10
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}