import { Chart } from "primereact/chart";
import { goodsdist } from "../../Goods/GoodsDist";

const generateArray = (num: number): number[] => {
    const result: number[] = []
    for(let i = 0; i < num; i++) {
        result.push(i)
    }
    return result
}

export const priceChartDataProp = (price_history: goodsdist[],current_price: goodsdist) => {
    const documentStyle = getComputedStyle(document.documentElement)
    const tension: number = 0.4
    const data = {
        labels: generateArray(price_history.length + 1).map(num => num + 1),
        datasets: [
            {
                label: 'Food and Water',
                data: [...price_history.map(price => Math.round(price.food)),current_price.food],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                tension: tension
            },
            {
                label: 'Beer',
                data: [...price_history.map(price => Math.round(price.beer)),current_price.beer],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: tension
            },
            {
                label: 'Leather and Textiles',
                data: [...price_history.map(price => Math.round(price.leather)),current_price.leather],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                tension: tension
            },
            {
                label: 'Artisanal Goods',
                data: [...price_history.map(price => Math.round(price.artisanal)),current_price.artisanal],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--yellow-500'),
                tension: tension
            },
            {
                label: 'Livestock',
                data: [...price_history.map(price => Math.round(price.livestock)),current_price.livestock],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: tension
            },
            {
                label: 'Ornamental Luxuries',
                data: [...price_history.map(price => Math.round(price.ornamental)),current_price.ornamental],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: tension
            },
            {
                label: 'Enchanted Luxuries',
                data: [...price_history.map(price => Math.round(price.enchanted)),current_price.enchanted],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--indigo-500'),
                tension: tension
            },
            {
                label: 'Timber',
                data: [...price_history.map(price => Math.round(price.timber)),current_price.timber],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--teal-500'),
                tension: tension
            },
            {
                label: 'Tools',
                data: [...price_history.map(price => Math.round(price.tools)),current_price.tools],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--orange-500'),
                tension: tension
            },
            {
                label: 'Common Ores',
                data: [...price_history.map(price => Math.round(price.common_ores)),current_price.common_ores],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--bluegray-500'),
                tension: tension
            },
            {
                label: 'Medical Supplies',
                data: [...price_history.map(price => Math.round(price.medical)),current_price.medical],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--purple-500'),
                tension: tension
            },
            {
                label: 'Rare Ores',
                data: [...price_history.map(price => Math.round(price.rare_ores)),current_price.rare_ores],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--red-500'),
                tension: tension
            },
            {
                label: 'Gems',
                data: [...price_history.map(price => Math.round(price.gems)),current_price.gems],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--gray-500'),
                tension: tension
            },
            {
                label: 'Runes',
                data: [...price_history.map(price => Math.round(price.runes)),current_price.runes],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--primary-900'),
                tension: tension
            },
            {
                label: 'Armaments',
                data: [...price_history.map(price => Math.round(price.arms)),current_price.arms],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-900'),
                tension: tension
            },
            {
                label: 'Books',
                data: [...price_history.map(price => Math.round(price.books)),current_price.books],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-900'),
                tension: tension
            },
            {
                label: 'Enchanted Armaments',
                data: [...price_history.map(price => Math.round(price.enchanted_arms)),current_price.enchanted_arms],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--yellow-900'),
                tension: tension
            },
            {
                label: 'Enchanted Charcoal',
                data: [...price_history.map(price => Math.round(price.charcoal)),current_price.charcoal],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-900'),
                tension: tension
            },
        ]
    }
    return data
}

export const priceChartOptionsProp = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins:{legend:{labels:{color: textColor}}},
        scales: {
            x: {
                title: {disply: true, text: 'Turns'},
                ticks: {color: textColorSecondary},
                grid: {color: surfaceBorder}
            },
            y: {
                title: {disply: true, text: 'Price'},
                ticks: {color: textColorSecondary},
                grid: {color: surfaceBorder}
            }
        }
    }
    return options
}

export default function PriceChart({data,options}:{data:any,options:any}) {

    return(
        <div className='Card'>
            <Chart type='line' data={data} options={options}/>
        </div>
    )
}