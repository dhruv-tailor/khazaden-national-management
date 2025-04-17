import { RegimentInterface } from "../units/RegimentInterface";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { releventRegimentTT } from "../../tooltips/regiments/ReleventRegimentTT";
import { releventClanTT } from "../../tooltips/clans/ReleventClanTT";

interface RegimentCardProps {
    regiment: RegimentInterface;
    onRecruit: (regiment: RegimentInterface) => void;
}

export default function RegimentCard({ regiment, onRecruit }: RegimentCardProps) {
    return (
        <div className="flex-none" style={{ minWidth: '300px' }}>
            <Panel header={regiment.name} className="h-full">
                <div className="flex flex-column gap-3">
                    <div className="flex align-items-center gap-2">
                        {releventRegimentTT[regiment.type]}
                        {releventClanTT[regiment.clan_type]}
                    </div>
                    <div className="flex justify-content-between align-items-center">
                        <span>Population:</span>
                        <span className="font-bold">
                            {regiment.pops_conusmed}/{regiment.max_pops}
                        </span>
                    </div>
                    <Button 
                        label="Recruit Regiment" 
                        icon="pi pi-plus" 
                        className="w-full"
                        onClick={() => onRecruit(regiment)}
                    />
                </div>
            </Panel>
        </div>
    );
} 