export class ForeignNation {
    name: string;
    recognition_status: RecognitionStatus = RecognitionStatus.None;
    trade_agreement_status: TradeAgreementStatus = TradeAgreementStatus.Embargoed;
    migration_status: MigrationStatus = MigrationStatus.ClosedBorders;
    migration_growth_modifier: number = 0;
    combatant_status: CombatantStatus = CombatantStatus.Neutral;
    alliance_status: AllianceStatus = AllianceStatus.Neutral;
    vassal_status: VassalStatus = VassalStatus.None;
    military_access_status: MilitaryAccessStatus = MilitaryAccessStatus.Prohibited;

    migration_growth_modifiers: number[];
    dwarf_pop_percentage: number = 0;
    relations: number = 0;


    constructor(name: string,dwarf_pop_percentage: number) {
        this.name = name;
        this.dwarf_pop_percentage = dwarf_pop_percentage
        this.migration_growth_modifiers = [0,this.dwarf_pop_percentage/2,this.dwarf_pop_percentage/10]
    }

    get_migration_growth_modifier(){
        return this.migration_growth_modifiers[this.migration_status]
    }
}


export enum RecognitionStatus {
    None,
    Secret,
    Limited,
    Full
}

export enum TradeAgreementStatus {
    Embargoed,
    HighTariffs,
    ModerateTariffs,
    LowTariffs,
    FreeTrade
}

export enum MigrationStatus {
    ClosedBorders,
    ControlledBorders,
    OpenBorders
}

export enum CombatantStatus {
    Neutral,
    Allied,
    LowIntensityConflict,
    ProvincialWarfare,
    ConventionalWarfare
}

export enum AllianceStatus {
    Neutral,
    Overlord,
    Allied,
    Friendly,
    Hostile,
    AtWar,
    Subject
}

export enum VassalStatus {
    None,
    Colony,
    Puppet,
    March,
    Dominion,
    Protectorate
}

export enum MilitaryAccessStatus {
    Prohibited,
    Limited,
    Granted
}