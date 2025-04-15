import { SettlementInterface, SettlementTierDetails } from "../../Settlement/SettlementInterface/SettlementInterface";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";

export default function TakeLoan({settlements,updateFunc} : {settlements: SettlementInterface[],updateFunc: (settlement: string, amount: number) => void}) {
    const [selectedSettlement, setSelectedSettlement] = useState<SettlementInterface | null>(null);
    const [loanAmount, setLoanAmount] = useState<number>(0);

    const settlementTemplate = (rowData: SettlementInterface) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.visible_name}</span>
                <span className="text-sm text-500">({SettlementTierDetails[rowData.tier].name})</span>
            </div>
        );
    };

    const availableLoanTemplate = (rowData: SettlementInterface) => {
        return (
            <div className="flex align-items-center gap-1">
                <MoneyIconTT/>
                <span>{Math.round(rowData.available_loan)}</span>
            </div>
        );
    };

    const interestRateTemplate = (rowData: SettlementInterface) => {
        return `${(rowData.interest_rate * 100).toFixed(1)}%`;
    };

    const actionTemplate = (rowData: SettlementInterface) => {
        return (
            <Button 
                label="Select" 
                icon="pi pi-check" 
                onClick={() => setSelectedSettlement(rowData)}
                disabled={rowData.available_loan <= 0}
            />
        );
    };

    const calculateTotalAmount = (amount: number) => {
        return Math.round(amount * ((1 + (0.05/12)) ** 72));
    };

    const calculateMonthlyPayment = (amount: number) => {
        const totalAmount = calculateTotalAmount(amount);
        return Math.round(totalAmount / 72);
    };

    return (
        <div className="flex flex-column gap-3">
            <Card title="Available Settlements">
                <DataTable 
                    value={settlements} 
                    selectionMode="single"
                    selection={selectedSettlement}
                    onSelectionChange={(e) => setSelectedSettlement(e.value as SettlementInterface)}
                    stripedRows
                >
                    <Column field="visible_name" header="Settlement" body={settlementTemplate} />
                    <Column field="available_loan" header="Available Loan" body={availableLoanTemplate} />
                    <Column field="interest_rate" header="Interest Rate" body={interestRateTemplate} />
                    <Column header="Action" body={actionTemplate} />
                </DataTable>
            </Card>

            {selectedSettlement && (
                <Card title={`Take Loan from ${selectedSettlement.visible_name}`}>
                    <div className="flex flex-column gap-3">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="loanAmount">Loan Amount</label>
                            <div className="flex align-items-center gap-1">
                                <MoneyIconTT/>
                                <InputNumber
                                    id="loanAmount"
                                    value={loanAmount}
                                    onValueChange={(e) => setLoanAmount(Math.round(e.value || 0))}
                                    min={0}
                                    max={Math.round(selectedSettlement.available_loan)}
                                    showButtons
                                    buttonLayout="horizontal"
                                    incrementButtonClassName="p-button-secondary"
                                    decrementButtonClassName="p-button-secondary"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                />
                            </div>
                            <small className="text-500 flex flex-row gap-1">
                                Maximum available: <MoneyIconTT/>{Math.round(selectedSettlement.available_loan)}
                            </small>
                        </div>
                        <div className="flex flex-column gap-2">
                            <div className="flex justify-content-between">
                                <span>Interest Rate:</span>
                                <span>5%</span>
                            </div>
                            <div className="flex justify-content-between">
                                <span>Loan Term:</span>
                                <span>6 years (72 months)</span>
                            </div>
                            <div className="flex justify-content-between">
                                <span>Average Monthly Payment:</span>
                                <div className="flex align-items-center gap-1">
                                    <MoneyIconTT/>
                                    <span>{calculateMonthlyPayment(loanAmount)}</span>
                                </div>
                            </div>
                            <div className="flex justify-content-between">
                                <span>Total Repayment:</span>
                                <div className="flex align-items-center gap-1">
                                    <MoneyIconTT/>
                                    <span>{calculateTotalAmount(loanAmount)}</span>
                                </div>
                            </div>
                        </div>
                        <Button 
                            label="Take Loan" 
                            icon="pi pi-check" 
                            className="mt-2"
                            disabled={loanAmount <= 0 || loanAmount > Math.round(selectedSettlement.available_loan)}
                            onClick={() => updateFunc(selectedSettlement.name, loanAmount)}
                        />
                    </div>
                </Card>
            )}
        </div>
    );
}
