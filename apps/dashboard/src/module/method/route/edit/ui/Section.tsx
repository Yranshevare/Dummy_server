export default function Section({
    title,
    description,
    icon: Icon,
    children,
    optional = false,
}: {
    title: string;
    description: string;
    icon: React.ElementType;
    children: React.ReactNode;
    optional?: boolean;
}) {
    return (
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                        <Icon size={18} />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
                        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                    </div>
                </div>

                {optional && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-1 rounded">Optional</span>
                )}
            </div>

            <div className="p-5 space-y-4">{children}</div>
        </section>
    );
}
