"use client";

import { useAllApi } from "../provider/all-api";
import { Activity, ArrowDownToLine, ArrowUpFromLine, RefreshCw, Repeat, Trash2, Layers, Upload, Download, ArrowRightLeft, Wrench } from "lucide-react";

const methodStyles: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
    GET: {
        color: "text-blue-600",
        bg: "bg-blue-50",
        icon: Upload,
    },
    POST: {
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        icon: Download,
    },
    PUT: {
        color: "text-amber-600",
        bg: "bg-amber-50",
        icon: ArrowRightLeft,
    },
    PATCH: {
        color: "text-violet-600",
        bg: "bg-violet-50",
        icon: Wrench,
    },
    DELETE: {
        color: "text-red-600",
        bg: "bg-red-50",
        icon: Trash2,
    },
};

export default function ApiCardLayout() {
    const { apiList } = useAllApi();

    return (
        <div className="grid grid-cols-2 my-5 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {(Object.keys(apiList) as (keyof typeof apiList)[]).map((key) => {
                if(key === "all") return null;
                const style = methodStyles[String(key).toUpperCase()] ?? {
                    color: "text-gray-600",
                    bg: "bg-gray-100",
                    icon: Layers,
                };

                const Icon = style.icon;
                const count = apiList[key].length;

                return (
                    <div
                        key={key}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                    >
                        {/* Top section */}
                        <div className="flex items-center justify-between">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.bg} ${style.color}`}>
                                <Icon size={20} />
                            </div>

                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                                {String(key).toUpperCase()}
                            </span>
                        </div>

                        {/* Statistics */}
                        <div className="mt-5">
                            <p className="text-sm font-medium text-gray-500">{key} Requests</p>

                            <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">{count.toLocaleString()}</h2>
                        </div>

                        {/* Bottom section */}
                        <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                            <Activity size={14} className="text-green-600" />
                            <span className="text-xs font-medium text-gray-500">Configured endpoints</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
