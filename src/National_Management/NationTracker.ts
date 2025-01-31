class NationTracker {
    turn_tracker: TurnTracker;
    goods: Map<string, Good>;
    military: Military = new Military();

    goods_production: number = 0.25
    initial_pop_cap: number = 75
    inital_pg: number = 0
    starting_po: number = 0
    initial_mgm: number = 0.025
    initial_cl: number = 0
    tax_factor: number = 1
    uzbaden_bureaucracy_factor: number = 13
    mazar_bureaucracy_factor: number = 17
    kheled_bureaucracy_factor: number = 30
    baraz_bureaucracy_factor: number = 8
    zigil_bureaucracy_factor: number = 7
    settlement_expansion_factor: number = 4000
    new_settlement_factor: number = 4500
    pop_conversion_factor: number = 50
    migration_cap_factor: number = 0.1
    month_total: number = 1
    current_fp: number = 2000 // AKA Initial treasury

    uzbaden: Rulers = new Rulers();
    mazar: Archivists = new Archivists();
    kheled: Engineers = new Engineers();
    kibil: RuneSmiths = new RuneSmiths();
    dush: Craftsmen = new Craftsmen();
    baraz: Merchants = new Merchants();
    zigil: Clerics = new Clerics();
    felak: Miners = new Miners();
    zaram: Farmers = new Farmers();
    baruk: Warriors = new Warriors();
    hund: Foresters = new Foresters();
    zaharn: Criminals = new Criminals();

    kalans = [this.uzbaden,this.mazar,this.kheled,this.kibil,this.dush,
        this.baraz,this.zigil,this.felak,this.zaram,this.baruk,this.hund,this.zaharn]

    constructor() {
        this.turn_tracker = new TurnTracker();
        this.goods = new Map<string, Good>();
        this.set_starting_goods();
        this.update_kalans();
    }

    set_starting_goods() {
        this.goods.set('Food and Water',new Good(150))
        this.goods.set('Beer',new Good(150))
        this.goods.set('Leather and Textiles',new Good(150))
        this.goods.set('Artisinal Goods',new Good(50))
        this.goods.set('Livestock',new Good(50))
        this.goods.set('Ornamental Luxuries',new Good(50))
        this.goods.set('Enchanted Luxuries',new Good(0))
        this.goods.set('Timber',new Good(600))
        this.goods.set('Tools',new Good(100))
        this.goods.set('Common Ores',new Good(150))
        this.goods.set('Medical Supplies',new Good(25))
        this.goods.set('Rare Ores',new Good(150))
        this.goods.set('Gems',new Good(150))
        this.goods.set('Runes',new Good(0))
        this.goods.set('Armaments',new Good(25))
        this.goods.set('Books',new Good(25))
        this.goods.set('Enchanted Armaments',new Good(0))
        this.goods.set('Enchanted Charcoal',new Good(0))
    }

    update_kalans() {
        // Calculate Loyalty
       this.update_loyalties();
       this.update_efficencies();
       this.update_populations();
       this.update_total_productivities();
       this.update_bureaucratic_bonuses();
       this.update_development_growths();
       this.update_population_growths();
       this.update_cl_points_gained();
       this.update_finance_points_gained();
       this.update_goods_produced()
    }

    update_loyalties() {
        this.uzbaden.update_loyalty(this.goods);
        this.mazar.update_loyalty(this.goods);
        this.kheled.update_loyalty(this.goods);
        this.kibil.update_loyalty(this.goods,this.mazar);
        this.dush.update_loyalty(this.goods,this.mazar);
        this.baraz.update_loyalty(this.goods,this.mazar);
        this.zigil.update_loyalty(this.goods);
        this.felak.update_loyalty(this.goods,this.mazar);
        this.zaram.update_loyalty(this.goods,this.mazar);
        this.baruk.update_loyalty(this.goods,this.mazar);
        this.hund.update_loyalty(this.goods,this.mazar);
        this.zaharn.update_loyalty(this.goods,this.mazar);
    }

    update_efficencies() {
        this.uzbaden.update_efficiency(this.goods);
        this.mazar.update_efficiency(this.goods);
        this.kheled.update_efficiency(this.goods);
        this.kibil.update_efficiency(this.goods,this.uzbaden);
        this.dush.update_efficiency(this.goods,this.uzbaden);
        this.baraz.update_efficiency(this.goods,this.uzbaden);
        this.zigil.update_efficiency(this.goods);
        this.felak.update_efficiency(this.goods,this.uzbaden);
        this.zaram.update_efficiency(this.goods,this.uzbaden);
        this.baruk.update_efficiency(this.goods,this.uzbaden);
        this.hund.update_efficiency(this.goods,this.uzbaden);
        this.zaharn.update_efficiency(this.goods,this.uzbaden);
    }
    update_productivity_rates() {
        this.kalans.forEach((kalan) => kalan.update_productivity_rate(this.goods))
    }

    update_populations() {
        this.kalans.forEach(kalan => kalan.update_population(this.military))
    }

    update_total_productivities() {
        this.kalans.forEach(kalan => {
            kalan.update_total_productivity(this.military)
            kalan.update_taxed_productivity(this.military)
        })
    }

    update_development_growths() {
        this.kalans.forEach(kalan => {
            kalan.update_development_growth(this.baraz)
        })
    }

    update_population_growths() {
        this.kalans.forEach(kalan => {
            kalan.update_population_growth(this.zigil)
        })
    }

    update_unutilized_taxed_productivity() {
        this.kalans.forEach(kalan => {
            kalan.update_unutilized_taxed_productivity()
        })
    }

    update_bureaucratic_bonuses() {
        this.kalans.forEach(kalan => {
            kalan.update_bureaucratic_bonus(this.kalans)
        })
    }

    update_cl_points_gained() {
        this.kalans.forEach(kalan => {
            kalan.update_cl_points_gained(this.uzbaden)
        }) 
    }

    update_net_improvements() {
        this.kalans.forEach(kalan => {
            kalan.update_net_improvement(this.kalans)
        })
    }

    update_finance_points_gained(){
        this.kalans.forEach(kalan => {
            kalan.update_finance_points_gained(this.tax_factor)
        }) 
    }

    update_goods_produced(){
        this.kalans.forEach(kalan => {
            kalan.update_goods_produced(this.goods_production)
        }) 
    }
}