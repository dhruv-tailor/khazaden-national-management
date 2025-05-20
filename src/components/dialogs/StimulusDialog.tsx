import { Dialog } from "primereact/dialog";
import ResourceDistribuition from "../ResourceDistribution";
import { goodsdist } from "../../Goods/GoodsDist";

interface StimulusDialogProps {
    visible: boolean;
    onHide: () => void;
    goods_cap: goodsdist;
    updateFunc: (dist: goodsdist) => void;
}

export default function StimulusDialog({ visible, onHide, goods_cap, updateFunc }: StimulusDialogProps) {
    return (
        <Dialog 
            header="Stimulus" 
            visible={visible} 
            onHide={onHide}
            className="w-30rem"
        >
            <ResourceDistribuition 
                goods_cap={goods_cap} 
                updateFunc={updateFunc}
            />
        </Dialog>
    );
} 