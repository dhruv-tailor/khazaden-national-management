class BugmansRangers extends Regiment {
    pop_type: string = 'Hund'
    pop_consumed: number = 40
    turns_to_levy: number = 3

    tools_consumed_modifier: number = 0
    medical_supplies_consumed_modifier: number = 0
    livestock_consumed_modifier: number = 0
    armaments_consumed_modifier: number = 3
    enchanted_armaments_consumed_modifier: number = 2
    upkeep_cost_modifier: number = 6
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}