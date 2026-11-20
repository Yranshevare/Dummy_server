import EmptyState from "./EmptyState";
import ErrorDetails from "./ErrorDetails";

function CookieSection({ data, type }: { data: Record<string, any>; type: "get" | "set" }) {
    const entries = Object.entries(data || {});

    if (!entries.length) {
        return <EmptyState message="No cookies configured" />;
    }

    return (
        <div className="divide-y divide-gray-100">
            {entries.map(([key, cookie]) => (
                <div key={key} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <code className="text-sm font-semibold text-gray-800">{key}</code>

                        {type === "get" && (
                            <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded">{cookie.type?.type || "string"}</span>
                        )}
                    </div>

                    {type === "get" ? (
                        <>
                            <p className="text-xs text-gray-500">{cookie.required ? "Required cookie" : "Optional cookie"}</p>

                            {cookie.equals && <p className="text-xs text-blue-700 mt-2">Expected value: {JSON.stringify(cookie.equals.value)}</p>}

                            <ErrorDetails error={cookie.error} />
                            {cookie.type?.error && <ErrorDetails error={cookie.type.error} title="Type" />}
                            {cookie.equals?.error && <ErrorDetails error={cookie.equals.error} title="Value" />}
                        </>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                            {[
                                ["Path", cookie.path || "/"],
                                ["Max Age", cookie.maxAge ?? "Not set"],
                                ["Same Site", cookie.sameSite || "Not set"],
                                ["Http Only", cookie.httpOnly ? "Yes" : "No"],
                                ["Secure", cookie.secure ? "Yes" : "No"],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <p className="text-[10px] text-gray-400 uppercase font-semibold">{label}</p>
                                    <p className="text-xs text-gray-700 mt-1 font-medium">{String(value)}</p>
                                </div>
                            ))}

                            <div className="col-span-2 sm:col-span-3">
                                <p className="text-[10px] text-gray-400 uppercase font-semibold">Value</p>
                                <code className="text-xs text-gray-700 mt-1 block break-all">{cookie.value}</code>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CookieSection;
