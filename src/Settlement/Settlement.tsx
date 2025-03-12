import { Card } from 'primereact/card';
import { SettlementInterface, SettlementTierDetails } from './SettlementInterface';
import { IoIosPeople } from "react-icons/io";
import { Button } from 'primereact/button';
import { GiBeerStein, GiClothes, GiWoodPile, GiThrownCharcoal,GiCoalWagon, GiGems, GiPouringChalice, GiCrystalBall, GiRuneStone, GiMagicShield } from "react-icons/gi";
import { PiCowFill } from "react-icons/pi";
import { FaGem, FaTools, FaBriefcaseMedical, FaBook, FaShieldAlt, FaCoins } from "react-icons/fa";
import { LuHandCoins } from "react-icons/lu";
import PlusMinus from '../components/PlusMinus';
import { IoFastFood  } from "react-icons/io5";
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import { load } from '@tauri-apps/plugin-store';
import { saveLocation } from '../utilities/SaveData';
import { useParams } from 'react-router';

function Settlement(
  {settlement, navigateSettlement, updateParent}: 
  {settlement: SettlementInterface, navigateSettlement: (name: string) => void, updateParent: () => void}) {

  const [taxRate,setTaxRate] = useState<number>(settlement.settlment_tax);
  const gameId = useParams().game;

  const gotoSettlement = () => {
    navigateSettlement(settlement.name)
  }

  const footer = (
    <>
      <Button label='Go To Settlement' icon="pi pi-arrow-right" onClick={gotoSettlement} />
    </>
  );

  const updateTaxes = async () => {
    const store = await load(await saveLocation(gameId ?? ''), {autoSave: false});
    const settlements = await store.get<SettlementInterface[]>('settlements');
    settlements?.forEach(s => {if(s.name === settlement.name) {s.settlment_tax = taxRate}})
    store.set('settlements',settlements)
    store.save()
    updateParent();
}

  useEffect(() => {
    updateTaxes();
  },[taxRate])
    
  return (
    <>
      <Card className="md:w-25rem" title={settlement.name} subTitle={SettlementTierDetails[settlement.tier].name} footer={footer}>
        <div className='flex flex-row gap-3'>
          <div className='flex flex-row gap-1'>
            <IoIosPeople />
            {
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
          </div>
          <div className='flex flex-row gap-1'>
            <FaCoins/>
             {settlement.finance_points}
             <PlusMinus value={
                Math.round(((settlement.rulers.tax_rate * settlement.rulers.taxed_productivity) +
                (settlement.archivists.tax_rate * settlement.archivists.taxed_productivity) +
                (settlement.engineers.tax_rate * settlement.engineers.taxed_productivity) +
                (settlement.rune_smiths.tax_rate * settlement.rune_smiths.taxed_productivity) +
                (settlement.craftsmen.tax_rate * settlement.craftsmen.taxed_productivity) +
                (settlement.merchants.tax_rate * settlement.merchants.taxed_productivity) +
                (settlement.clerics.tax_rate * settlement.clerics.taxed_productivity) +
                (settlement.miners.tax_rate * settlement.miners.taxed_productivity) +
                (settlement.farmers.tax_rate * settlement.farmers.taxed_productivity) +
                (settlement.warriors.tax_rate * settlement.warriors.taxed_productivity) +
                (settlement.foresters.tax_rate * settlement.foresters.taxed_productivity)) * (1 - taxRate))
            }/>
          </div>
        </div>
        <div className='flex flex-row gap-3'>
        <div className='flex flex-column gap-2'>
            <div className='flex flex-row gap-1'>
              <IoFastFood/>
              {settlement.food_and_water.stock}
              <PlusMinus value={settlement.farmers.food_and_water.produced + settlement.foresters.food_and_water.produced 
                    - settlement.food_and_water.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiBeerStein/>
              {settlement.beer.stock}
              <PlusMinus value={settlement.farmers.beer.produced - settlement.beer.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiClothes/>
              {settlement.leather_and_textiles.stock}
              <PlusMinus value={settlement.farmers.leather_and_textiles.produced - settlement.leather_and_textiles.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <LuHandCoins/>
              {settlement.artisinal_goods.stock}
              <PlusMinus value={settlement.craftsmen.artisanal_goods.produced + settlement.foresters.artisanal_goods.produced 
                    - settlement.artisinal_goods.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <PiCowFill/>
              {settlement.livestock.stock}
              <PlusMinus value={settlement.farmers.livestock.produced - settlement.livestock.consumption_rate}/>
            </div>
          </div>
          <div className='flex flex-column gap-2'>
            <div className='flex flex-row gap-1'>
              <GiPouringChalice />
              {settlement.ornamental_luxuries.stock}
              <PlusMinus value={settlement.craftsmen.ornamental_luxuries.produced - settlement.ornamental_luxuries.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiCrystalBall />
              {settlement.enchanted_luxuries.stock}
              <PlusMinus value={settlement.rune_smiths.enchanted_luxuries.produced - settlement.enchanted_luxuries.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiWoodPile />
              {settlement.timber.stock}
              <PlusMinus value={settlement.foresters.timber.produced - settlement.timber.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaTools />
              {settlement.tools.stock}
              <PlusMinus value={settlement.craftsmen.tools.produced - settlement.tools.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiThrownCharcoal />
              {settlement.enchanted_charcoal.stock}
              <PlusMinus value={settlement.foresters.enchanted_charcoal.produced - settlement.enchanted_charcoal.consumption_rate}/>
            </div>
          </div>
          <div className='flex flex-column gap-2'>
            <div className='flex flex-row gap-1'>
              <GiCoalWagon />
              {settlement.common_ores.stock}
              <PlusMinus value={settlement.miners.common_ores.produced - settlement.common_ores.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaBriefcaseMedical />
              {settlement.medical_supplies.stock}
              <PlusMinus value={settlement.clerics.medical_supplies.produced - settlement.medical_supplies.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiGems />
              {settlement.gems.stock}
              <PlusMinus value={settlement.miners.gems.produced - settlement.gems.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaGem />
              {settlement.rare_ores.stock}
              <PlusMinus value={settlement.miners.rare_ores.produced - settlement.rare_ores.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaBook />
              {settlement.books.stock}
              <PlusMinus value={settlement.clerics.books.produced + settlement.archivists.books.produced - settlement.books.consumption_rate}/>
            </div>
          </div>
          <div className='flex flex-column gap-2'>
            <div className='flex flex-row gap-1'>
              <GiRuneStone />
              {settlement.runes.stock}
              <PlusMinus value={settlement.rune_smiths.runes.produced - settlement.runes.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <FaShieldAlt />
              {settlement.armaments.stock}
              <PlusMinus value={settlement.craftsmen.armaments.produced - settlement.armaments.consumption_rate}/>
            </div>
            <div className='flex flex-row gap-1'>
              <GiMagicShield />
              {settlement.enchanted_armaments.stock}
              <PlusMinus value={settlement.rune_smiths.enchanted_armaments.produced - settlement.enchanted_armaments.consumption_rate}/>
            </div>
          </div>
        </div>
        <Divider/>
        <div>
          <label htmlFor="tax-rate">Settlement Tax</label>
          <InputText id="tax-rate" value={Math.round((taxRate * 100)).toString()}/>
          <Slider value={taxRate * 100} onChange={(e) => setTaxRate((e.value as number)/100)} step={1}/>
      </div>
      </Card>
    </>
  );
}


export default Settlement;