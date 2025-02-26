import { Card } from 'primereact/card';
import { SettlementInterface, SettlementTierDetails } from './SettlementInterface';
import { IoFastFood  } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { GiBeerStein, GiClothes, GiWoodPile, GiThrownCharcoal,GiCoalWagon, GiGems } from "react-icons/gi";
import { PiCowFill } from "react-icons/pi";
import { FaGem } from "react-icons/fa";

function Settlement({settlement}: {settlement: SettlementInterface}) {
    
  return (
    <>
      <Card title={settlement.name} subTitle={SettlementTierDetails[settlement.tier].name}>
        <h3><IoIosPeople /> {settlement.population} / {settlement.pop_cap}</h3>
        <h3><IoFastFood /> {settlement.food_and_water} / {settlement.food_and_water_cap}</h3>
        <h3><GiBeerStein /> {settlement.beer} / {settlement.beer_cap}</h3>
        <h3><GiClothes /> {settlement.leather_and_textiles} / {settlement.leather_and_textiles_cap}</h3>
        <h3><PiCowFill /> {settlement.livestock} / {settlement.livestock_cap}</h3>
        <h3><GiWoodPile /> {settlement.timber} / {settlement.timber_cap}</h3>
        <h3><GiThrownCharcoal /> {settlement.enchanted_charcoal} / {settlement.enchanted_charcoal_cap}</h3>
        <h3><GiCoalWagon /> {settlement.common_ores} / {settlement.common_ores_cap}</h3>
        <h3><GiGems /> {settlement.gems} / {settlement.gems_cap}</h3>
        <h3><FaGem /> {settlement.rare_ores} / {settlement.rare_ores_cap}</h3>
      </Card>
    </>
  );
}

export default Settlement;