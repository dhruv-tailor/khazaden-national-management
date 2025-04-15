import { LoanInterface } from "./loanInterface";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import TakeLoan from "./TakeLoan";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function ViewLoans(
    {loans,settlements,updateFunc,declareBankruptcy} : 
    {loans: LoanInterface[],settlements: SettlementInterface[],updateFunc: (settlement: string, amount: number) => void,declareBankruptcy: () => void}) {
    const [showLoanForm, setShowLoanForm] = useState(false);
    const amountTemplate = (rowData: LoanInterface) => Math.round(rowData.amount);

    const monthlyPaymentTemplate = (rowData: LoanInterface) => {
        return (
            <div className="flex align-items-center gap-1">
                <MoneyIconTT/>
                <span>{Math.round(rowData.amount / rowData.months_left)}</span>
            </div>
        );
    };

    const loanTaken = (settlement: string, amount: number) => {
        setShowLoanForm(false)
        updateFunc(settlement,amount)
    }

    const confirmBankruptcy = () => {
        confirmDialog({
            message: 'Are you sure you want to declare bankruptcy?',
            header: 'Confirm Bankruptcy',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => {
                declareBankruptcy()
            },
            reject: () => {
                // Do nothing
            }
        });
    };

    return (
        <div className="p-4 flex flex-column gap-2">
            <ConfirmDialog />
            <Card title="Active Loans">
                <DataTable value={loans} stripedRows>
                    <Column field="owner" header="Owner" />
                    <Column field="amount" header="Amount" body={amountTemplate} />
                    <Column field="months_left" header="Months Remaining" />
                    <Column header="Monthly Payment" body={monthlyPaymentTemplate} />
                </DataTable>
            </Card>
            <div className="flex flex-row gap-2">
                <Button className="w-full" label="Take Loan" icon='pi pi-money-bill' onClick={() => setShowLoanForm(true)} severity="success"/>
                <Button 
                    className="w-full" 
                    label="Declare Bankruptcy" 
                    icon='pi pi-ban' 
                    severity="danger"
                    onClick={confirmBankruptcy}
                />
            </div>
            <Dialog header="Take Loan" visible={showLoanForm} onHide={() => setShowLoanForm(false)}>
                <TakeLoan settlements={settlements} updateFunc={loanTaken}/>
            </Dialog>
        </div>
    )
}
