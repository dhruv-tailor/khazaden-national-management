class Kalan {
    tax_rate: TaxRates = TaxRates.medium;
    tax_rates:Map<TaxRates,number> = new Map<TaxRates,number>();

    loyalty_modifiers:Map<TaxRates,number> = new Map<TaxRates,number>();

    is_party_managed: boolean = false

    productivity_managed_chart: Map<boolean,number> = new Map<boolean,number>();
    loyalty_managed_chart: Map<boolean,number> = new Map<boolean,number>();

    development: Development = new Development();

    productivity_rate_modifier:number = 1
    productivity_rate: number = 1

    // Initial Data
    initial_population:number = 0
    population: number = 0

    base_loyalty: number = 0
    base_productivity: number = 0;
    rp_loyalty_modifier: number = 0
    rp_productivity_modifier: number = 0
    initial_net_dp: number = 0
    max_loyalty_modifier: number = 0

    taxed_productivity: number = 0
    untaxed_productivity: number = 0
    loyalty: number = 0
    efficiency: number = 0

    total_productivity: number = 0

    development_growth: number = 0
    population_growth: number = 0

    unutilized_taxed_productivity: number = 0

    unmodified_loyalty: number = 5
    unmodified_efficency: number = 6
    unmodified_productivity: number = 0
    unmodified_corvee_labor: number = 0
    unmodified_development_growth: number = 0
    unmodified_population_growth: number = 0

    cl_points_gained: number = 0

    constructor() {
        this.tax_rates.set(TaxRates.none,0)
        this.tax_rates.set(TaxRates.very_low,0.2)
        this.tax_rates.set(TaxRates.low,0.4)
        this.tax_rates.set(TaxRates.medium,0.6)
        this.tax_rates.set(TaxRates.high,0.75)
        this.tax_rates.set(TaxRates.very_high,0.9)
        this.tax_rates.set(TaxRates.oppressive,1)

        this.loyalty_modifiers.set(TaxRates.none,4)
        this.loyalty_modifiers.set(TaxRates.very_low,2)
        this.loyalty_modifiers.set(TaxRates.low,1)
        this.loyalty_modifiers.set(TaxRates.medium,0)
        this.loyalty_modifiers.set(TaxRates.high,-2)
        this.loyalty_modifiers.set(TaxRates.very_high,-5)
        this.loyalty_modifiers.set(TaxRates.oppressive,-9)

        this.productivity_managed_chart.set(true,1)
        this.productivity_managed_chart.set(false,0)
        this.loyalty_managed_chart.set(true,2)
        this.loyalty_managed_chart.set(false,0)
    }

    update_productivity_rate(goods: Map<string, Good>) {
        this.productivity_rate = this.productivity_rate_modifier * (goods.get('Food and Water')?.initial_needs_met ?? 0)
    }

    update_population(_military: Military) {
        this.population = this.initial_population
    }

    update_total_productivity(_military: Military) {
        this.total_productivity = Math.round(((this.loyalty + this.efficiency)/20) * 40 * this.productivity_rate * this.population)
    }

    update_taxed_productivity(_military: Military){
        this.taxed_productivity = Math.round(((this.loyalty+this.efficiency)/20) * 40 * this.productivity_rate * this.population * (this.tax_rates.get(this.tax_rate) ?? 0))
        this.untaxed_productivity = Math.round(((this.loyalty+this.efficiency)/20) * 40 * this.productivity_rate * this.population * (1 - (this.tax_rates.get(this.tax_rate) ?? 0)))
    }

    update_development_growth(_baraz: Merchants) {
        this.development_growth = this.untaxed_productivity * 0.3
    }

    update_population_growth(_zigil: Clerics) {
        this.population_growth = this.untaxed_productivity * 0.7
    }

    update_unutilized_taxed_productivity() {}

    update_bureaucratic_bonus(_kalans: Kalan[]) {}
    // RETURN TO
    update_net_improvement(_kalans: Kalan[]) {}
    update_cl_points_gained(_uzbaden: Rulers){}
}

enum TaxRates {
    none,
    very_low,
    low,
    medium,
    high,
    very_high,
    oppressive
}