class Engineers extends Kalan {

    direct_tax_points: number = 100
    bureaucratic_component: BureaucraticComponent = new BureaucraticComponent([
        BureaucraticFocus.Felak,
        BureaucraticFocus.Zaram,
        BureaucraticFocus.Baruk,
        BureaucraticFocus.Hund,
        BureaucraticFocus.Zaharn,
    ],30)

    productivity_rate_modifier: number = 6

    constructor() {
        super()
    }

    update_loyalty(goods: Map<string, Good>) {
        this.loyalty = Math.min(
            10+this.max_loyalty_modifier,
            Math.floor(Math.max(
                0,
                this.base_loyalty + 
                (this.loyalty_modifiers.get(this.tax_rate) ?? 0) + 
                this.rp_loyalty_modifier + 
                (this.loyalty_managed_chart.get(this.is_party_managed) ?? 0) + 
                (
                    //C532+C533+C534+C536+C535
                    (goods.get('Beer')?.initial_needs_met ?? 0) + 
                    (goods.get('Leather and Textiles')?.initial_needs_met ?? 0) +
                    (goods.get('Artisinal Goods')?.initial_needs_met ?? 0) +
                    (goods.get('Ornamental Luxuries')?.initial_needs_met ?? 0) +
                    (goods.get('Livestock')?.initial_needs_met ?? 0)
                )
            )))
    }

    update_efficiency(goods: Map<string, Good>) {
        this.efficiency = Math.floor(Math.max(
            0,
            this.base_productivity +
            (this.loyalty_managed_chart.get(this.is_party_managed) ?? 0) +
            this.development.development_modifier() +
                ((
                    //C545+C547
                    (goods.get('Books')?.initial_needs_met ?? 0) + 
                    (goods.get('Runes')?.initial_needs_met ?? 0)
                ) / 2 * 5)
        ))
    }

    update_population(_military: Military) {
        let pop_loss = 0;
        _military.regiments.forEach((regiment) =>{
            if(regiment.pop_type === 'Kheled') {
                pop_loss += regiment.population_lost
            }
        })
        this.population = this.initial_population - pop_loss
    }

    update_total_productivity(_military: Military) {
        let pop_held_up = 0
        _military.regiments.forEach(regiment => {
            if (regiment.pop_type === 'Kheled') {
                pop_held_up += regiment.population_lost;
                pop_held_up -= regiment.population_occupied;
            }
        })
        this.total_productivity = Math.round(((this.loyalty + this.efficiency)/20) * 40 * this.productivity_rate * (this.population + pop_held_up))
    }

    update_taxed_productivity(_military: Military){
        let pop_held_up = 0
        _military.regiments.forEach(regiment => {
            if (regiment.pop_type === 'Kheled') {
                pop_held_up += regiment.population_lost;
                pop_held_up -= regiment.population_occupied;
            }
        })
        this.taxed_productivity = Math.round(((this.loyalty+this.efficiency)/20) * 40 * this.productivity_rate * (this.population + pop_held_up) * (this.tax_rates.get(this.tax_rate) ?? 0))
        this.taxed_productivity = Math.round(((this.loyalty+this.efficiency)/20) * 40 * this.productivity_rate * (this.population + pop_held_up) * (1 - (this.tax_rates.get(this.tax_rate) ?? 0)))
    }

    update_unutilized_taxed_productivity() {
        this.unutilized_taxed_productivity = 100 - this.direct_tax_points - this.bureaucratic_component.labor
    }

    update_bureaucratic_bonus(kalans: Kalan[]): void {
        if (this.bureaucratic_component.focus === BureaucraticFocus.None) {
            this.bureaucratic_component.bonus = 0
            return
        }
        let kalan : Kalan = new Kalan();
        switch (this.bureaucratic_component.focus) {
            case BureaucraticFocus.Kibil:
                kalan = kalans[3]
                break;
            case BureaucraticFocus.Dush:
                kalan = kalans[4]
                break;
            case BureaucraticFocus.Baraz:
                kalan = kalans[5]
                break;
            case BureaucraticFocus.Felak:
                kalan = kalans[7]
                break;
            case BureaucraticFocus.Zaram:
                kalan = kalans[8]
                break;
            case BureaucraticFocus.Baruk:
                kalan = kalans[9]
                break;
            case BureaucraticFocus.Hund:
                kalan = kalans[10]
                break;
            case BureaucraticFocus.Zaharn:
                kalan = kalans[11]
                break;
            default:
                break;
        }
        let bonus = this.bureaucratic_component.factor * this.bureaucratic_component.labor
        bonus /= 100 * this.taxed_productivity
        bonus /= kalan.unmodified_corvee_labor
        bonus = Math.sqrt(bonus)
        this.bureaucratic_component.bonus = bonus 
    }

    update_net_improvement(kalans: Kalan[]): void {
        let kalan : Kalan = new Kalan();
        switch (this.bureaucratic_component.focus) {
            case BureaucraticFocus.Kibil:
                kalan = kalans[3]
                break;
            case BureaucraticFocus.Dush:
                kalan = kalans[4]
                break;
            case BureaucraticFocus.Baraz:
                kalan = kalans[5]
                break;
            case BureaucraticFocus.Felak:
                kalan = kalans[7]
                break;
            case BureaucraticFocus.Zaram:
                kalan = kalans[8]
                break;
            case BureaucraticFocus.Baruk:
                kalan = kalans[9]
                break;
            case BureaucraticFocus.Hund:
                kalan = kalans[10]
                break;
            case BureaucraticFocus.Zaharn:
                kalan = kalans[11]
                break;
            default:
                break;
        }
        this.bureaucratic_component.net_improvement = kalan.cl_points_gained - kalan.unmodified_corvee_labor
    }

}