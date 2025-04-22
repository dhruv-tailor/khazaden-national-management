import { Button } from "primereact/button";
import { TradeDealInterface } from "./interface/TradeDealInterface";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { settlementChange, SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { goodsdist, scaleGoods } from "../../Goods/GoodsDist";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { ProgressBar } from 'primereact/progressbar';
import TradeGoodSelector from "./TradeGoodSelector";
import SelectedGoodItem from './SelectedGoodItem';
import { PartnerGoodSelector } from './PartnerGoodSelector';
import MoneyIconTT from '../../tooltips/goods/MoneyIconTT';

export default function TradeDealView(
    {tradedeals,foreignPowers,settlements,currentStock,merchantCapacity,prices,currentChange,updateFunc,isFederal,federalReserve,federalChange,federalPrices,federalMerchantCap}: 
    {
        tradedeals: TradeDealInterface[],
        foreignPowers: ForeignPowerInterface[],
        settlements: SettlementInterface[],
        currentStock: goodsdist,
        merchantCapacity: number,
        prices: goodsdist,
        currentChange: goodsdist,
        updateFunc: (partnerType: string, partnerId: string, length: number, tradeDealInfo: {
            goodName: keyof goodsdist;
            amount: number;
            isOutgoing: boolean;
            price: number;
        }[]) => void,
        isFederal: boolean,
        federalReserve: goodsdist,
        federalChange: goodsdist,
        federalPrices: goodsdist,
        federalMerchantCap: number
    }) {
    const [showCreateTradeDeal, setShowCreateTradeDeal] = useState(false);
    const [selectedPartnerType, setSelectedPartnerType] = useState<'settlement' | 'foreign' | 'federal'>('settlement');
    const [selectedPartner, setSelectedPartner] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<'select' | 'details'>('select');
    const [duration, setDuration] = useState<number>(1);
    const [selectedGoods, setSelectedGoods] = useState<{
        goodName: keyof goodsdist;
        amount: number;
        isOutgoing: boolean;
        price: number;
    }[]>([]);

    const handlePartnerTypeChange = (type: 'settlement' | 'foreign' | 'federal') => {
        setSelectedPartnerType(type);
        setSelectedPartner(''); // Reset partner selection when type changes
    };

    const handleNext = () => {
        setCurrentStep('details');
    };

    const handleBack = () => {
        setCurrentStep('select');
    };

    const handleAddGoodToTrade = (goodName: keyof goodsdist, amount: number, isOutgoing: boolean = true) => {
        const partnerPrices = selectedPartnerType === 'settlement' 
            ? settlements.find(s => s.name === selectedPartner)?.prices ?? prices
            : selectedPartnerType === 'federal'
                ? federalPrices
                : scaleGoods(foreignPowers.find(fp => fp.name === selectedPartner)?.prices ?? prices, 1 + (foreignPowers.find(fp => fp.name === selectedPartner)?.tarriffs ?? 0));

        setSelectedGoods(prev => [...prev, { 
            goodName, 
            amount,
            isOutgoing,
            price: goodName === 'money' ? 1 : (isOutgoing ? prices[goodName] : Math.round(partnerPrices[goodName]))
        }]);
    };

    const handleRemoveGoodFromTrade = (goodName: keyof goodsdist) => {
        setSelectedGoods(prev => prev.filter(good => good.goodName !== goodName));
    };

    const usedCapacity = selectedGoods.reduce((sum, good) => 
        good.goodName === 'money' ? sum : sum + good.amount, 0);
    const remainingCapacity = Math.min(
        merchantCapacity - usedCapacity,
        selectedPartnerType === 'settlement' 
            ? (settlements.find(s => s.name === selectedPartner)?.merchant_capacity ?? 0) - usedCapacity
            : selectedPartnerType === 'federal'
                ? federalMerchantCap - usedCapacity
                : Infinity
    );

    const renderSelectPartner = () => (
        <div className="flex flex-column gap-3">
            {/* Partner Type Selection */}
            <div className="flex justify-content-center gap-3 mb-3">
                <Button 
                    label="Settlement" 
                    className={selectedPartnerType === 'settlement' ? 'p-button-primary' : 'p-button-outlined'}
                    onClick={() => handlePartnerTypeChange('settlement')}
                />
                <Button 
                    label="Foreign Nation" 
                    className={selectedPartnerType === 'foreign' ? 'p-button-primary' : 'p-button-outlined'}
                    onClick={() => handlePartnerTypeChange('foreign')}
                />
                {!isFederal ? <Button 
                    label="Federal" 
                    className={selectedPartnerType === 'federal' ? 'p-button-primary' : 'p-button-outlined'}
                    onClick={() => handlePartnerTypeChange('federal')}
                /> : <></>}
            </div>

            {/* Partner Selection */}
            <div className="flex flex-column gap-2">
                {selectedPartnerType === 'federal' ? (
                    <div className="p-2 surface-ground border-round">
                        <span className="font-semibold">Federal Government</span>
                    </div>
                ) : (
                    <span className="p-float-label">
                        <Dropdown 
                            value={selectedPartner}
                            options={
                                selectedPartnerType === 'settlement' 
                                    ? settlements.map(s => ({label: s.name, value: s.name}))
                                    : foreignPowers.filter(fp => !fp.isEmbargoed).map(fp => ({label: fp.name, value: fp.name}))
                            }
                            onChange={(e) => setSelectedPartner(e.value)}
                            className="w-full"
                            placeholder={`Select a ${selectedPartnerType === 'settlement' ? 'settlement' : 'foreign nation'}`}
                        />
                        <label>{selectedPartnerType === 'settlement' ? 'Settlement' : 'Foreign Nation'}</label>
                    </span>
                )}
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-content-end gap-2 mt-3">
                <Button 
                    label="Next" 
                    onClick={handleNext}
                    disabled={!selectedPartner && selectedPartnerType !== 'federal'}
                />
            </div>
        </div>
    );

    const renderTradeDetails = () => (
        <div className="flex flex-column gap-3">
            <div className="grid">
                {/* Left Section - Current Stock */}
                <div className="col-4">
                    <Card title="Current Stock" className="h-full overflow-auto" style={{ maxHeight: '500px' }}>
                        <div className="flex flex-column gap-2">
                            {(Object.entries(currentStock) as [keyof goodsdist, number][])
                                .filter(([goodName, stock]) => 
                                    (stock !== 0 || currentChange[goodName] !== 0) && 
                                    !selectedGoods.some(g => g.goodName === goodName)
                                )
                                .map(([goodName, stock]) => {
                                    const partnerPrices = selectedPartnerType === 'settlement' 
                                        ? settlements.find(s => s.name === selectedPartner)?.prices ?? prices
                                        : selectedPartnerType === 'federal'
                                            ? federalPrices
                                            : scaleGoods(foreignPowers.find(fp => fp.name === selectedPartner)?.prices ?? prices, 1 + (foreignPowers.find(fp => fp.name === selectedPartner)?.tarriffs ?? 0));

                                    return (
                                        <TradeGoodSelector
                                            key={goodName}
                                            goodName={goodName}
                                            currentStock={Math.round(stock)}
                                            currentChange={Math.round(currentChange[goodName])}
                                            price={Math.round(goodName === 'money' ? 1 : partnerPrices[goodName])}
                                            maxTradeAmount={
                                                selectedPartnerType === 'foreign'
                                                    ? foreignPowers.find(fp => fp.name === selectedPartner)?.available_demand?.[goodName] || 0
                                                    : undefined
                                            }
                                            remainingCapacity={remainingCapacity}
                                            onAddToTrade={(amount) => handleAddGoodToTrade(goodName, amount, true)}
                                        />
                                    );
                                })
                            }
                        </div>
                    </Card>
                </div>

                {/* Middle Section - Trade Details */}
                <div className="col-4">
                    <Card title="Trade Details" className="h-full overflow-auto" style={{ maxHeight: '500px' }}>
                        <div className="flex flex-column gap-3">
                            {/* Merchant Capacity */}
                            <div className="flex flex-column gap-2">
                                <label className="font-semibold">Merchant Capacity</label>
                                <div className="flex flex-column gap-1">
                                    <ProgressBar 
                                        value={(usedCapacity / merchantCapacity) * 100} 
                                        showValue={false}
                                        className="h-1rem"
                                    />
                                    <div className="flex justify-content-between">
                                        <span className="text-sm text-500">
                                            {usedCapacity} / {merchantCapacity}
                                        </span>
                                        <span className="text-sm text-500">
                                            {Math.round((usedCapacity / merchantCapacity) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Partner Merchant Capacity (for settlements and federal) */}
                            {(selectedPartnerType === 'settlement' || selectedPartnerType === 'federal') && (
                                <div className="flex flex-column gap-2">
                                    <label className="font-semibold">Partner Merchant Capacity</label>
                                    <div className="flex flex-column gap-1">
                                        <ProgressBar 
                                            value={(usedCapacity / (selectedPartnerType === 'settlement' 
                                                ? settlements.find(s => s.name === selectedPartner)?.merchant_capacity ?? 0
                                                : federalMerchantCap)) * 100} 
                                            showValue={false}
                                            className="h-1rem"
                                        />
                                        <div className="flex justify-content-between">
                                            <span className="text-sm text-500">
                                                {usedCapacity} / {selectedPartnerType === 'settlement' 
                                                    ? settlements.find(s => s.name === selectedPartner)?.merchant_capacity ?? 0
                                                    : federalMerchantCap}
                                            </span>
                                            <span className="text-sm text-500">
                                                {Math.round((usedCapacity / (selectedPartnerType === 'settlement' 
                                                    ? settlements.find(s => s.name === selectedPartner)?.merchant_capacity ?? 0
                                                    : federalMerchantCap)) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Duration Selection */}
                            <div className="flex flex-column gap-2">
                                <label htmlFor="duration" className="font-semibold">Deal Duration</label>
                                <div className="p-inputgroup">
                                <InputNumber 
                                        id="duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.value || 1)}
                                        min={1}
                                        className="text-center"
                                        showButtons={true}
                                        inputClassName="border-none text-center"
                                    />
                                    <span className="p-inputgroup-addon">months</span>
                                </div>
                            </div>
                            
                            {/* Selected Goods */}
                            <div className="flex flex-column gap-2">
                                <label className="font-semibold">Selected Goods</label>
                                {selectedGoods.length === 0 ? (
                                    <div className="text-500 text-sm">No goods selected</div>
                                ) : (
                                    <div className="flex flex-column gap-2">
                                        {selectedGoods.map(good => (
                                            <SelectedGoodItem
                                                key={good.goodName}
                                                goodName={good.goodName}
                                                amount={Math.round(good.amount)}
                                                isOutgoing={good.isOutgoing}
                                                price={Math.round(good.price)}
                                                onRemove={handleRemoveGoodFromTrade}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Section - Partner Information and Goods */}
                <div className="col-4">
                    <div className="flex flex-column gap-3">          
                        <Card title={selectedPartnerType === 'federal' ? 'Federal Reserve' : selectedPartner} className="h-full overflow-auto" style={{ maxHeight: '500px' }}>
                            <div className="flex flex-column gap-2">
                                {(Object.entries(prices) as [keyof goodsdist, number][])
                                    .filter(([goodName]) => !selectedGoods.some(g => g.goodName === goodName))
                                    .map(([goodName]) => {
                                        const partnerPrices = selectedPartnerType === 'settlement' 
                                            ? settlements.find(s => s.name === selectedPartner)?.prices ?? prices
                                            : selectedPartnerType === 'federal'
                                                ? federalPrices
                                                : scaleGoods(foreignPowers.find(fp => fp.name === selectedPartner)?.prices ?? prices, 1 + (foreignPowers.find(fp => fp.name === selectedPartner)?.tarriffs ?? 0));

                                        return (
                                            <PartnerGoodSelector
                                                key={goodName}
                                                goodName={goodName}
                                                currentStock={selectedPartnerType === 'settlement' 
                                                    ? Math.round(settlements.find(s => s.name === selectedPartner)?.stock?.[goodName] ?? 0)
                                                    : selectedPartnerType === 'federal'
                                                        ? Math.round(federalReserve[goodName])
                                                        : Math.round(foreignPowers.find(fp => fp.name === selectedPartner)?.available_supply?.[goodName] ?? 0)
                                                }
                                                currentChange={selectedPartnerType === 'settlement'
                                                    ? Math.round(settlementChange(settlements.find(s => s.name === selectedPartner)!)?.[goodName] ?? 0)
                                                    : selectedPartnerType === 'federal'
                                                        ? Math.round(federalChange[goodName])
                                                        : 0 // Foreign nations don't show change
                                                }
                                                price={Math.round(goodName === 'money' ? 1 : partnerPrices[goodName])}
                                                remainingCapacity={remainingCapacity}
                                                partnerMerchantCapacity={selectedPartnerType === 'settlement' 
                                                    ? settlements.find(s => s.name === selectedPartner)?.merchant_capacity
                                                    : selectedPartnerType === 'federal'
                                                        ? federalMerchantCap
                                                        : undefined}
                                                onAddToTrade={(amount) => handleAddGoodToTrade(goodName, amount, false)}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex flex-column gap-2 mt-3">
                {selectedGoods.length > 0 && (
                    <div className="flex justify-content-between p-2 surface-ground border-round">
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">Outgoing:</span>
                            <div className="flex align-items-center gap-1">
                                <MoneyIconTT />
                                <span>{selectedGoods
                                    .filter(good => good.isOutgoing)
                                    .reduce((sum, good) => sum + (good.amount * good.price), 0)
                                }</span>
                            </div>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">Incoming:</span>
                            <div className="flex align-items-center gap-1">
                                <MoneyIconTT />
                                <span>{selectedGoods
                                    .filter(good => !good.isOutgoing)
                                    .reduce((sum, good) => sum + (good.amount * good.price), 0)
                                }</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-content-between">
                    <Button 
                        label="Back" 
                        onClick={handleBack}
                        className="p-button-text"
                    />
                    <Button 
                        label="Create Deal"
                        disabled={selectedGoods
                            .filter(good => good.isOutgoing)
                            .reduce((sum, good) => sum + (good.amount * good.price), 0) < selectedGoods
                            .filter(good => !good.isOutgoing)
                            .reduce((sum, good) => sum + (good.amount * good.price), 0)}
                        onClick={() => updateFunc(selectedPartnerType,selectedPartner,duration,selectedGoods)}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-column gap-2">
            <Button label="Create Trade Deal" onClick={() => {
                setShowCreateTradeDeal(true);
                setSelectedGoods([]);
            }}/>
            <Dialog 
                header="Create Trade Deal" 
                visible={showCreateTradeDeal} 
                onHide={() => {
                    setShowCreateTradeDeal(false);
                    setCurrentStep('select');
                    setSelectedPartner('');
                    setDuration(6);
                    setSelectedGoods([]);
                }}
            >
                {currentStep === 'select' ? renderSelectPartner() : renderTradeDetails()}
            </Dialog>
        </div>
    )
}
