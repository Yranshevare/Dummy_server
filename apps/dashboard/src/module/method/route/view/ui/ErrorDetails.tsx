import { ShieldAlert } from "lucide-react";
import JsonViewer from "./JsonViewer";

function ErrorDetails({ error }: { error: any }) {
    if (!error) return null;

    return (
        <details className="group mt-3 border border-red-100 rounded-lg bg-red-50/50 overflow-hidden">
            <summary className="flex items-center justify-between px-3 py-2.5 cursor-pointer list-none">
                <div className="flex items-center gap-2 text-red-700">
                    <ShieldAlert size={15} />
                    <span className="text-xs font-semibold">Error Configuration</span>
                </div>

                <div className="flex items-center gap-2">
                    {error.responseStatus && <span className="text-xs font-bold text-red-700">{error.responseStatus}</span>}
                    <span className="text-xs text-red-400 group-open:rotate-180 transition-transform">▼</span>
                </div>
            </summary>

            <div className="border-t border-red-100 p-3 space-y-3">
                {error.responseStatus !== undefined && (
                    <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase mb-1">Response Status</p>
                        <span className="text-sm font-semibold text-red-700">{error.responseStatus}</span>
                    </div>
                )}

                {error.body !== undefined && (
                    <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase mb-2">Error Response Body</p>
                        <JsonViewer data={error.body} />
                    </div>
                )}
            </div>
        </details>
    );
}

export default ErrorDetails;
