import { Dialog } from "primereact/dialog";
import { FederalInterface } from "../../utilities/FederalInterface";
import { ReactNode } from "react";

interface RandomEventDialogProps {
    visible: boolean;
    onHide: () => void;
    event: (federal: FederalInterface, updateFunc: (federal: FederalInterface) => void) => ReactNode;
    federal: FederalInterface;
    updateFunc: (federal: FederalInterface) => void;
}

export default function RandomEventDialog({ 
    visible, 
    onHide,
    event,
    federal,
    updateFunc
}: RandomEventDialogProps) {
    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            className="w-30rem"
            closable={false}
        >
            {event(federal, updateFunc)}
        </Dialog>
    );
} 