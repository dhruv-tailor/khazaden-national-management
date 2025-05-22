import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0068_market_manipulation({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]
    const doNothing = () => {
        const getRandomMultiplier = () => 0.7 + Math.random() * 0.6; // Random value between 0.7 and 1.3
        updateFunc({...federal,
            settlements: federal.settlements.map(s => {
                if (s.global_id !== rand_settlement.global_id) { return s }
                return {
                    ...s,
                    prices: {
                        ...s.prices,
                        food: s.prices.food * getRandomMultiplier(),
                        beer: s.prices.beer * getRandomMultiplier(),
                        leather: s.prices.leather * getRandomMultiplier(),
                        artisanal: s.prices.artisanal * getRandomMultiplier(),
                        livestock: s.prices.livestock * getRandomMultiplier(),
                        ornamental: s.prices.ornamental * getRandomMultiplier(),
                        enchanted: s.prices.enchanted * getRandomMultiplier(),
                        timber: s.prices.timber * getRandomMultiplier(),
                        tools: s.prices.tools * getRandomMultiplier(),
                        common_ores: s.prices.common_ores * getRandomMultiplier(),
                        medical: s.prices.medical * getRandomMultiplier(),
                        rare_ores: s.prices.rare_ores * getRandomMultiplier(),
                        gems: s.prices.gems * getRandomMultiplier(),
                        runes: s.prices.runes * getRandomMultiplier(),
                        arms: s.prices.arms * getRandomMultiplier(),
                        books: s.prices.books * getRandomMultiplier(),
                        enchanted_arms: s.prices.enchanted_arms * getRandomMultiplier(),
                        charcoal: s.prices.charcoal * getRandomMultiplier()
                    }
                }
            })
        })
    }
    return (
        <EventTemplate
            title="Market Manipulation"
            body={`An unknown foreign power is manipulating the market in ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "What the",
                    effect: doNothing,
                    tooltip: <div>
                        <p>The prices off all the goods have all been manipulated.</p>
                    </div>
                }
            ]}
        />
    )
}