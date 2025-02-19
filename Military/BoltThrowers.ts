class BoltThrowers extends Regiment {
    pop_type: string = 'Kheled'
    pop_consumed: number = 2
    turns_to_levy: number = 2

    tools_consumed_modifier: number = 1
    medical_supplies_consumed_modifier: number = 0
    livestock_consumed_modifier: number = 3
    armaments_consumed_modifier: number = 4
    enchanted_armaments_consumed_modifier: number = 0
    upkeep_cost_modifier: number = 3
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}