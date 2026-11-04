import { DatabaseX, SquarePen } from "lucide-react";
import React from "react";

export default function ApiListTable({api}:{api:{id:number, api:string, method:string}[]}) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Table Header */}
            <div className="flex items-center justify-between p-5">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">API Endpoints</h3>
                    <p className="text-sm text-gray-400 mt-1">Manage your registered API endpoints</p>
                </div>
                <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">6 Active</span>
            </div>

            <table className="w-full border-collapse">
                <thead className="bg-gray-50/80">
                    <tr className="text-xs text-gray-500 uppercase tracking-wider">
                        <th className="px-5 py-3 font-medium text-center w-16">ID</th>
                        <th className="px-5 py-3 font-medium text-left">Endpoint</th>
                        <th className="px-5 py-3 font-medium text-center">Method</th>
                        <th className="px-5 py-3 font-medium text-center w-28">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {api.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-gray-50/80 transition-colors duration-150">
                            <td className="px-5 py-4 text-center text-xs text-gray-400 font-medium">{String(index + 1).padStart(2, "0")}</td>

                            <td className="px-5 py-4">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-950 transition-colors">{item.api}</span>
                            </td>

                            <td className="px-5 py-4 text-center">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${
                                        item.method === "GET"
                                            ? "bg-emerald-50 text-emerald-700"
                                            : item.method === "POST"
                                              ? "bg-blue-50 text-blue-700"
                                              : item.method === "PUT"
                                                ? "bg-amber-50 text-amber-700"
                                                : "bg-red-50 text-red-700"
                                    }`}
                                >
                                    {item.method}
                                </span>
                            </td>

                            <td className="px-5 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                        <SquarePen size={16} />
                                    </button>

                                    <button className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
                                        <DatabaseX size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-400">Showing {api.length} endpoints</span>
                <span className="text-xs font-medium text-gray-500">Total: {api.length}</span>
            </div>
        </div>
    );
}
