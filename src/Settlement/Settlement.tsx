import { Card } from 'primereact/card';
import { SettlementInterface, SettlementTierDetails } from './SettlementInterface';
import { IoFastFood  } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { GiBeerStein, GiClothes, GiWoodPile, GiThrownCharcoal,GiCoalWagon, GiGems, GiPouringChalice, GiCrystalBall, GiRuneStone, GiMagicShield } from "react-icons/gi";
import { PiCowFill } from "react-icons/pi";
import { FaGem, FaTools, FaBriefcaseMedical, FaBook, FaShieldAlt } from "react-icons/fa";
import { LuHandCoins } from "react-icons/lu";
import PlusMinus from '../components/PlusMinus';

function Settlement({settlement}: {settlement: SettlementInterface}) {
    
  return (
    <>
      <Card className="md:w-25rem" title={settlement.name} subTitle={SettlementTierDetails[settlement.tier].name}>
        <p><IoIosPeople />{
          settlement.archivists.population + 
          settlement.clerics.population +
          settlement.craftsmen.population +
          settlement.criminals.population +
          settlement.engineers.population +
          settlement.farmers.population +
          settlement.foresters.population +
          settlement.merchants.population +
          settlement.miners.population +
          settlement.rulers.population +
          settlement.rune_smiths.population +
          settlement.warriors.population
        } / {settlement.pop_cap}
        </p>
        <div className='flex flex-row gap-3'>
          <div className='flex flex-column gap-2'>
            <div className='flex flex-row gap-1'>
              <IoFastFood/>
              {settlement.food_and_water.stock}
              <PlusMinus value={-settlement.food_and_water.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiBeerStein/>
              {settlement.beer.stock}
              <PlusMinus value={-settlement.beer.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiClothes/>
              {settlement.leather_and_textiles.stock}
              <PlusMinus value={-settlement.leather_and_textiles.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <LuHandCoins/>
              {settlement.artisinal_goods.stock}
              <PlusMinus value={-settlement.artisinal_goods.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <PiCowFill/>
              {settlement.livestock.stock}
              <PlusMinus value={-settlement.livestock.consumption_rate}/>
            </div>
          </div>
          <div className='flex flex-column gap-2'>
            <div className='flex flex-row gap-1'>
              <GiPouringChalice />
              {settlement.ornamental_luxuries.stock}
              <PlusMinus value={-settlement.ornamental_luxuries.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiCrystalBall />
              {settlement.enchanted_luxuries.stock}
              <PlusMinus value={-settlement.enchanted_luxuries.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiWoodPile />
              {settlement.timber.stock}
              <PlusMinus value={-settlement.timber.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaTools />
              {settlement.tools.stock}
              <PlusMinus value={-settlement.tools.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiThrownCharcoal />
              {settlement.enchanted_charcoal.stock}
              <PlusMinus value={-settlement.enchanted_charcoal.consumption_rate}/>
            </div>
          </div>
          <div className='flex flex-column gap-2'>
            <div className='flex flex-row gap-1'>
              <GiCoalWagon />
              {settlement.common_ores.stock}
              <PlusMinus value={-settlement.common_ores.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaBriefcaseMedical />
              {settlement.medical_supplies.stock}
              <PlusMinus value={-settlement.medical_supplies.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiGems />
              {settlement.gems.stock}
              <PlusMinus value={-settlement.gems.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaGem />
              {settlement.rare_ores.stock}
              <PlusMinus value={-settlement.rare_ores.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaBook />
              {settlement.books.stock}
              <PlusMinus value={-settlement.books.consumption_rate}/>
            </div>
          </div>
          <div className='flex flex-column gap-2'>
            <div className='flex flex-row gap-1'>
              <GiRuneStone />
              {settlement.runes.stock}
              <PlusMinus value={-settlement.runes.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaShieldAlt />
              {settlement.armaments.stock}
              <PlusMinus value={-settlement.armaments.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiMagicShield />
              {settlement.enchanted_armaments.stock}
              <PlusMinus value={-settlement.enchanted_armaments.consumption_rate}/>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}


export default Settlement;