class Military {
    elite_varients: Map<string,EliteVarients> = new Map<string,EliteVarients>();
    upkeep_chart: Map<string,number> = new Map<string,number>();

    regiments: Regiment[] = []

    constructor() {
        // Create different types of elites
        this.elite_varients.set('standard',{
            type: 'Standard',
            standard_multiplier : 1,
            enchanted_armaments_increase : 0,
            levy_increase : 0,
            goods_decrease : 1,
            upkeep_increase : 1,
            pop_consumed_modifier : 1
        })
        this.elite_varients.set('grudge settler',{
            type: 'Grudge Settler',
            standard_multiplier : 2,
            enchanted_armaments_increase : 50,
            levy_increase : 4,
            goods_decrease : 1,
            upkeep_increase : 1.5,
            pop_consumed_modifier : 1
        })
        this.elite_varients.set('regiment of renown',{
            type: 'Regiment of Renown',
            standard_multiplier : 3,
            enchanted_armaments_increase : 75,
            levy_increase : 6,
            goods_decrease : 1,
            upkeep_increase : 2,
            pop_consumed_modifier : 1
        })
        this.elite_varients.set('mercenary',{
            type: 'Mercenary',
            standard_multiplier : 0,
            enchanted_armaments_increase : 0,
            levy_increase : -50,
            goods_decrease : 0,
            upkeep_increase : 8,
            pop_consumed_modifier : 0
        })
        // Different upkeeps
        this.upkeep_chart.set('at peace',0.25);
        this.upkeep_chart.set('low-intensity conflict',0.25);
        this.upkeep_chart.set('provincial warfare',1);
        this.upkeep_chart.set('conventional warfare',1);
    }
    
}

interface EliteVarients {
    type: string,
    standard_multiplier: number,
    enchanted_armaments_increase: number,
    levy_increase: number,
    goods_decrease: number,
    upkeep_increase: number,
    pop_consumed_modifier: number
}