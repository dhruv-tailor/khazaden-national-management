import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createCustomSave, createJan728Save, createJan729Save, createJan730Save, createJul728Save, createNewSave } from "./utilities/SaveData";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { clanTypes } from "./Clans/ClanInterface/ClanInterface";
import { empty_goodsdist, goodsdist } from "./Goods/GoodsDist";
import { releventClanTT } from "./tooltips/clans/ReleventClanTT";
import MoneyIconTT from "./tooltips/goods/MoneyIconTT";
import FoodIconTT from "./tooltips/goods/FoodIconTT";
import BeerIconTT from "./tooltips/goods/BeerIconTT";
import LeatherIconTT from "./tooltips/goods/LeatherIconTT";
import ArtisanalIconTT from "./tooltips/goods/ArtisanalIconTT";
import ToolsIconTT from "./tooltips/goods/ToolsIconTT";
import ArmsIconTT from "./tooltips/goods/ArmsIconTT";
import MedicalIconTT from "./tooltips/goods/MedicalIconTT";
import LivestockIconTT from "./tooltips/goods/LivestockIconTT";
import OrnamentalIconTT from "./tooltips/goods/OrnamentalIconTT";
import EnchantedArmsTT from "./tooltips/goods/EnchantedArmsTT";
import RunesIconTT from "./tooltips/goods/RunesIconTT";
import BooksIconTT from "./tooltips/goods/BooksIconTT";
import RareOresIconTT from "./tooltips/goods/RareOresIconTT";
import GemsIconTT from "./tooltips/goods/GemsIconTT";
import CommonOresIconTT from "./tooltips/goods/CommonOresTT";
import TimberIconTT from "./tooltips/goods/TimberIconTT";
import CharcoalIconTT from "./tooltips/goods/CharcoalIconTT";

function NewGame() {
    let navigate = useNavigate();

    const [saveName, setSaveName] = useState('');
    const [gameType, setGameType] = useState<'standard' | 'custom' | 'Jan_728' | 'Jul_728' | 'Jan_729' | 'Jan_730'>('standard');
    const [spawnRate, setSpawnRate] = useState(48); // Default spawn rate of 48%
    const [connectionSpawnRate, setConnectionSpawnRate] = useState(47); // Default connection spawn rate of 47%
    
    // Clan distribution state
    const [clanDistribution, setClanDistribution] = useState<{[key in clanTypes]: number}>({
        [clanTypes.rulers]: 1,
        [clanTypes.archivists]: 0,
        [clanTypes.engineers]: 0,
        [clanTypes.runeSmiths]: 0,
        [clanTypes.craftsmen]: 0,
        [clanTypes.merchants]: 0,
        [clanTypes.clerics]: 0,
        [clanTypes.miners]: 0,
        [clanTypes.farmers]: 0,
        [clanTypes.warriors]: 0,
        [clanTypes.foresters]: 0,
        [clanTypes.criminals]: 0,
        [clanTypes.none]: 0
    });

    // Starting resources state
    const [startingResources, setStartingResources] = useState<goodsdist>({
        ...empty_goodsdist,
        money: 2000,
        food: 0,
        beer: 0,
        leather: 0,
        artisanal: 0,
        livestock: 0,
        ornamental: 0,
        enchanted: 0,
        timber: 0,
        tools: 0,
        common_ores: 0,
        medical: 0,
        rare_ores: 0,
        gems: 0,
        runes: 0,
        arms: 0,
        books: 0,
        enchanted_arms: 0,
        charcoal: 0
    });

    const startGame = async () => {
        if (saveName === '') {
            return;
        }
        if (gameType === 'standard') {
            await createNewSave(saveName, spawnRate / 100, connectionSpawnRate / 100);
        } else if (gameType === 'custom') {
            await createCustomSave(saveName, startingResources, clanDistribution, spawnRate / 100, connectionSpawnRate / 100);
        } else if (gameType === 'Jan_728') {
            await createJan728Save(saveName, spawnRate / 100, connectionSpawnRate / 100);
        } else if (gameType === 'Jul_728') {
            await createJul728Save(saveName, spawnRate / 100, connectionSpawnRate / 100);
        } else if (gameType === 'Jan_729') {
            await createJan729Save(saveName, spawnRate / 100, connectionSpawnRate / 100);
        } else if (gameType === 'Jan_730') {
            await createJan730Save(saveName, spawnRate / 100, connectionSpawnRate / 100);
        }
        navigate(`/game/${saveName}`);
    };

    const goBack = () => {
        navigate('/');
    };

    const handleClanChange = (clanType: clanTypes, value: number) => {
        setClanDistribution(prev => ({
            ...prev,
            [clanType]: value
        }));
    };

    const handleResourceChange = (resource: keyof goodsdist, value: number) => {
        setStartingResources(prev => ({
            ...prev,
            [resource]: value
        }));
    };

    const totalPopulation = Object.values(clanDistribution).reduce((sum, val) => sum + val, 0);

    return (
        <div className="flex flex-row justify-content-center align-items-center min-h-screen surface-ground p-4">
            {/* Main Card */}
            <Card className="shadow-8 w-30rem">
                <div className="flex flex-column gap-4 p-4">
                    {/* Header */}
                    <div className="flex align-items-center">
                        <Button 
                            label="Back" 
                            icon="pi pi-arrow-left" 
                            size="small" 
                            onClick={goBack}
                            className="p-button-text"
                        />
                        <div className="flex-grow-1 text-center">
                            <h1 className="text-4xl font-bold m-0">New Game</h1>
                        </div>
                        <div className="w-4rem"></div> {/* Spacer to balance the back button */}
                    </div>

                    {/* Save Name Input */}
                    <div className="flex flex-column gap-2">
                        <label htmlFor="savename" className="font-bold">Save File Name</label>
                        <InputText 
                            id="savename" 
                            value={saveName} 
                            onChange={e => setSaveName(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>

                    {/* Game Type Selection */}
                    <Panel header="Game Type" className="surface-ground">
                        <div className="flex flex-column gap-4">
                            {/* Start Type Section */}
                            <div className="flex flex-column gap-2">
                                <h3 className="text-lg font-bold m-0">Start Type</h3>
                                <div className="flex flex-column gap-2">
                                    <div className="flex align-items-center">
                                        <RadioButton 
                                            inputId="starttype1" 
                                            name="gametype" 
                                            value="standard" 
                                            onChange={e => setGameType(e.value)} 
                                            checked={gameType === 'standard'}
                                        />
                                        <label htmlFor="starttype1" className="ml-2">Standard Start</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton 
                                            inputId="starttype2" 
                                            name="gametype" 
                                            value="custom" 
                                            onChange={e => setGameType(e.value)} 
                                            checked={gameType === 'custom'}
                                        />
                                        <label htmlFor="starttype2" className="ml-2">Custom Start</label>
                                    </div>
                                </div>
                            </div>

                            {/* Starting Scenario Section */}
                            <div className="flex flex-column gap-2">
                                <h3 className="text-lg font-bold m-0">Starting Scenario</h3>
                                <div className="flex flex-column gap-2">
                                    <div className="flex align-items-center">
                                        <RadioButton 
                                            inputId="scenario1" 
                                            name="gametype" 
                                            value="Jan_728" 
                                            onChange={e => setGameType(e.value)} 
                                            checked={gameType === 'Jan_728'}
                                        />
                                        <label htmlFor="scenario1" className="ml-2">Trojeryur 728</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton 
                                            inputId="scenario2" 
                                            name="gametype" 
                                            value="Jul_728" 
                                            onChange={e => setGameType(e.value)} 
                                            checked={gameType === 'Jul_728'}
                                        />
                                        <label htmlFor="scenario2" className="ml-2">Dervegn Zixyur 728</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton 
                                            inputId="scenario3" 
                                            name="gametype" 
                                            value="Jan_729" 
                                            onChange={e => setGameType(e.value)} 
                                            checked={gameType === 'Jan_729'}
                                        />
                                        <label htmlFor="scenario3" className="ml-2">Trojeryur 729</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton 
                                            inputId="scenario4" 
                                            name="gametype" 
                                            value="Jan_730" 
                                            onChange={e => setGameType(e.value)} 
                                            checked={gameType === 'Jan_730'}
                                        />
                                        <label htmlFor="scenario4" className="ml-2">Trojeryur 730</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Panel>

                    {/* Spawn Rate Slider */}
                    <div className="flex flex-column gap-2">
                        <div className="flex align-items-center justify-content-between">
                            <label htmlFor="spawnrate" className="font-bold">Foreign Power Spawn Rate</label>
                            <span className="text-sm">{spawnRate}%</span>
                        </div>
                        <Slider
                            id="spawnrate"
                            value={spawnRate}
                            onChange={(e) => setSpawnRate(e.value as number)}
                            min={0}
                            max={100}
                            step={1}
                            className="w-full"
                        />
                        <small className="text-500">Adjust the rate at which foreign powers spawn when exploring.</small>
                    </div>

                    {/* Connection Spawn Rate Slider */}
                    <div className="flex flex-column gap-2">
                        <div className="flex align-items-center justify-content-between">
                            <label htmlFor="connectionspawnrate" className="font-bold">Connection Spawn Rate</label>
                            <span className="text-sm">{connectionSpawnRate}%</span>
                        </div>
                        <Slider
                            id="connectionspawnrate"
                            value={connectionSpawnRate}
                            onChange={(e) => setConnectionSpawnRate(e.value as number)}
                            min={0}
                            max={100}
                            step={1}
                            className="w-full"
                        />
                        <small className="text-500">Adjust the rate at which connections spawn when exploring.</small>
                    </div>

                    {/* Start Game Button */}
                    <Button 
                        label="Start Game" 
                        icon="pi pi-play" 
                        className="w-full" 
                        severity="success"
                        onClick={startGame}
                        disabled={!saveName}
                    />
                </div>
            </Card>

            {/* Custom Start Card */}
            {gameType === 'custom' && (
                <Card className="shadow-8 w-30rem ml-2">
                    <div className="flex flex-column gap-2 p-2">
                        <div className="flex align-items-center justify-content-between">
                            <h2 className="text-lg font-bold m-0">Custom Start Options</h2>
                            <span className="text-sm">Population: {totalPopulation}</span>
                        </div>
                        
                        {/* Clan Distribution */}
                        <div className="flex flex-column gap-1">
                            <h3 className="text-base font-bold m-0 mb-1">Clan Distribution</h3>
                            <div className="grid">
                                {Object.entries(clanTypes)
                                    .filter(([key]) => isNaN(Number(key)) && key !== 'none') // Filter out numeric keys and 'none'
                                    .map(([key, value]) => (
                                        <div key={key} className="col-6 p-1">
                                            <div className="surface-50 border-round p-1">
                                                <div className="flex align-items-center gap-1">
                                                    {releventClanTT[value as clanTypes]}
                                                    <label htmlFor={`clan-${key}`} className="font-medium capitalize text-xs">
                                                        {key.toLowerCase()}
                                                    </label>
                                                </div>
                                                <InputNumber
                                                    id={`clan-${key}`}
                                                    value={clanDistribution[value as clanTypes]}
                                                    onValueChange={(e) => handleClanChange(value as clanTypes, e.value || 0)}
                                                    min={0}
                                                    max={75}
                                                    showButtons
                                                    buttonLayout="horizontal"
                                                    incrementButtonIcon="pi pi-plus"
                                                    decrementButtonIcon="pi pi-minus"
                                                    className="w-full"
                                                    inputClassName="text-center p-1"
                                                    size={1}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Starting Resources */}
                        <div className="flex flex-column gap-1">
                            <h3 className="text-base font-bold m-0 mb-1">Starting Resources</h3>
                            <div className="grid">
                                {Object.entries(startingResources).map(([resource, value]) => (
                                    <div key={resource} className="col-6 p-1">
                                        <div className="surface-50 border-round p-1">
                                            <div className="flex align-items-center gap-1">
                                                {getResourceIcon(resource)}
                                                <label htmlFor={`resource-${resource}`} className="font-medium text-xs">
                                                    {formatResourceName(resource)}
                                                </label>
                                            </div>
                                            <InputNumber
                                                id={`resource-${resource}`}
                                                value={value}
                                                onValueChange={(e) => handleResourceChange(resource as keyof goodsdist, e.value || 0)}
                                                min={0}
                                                showButtons
                                                buttonLayout="horizontal"
                                                incrementButtonIcon="pi pi-plus"
                                                decrementButtonIcon="pi pi-minus"
                                                className="w-full"
                                                inputClassName="text-center p-1"
                                                step={1}
                                                size={1}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}

// Helper function to format resource names
function formatResourceName(resource: string): string {
    return resource
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getResourceIcon(resource: string) {
    switch (resource) {
        case 'money': return <MoneyIconTT />;
        case 'food': return <FoodIconTT />;
        case 'beer': return <BeerIconTT />;
        case 'leather': return <LeatherIconTT />;
        case 'artisanal': return <ArtisanalIconTT />;
        case 'tools': return <ToolsIconTT />;
        case 'arms': return <ArmsIconTT />;
        case 'medical': return <MedicalIconTT />;
        case 'livestock': return <LivestockIconTT />;
        case 'ornamental': return <OrnamentalIconTT />;
        case 'enchanted': return <EnchantedArmsTT />;
        case 'runes': return <RunesIconTT />;
        case 'books': return <BooksIconTT />;
        case 'rare_ores': return <RareOresIconTT />;
        case 'gems': return <GemsIconTT />;
        case 'common_ores': return <CommonOresIconTT />;
        case 'timber': return <TimberIconTT />;
        case 'charcoal': return <CharcoalIconTT />;
        default: return null;
    }
}

export default NewGame;