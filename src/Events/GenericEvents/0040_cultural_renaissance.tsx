import ArtisanalIconTT from "../../tooltips/goods/ArtisanalIconTT"
import OrnamentalIconTT from "../../tooltips/goods/OrnamentalIconTT"
import { FederalInterface } from "../../utilities/FederalInterface"
import EventTemplate from "../EventTemplate"

export default function g0040_cultural_renaissance({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {
    const rand_settlement = federal.settlements[Math.floor(Math.random() * federal.settlements.length)]

    const doNothing = () => updateFunc({...federal,
        settlements: federal.settlements.map(s => {
            if (s.global_id !== rand_settlement.global_id) {return s}
            return {
                ...s,
                prices: {
                    ...s.prices,
                    artisanal: s.prices.artisanal * 1.2,
                    ornamental: s.prices.ornamental * 1.2
                }
            }
        })
    })
    
    return (
        <EventTemplate
            title="Cultural Renaissance"
            body={`A cultural renaissance has broken out in ${rand_settlement.visible_name}.`}
            effect_buttons={[
                {
                    title: "Our Culture is the Best",
                    effect: doNothing,
                    tooltip: <div className="flex flex-column">
                        <div className="flex flex-row gap-2">
                            <ArtisanalIconTT/>
                            Prices increase by 20%
                        </div>
                        <div className="flex flex-row gap-2">
                            <OrnamentalIconTT/>
                            Prices increase by 20%
                        </div>
                    </div>
                }
            ]}
        />
    )
}
