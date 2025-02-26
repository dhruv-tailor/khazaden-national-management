import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { deleteSavegame } from "../utilities/SaveData";
import { useNavigate } from "react-router";

export default function GameName({name, updateCall} : {name: string, updateCall: () => void}) {

    const toast = useRef<Toast>(null);
    let navigate = useNavigate();

    const confimDelete = (e: any) => {
        confirmPopup({
            target: e.currentTarget,
            message: 'Are you sure you want to delete this save?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject: () => {
                console.log('cancel');
            }
        })
    }

    const loadGame = () => {
        navigate(`/game/${name}`);
    }

    const accept = () => {
        deleteSavegame(name);
        updateCall();
        if (toast.current) {
            toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Save File has been deleted', life: 1500 });
        }
    };

  return (
    <>
        <Toast ref={toast} />
        <ConfirmPopup />
        <Card> 
            <div className='flex overflow-hidden gap-3'>
                <h2>{name}</h2>
                <div className="flex-grow-1"></div>
                <Button onClick={loadGame} icon='pi pi-file-import' label={'Load'} />
                <Button onClick={confimDelete} icon='pi pi-trash' severity="danger" label={'Delete'} />
            </div>
        </Card>
    </>
  )
}