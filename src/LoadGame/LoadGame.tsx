import { useEffect , useState } from "react";
import { getSavegames } from "../utilities/SaveData";
import GameName from "./GameName";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { Card } from "primereact/card";

export default function LoadGame() {
    const [savegames, setSavegames] = useState<string[]>([]);
    let navigate = useNavigate();

    const getSaves = async () => {
        const results = await getSavegames();
        setSavegames(results);
    }

    const goBack = () => {
        navigate('/')
    }

    const updatesaves = (name: string) => {
        setSavegames(savegames.filter(save => save !== name))
    }
    
    useEffect(() => {
        getSaves()
    }, []);

    return (
        <div className="flex flex-column align-items-center justify-content-center min-h-screen surface-ground">
            <Card className="shadow-8 w-8 mx-3">
                <div className="flex flex-column gap-4">
                    <div className="flex align-items-center">
                        <Button 
                            label="Back" 
                            icon="pi pi-arrow-left" 
                            size="small" 
                            onClick={goBack}
                            className="p-button-text"
                        />
                        <div className="flex-grow-1 text-center">
                            <h1 className="text-4xl font-bold m-0">Load Game</h1>
                        </div>
                        <div className="w-4rem"></div> {/* Spacer to balance the back button */}
                    </div>

                    <div className="flex flex-column gap-3">
                        {savegames.length > 0 ? (
                            savegames.map((savegame) => (
                                <GameName key={savegame} name={savegame} updateCall={updatesaves}/>
                            ))
                        ) : (
                            <div className="text-center text-500 p-5">
                                <i className="pi pi-folder-open text-4xl mb-3"></i>
                                <p className="m-0">No saved games found</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}