class Good {
    initial_storage: number;
    initial_needs_met: number = 1.0;
    constructor(initial_storage: number,initial_needs_met: number = 1.0) {
        this.initial_storage = initial_storage;
        this.initial_needs_met = initial_needs_met;
    }
}