import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";

interface BuildRoadDialogProps {
    visible: boolean;
    onHide: () => void;
    onConfirm: () => void;
    cost: number;
}

export default function BuildRoadDialog({ 
    visible, 
    onHide, 
    onConfirm,
    cost 
}: BuildRoadDialogProps) {
    return (
        <Dialog
            header="Build Road"
            visible={visible}
            onHide={onHide}
            className="w-30rem"
        >
            <div className="flex flex-column gap-3">
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-map text-xl"></i>
                    <span>Build a road between these territories?</span>
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
                        label="Build Road" 
                        icon="pi pi-check" 
                        onClick={onConfirm}
                        severity="success"
                    />
                </div>
            </div>
        </Dialog>
    );
} 