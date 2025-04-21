import { TradeDealInterface } from "./interface/TradeDealInterface";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import DisplayGoods from "../../components/goodsDislay";
import { empty_goodsdist } from "../../Goods/GoodsDist";

export default function TradeDealRow({tradeDeal}: {tradeDeal: TradeDealInterface}) {
    return (
        <Card className="w-full">
            <div className="flex flex-column gap-2">
                {/* Header with name and type */}
                <div className="flex justify-content-between align-items-center">
                    <div className="flex flex-column">
                        <span className="font-bold text-lg">{tradeDeal.name}</span>
                        <span className="text-sm text-500">Type: {tradeDeal.type}</span>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            icon="pi pi-check" 
                            className="p-button-success" 
                            tooltip="Accept Deal"
                            tooltipOptions={{ position: 'top' }}
                        />
                        <Button 
                            icon="pi pi-times" 
                            className="p-button-danger" 
                            tooltip="Reject Deal"
                            tooltipOptions={{ position: 'top' }}
                        />
                    </div>
                </div>

                {/* Goods Exchange */}
                <div className="grid">
                    <div className="col-6">
                        <div className="text-sm font-semibold mb-1">Outgoing Goods</div>
                        <DisplayGoods stock={tradeDeal.outgoing} change={empty_goodsdist} />
                    </div>
                    <div className="col-6">
                        <div className="text-sm font-semibold mb-1">Incoming Goods</div>
                        <DisplayGoods stock={tradeDeal.incoming} change={empty_goodsdist} />
                    </div>
                </div>

                {/* Footer with duration */}
                <div className="flex justify-content-between align-items-center">
                    <div className="flex flex-column">
                        <span className="text-sm">Duration: {tradeDeal.duration} months</span>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            icon="pi pi-info-circle" 
                            className="p-button-info" 
                            tooltip="View Details"
                            tooltipOptions={{ position: 'top' }}
                        />
                        <Button 
                            icon="pi pi-pencil" 
                            className="p-button-warning" 
                            tooltip="Edit Deal"
                            tooltipOptions={{ position: 'top' }}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}
