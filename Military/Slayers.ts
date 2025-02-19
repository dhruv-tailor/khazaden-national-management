class Slayers extends Regiment {
    pop_type: string = 'Zaharn'
    pop_consumed: number = 10
    turns_to_levy: number = 1
    tools_consumed_modifier: number = 2.5
    upkeep_cost_modifier: number = 25
    
    constructor(name: string,elite_varient: EliteVarients,upkeep_modifier: number) {
        super(name,elite_varient,upkeep_modifier)
    }
}