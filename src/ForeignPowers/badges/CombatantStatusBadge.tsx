import { Badge } from "primereact/badge";
import { CombatantStatus } from "../ForeignPowerInterface"

export const CombatantStatusBadge = ({combatantStatus}:{combatantStatus: CombatantStatus}) => {

    const val = () => {
        switch(combatantStatus) {
            case CombatantStatus.Neutral:
                return 'Neutral';
            case CombatantStatus.Allied:
                return 'Allied';
            case CombatantStatus.LowIntesity:
                return 'Low-intensity Conflict';
            case CombatantStatus.ProvincialWarfare:
                return 'Provincial Warfare';
            case CombatantStatus.ConventionalWarfare:
                return 'Conventional Warfare';
        }
    }
    
    const col = () => {
        switch(combatantStatus) {
            case CombatantStatus.Neutral:
                return 'secondary';
            case CombatantStatus.Allied:
                return 'success';
            case CombatantStatus.LowIntesity:
                return 'info';
            case CombatantStatus.ProvincialWarfare:
                return 'warning';
            case CombatantStatus.ConventionalWarfare:
                return 'danger';
        }
    }

    return(
    <div className="flex flex-row gap-1">
        Combatant Status:
        <Badge value={val()} severity={col()}/>
    </div>
    )
}