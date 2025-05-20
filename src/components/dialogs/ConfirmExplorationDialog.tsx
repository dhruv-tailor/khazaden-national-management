import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";

interface ConfirmExplorationDialogProps {
    visible: boolean;
    onHide: () => void;
    onConfirm: () => void;
    cost: number;
}

export default function ConfirmExplorationDialog({ 
    visible, 
    onHide, 
    onConfirm,
    cost 
}: ConfirmExplorationDialogProps) {
    return (
        <Dialog
            header="Confirm Exploration"
            visible={visible}
            onHide={onHide}
            className="w-30rem"
        >
            <div className="flex flex-column gap-3">
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-map text-xl"></i>
                    <span>Explore this territory?</span>
                </div>
                
                <div className="flex align-items-center gap-2">
                    <MoneyIconTT/>
                    <span>{cost}</span>
                </div>

                <div className="flex justify-content-end gap-2 mt-3">
                    <Button 
                        label="Cancel" 
                        icon="pi pi-times" 
                        onClick={onHide}
                        className="p-button-text"
                    />
                    <Button 
                        label="Explore" 
                        icon="pi pi-check" 
                        onClick={onConfirm}
                        severity="success"
                    />
                </div>
            </div>
        </Dialog>
    );
} 