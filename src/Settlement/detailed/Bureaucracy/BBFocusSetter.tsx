import { Dropdown } from "primereact/dropdown"
import { clanTypes } from "../../../Clans/ClanInterface/ClanInterface"
import { ReactNode } from "react"

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

    return (
        <div className="flex flex-column">
            {tt}
            <Dropdown
            value={value}
            options={allowlist}
            optionLabel="name"
            placeholder='Select a Clan'
            onChange={e => updateFunc((e.value as allowProp).id,type)}
        />
        </div>
    )
}