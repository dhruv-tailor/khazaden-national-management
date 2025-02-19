class Development {
    fp_invested: number = 0
    development_level: DevelopmentLevel = DevelopmentLevel.Terrible

    development_modifier() {
        let dev_mod = 0
        switch (this.development_level) {
            case DevelopmentLevel.Terrible:
                dev_mod = 1;
                break;
            case DevelopmentLevel.Low:
                dev_mod = 2;
                break;
            case DevelopmentLevel.Moderate:
                dev_mod = 3;
                break;
            case DevelopmentLevel.High:
                dev_mod = 4;
                break;
            case DevelopmentLevel.Exceptional:
                dev_mod = 5;
                break;
            default:
                break;
        }
        return dev_mod;
    }
}

enum DevelopmentLevel {
    Terrible,
    Low,
    Moderate,
    High,
    Exceptional
}