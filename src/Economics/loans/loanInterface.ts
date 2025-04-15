export interface LoanInterface {
    owner: string;
    owner_name: string;
    amount: number;
    months_left: number;
}

export const takeLoan = (amount: number,owner: string, owner_id: string): LoanInterface => {
    return {
        owner: owner,
        owner_name: owner_id,
        amount: amount * ((1 + (0.05/12)) ** 72),
        months_left: 72
    }
    
}