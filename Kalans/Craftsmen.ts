class Craftsmen extends Kalan {

    direct_tax_points: number = 100
    taxed_goods: number = 0
    initial_population:number = 1
    productivity_rate_modifier: number = 5
    unmodified_productivity: number = 110
    unmodified_development_growth: number = 13
    unmodified_population_growth: number = 31

    constructor() {
        super()
    }

    update_loyalty(goods: Map<string, Good>,mazar: Archivists) {
        let beaurcracy_bonus = 0
        if(mazar.bureaucratic_component.focus === BureaucraticFocus.Dush){
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
                    //C532+C533+C534+C536
                    (goods.get('Beer')?.initial_needs_met ?? 0) + 
                    (goods.get('Leather and Textiles')?.initial_needs_met ?? 0) +
                    (goods.get('Artisinal Goods')?.initial_needs_met ?? 0) +
                    (goods.get('Ornamental Luxuries')?.initial_needs_met ?? 0)
                ) / 4 * 5
            )) + beaurcracy_bonus)
    }

    update_efficiency(goods: Map<string, Good>,uzbaden: Rulers) {
        let beaurcracy_bonus = 0
        if(uzbaden.bureaucratic_component.focus === BureaucraticFocus.Dush){
            beaurcracy_bonus = uzbaden.bureaucratic_component.bonus
        }
        this.efficiency = Math.floor(Math.max(
            0,
            this.base_productivity +
            (this.loyalty_managed_chart.get(this.is_party_managed) ?? 0) +
            this.development.development_modifier() +
                ((
                    //C539+C541+C544
                    (goods.get('Timber')?.initial_needs_met ?? 0) + 
                    (goods.get('Common Ores')?.initial_needs_met ?? 0) +
                    (goods.get('Gems')?.initial_needs_met ?? 0)
                ) / 3 * 5)
        )*beaurcracy_bonus)
    }

    update_development_growth(baraz: Merchants): void {
        this.development_growth = this.untaxed_productivity * 0.3
        if (baraz.bureaucratic_component.focus === BureaucraticFocus.Dush) {
            this.development_growth *= baraz.bureaucratic_component.bonus
        }
    }

    update_population_growth(zigil: Clerics) {
        this.population_growth = this.untaxed_productivity * 0.7
        if (zigil.bureaucratic_component.focus === BureaucraticFocus.Dush) {
            this.development_growth *= zigil.bureaucratic_component.bonus
        }
    }

    update_unutilized_taxed_productivity() {
        this.unutilized_taxed_productivity = 100 - this.direct_tax_points - this.taxed_goods
    }

}