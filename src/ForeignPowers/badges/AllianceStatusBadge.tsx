import { Badge } from "primereact/badge";
import { AllianceStatus } from "../ForeignPowerInterface";

export const AllianceStatusBadge = ({allianceStatus}:{allianceStatus: AllianceStatus}) => {
    
    const val = () => {
        switch(allianceStatus) {
            case AllianceStatus.Overlord:
                return 'Overlord';
            case AllianceStatus.Allied:
                return 'Allied';
            case AllianceStatus.Friendly:
                return 'Friendly';
            case AllianceStatus.Neutral:
                return 'Neutral';
            case AllianceStatus.Nostile:
                return 'Nostile';
            case AllianceStatus.AtWar:
                return 'At War';
            case AllianceStatus.Subject:
                return 'Subject';
        }
    }
    
    const col = () => {
        switch(allianceStatus) {
            case AllianceStatus.Overlord:
                return 'contrast';
            case AllianceStatus.Allied:
                return 'success';
            case AllianceStatus.Friendly:
                return null;
            case AllianceStatus.Neutral:
                return 'secondary';
            case AllianceStatus.Nostile:
                return 'warning';
            case AllianceStatus.AtWar:
                return 'danger';
            case AllianceStatus.Subject:
                return 'secondary';
        }
    }

    return(
    <div className="flex flex-row gap-1">
        Alliance Status:
        <Badge value={val()} severity={col()}/>
    </div>
    )
}