import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { ReactNode } from "react";

interface TaxSliderProps {
    id: string;
    label: ReactNode;
    value: number;
    onChange: (value: number) => void;
}

export default function TaxSlider({ id, label, value, onChange }: TaxSliderProps) {
    return (
        <div className="flex flex-column gap-1">
            <div className="flex justify-content-between align-items-center">
                <label htmlFor={id} className="font-semibold text-sm">{label}</label>
                <InputText 
                    id={id} 
                    value={`${Math.round(value * 100)}%`}
                    className="w-4rem text-right text-sm"
                    disabled
                />
            </div>
            <Slider 
                value={value * 100} 
                onChange={e => onChange((e.value as number)/100)} 
                step={1}
                className="w-full"
            />
        </div>
    );
} 