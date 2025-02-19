class BureaucraticComponent {

    focus: BureaucraticFocus = BureaucraticFocus.None
    labor: number = 0
    allowed: BureaucraticFocus[]
    bonus: number = 0
    factor: number = 0
    net_improvement: number = 0

    constructor(allowed: BureaucraticFocus[],bureacracy_factor: number) {
        this.allowed = allowed
        this.factor = bureacracy_factor
    }

}

enum BureaucraticFocus {
    Kibil,
    Dush,
    Baraz,
    Felak,
    Zaram,
    Baruk,
    Hund,
    Zaharn,
    None
}