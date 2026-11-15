import EmptyState from "./EmptyState";
import ErrorDetails from "./ErrorDetails";

function BodyFields({ data, depth = 0 }: { data: Record<string, any>; depth?: number }) {
    const entries = Object.entries(data || {});

    if (!entries.length) {
        return <EmptyState message="No body fields configured" />;
    }

    return (
        <div className="space-y-3">
            {entries.map(([key, field]) => {
                const fieldType = field.type?.type || "unknown";
                const nestedFields = field.type?.body || {};
                const hasNestedFields = Object.keys(nestedFields).length > 0;

                return (
                    <div key={key} className={`rounded-lg border border-gray-200 overflow-hidden ${depth > 0 ? "bg-white" : "bg-gray-50/70"}`}>
                        <div className="p-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <code className="text-sm font-semibold text-gray-800">{key}</code>

                                    <span className="text-[11px] px-2 py-0.5 rounded bg-gray-200 text-gray-600">{fieldType}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {field.required ? (
                                        <span className="text-[11px] font-medium text-green-700 bg-green-50 border border-green-100 px-2 py-1 rounded">
                                            Required
                                        </span>
                                    ) : (
                                        <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-1 rounded">Optional</span>
                                    )}
                                </div>
                            </div>

                            {field.equals && (
                                <div className="mt-3 p-2.5 rounded-md bg-blue-50 border border-blue-100">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">Equals Validation</p>
                                    <p className="text-xs text-blue-800">
                                        Expected value: <code className="font-semibold">{JSON.stringify(field.equals.value)}</code>
                                    </p>
                                    <ErrorDetails error={field.equals.error} />
                                </div>
                            )}

                            {hasNestedFields && (
                                <div className="mt-3 border-l-2 border-gray-200 pl-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Nested Properties</p>

                                    <BodyFields data={nestedFields} depth={depth + 1} />
                                </div>
                            )}

                            <ErrorDetails error={field.error} />
                            {field.type?.error && <ErrorDetails error={field.type.error} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BodyFields;
