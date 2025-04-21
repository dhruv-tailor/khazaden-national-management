import { Button } from 'primereact/button';
import { goodsdist } from '../../Goods/GoodsDist';
import MoneyIconTT from '../../tooltips/goods/MoneyIconTT';
import FoodIconTT from '../../tooltips/goods/FoodIconTT';
import BeerIconTT from '../../tooltips/goods/BeerIconTT';
import LeatherIconTT from '../../tooltips/goods/LeatherIconTT';
import ArtisanalIconTT from '../../tooltips/goods/ArtisanalIconTT';
import LivestockIconTT from '../../tooltips/goods/LivestockIconTT';
import OrnamentalIconTT from '../../tooltips/goods/OrnamentalIconTT';
import EnchantedIconTT from '../../tooltips/goods/EnchantedIconTT';
import TimberIconTT from '../../tooltips/goods/TimberIconTT';
import ToolsIconTT from '../../tooltips/goods/ToolsIconTT';
import CommonOresIconTT from '../../tooltips/goods/CommonOresTT';
import MedicalIconTT from '../../tooltips/goods/MedicalIconTT';
import RareOresIconTT from '../../tooltips/goods/RareOresIconTT';
import GemsIconTT from '../../tooltips/goods/GemsIconTT';
import RunesIconTT from '../../tooltips/goods/RunesIconTT';
import ArmsIconTT from '../../tooltips/goods/ArmsIconTT';
import BooksIconTT from '../../tooltips/goods/BooksIconTT';
import EnchantedArmsIconTT from '../../tooltips/goods/EnchantedArmsTT';
import CharcoalIconTT from '../../tooltips/goods/CharcoalIconTT';

interface SelectedGoodItemProps {
    goodName: keyof goodsdist;
    amount: number;
    onRemove: (goodName: keyof goodsdist) => void;
}

const goodTooltipMap: Record<keyof goodsdist, React.ReactElement> = {
    money: <MoneyIconTT />,
    food: <FoodIconTT />,
    beer: <BeerIconTT />,
    leather: <LeatherIconTT />,
    artisanal: <ArtisanalIconTT />,
    livestock: <LivestockIconTT />,
    ornamental: <OrnamentalIconTT />,
    enchanted: <EnchantedIconTT />,
    timber: <TimberIconTT />,
    tools: <ToolsIconTT />,
    common_ores: <CommonOresIconTT />,
    medical: <MedicalIconTT />,
    rare_ores: <RareOresIconTT />,
    gems: <GemsIconTT />,
    runes: <RunesIconTT />,
    arms: <ArmsIconTT />,
    books: <BooksIconTT />,
    enchanted_arms: <EnchantedArmsIconTT />,
    charcoal: <CharcoalIconTT />
};

export default function SelectedGoodItem({ goodName, amount, onRemove }: SelectedGoodItemProps) {
    return (
        <div className="flex align-items-center justify-content-between surface-ground p-2 border-1 border-round">
            <div className="flex align-items-center gap-2">
                {goodTooltipMap[goodName]}
                <span className="text-sm font-medium">{amount} per month</span>
            </div>
            <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-text p-button-danger"
                onClick={() => onRemove(goodName)}
            />
        </div>
    );
} 