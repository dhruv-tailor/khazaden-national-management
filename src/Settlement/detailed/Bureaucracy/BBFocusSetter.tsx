import { Dropdown } from "primereact/dropdown"
import { clanTypes } from "../../../Clans/ClanInterface/ClanInterface"
import { ReactNode } from "react"
import { releventClanTT } from "../../../tooltips/clans/ReleventClanTT"

interface allowProp {
    id: clanTypes,
    name: string
}

export function BBFocusSetter(
    {allowlist,selected,updateFunc,type,tt}: 
    {
        allowlist: allowProp[],
        selected: clanTypes,
        updateFunc: (id: clanTypes, type: string) => void,
        type: string,
        tt: ReactNode
    }) {

    const value = allowlist.filter(allow => allow.id === selected)[0] as allowProp

    const itemTemplate = (option: allowProp) => {
        return (
            <div className="flex align-items-center gap-2">
                {releventClanTT[option.id]}
                <span>{option.name}</span>
            </div>
        );
    };

    const valueTemplate = (option: allowProp) => {
        if (!option) return 'Select a Clan';
        return (
            <div className="flex align-items-center gap-2">
                {releventClanTT[option.id]}
                <span>{option.name}</span>
            </div>
        );
    };

    return (
        <div className="flex flex-column">
            {tt}
            <Dropdown
                value={value}
                options={allowlist}
                optionLabel="name"
                placeholder='Select a Clan'
                onChange={e => updateFunc((e.value as allowProp).id,type)}
                itemTemplate={itemTemplate}
                valueTemplate={valueTemplate}
            />
        </div>
    )
}