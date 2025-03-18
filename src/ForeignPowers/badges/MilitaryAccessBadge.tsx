import { Badge } from "primereact/badge"
import { MilitaryAccess } from "../ForeignPowerInterface"

export const MilitaryAccessBadge = ({militaryAccess}:{militaryAccess: MilitaryAccess}) => {

    const val = () => {
        switch(militaryAccess) {
            case MilitaryAccess.Granted:
                return 'Granted';
            case MilitaryAccess.Limited:
                return 'Limited';
            case MilitaryAccess.Prohibited:
                return 'Prohibited';
        }
    }

    const col = ()  => {
        switch(militaryAccess) {
            case MilitaryAccess.Granted:
                return 'success';
            case MilitaryAccess.Limited:
                return 'info';
            case MilitaryAccess.Prohibited:
                return 'danger';
        }
    }


    return(
    <div className="flex flex-row gap-1">
        Military Access:
        <Badge value={val()} severity={col()}/>
    </div>
    )
}