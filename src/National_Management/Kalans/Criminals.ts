class Criminals extends Kalan {

    corvee_labor: number = 100
    base_loyalty: number = -3
    unmodified_loyalty: number = 2
    cl_points_gained: number = 0

    constructor() {
        super()
    }

    update_loyalty(goods: Map<string, Good>,mazar: Archivists) {
        let beaurcracy_bonus = 0
        if(mazar.bureaucratic_component.focus === BureaucraticFocus.Zaharn){
            beaurcracy_bonus = mazar.bureaucratic_component.bonus
        }
        this.loyalty = Math.min(
            10+this.max_loyalty_modifier,
            Math.floor(Math.max(
                0,
                this.base_loyalty + 
                (this.loyalty_modifiers.get(this.tax_rate) ?? 0) + 
                this.rp_loyalty_modifier + 
                (this.loyalty_managed_chart.get(this.is_party_managed) ?? 0) + 
                (
                    // C532+C533+C534
                    (goods.get('Beer')?.initial_needs_met ?? 0) + 
                    (goods.get('Leather and Textiles')?.initial_needs_met ?? 0) +
                    (goods.get('Artisinal Goods')?.initial_needs_met ?? 0)
                ) / 3 * 5
            )) + beaurcracy_bonus)
    }

    update_efficiency(goods: Map<string, Good>,uzbaden: Rulers) {
        let beaurcracy_bonus = 0
        if(uzbaden.bureaucratic_component.focus === BureaucraticFocus.Zaharn){
            beaurcracy_bonus = uzbaden.bureaucratic_component.bonus
        }
        this.efficiency = Math.floor(Math.max(
            0,
            this.base_productivity +
            (this.loyalty_managed_chart.get(this.is_party_managed) ?? 0) +
            this.development.development_modifier() +
                ((goods.get('Tools')?.initial_needs_met ?? 0) * 5)
        )*beaurcracy_bonus)
    }

    update_population(_military: Military) {
        let pop_loss = 0;
        _military.regiments.forEach((regiment) =>{
            if(regiment.pop_type === 'Zaharn') {
                pop_loss += regiment.population_lost
            }
        })
        this.population = this.initial_population - pop_loss
    }

    update_total_productivity(_military: Military) {
        let pop_held_up = 0
        _military.regiments.forEach(regiment => {
            if (regiment.pop_type === 'Zaharn') {
                pop_held_up += regiment.population_lost;
                pop_held_up -= regiment.population_occupied;
            }
        })
        this.total_productivity = Math.round(((this.loyalty + this.efficiency)/20) * 40 * this.productivity_rate * (this.population + pop_held_up))
    }

    update_taxed_productivity(_military: Military){
        let pop_held_up = 0
        _military.regiments.forEach(regiment => {
            if (regiment.pop_type === 'Zaharn') {
                pop_held_up += regiment.population_lost;
                pop_held_up -= regiment.population_occupied;
            }
        })
        this.taxed_productivity = Math.round(((this.loyalty+this.efficiency)/20) * 40 * this.productivity_rate * (this.population + pop_held_up) * (this.tax_rates.get(this.tax_rate) ?? 0))
        this.taxed_productivity = Math.round(((this.loyalty+this.efficiency)/20) * 40 * this.productivity_rate * (this.population + pop_held_up) * (1 - (this.tax_rates.get(this.tax_rate) ?? 0)))
    }

    update_development_growth(baraz: Merchants): void {
        this.development_growth = this.untaxed_productivity * 0.3
        if (baraz.bureaucratic_component.focus === BureaucraticFocus.Zaharn) {
            this.development_growth *= baraz.bureaucratic_component.bonus
        }
    }

    update_population_growth(zigil: Clerics) {
        this.population_growth = this.untaxed_productivity * 0.7
        if (zigil.bureaucratic_component.focus === BureaucraticFocus.Zaharn) {
            this.development_growth *= zigil.bureaucratic_component.bonus
        }
    }

    update_cl_points_gained(uzbaden: Rulers) {
        this.cl_points_gained = 0
        if (this.corvee_labor > 0 && this.population > 0) {
            this.cl_points_gained = this.corvee_labor / 100 * this.taxed_productivity
            if(uzbaden.bureaucratic_component.focus === BureaucraticFocus.Zaharn) {
                this.cl_points_gained *= uzbaden.bureaucratic_component.bonus
            }
        }
    }

}