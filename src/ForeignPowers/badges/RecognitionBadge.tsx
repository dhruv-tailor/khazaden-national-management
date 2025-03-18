import { Badge } from "primereact/badge";
import { ForeignRecognition } from "../ForeignPowerInterface";

export const RecognitionBadge = ({recognition}:{recognition: ForeignRecognition}) => {
    const val = () => {
        switch(recognition) {
            case ForeignRecognition.None:
                return 'None';
            case ForeignRecognition.Limited:
                return 'Limited';
            case ForeignRecognition.Full:
                return 'Full';
            case ForeignRecognition.Secret:
                return 'Secret';
        }
    }

    const col = () => {
        switch(recognition) {
            case ForeignRecognition.None:
                return 'danger';
            case ForeignRecognition.Limited:
                return 'info';
            case ForeignRecognition.Full:
                return 'success';
            case ForeignRecognition.Secret:
                return 'warning';
    }}

    return(
        <div className="flex flex-row gap-1">
            Recognition:
            <Badge value={val()} severity={col()}/>
        </div>
    )
}