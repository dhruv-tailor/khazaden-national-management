import { Card } from "primereact/card";
import { goodsdist, goodsId } from "../../Goods/GoodsDist";
import { releventGoodTT } from "../../tooltips/goods/ReleventGoodTT";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";

export default function SellOrder(
    {type,buyers,supply,merchantCapacity,price,updateFunc}: 
    {type: goodsId,buyers: ForeignPowerInterface[],supply: goodsdist,merchantCapacity: number,price: number,updateFunc: (type: goodsId,units: number,name: string) => void}) {
    
    const [showDialog,setShowDialog] = useState(false)
    const [selectedBuyer,setSelectedBuyer] = useState<ForeignPowerInterface | null>(null)
    const [units,setUnits] = useState(0)

    const getMax = () => {
        let foreign_max = 0
        let local_max = 0
        if (type === goodsId.food) {
            foreign_max = selectedBuyer?.available_supply.food ?? 0
            local_max = supply.food
        }
        if (type === goodsId.beer) {
            foreign_max = selectedBuyer?.available_supply.beer ?? 0
            local_max = supply.beer
        }
        if (type === goodsId.leather) {
            foreign_max = selectedBuyer?.available_supply.leather ?? 0
            local_max = supply.leather
        }
        if (type === goodsId.artisanal) {
            foreign_max = selectedBuyer?.available_supply.artisanal ?? 0
            local_max = supply.artisanal
        }
        if (type === goodsId.ornamental) {
            foreign_max = selectedBuyer?.available_supply.ornamental ?? 0
            local_max = supply.ornamental
        }
        if (type === goodsId.enchanted) {
            foreign_max = selectedBuyer?.available_supply.enchanted ?? 0
            local_max = supply.enchanted
        }
        if (type === goodsId.timber) {
            foreign_max = selectedBuyer?.available_supply.timber ?? 0
            local_max = supply.timber
        }
        if (type === goodsId.tools) {
            foreign_max = selectedBuyer?.available_supply.tools ?? 0
            local_max = supply.tools
        }
        if (type === goodsId.common_ores) {
            foreign_max = selectedBuyer?.available_supply.common_ores ?? 0
            local_max = supply.common_ores
        }
        if (type === goodsId.medical) {
            foreign_max = selectedBuyer?.available_supply.medical ?? 0
            local_max = supply.medical
        }
        if (type === goodsId.rare_ores) {
            foreign_max = selectedBuyer?.available_supply.rare_ores ?? 0
            local_max = supply.rare_ores
        }
        if (type === goodsId.gems) {
            foreign_max = selectedBuyer?.available_supply.gems ?? 0
            local_max = supply.gems
        }
        if (type === goodsId.runes) {
            foreign_max = selectedBuyer?.available_supply.runes ?? 0
            local_max = supply.runes
        }
        if (type === goodsId.arms) {
            foreign_max = selectedBuyer?.available_supply.arms ?? 0
            local_max = supply.arms
        }
        if (type === goodsId.books) {
            foreign_max = selectedBuyer?.available_supply.books ?? 0
            local_max = supply.books
        }
        if (type === goodsId.enchanted_arms) {
            foreign_max = selectedBuyer?.available_supply.enchanted_arms ?? 0
            local_max = supply.enchanted_arms
        }
        if (type === goodsId.charcoal) {
            foreign_max = selectedBuyer?.available_supply.charcoal ?? 0
            local_max = supply.charcoal
        }
        return Math.min(foreign_max,merchantCapacity,local_max)
    }

    const buyerTemplate = (rowData: ForeignPowerInterface) => {
        return (
            <Button 
                label={rowData.name} 
                icon="pi pi-shopping-cart" 
                className="w-full"
                onClick={() => {
                    setShowDialog(true)
                    setSelectedBuyer(rowData)
                    setUnits(0)
                }}
            />
        );
    };

    return (
        <Card title={<div className="flex align-items-center gap-2">{releventGoodTT[type]}</div>} className="w-20rem">
            <div className="flex flex-column gap-3">
                <div className="flex flex-column gap-2">
                    <span className="text-sm text-500">Available Buyers</span>
                    <DataTable 
                        value={buyers} 
                        showGridlines
                        size="small"
                    >
                        <Column body={buyerTemplate} />
                    </DataTable>
                </div>
                <Divider />
                <div className="flex flex-column gap-2">
                    <span className="text-sm text-500">Current Price</span>
                    <div className="flex align-items-center gap-1">
                        <MoneyIconTT/>
                        <span className="text-lg">{Math.round(price)}</span>
                    </div>
                </div>
            </div>

            <Dialog 
                header={<div className="flex align-items-center gap-2">
                    Sell {releventGoodTT[type]} to {selectedBuyer?.name}
                </div>} 
                visible={showDialog} 
                onHide={() => setShowDialog(false)}
                className="w-30rem"
            >
                <div className="flex flex-column gap-4">
                    <div className="flex flex-column gap-2">
                        <div className="flex flex-row align-items-center justify-content-between">
                            <span>Units to Sell:</span>
                            <InputNumber 
                                value={units} 
                                min={0} 
                                max={getMax()} 
                                size={4} 
                                showButtons 
                                onChange={e => setUnits(e.value ?? 0)}
                                className="w-8rem"
                            />
                        </div>
                        <small className="text-500">Maximum available: {getMax()} units</small>
                    </div>

                    <Divider />

                    <div className="flex flex-column gap-2">
                        <div className="flex flex-row justify-content-between align-items-center">
                            <span>Price per Unit:</span>
                            <div className="flex align-items-center gap-1">
                                <MoneyIconTT/>
                                <span>{Math.round(price)}</span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-content-between align-items-center">
                            <span>Total Price:</span>
                            <div className="flex align-items-center gap-1">
                                <MoneyIconTT/>
                                <span>{units * Math.round(price)}</span>
                            </div>
                        </div>
                    </div>

                    <Button 
                        icon="pi pi-check" 
                        label="Confirm Sale" 
                        severity="success" 
                        className="w-full"
                        onClick={() => {
                            setShowDialog(false)
                            updateFunc(type,units,selectedBuyer?.name ?? '')
                        }}
                    />
                </div>
            </Dialog>
        </Card>
    )
}
