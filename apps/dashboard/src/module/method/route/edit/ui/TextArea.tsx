import { labelClass } from "../style/style";

export default function TextArea({
    label,
    value,
    onChange,
    placeholder,
    rows = 3,
}: {
    label: string;
    value: any;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
}) {
    return (
        <div>
            <label className={labelClass}>{label}</label>
            <textarea
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full min-h-20 p-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 outline-none resize-y focus:border-gray-400 focus:ring-2 focus:ring-gray-900/5 placeholder:text-gray-400 font-mono"
            />
        </div>
    );
}
