function MethodBadge({ method }: { method: string }) {
    const styles: Record<string, string> = {
        GET: "bg-green-50 text-green-700 border-green-200",
        POST: "bg-blue-50 text-blue-700 border-blue-200",
        PUT: "bg-orange-50 text-orange-700 border-orange-200",
        PATCH: "bg-purple-50 text-purple-700 border-purple-200",
        DELETE: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-bold tracking-wide ${
                styles[method.toUpperCase()] || "bg-gray-100 text-gray-700 border-gray-200"
            }`}
        >
            {method.toUpperCase()}
        </span>
    );
}

export default MethodBadge;