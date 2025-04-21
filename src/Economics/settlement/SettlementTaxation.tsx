import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { goodsdist } from "../../Goods/GoodsDist";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import MerchantsIconTT from "../../tooltips/clans/MerchantsIconTT";
import FoodIconTT from "../../tooltips/goods/FoodIconTT";
import BeerIconTT from "../../tooltips/goods/BeerIconTT";
import LeatherIconTT from "../../tooltips/goods/LeatherIconTT";
import ArtisanalIconTT from "../../tooltips/goods/ArtisanalIconTT";
import LivestockIconTT from "../../tooltips/goods/LivestockIconTT";
import OrnamentalIconTT from "../../tooltips/goods/OrnamentalIconTT";
import EnchantedIconTT from "../../tooltips/goods/EnchantedIconTT";
import TimberIconTT from "../../tooltips/goods/TimberIconTT";
import ToolsIconTT from "../../tooltips/goods/ToolsIconTT";
import CommonOresIconTT from "../../tooltips/goods/CommonOresTT";
import MedicalIconTT from "../../tooltips/goods/MedicalIconTT";
import RareOresIconTT from "../../tooltips/goods/RareOresIconTT";
import GemsIconTT from "../../tooltips/goods/GemsIconTT";
import RunesIconTT from "../../tooltips/goods/RunesIconTT";
import ArmsIconTT from "../../tooltips/goods/ArmsIconTT";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import EnchantedArmsIconTT from "../../tooltips/goods/EnchantedArmsTT";
import CharcoalIconTT from "../../tooltips/goods/CharcoalIconTT";
import TaxSlider from "./TaxSlider";
import { Card } from "primereact/card";
import DisplayGoods from "../../components/goodsDislay";
import { settlementChange } from "../../Settlement/SettlementInterface/SettlementInterface";
import { FederalChangeProps } from "../../Game";
import { FederalChange } from "../../utilities/SimpleFunctions";
export default function SettlementTaxation(
    {settlement, updateTaxation,setMerchantTax,federal_reserve,FederalProps}: 
    {settlement: SettlementInterface, updateTaxation: (taxation: goodsdist) => void, setMerchantTax: (merchant_tax: number) => void, federal_reserve: goodsdist, FederalProps: FederalChangeProps }
) {
    return (
        <div className="flex flex-column gap-2">
            <div className="flex flex-row justify-content-between align-items-center sticky top-0 z-5 bg-black shadow-2">
                <Card header="Federal Reserve">
                    <DisplayGoods stock={federal_reserve} change={FederalChange(FederalProps.settlements,FederalProps.loans,FederalProps.armies)}/>
                </Card>
                <Card header="Settlement">
                    <DisplayGoods stock={settlement.stock} change={settlementChange(settlement)}/>
                </Card>
            </div>
            <div className="grid">
                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="money-tax"
                        label={<><MoneyIconTT/> Income Tax</>}
                        value={settlement.taxation.money}
                        onChange={value => updateTaxation({...settlement.taxation,money: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="merchant-tax"
                        label={<><MerchantsIconTT/> Trade Capacity Tax {Math.round(settlement.merchant_capacity * settlement.merchant_tax)} / {settlement.merchant_capacity}</>}
                        value={settlement.merchant_tax}
                        onChange={setMerchantTax}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="food-tax"
                        label={<><FoodIconTT/> Food Tax</>}
                        value={settlement.taxation.food}
                        onChange={value => updateTaxation({...settlement.taxation,food: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="beer-tax"
                        label={<><BeerIconTT/> Beer Tax</>}
                        value={settlement.taxation.beer}
                        onChange={value => updateTaxation({...settlement.taxation,beer: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="leather-tax"
                        label={<><LeatherIconTT/> Leather Tax</>}
                        value={settlement.taxation.leather}
                        onChange={value => updateTaxation({...settlement.taxation,leather: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="artisanal-tax"
                        label={<><ArtisanalIconTT/> Artisanal Tax</>}
                        value={settlement.taxation.artisanal}
                        onChange={value => updateTaxation({...settlement.taxation,artisanal: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="livestock-tax"
                        label={<><LivestockIconTT/> Livestock Tax</>}
                        value={settlement.taxation.livestock}
                        onChange={value => updateTaxation({...settlement.taxation,livestock: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="ornamental-tax"
                        label={<><OrnamentalIconTT/> Ornamental Tax</>}
                        value={settlement.taxation.ornamental}
                        onChange={value => updateTaxation({...settlement.taxation,ornamental: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="enchanted-tax"
                        label={<><EnchantedIconTT/> Enchanted Tax</>}
                        value={settlement.taxation.enchanted}
                        onChange={value => updateTaxation({...settlement.taxation,enchanted: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="timber-tax"
                        label={<><TimberIconTT/> Timber Tax</>}
                        value={settlement.taxation.timber}
                        onChange={value => updateTaxation({...settlement.taxation,timber: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="tools-tax"
                        label={<><ToolsIconTT/> Tools Tax</>}
                        value={settlement.taxation.tools}
                        onChange={value => updateTaxation({...settlement.taxation,tools: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="common-ores-tax"
                        label={<><CommonOresIconTT/> Common Ores Tax</>}
                        value={settlement.taxation.common_ores}
                        onChange={value => updateTaxation({...settlement.taxation,common_ores: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="medical-tax"
                        label={<><MedicalIconTT/> Medical Tax</>}
                        value={settlement.taxation.medical}
                        onChange={value => updateTaxation({...settlement.taxation,medical: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="rare-ores-tax"
                        label={<><RareOresIconTT/> Rare Ores Tax</>}
                        value={settlement.taxation.rare_ores}
                        onChange={value => updateTaxation({...settlement.taxation,rare_ores: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="gems-tax"
                        label={<><GemsIconTT/> Gems Tax</>}
                        value={settlement.taxation.gems}
                        onChange={value => updateTaxation({...settlement.taxation,gems: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="runes-tax"
                        label={<><RunesIconTT/> Runes Tax</>}
                        value={settlement.taxation.runes}
                        onChange={value => updateTaxation({...settlement.taxation,runes: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="arms-tax"
                        label={<><ArmsIconTT/> Arms Tax</>}
                        value={settlement.taxation.arms}
                        onChange={value => updateTaxation({...settlement.taxation,arms: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="books-tax"
                        label={<><BooksIconTT/> Books Tax</>}
                        value={settlement.taxation.books}
                        onChange={value => updateTaxation({...settlement.taxation,books: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="enchanted-arms-tax"
                        label={<><EnchantedArmsIconTT/> Enchanted Arms Tax</>}
                        value={settlement.taxation.enchanted_arms}
                        onChange={value => updateTaxation({...settlement.taxation,enchanted_arms: value})}
                    />
                </div>

                <div className="col-12 md:col-6">
                    <TaxSlider
                        id="charcoal-tax"
                        label={<><CharcoalIconTT/> Charcoal Tax</>}
                        value={settlement.taxation.charcoal}
                        onChange={value => updateTaxation({...settlement.taxation,charcoal: value})}
                    />
                </div>
            </div>
        </div>
    )
}
