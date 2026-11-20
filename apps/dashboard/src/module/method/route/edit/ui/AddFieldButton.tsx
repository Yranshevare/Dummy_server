import { Plus } from "lucide-react";

export default function AddFieldButton({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-black transition-colors"
        >
            <Plus size={15} />
            {label}
        </button>
    );
}
