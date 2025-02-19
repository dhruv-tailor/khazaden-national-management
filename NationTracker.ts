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

    settlements: Settlement[];
    terrains: Map<TerrainType, Terrain> = new Map<TerrainType, Terrain>();
    new_settlement_cost: number = 0;

    cl_gained: number = 0;
    cl_spent_last_turn: number = 0;
    cl_spent_this_turn: number = 0;
    upgrade_cost: number = 0;
    net_cl: number = 0;

    //Population Table
    food_needs_met: number = 100;
    food_growth_modifier: number = 0;
    pops_lost_to_starvation: number = 0;
    initial_population_growth: number = 0;
    gained_pg: number = 0;
    final_pg: number = 0;

    //Pop Calculations Table
    avg_pop_growth_factor: number = 0;
    pg_pop_loss: number = 0;
    pop_final_last_turn: number = 0;
    pop_final_pop_loss: number = 0;

    foreign_nations: Map<string, ForeignNation> = new Map<string, ForeignNation>();

    migration_growth_modifier: number = 0;
    current_pop_cap: number = 0;
    starting_pop: number = 0;
    pop_final_projected: number = 0;
    final_pop: number = 0;
    pops_gained: number = 0;

    constructor() {
        this.turn_tracker = new TurnTracker();
        this.goods = new Map<string, Good>();
        this.set_starting_goods();
        this.update_kalans();
        this.set_foreign_nations();
        this.terrains.set(TerrainType.Farmland, new Terrain('Farmland', 40, 3, 1.5, 3, 1.5, 0, 0, 0, 0, 0,1.75,1.75,2.25,1.75,0,0,0,0,0));
        this.terrains.set(TerrainType.Forest, new Terrain('Forest', 25, 1.4, 1.4, 0, 0, 15, 0, 0, 0, 0,1,1,0,0,10,0,0,0,0));
        this.terrains.set(TerrainType.Enchanted_Forest, new Terrain('Enchanted Forest', 10, 1.5, 1.5, 0, 0, 10, 20, 0, 0, 0,1,1,0,0,5,15,0,0,0));
        this.terrains.set(TerrainType.Mountain, new Terrain('Mountain', 75, 1.2, 2, 0, 0, 0, 0, 5, 3, 4,0.6,0.6,0.4,0.4,0.13,0,1.2,1.2,0.6));
        const mountainTerrain = this.terrains.get(TerrainType.Mountain);
        if (!mountainTerrain) {
            throw new Error("Mountain terrain is not defined");
        }
        this.settlements = [new Settlement(
            'Skarduhn', 
            mountainTerrain, 
            SettlementTier.Hamlet,
            this.settlement_expansion_factor,
        )];
        this.update_new_settlement_cost();
        this.update_cl_gained();
        this.update_cl_spent();
        this.update_upgrade_cost();
        this.update_food_needs_met();
        this.update_pop_calculation_table();
        this.update_population_growth();
        this.update_conversion_costs();
    }

    update_conversion_costs() {
        this.kalans.forEach(kalan => {
            kalan.update_conversion_cost(this.pop_conversion_factor)
        })
    }

    update_pop_final() {
        this.pop_final_projected = (this.initial_pop_cap * this.starting_po * Math.exp(this.initial_mgm*this.final_pg/this.avg_pop_growth_factor))
        this.pop_final_projected /= (this.initial_pop_cap + this.starting_po * (Math.exp(this.initial_mgm*this.final_pg/this.avg_pop_growth_factor) - 1))
        this.final_pop = Math.floor(this.pop_final_projected)
        this.pops_gained = this.final_pop - this.starting_pop
    }

    set_foreign_nations() {
        this.foreign_nations.set('Eidgenossenkhazaden', new ForeignNation('Eidgenossenkhazaden',0.25));
        this.foreign_nations.set('Bætañuesa', new ForeignNation('Bætañuesa',0.11));
        this.foreign_nations.set('Dragonsbane', new ForeignNation('Dragonsbane',0.08));
        this.foreign_nations.set('Sledzianska', new ForeignNation('Sledzianska',0.04));
        this.foreign_nations.set('Polabtheli', new ForeignNation('Polabtheli',0));
        this.foreign_nations.set('Kayasahr', new ForeignNation('Kayasahr',0.05));
        this.foreign_nations.set('Garozemle', new ForeignNation('Garozemle',0.04));
        this.foreign_nations.set('Sæmark', new ForeignNation('Sæmark',0.2));
        this.foreign_nations.set('Terra Kontor', new ForeignNation('Terra Kontor',0.03));
        this.foreign_nations.set('Pactusallamanni', new ForeignNation('Pactusallamanni',0.2));
        this.foreign_nations.set('Beznesti', new ForeignNation('Beznesti',0));

        const first_one = this.foreign_nations.get('Eidgenossenkhazaden');
        if (first_one) {
            first_one.recognition_status = RecognitionStatus.Limited;
            first_one.trade_agreement_status = TradeAgreementStatus.HighTariffs;
            first_one.migration_status = MigrationStatus.OpenBorders;
            first_one.combatant_status = CombatantStatus.Neutral;
            first_one.alliance_status = AllianceStatus.Friendly;
            first_one.vassal_status = VassalStatus.None;
            first_one.military_access_status = MilitaryAccessStatus.Limited;
            first_one.relations = 2;
        }
    }

    update_pop_calculation_table() {
        let total_init_pop =0;
        this.kalans.forEach(kalan => {
            total_init_pop += kalan.initial_population
        })
        this.avg_pop_growth_factor = total_init_pop*17.5226452905812-113.226452905812
        this.pop_final_last_turn = this.initial_pop_cap * this.starting_po * Math.exp(this.initial_mgm*this.inital_pg/this.avg_pop_growth_factor)
        this.pop_final_last_turn /= this.initial_pop_cap + this.starting_po * (Math.exp(this.initial_mgm*this.inital_pg/this.avg_pop_growth_factor) - 1)
        this.pg_pop_loss = this.avg_pop_growth_factor / this.initial_mgm
        this.pop_final_pop_loss = this.pop_final_last_turn - this.pops_lost_to_starvation
        this.pg_pop_loss *= Math.log((this.pop_final_pop_loss*this.initial_pop_cap-this.pop_final_pop_loss*this.starting_po)/(this.initial_pop_cap*this.starting_po-this.pop_final_pop_loss*this.starting_po))
    }

    update_food_needs_met() {
        this.food_needs_met = (this.goods.get('Food and Water')?.initial_needs_met ?? 0) * 100
        if(this.food_needs_met >= 75) {
            this.food_growth_modifier = 1 * (this.food_needs_met - 75) / 25
            this.pops_lost_to_starvation = 0
        }
        else {
            this.food_growth_modifier = 0;
            let total_pops = 0
            this.kalans.forEach(kalan => {
                total_pops += kalan.population
            })
            this.pops_lost_to_starvation = Math.round(0.1 *(75-this.food_needs_met)/75 * total_pops)
        }
    }

    update_population_growth() {
        this.initial_population_growth = this.inital_pg
        let total_pop_growth = 0
        this.kalans.forEach(kalan => {
            total_pop_growth += kalan.population_growth
        })
        this.gained_pg = this.initial_population_growth * 0.7 * this.food_growth_modifier
        if(this.pops_lost_to_starvation > 0){
            this.gained_pg -= this.initial_population_growth - this.pg_pop_loss
        }
        this.final_pg = this.initial_population_growth + this.gained_pg
        this.foreign_nations.forEach(foreign_nation => {
            this.migration_growth_modifier += foreign_nation.get_migration_growth_modifier()
        })
        this.current_pop_cap = 0;
        this.settlements.forEach(settlement => {
            this.current_pop_cap += settlement.pop_cap
        })
        this.starting_pop = 0;
        this.kalans.forEach(kalan => {
            this.starting_pop += kalan.initial_population
        })
    }

    update_upgrade_cost() {
        this.upgrade_cost = this.cl_spent_this_turn - this.cl_spent_last_turn
    }
    
    update_net_cl() {
        this.net_cl = this.cl_gained - this.upgrade_cost
    }

    update_new_settlement_cost() {
        this.new_settlement_cost = (this.settlements.length ** 2) * this.new_settlement_factor
    }

    update_cl_gained() {
        this.cl_gained = this.felak.cl_points_gained + this.zaram.cl_points_gained + this.baruk.cl_points_gained + this.hund.cl_points_gained + this.zaharn.cl_points_gained
    }

    update_cl_spent() {
        this.cl_spent_this_turn = ((this.settlements.length - 1) ** 2) * this.new_settlement_factor
        this.settlements.forEach(settlement => {
            let cost = 2 ** (settlement.tier - 2)
            if (settlement.tier === SettlementTier.Hamlet) {
                cost = 0
            }
            this.cl_spent_this_turn += cost * this.settlement_expansion_factor
        }
        )
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