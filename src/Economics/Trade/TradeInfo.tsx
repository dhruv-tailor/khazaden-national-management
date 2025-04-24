import { TradeDealInterface } from "./interface/TradeDealInterface";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { goodsdist } from "../../Goods/GoodsDist";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
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

export default function TradeInfo({trade_deal, handleAcceptDeal, handleDeclineDeal}: {trade_deal: TradeDealInterface, handleAcceptDeal: (trade_id: string) => void, handleDeclineDeal: (trade_id: string) => void}) {
    const getStatusSeverity = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'sent': return 'info';
            case 'checking': return 'warning';
            default: return 'info';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'settlement': return 'Settlement';
            case 'foreign': return 'Foreign Nation';
            case 'federal': return 'Federal Government';
            default: return type;
        }
    };

    const getGoodIcon = (goodName: keyof goodsdist) => {
        switch (goodName) {
            case 'money': return <MoneyIconTT />;
            case 'food': return <FoodIconTT />;
            case 'beer': return <BeerIconTT />;
            case 'leather': return <LeatherIconTT />;
            case 'artisanal': return <ArtisanalIconTT />;
            case 'livestock': return <LivestockIconTT />;
            case 'ornamental': return <OrnamentalIconTT />;
            case 'enchanted': return <EnchantedIconTT />;
            case 'timber': return <TimberIconTT />;
            case 'tools': return <ToolsIconTT />;
            case 'common_ores': return <CommonOresIconTT />;
            case 'medical': return <MedicalIconTT />;
            case 'rare_ores': return <RareOresIconTT />;
            case 'gems': return <GemsIconTT />;
            case 'runes': return <RunesIconTT />;
            case 'arms': return <ArmsIconTT />;
            case 'books': return <BooksIconTT />;
            case 'enchanted_arms': return <EnchantedArmsIconTT />;
            case 'charcoal': return <CharcoalIconTT />;
            default: return null;
        }
    };

    const renderGoodsList = () => {
        const allGoods = new Set([
            ...Object.keys(trade_deal.outgoing),
            ...Object.keys(trade_deal.incoming)
        ]);

        const incomingGoods = Array.from(allGoods)
            .filter(goodName => trade_deal.incoming[goodName as keyof goodsdist] > 0)
            .map(goodName => {
                const amount = trade_deal.incoming[goodName as keyof goodsdist];
                return (
                    <div key={goodName} className="flex align-items-center justify-content-between p-1 surface-ground border-round mb-0">
                        <div className="flex align-items-center gap-1">
                            {getGoodIcon(goodName as keyof goodsdist)}
                            <span className="text-sm">{amount}</span>
                        </div>
                        <div className="flex align-items-center gap-1">
                            <Button 
                                icon="pi pi-angle-double-left" 
                                className="p-button-text p-button-rounded p-button-secondary p-button-sm"
                            />
                        </div>
                    </div>
                );
            });

        const outgoingGoods = Array.from(allGoods)
            .filter(goodName => trade_deal.outgoing[goodName as keyof goodsdist] > 0)
            .map(goodName => {
                const amount = trade_deal.outgoing[goodName as keyof goodsdist];
                return (
                    <div key={goodName} className="flex align-items-center justify-content-between p-1 surface-ground border-round mb-0">
                        <div className="flex align-items-center gap-1">
                            <Button 
                                icon="pi pi-angle-double-right" 
                                className="p-button-text p-button-rounded p-button-sm"
                                severity="danger"
                            />
                        </div>
                        <div className="flex align-items-center gap-1">
                            <span className="text-sm">{amount}</span>
                            {getGoodIcon(goodName as keyof goodsdist)}
                        </div>
                    </div>
                );
            });

        return (
            <div className="grid">
                <div className="col-6">
                    <div className="flex flex-column">
                        <div className="mb-2 font-semibold text-sm text-500">
                            <i className="pi pi-arrow-down-right mr-1"></i>
                            Incoming
                        </div>
                        {incomingGoods}
                    </div>
                </div>
                <div className="col-6">
                    <div className="flex flex-column">
                        <div className="mb-2 font-semibold text-sm text-500">
                            <i className="pi pi-arrow-up-right mr-1"></i>
                            Outgoing
                        </div>
                        {outgoingGoods}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-column gap-2">
            {/* Header Section */}
            <div className="flex justify-content-between align-items-center">
                <div className="flex flex-column">
                    <h2 className="m-0 text-lg">{trade_deal.name}</h2>
                    <div className="flex align-items-center gap-1">
                        <Tag value={getTypeLabel(trade_deal.type)} severity="info" />
                        <Tag value={trade_deal.active} severity={getStatusSeverity(trade_deal.active)} />
                    </div>
                </div>
                <div className="flex align-items-center gap-1">
                    <span className="text-sm font-semibold">Duration:</span>
                    <span className="text-sm">{trade_deal.duration} months</span>
                </div>
            </div>

            {/* Trade Details Section */}
            <Card title="Trade Goods" className="h-full">
                {renderGoodsList()}
            </Card>

            {/* Action Buttons - Only show when status is 'checking' */}
            {trade_deal.active === 'checking' && (
                <div className="flex justify-content-end gap-1">
                    <Button 
                        label="Decline" 
                        icon="pi pi-times" 
                        severity="danger"
                        className="p-button-outlined p-button-sm"
                        onClick={() => handleDeclineDeal(trade_deal.trade_id)}
                    />
                    <Button 
                        label="Accept" 
                        icon="pi pi-check" 
                        severity="success"
                        className="p-button-outlined p-button-sm"
                        onClick={() => handleAcceptDeal(trade_deal.trade_id)}
                    />
                </div>
            )}
        </div>
    );
}
