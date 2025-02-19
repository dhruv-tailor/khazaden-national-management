
class TurnTracker {
    turns_passed: number = 1;
    month: number;
    year: number;

    constructor(starting_month: number = 1, starting_year: number = 728) {
        this.month = starting_month;
        this.year = starting_year
    }

    season(): string {
        let season_name = ''
        switch (this.month) {
            case 0:
            case 1:
            case 2:
                season_name = 'Winter';
                break;
            case 3:
            case 4:
            case 5:
                season_name = 'Spring';
                break;
            case 6:
            case 7:
            case 8:
                season_name = 'Summer';
                break;
            default:
                season_name = 'Fall';
                break;
        }
        return season_name;
    }
}