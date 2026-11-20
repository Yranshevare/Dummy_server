import { labelClass, selectClass } from "../style/style";

export default function SelectInput({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
    return (
        <div className="min-w-0">
            <label className={labelClass}>{label}</label>
            <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}
