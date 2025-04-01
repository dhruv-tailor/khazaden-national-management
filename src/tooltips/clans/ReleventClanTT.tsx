import { clanTypes } from "../../Clans/ClanInterface/ClanInterface";
import ArchivistsIconTT from "./ArchivistsIconTT";
import ClericsIconTT from "./ClericsIconTT";
import CraftsmenIconTT from "./CraftsmenIconTT";
import CriminalsIconTT from "./CriminalsIconTT";
import EngineersIconTT from "./EngineersIconTT";
import FarmersIconTT from "./FarmersIconTT";
import ForestersIconTT from "./ForestersIconTT";
import MerchantsIconTT from "./MerchantsIconTT";
import MinersIconTT from "./MinersIconTT";
import RulersIconTT from "./RulersIconTT";
import RuneSmithsIconTT from "./RuneSmithsIconTT";
import WarriorsIconTT from "./WarriorsIconTT";

export const releventClanTT  = {
    [clanTypes.rulers] : <RulersIconTT/>,
    [clanTypes.archivists] : <ArchivistsIconTT/>,
    [clanTypes.clerics] : <ClericsIconTT/>,
    [clanTypes.craftsmen] : <CraftsmenIconTT/>,
    [clanTypes.criminals] : <CriminalsIconTT/>,
    [clanTypes.engineers] : <EngineersIconTT/>,
    [clanTypes.farmers] : <FarmersIconTT/>,
    [clanTypes.foresters] : <ForestersIconTT/>,
    [clanTypes.merchants] : <MerchantsIconTT/>,
    [clanTypes.miners] : <MinersIconTT/>,
    [clanTypes.runeSmiths] : <RuneSmithsIconTT/>,
    [clanTypes.warriors] : <WarriorsIconTT/>,
    [clanTypes.none] : <></>
}