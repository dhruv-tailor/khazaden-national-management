import ToolTips from "../tooltips/TT";
import Avatar from "boring-avatars";
import { CharacterInterface, empty_character } from "./Generator/CharacterInterface";
import MaleTT from "../tooltips/character/maleTT";
import FemaleTT from "../tooltips/character/femaleTT";
import MalePreferenceTT from "../tooltips/character/malePreferenceTT";
import FemalePreferenceTT from "../tooltips/character/femalePreferenceTT";
import AsexualPreferenceTT from "../tooltips/character/asexualPreferenceTT";
import BisexualPreferenceTT from "../tooltips/character/bisexualPreferenceTT";
import DeadTT from "../tooltips/character/deadTT";

export default function CharacterPortrait({character,otherCharacters}: {character: CharacterInterface, otherCharacters: CharacterInterface[]}) {
    return <ToolTips 
        hover={
            <Avatar 
                name={character.id + character.name + character.family_name} 
                variant="beam" 
                size={39}
        />} 
        body={
            <div className="flex flex-column">
                <b>{character.title} {character.name} {character.family_name}</b>
                <div className="flex flex-row">
                    {character.age}
                    {character.gender === "male" ? <MaleTT /> : <FemaleTT />}
                    {getSexuality(character)}
                </div>
                <div className="flex flex-row gap-1">
                    <div className="flex flex-column">
                        {character.positive_traits.map(trait => {
                            return <div style={{color: 'var(--green-500)'}}>
                                {trait}
                            </div>
                        })}
                    </div>
                    <div className="flex flex-column">
                        {character.negative_traits.map(trait => {
                            return <div style={{color: 'var(--yellow-500)'}}>
                                {trait}
                            </div>
                        })}
                    </div>
                    <div className="flex flex-column">
                        {character.vices.map(vice => {
                            return <div style={{color: 'var(--red-500)'}}>
                                {vice}
                            </div>
                        })}
                    </div>
                    <div>
                        {character.alive ? null : <DeadTT />}
                    </div>
                </div>
                {character.spouse &&
                    <div className="flex flex-row gap-1">
                        Spouse:
                        <CharacterPortrait 
                            character={otherCharacters.find(c => c.id === character.spouse) ?? empty_character} 
                            otherCharacters={otherCharacters} 
                        />
                    </div>
                }
                <div className="flex flex-row gap-1">
                    Parents:
                    {character.father && 
                        <CharacterPortrait 
                            character={otherCharacters.find(c => c.id === character.father) ?? empty_character} 
                            otherCharacters={otherCharacters} 
                        />}
                    {character.mother && 
                        <CharacterPortrait 
                            character={otherCharacters.find(c => c.id === character.mother) ?? empty_character} 
                            otherCharacters={otherCharacters} 
                        />}
                </div>
                <div className="flex flex-row gap-1">
                    Siblings:
                    {otherCharacters.filter(c => c.father === (character.father || c.mother === character.mother) && c.id !== character.id).map(c => {
                        return <CharacterPortrait 
                            character={c} 
                            otherCharacters={otherCharacters} 
                        />
                    })}
                </div>
                <div className="flex flex-row gap-1">
                    Children:
                    {otherCharacters.filter(c => c.father === character.id || c.mother === character.id).map(c => {
                        return <CharacterPortrait 
                            character={c} 
                            otherCharacters={otherCharacters} 
                        />
                    })}
                </div>
            </div>
        } 
    />
}

const getSexuality = (character: CharacterInterface) => {
    if (character.sexuality === "asexual") {
        return <AsexualPreferenceTT />
    } else if (character.sexuality === "bisexual") {
        return <BisexualPreferenceTT />
    } else if (character.sexuality === "gay") {
        return character.gender === "male" ? <MalePreferenceTT /> : <FemalePreferenceTT />
    }
    return character.gender === "male" ?  <FemalePreferenceTT /> : <MalePreferenceTT />
}
