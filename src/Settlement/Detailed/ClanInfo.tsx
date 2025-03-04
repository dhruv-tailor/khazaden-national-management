import { Card } from "primereact/card";
import { ClanInterface } from "../../Clans/ClanInterface";
import { ReactNode } from "react";
import { ProgressBar } from "primereact/progressbar";

export default function ClanInfo({clan,icon}: {clan: ClanInterface,icon:ReactNode}) {
    const header = (
        <div className="flex flex-row gap-1">
        {icon}{clan.name}
        </div>
    );

    return(
        <>
        <Card header={header}>
            <ProgressBar value={clan.loyalty * 10}></ProgressBar>
        </Card>
        </>
    )
}