function Section({
    title,
    description,
    icon: Icon,
    count,
    children,
}: {
    title: string;
    description?: string;
    icon: React.ElementType;
    count?: number;
    children: React.ReactNode;
}) {
    return (
        <section className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                        <Icon size={18} />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
                        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
                    </div>
                </div>

                {count !== undefined && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                        {count} {count === 1 ? "Item" : "Items"}
                    </span>
                )}
            </div>

            <div className="p-5">{children}</div>
        </section>
    );
}


export default Section