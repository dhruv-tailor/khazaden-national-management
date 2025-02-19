class Thunderers extends Regiment {
    pop_type: string = 'Baruk'
    pop_consumed: number = 10
    turns_to_levy: number = 3

    tools_consumed_modifier: number = 1
    medical_supplies_consumed_modifier: number = 1
    livestock_consumed_modifier: number = 1
    armaments_consumed_modifier: number = 4
    enchanted_armaments_consumed_modifier: number = 0
    upkeep_cost_modifier: number = 4.5
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}