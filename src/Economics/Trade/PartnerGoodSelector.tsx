import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useState } from 'react';
import { goodsdist } from '../../Goods/GoodsDist';
import { Tooltip } from 'primereact/tooltip';
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
import PlusMinus from '../../components/PlusMinus';

export interface PartnerGoodSelectorProps {
    goodName: keyof goodsdist;
    currentStock: number;
    currentChange: number;
    price: number;
    remainingCapacity: number;
    partnerMerchantCapacity?: number; // Optional merchant capacity for settlements
    onAddToTrade: (amount: number) => void;
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

export const PartnerGoodSelector: React.FC<PartnerGoodSelectorProps> = ({
    goodName,
    currentStock,
    currentChange,
    price,
    remainingCapacity,
    partnerMerchantCapacity,
    onAddToTrade
}) => {
    const [tradeAmount, setTradeAmount] = useState<number>(0);

    const effectiveMaxAmount = Math.min(
        currentStock,
        goodName === 'money' ? Infinity : remainingCapacity,
        partnerMerchantCapacity ?? Infinity
    );

    return (
        <div className="flex align-items-center justify-content-between surface-ground p-2 border-1 border-round mb-1">
            <div className='flex flex-row'>
                <Button 
                    icon="pi pi-angle-double-left"
                    className="p-button-text p-button-secondary w-2rem h-2rem p-0"
                    onClick={() => {
                        if (tradeAmount > 0) {
                            onAddToTrade(tradeAmount);
                            setTradeAmount(0);
                        }
                    }}
                    disabled={tradeAmount <= 0 || tradeAmount > effectiveMaxAmount}
                />
                <div className="flex flex-column gap-2">
                    <div className="flex align-items-center gap-1">
                        {goodTooltipMap[goodName]}
                        <span className="text-sm font-medium" data-pr-tooltip="Current stock">
                            {currentStock}
                        </span>
                        <PlusMinus value={currentChange} />
                    </div>
                    <div className="flex align-items-center gap-1" data-pr-tooltip="Current price">
                        <MoneyIconTT />
                        <span className="text-sm font-medium">{price}</span>
                    </div>
                </div>
            </div>

            <InputNumber 
                    value={tradeAmount} 
                    onValueChange={(e) => setTradeAmount(e.value || 0)}
                    min={0}
                    max={effectiveMaxAmount}
                    placeholder="0"
                    size={1}
                    className="w-3rem"
                    showButtons={false}
                    inputClassName="text-center p-1 border-none bg-black-alpha-10"
                    tooltip={`Max: ${effectiveMaxAmount}`}
                    tooltipOptions={{ position: 'top' }}
                />

            <Tooltip target="[data-pr-tooltip]" />
        </div>
    );
}; 