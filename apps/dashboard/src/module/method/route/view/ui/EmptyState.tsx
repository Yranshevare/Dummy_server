import { Search } from "lucide-react";

function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-11 w-11 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                <Search size={19} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">{message}</p>
            <p className="text-xs text-gray-400 mt-1">No configuration has been defined.</p>
        </div>
    );
}

export default EmptyState ;
