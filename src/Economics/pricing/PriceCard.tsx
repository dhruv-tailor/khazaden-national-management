import { Card } from "primereact/card";
import { ReactNode, useState } from "react";
import { goodsdist } from "../../Goods/GoodsDist";
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
import GemsIconTT from "../../tooltips/goods/GemsIconTT";
import RunesIconTT from "../../tooltips/goods/RunesIconTT";
import ArmsIconTT from "../../tooltips/goods/ArmsIconTT";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import EnchantedArmsIconTT from "../../tooltips/goods/EnchantedArmsTT";
import CharcoalIconTT from "../../tooltips/goods/CharcoalIconTT";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import MoneyIconTT from "../../tooltips/goods/MoneyIconTT";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PlaceOrder from "./PlaceOrder";

interface TableView {
    name: ReactNode;
    price: number;
    available: number;
}

export default function PriceCard(
    {name,id,goods,prices,merchantCapacity,maxCost,updateFunc,myGoods,myChange}: 
    {
        name: string,
        id: string,
        goods: goodsdist,
        prices: goodsdist,
        merchantCapacity: number
        maxCost: number
        updateFunc: (id: string, capUsed: number, order: goodsdist) => void
        myGoods: goodsdist
        myChange: goodsdist
    }) {

    const table: TableView[] = [
        {name: <FoodIconTT/>, price: prices.food, available: goods.food},
        {name: <BeerIconTT/>, price: prices.beer, available: goods.beer},
        {name: <LeatherIconTT/>, price: prices.leather, available: goods.leather},
        {name: <ArtisanalIconTT/>, price: prices.artisanal, available: goods.artisanal},
        {name: <LivestockIconTT/>, price: prices.livestock, available: goods.livestock},
        {name: <OrnamentalIconTT/>, price: prices.ornamental, available: goods.ornamental},
        {name: <EnchantedIconTT/>, price: prices.enchanted, available: goods.enchanted},
        {name: <TimberIconTT/>, price: prices.timber, available: goods.timber},
        {name: <ToolsIconTT/>, price: prices.tools, available: goods.tools},
        {name: <CommonOresIconTT/>, price: prices.common_ores, available: goods.common_ores},
        {name: <MedicalIconTT/>, price: prices.medical, available: goods.medical},
        {name: <GemsIconTT/>, price: prices.gems, available: goods.gems},
        {name: <RunesIconTT/>, price: prices.runes, available: goods.runes},
        {name: <ArmsIconTT/>, price: prices.arms, available: goods.arms},
        {name: <BooksIconTT/>, price: prices.books, available: goods.books},
        {name: <EnchantedArmsIconTT/>, price: prices.enchanted_arms, available: goods.enchanted_arms},
        {name: <CharcoalIconTT/>, price: prices.charcoal, available: goods.charcoal},
    ]

    const [showBuy,setShowBuy] = useState<boolean>(false)

    const processOrder = (capUsed: number, order: goodsdist) => {
        setShowBuy(false)
        updateFunc(id,capUsed,order)
    }

    
    return(
        <Card title={name} className="md:w-25rem">
            <div className="flex flex-column gap-2">
                <DataTable 
                    selectionMode='single' 
                    removableSort 
                    sortMode="multiple" 
                    stripedRows 
                    showGridlines 
                    size="small"
                    value={table}
                >
                    <Column field="name" header='Good'></Column>
                    <Column sortable field="available" header='Available'></Column>
                    <Column sortable field="price" header={<div className="flex flex-row gap-1"><MoneyIconTT/>Price</div>}></Column>
                </DataTable>
                <Button icon='pi pi-shopping-cart' severity="success" className="flex-grow-1" label="Buy" onClick={() => setShowBuy(true)}/>
                <Dialog visible={showBuy} header={`Buy From ${name}`} onHide={() => setShowBuy(false)}>
                    <PlaceOrder goods={goods} prices={prices} merchantCapacity={merchantCapacity} maxCost={maxCost} updateFunc={processOrder} myGoods={myGoods} myChange={myChange}/>
                </Dialog>
            </div>
        </Card>
    )
}