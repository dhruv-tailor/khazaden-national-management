import { Card } from "primereact/card";
import { goodsdist } from "../components/ResourceDistribution";
import { ReactNode, useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GiBeerStein, GiClothes, GiCoalWagon, GiCrystalBall, GiMagicShield, GiPouringChalice, GiRuneStone, GiThrownCharcoal, GiWoodPile } from "react-icons/gi";
import { FaBook, FaBriefcaseMedical, FaCoins, FaGem, FaShieldAlt, FaTools } from "react-icons/fa";
import { LuHandCoins } from "react-icons/lu";
import { PiCowFill } from "react-icons/pi";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PlaceOrder from "./PlaceOrder";

interface TableView {
    name: ReactNode;
    price: number;
    available: number;
}

export default function PriceCard(
    {prices,availableGoods,name,realname,type,updateFunc}:
    {
        prices: goodsdist,
        availableGoods: goodsdist,
        name: string,
        realname: string,
        type: 'Settlement' | 'Federal' | 'Foreign',
        updateFunc: (units_ordered: goodsdist, prices: goodsdist, type: "Settlement" | "Federal" | "Foreign", realname: string) => void
    }
) {
    const [priceTable, setPriceTable] = useState<TableView[]>([])
    const [showBuy,setShowBuy] = useState<boolean>(false)

    const updateInventory = (units_ordered: goodsdist) => {
        updateFunc(units_ordered,prices,type,realname)
    }
    
    useEffect(() => {
        const data: TableView[] = []
        if(availableGoods.food > 0) {
            data.push({
                name: <IoFastFood/>,
                price: Math.round(prices.food),
                available: availableGoods.food,
            })
        }
        if(availableGoods.beer > 0) {
            data.push({
                name: <GiBeerStein/>,
                price: Math.round(prices.beer),
                available: availableGoods.beer,
            })
        }
        if(availableGoods.leather > 0) {
            data.push({
                name: <GiClothes/>,
                price: Math.round(prices.leather),
                available: availableGoods.leather,
            })
        }
        if(availableGoods.artisinal > 0) {
            data.push({
                name: <LuHandCoins/>,
                price: Math.round(prices.artisinal),
                available: availableGoods.artisinal,
            })
        }
        if(availableGoods.livestock > 0) {
            data.push({
                name: <PiCowFill/>,
                price: Math.round(prices.livestock),
                available: availableGoods.livestock,
            })
        }
        if(availableGoods.ornamental > 0) {
            data.push({
                name: <GiPouringChalice/>,
                price: Math.round(prices.ornamental),
                available: availableGoods.ornamental,
            })
        }
        if(availableGoods.enchanted > 0) {
            data.push({
                name: <GiCrystalBall/>,
                price: Math.round(prices.enchanted),
                available: availableGoods.enchanted,
            })
        }
        if(availableGoods.timber > 0) {
            data.push({
                name: <GiWoodPile/>,
                price: Math.round(prices.timber),
                available: availableGoods.timber,
            })
        }
        if(availableGoods.tools > 0) {
            data.push({
                name: <FaTools/>,
                price: Math.round(prices.tools),
                available: availableGoods.tools,
            })
        }
        if(availableGoods.common_ores > 0) {
            data.push({
                name: <GiCoalWagon/>,
                price: Math.round(prices.common_ores),
                available: availableGoods.common_ores,
            })
        }
        if(availableGoods.medical > 0) {
            data.push({
                name: <FaBriefcaseMedical/>,
                price: Math.round(prices.medical),
                available: availableGoods.medical,
            })
        }
        if(availableGoods.gems > 0) {
            data.push({
                name: <FaGem/>,
                price: Math.round(prices.gems),
                available: availableGoods.gems,
            })
        }
        if(availableGoods.runes > 0) {
            data.push({
                name: <GiRuneStone/>,
                price: Math.round(prices.runes),
                available: availableGoods.runes,
            })
        }
        if(availableGoods.arms > 0) {
            data.push({
                name: <FaShieldAlt/>,
                price: Math.round(prices.arms),
                available: availableGoods.arms,
            })
        }
        if(availableGoods.books > 0) {
            data.push({
                name: <FaBook/>,
                price: Math.round(prices.books),
                available: availableGoods.books,
            })
        }
        if(availableGoods.enchanted_arms > 0) {
            data.push({
                name: <GiMagicShield/>,
                price: Math.round(prices.enchanted_arms),
                available: availableGoods.enchanted_arms,
            })
        }
        if(availableGoods.charcoal > 0) {
            data.push({
                name: <GiThrownCharcoal/>,
                price: Math.round(prices.charcoal),
                available: availableGoods.charcoal,
            })
        }
        setPriceTable(data)
    },[])
    
    return(<>
    <Card className="md:w-25rem" header={name}>
        <div className="flex flex-column gap-2">
            <DataTable selectionMode='single' removableSort sortMode="multiple" stripedRows showGridlines size='small' value={priceTable}>
                <Column field="name" header='Good'></Column>
                <Column sortable field="available" header="Available"></Column>
                <Column sortable field="price" header={<><FaCoins/> Price</>}></Column>
            </DataTable>
            <Button icon='pi pi-shopping-cart' severity="success" className="flex-grow-1" label="Buy" onClick={()=>setShowBuy(true)}/>
        </div>
    </Card>
    <Dialog visible={showBuy} header={`Buy From ${name}`} onHide={()=>{setShowBuy(false)}}>
        <PlaceOrder updateFunc={updateInventory} prices={prices} available={availableGoods}/>
    </Dialog>
    </>)
}