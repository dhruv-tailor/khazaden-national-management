class Thunderbarge extends Regiment {
    pop_type: string = 'Kheled'
    pop_consumed: number = 50
    turns_to_levy: number = 12

    tools_consumed_modifier: number = 20
    medical_supplies_consumed_modifier: number = 0
    livestock_consumed_modifier: number = 0
    armaments_consumed_modifier: number = 15
    enchanted_armaments_consumed_modifier: number = 30
    upkeep_cost_modifier: number = 100
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}