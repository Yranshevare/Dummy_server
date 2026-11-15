import EmptyState from "./EmptyState";
import ErrorDetails from "./ErrorDetails";

function SimpleConfigTable({ data, type }: { data: Record<string, any>; type: "params" | "query" }) {
    const entries = Object.entries(data || {});

    if (!entries.length) {
        return <EmptyState message="No parameters configured" />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-100 text-[11px] text-gray-400 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Key</th>
                        <th className="pb-3 font-semibold">Type</th>
                        <th className="pb-3 font-semibold">Required</th>
                    </tr>
                </thead>

                <tbody>
                    {entries.map(([key, value]) => (
                        <tr key={key} className="border-b last:border-0 border-gray-100">
                            <td className="py-3 pr-3">
                                <code className="text-xs font-semibold text-gray-800">{key}</code>
                            </td>

                            <td className="py-3 pr-3">
                                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                    {type === "params" ? "string" : value.type?.type || "any"}
                                </span>
                            </td>

                            <td className="py-3">
                                {value.required ? (
                                    <span className="text-xs text-green-700 font-medium">Required</span>
                                ) : (
                                    <span className="text-xs text-gray-400">Optional</span>
                                )}

                                <ErrorDetails error={value.error} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default SimpleConfigTable