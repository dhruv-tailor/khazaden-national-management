import { Card } from "primereact/card";
import { goodsdist, goodsId } from "../../Goods/GoodsDist";
import { releventGoodTT } from "../../tooltips/goods/ReleventGoodTT";
import { ForeignPowerInterface } from "../../ForeignPowers/Interface/ForeignPowerInterface";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";

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
        if (type === goodsId.artisinal) {
            foreign_max = selectedBuyer?.available_supply.artisinal ?? 0
            local_max = supply.artisinal
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

    
    return (
        <Card title={releventGoodTT[type]}>
            <Dialog 
            header={<div className="flex flex-row gap-2">
                Sell
                {releventGoodTT[type]}
                to {selectedBuyer?.name}
            </div>} 
            visible={showDialog} 
            onHide={() => setShowDialog(false)}>
                <div className="flex flex-column gap-2">
                    <div className="flex flex-row gap-2">
                    <InputNumber 
                        value={units} 
                        min={0} 
                        max={getMax()} 
                        size={4} 
                        showButtons 
                        onChange={e => setUnits(e.value ?? 0)}/>
                        / {getMax()} for
                        {<MoneyIconTT/>}
                        {Math.round(price)}
                        = 
                        {<MoneyIconTT/>}
                        {units * Math.round(price)}
                    </div>
                    <Button icon="pi pi-check" label="Sell" severity="success" onClick={() => {
                        setShowDialog(false)
                        updateFunc(type,units,selectedBuyer?.name ?? '')
                    }}/>
                </div>
            </Dialog>
            {buyers.map(buyer => <Button label={buyer.name} onClick={() => {
                setShowDialog(true)
                setSelectedBuyer(buyer)
                }}/>)}
        </Card>
    )
}
