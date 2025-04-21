import { Button } from "primereact/button";
import { TradeDealInterface } from "./interface/TradeDealInterface";
import TradeDealRow from "./TradeDealRow";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { SettlementInterface } from "../../Settlement/SettlementInterface/SettlementInterface";
import { goodsdist } from "../../Goods/GoodsDist";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import TradeGoodSelector from "./TradeGoodSelector";
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import SelectedGoodItem from './SelectedGoodItem';

export default function TradeDealView({tradedeals,foreignPowers,settlements,currentStock,merchantCapacity,prices,currentChange}: {tradedeals: TradeDealInterface[],foreignPowers: ForeignPowerInterface[],settlements: SettlementInterface[],currentStock: goodsdist,merchantCapacity: number,prices: goodsdist,currentChange: goodsdist}) {
    const [showCreateTradeDeal, setShowCreateTradeDeal] = useState(false);
    const [selectedPartnerType, setSelectedPartnerType] = useState<'settlement' | 'foreign'>('settlement');
    const [selectedPartner, setSelectedPartner] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<'select' | 'details'>('select');
    const [duration, setDuration] = useState<number>(1);
    const [selectedGoods, setSelectedGoods] = useState<{goodName: keyof goodsdist, amount: number}[]>([]);

    const handlePartnerTypeChange = (type: 'settlement' | 'foreign') => {
        setSelectedPartnerType(type);
        setSelectedPartner(''); // Reset partner selection when type changes
    };

    const handleNext = () => {
        setCurrentStep('details');
    };

    const handleBack = () => {
        setCurrentStep('select');
    };

    const handleAddGoodToTrade = (goodName: keyof goodsdist, amount: number) => {
        setSelectedGoods(prev => [...prev, { goodName, amount }]);
    };

    const handleRemoveGoodFromTrade = (goodName: keyof goodsdist) => {
        setSelectedGoods(prev => prev.filter(good => good.goodName !== goodName));
    };

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
            </div>

            {/* Partner Selection */}
            <div className="flex flex-column gap-2">
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
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-content-end gap-2 mt-3">
                <Button 
                    label="Cancel" 
                    onClick={() => setShowCreateTradeDeal(false)}
                    className="p-button-text"
                />
                <Button 
                    label="Next" 
                    onClick={handleNext}
                    disabled={!selectedPartner}
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
                                .filter(([goodName, stock]) => stock !== 0 || currentChange[goodName] !== 0)
                                .map(([goodName, stock]) => (
                                    <TradeGoodSelector
                                        key={goodName}
                                        goodName={goodName}
                                        currentStock={stock}
                                        currentChange={currentChange[goodName]}
                                        onAddToTrade={(amount) => handleAddGoodToTrade(goodName, amount)}
                                    />
                                ))
                            }
                        </div>
                    </Card>
                </div>

                {/* Middle Section - Trade Details */}
                <div className="col-4">
                    <Card title="Trade Details" className="h-full">
                        <div className="flex flex-column gap-3">
                            {/* Duration Selection */}
                            <div className="flex flex-column gap-2">
                                <label htmlFor="duration" className="font-semibold">Deal Duration</label>
                                <div className="p-inputgroup">
                                    <Button 
                                        icon="pi pi-minus" 
                                        onClick={() => setDuration(prev => Math.max(1, prev - 1))}
                                        className="p-button-secondary"
                                    />
                                    <InputNumber 
                                        id="duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.value || 1)}
                                        min={1}
                                        max={60}
                                        className="text-center"
                                        showButtons={false}
                                        inputClassName="border-none text-center"
                                    />
                                    <Button 
                                        icon="pi pi-plus" 
                                        onClick={() => setDuration(prev => Math.min(60, prev + 1))}
                                        className="p-button-secondary"
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
                                                amount={good.amount}
                                                onRemove={handleRemoveGoodFromTrade}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Section - Partner Information */}
                <div className="col-4">
                    <Card title="Partner Information" className="h-full">
                        <div className="flex flex-column gap-2">
                            <div className="font-bold">{selectedPartner}</div>
                            <div>Type: {selectedPartnerType === 'settlement' ? 'Settlement' : 'Foreign Nation'}</div>
                            {/* TODO: Add more partner details */}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-content-between mt-3">
                <Button 
                    label="Back" 
                    onClick={handleBack}
                    className="p-button-text"
                />
                <div className="flex gap-2">
                    <Button 
                        label="Cancel" 
                        onClick={() => setShowCreateTradeDeal(false)}
                        className="p-button-text"
                    />
                    <Button 
                        label="Create Deal"
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
            {tradedeals.map((tradeDeal) => (
                <TradeDealRow key={tradeDeal.id} tradeDeal={tradeDeal} />
            ))}

            <Dialog 
                header="Create Trade Deal" 
                visible={showCreateTradeDeal} 
                onHide={() => {
                    setShowCreateTradeDeal(false);
                    setCurrentStep('select');
                    setSelectedPartner('');
                    setDuration(1);
                    setSelectedGoods([]);
                }}
                className={currentStep === 'select' ? 'w-6' : 'w-8'}
            >
                {currentStep === 'select' ? renderSelectPartner() : renderTradeDetails()}
            </Dialog>
        </div>
    )
}
