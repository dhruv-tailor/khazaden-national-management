import { Dialog } from "primereact/dialog";
import NewSettlement from "../../Settlement/NewSettlement";
import { goodsdist } from "../../Goods/GoodsDist";
import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { TerrainType } from "../../Settlement/SettlementInterface/TerrainInterface";

interface NewSettlementDialogProps {
    visible: boolean;
    onHide: () => void;
    max_resources: goodsdist;
    updateFunc: (s: SettlementInterface) => void;
    terrain: TerrainType;
    cost: number;
}

export default function NewSettlementDialog({ 
    visible, 
    onHide, 
    max_resources, 
    updateFunc, 
    terrain, 
    cost 
}: NewSettlementDialogProps) {
    return (
        <Dialog
            header="New Settlement"
            visible={visible}
            onHide={onHide}
            className="w-30rem"
        >
            <NewSettlement 
                max_resources={max_resources} 
                updateFunc={updateFunc}
                terrain={terrain}
                cost={cost}
            />
        </Dialog>
    );
} 