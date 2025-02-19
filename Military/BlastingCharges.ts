class BlastingCharges extends Regiment {
    pop_type: string = 'Felak'
    pop_consumed: number = 20
    turns_to_levy: number = 1

    tools_consumed_modifier: number = 10
    medical_supplies_consumed_modifier: number = 1
    livestock_consumed_modifier: number = 1
    upkeep_cost_modifier: number = 1
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}