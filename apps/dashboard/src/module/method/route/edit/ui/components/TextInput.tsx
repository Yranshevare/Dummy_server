import { inputClass, labelClass } from "../../style/style";

export default function TextInput({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    label: string;
    value: any;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <div className="min-w-0">
            <label className={labelClass}>{label}</label>
            <input type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
        </div>
    );
}
