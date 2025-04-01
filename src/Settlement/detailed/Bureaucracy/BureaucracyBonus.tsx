import { clanTypes } from "../../../Clans/ClanInterface/ClanInterface";
import { SettlementInterface } from "../../SettlementInterface/SettlementInterface";
import { BBFocusSetter } from "./BBFocusSetter";

export default function BureaucracyBonus({settlement}: {settlement: SettlementInterface}) {

    return(
        <div className="flex flex-row flex-wrap gap-3">
            {settlement.clans.filter(clan => clan.id === clanTypes.merchants)[0].population > 0? <BBFocusSetter/>: null}
        </div>
    )
}