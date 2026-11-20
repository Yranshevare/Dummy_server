export default function Toggle({
    label,
    description,
    checked,
    onChange,
}: {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <label className="flex items-center justify-between gap-3 cursor-pointer">
            <div>
                <p className="text-xs font-semibold text-gray-700">{label}</p>
                {description && <p className="text-[11px] text-gray-400 mt-0.5">{description}</p>}
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${checked ? "bg-gray-900" : "bg-gray-200"}`}
            >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
            </button>
        </label>
    );
}
