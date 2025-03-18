import { Badge } from "primereact/badge";
import { VassalStatus } from "../ForeignPowerInterface";

export const VassalStatusBadge = ({vassalStatus}:{vassalStatus: VassalStatus}) => {
    
    const val = () => {
        switch(vassalStatus) {
            case VassalStatus.None:
                return 'None';
            case VassalStatus.Colony:
                return 'Colony';
            case VassalStatus.Puppet:
                return 'Puppet';
            case VassalStatus.March:
                return 'March';
            case VassalStatus.Dominion:
                return 'Dominion';
            case VassalStatus.Protectorate:
                return 'Protectorate';
        }
    }
    
    const col = () => {
        switch(vassalStatus) {
            case VassalStatus.None:
                return null;
            case VassalStatus.Colony:
                return 'danger';
            case VassalStatus.Puppet:
                return 'warning';
            case VassalStatus.March:
                return 'info';
            case VassalStatus.Dominion:
                return 'success';
            case VassalStatus.Protectorate:
                return 'contrast';
        }
    }

    return(
    <div className="flex flex-row gap-1">
        Vassal Status:
        <Badge value={val()} severity={col()}/>
    </div>
    )
}