import PlusMinus from "../../components/PlusMinus";
import BooksIconTT from "../../tooltips/goods/BooksIconTT";
import { FederalInterface } from "../../utilities/FederalInterface";
import EventTemplate from "../EventTemplate";

export default function g0055_international_summit({federal, updateFunc}: {federal: FederalInterface, updateFunc: (federal: FederalInterface) => void}) {

    const accept = () => {
        updateFunc({...federal,
            foreign_powers: federal.foreign_powers.map(fp => ({...fp, relations: fp.relations + 5}))
        })
    }
    const decline = () => updateFunc({...federal})
    return (
        <EventTemplate
            title="International Summit"
            body={`We were invited to host an international summmit.`}
            effect_buttons={[
                {
                    title: "Accept",
                    effect: accept,
                    tooltip: <div className="flex flex-column gap-2">
                        <p>Relations with all foreign powers will increase by <PlusMinus value={5} /></p>
                        <div className="flex flex-row gap-2">
                            <BooksIconTT />
                            <PlusMinus value={-federal.foreign_powers.length * 5} />
                        </div>
                    </div>
                },
                {
                    title: "Decline",
                    effect: decline,
                    tooltip: <div>
                        <p>We cannot afford to host the summit.</p>
                    </div>
                }
            ]}
        />
    )
}