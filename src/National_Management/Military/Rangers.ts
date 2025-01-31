class Rangers extends Regiment {
    pop_type: string = 'Hund'
    pop_consumed: number = 20
    turns_to_levy: number = 2

    tools_consumed_modifier: number = 0
    medical_supplies_consumed_modifier: number = 0
    livestock_consumed_modifier: number = 0
    armaments_consumed_modifier: number = 3
    enchanted_armaments_consumed_modifier: number = 0
    upkeep_cost_modifier: number = 3
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}