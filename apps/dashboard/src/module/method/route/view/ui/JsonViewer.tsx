import { Code2 } from "lucide-react";

function JsonViewer({ data }: { data: any }) {
    let formatted = "";

    try {
        formatted = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    } catch {
        formatted = String(data);
    }

    return (
        <div className="rounded-lg bg-gray-950 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
                <div className="flex items-center gap-2 text-gray-400">
                    <Code2 size={14} />
                    <span className="text-xs font-medium">JSON</span>
                </div>

                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Response Data</span>
            </div>

            <pre className="p-4 text-xs sm:text-sm text-green-300 overflow-x-auto leading-6 whitespace-pre-wrap break-words">
                <code>{formatted ?? "No data available"}</code>
            </pre>
        </div>
    );
}

export default JsonViewer;
