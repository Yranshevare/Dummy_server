"use client";

import { useState } from "react";
import ApiListTable from "@/components/api-list-table";
import SearchBar from "@/components/search-bar";
import { Separator } from "@base-ui/react";
import { Plus, Activity, Search, SlidersHorizontal } from "lucide-react";
import { allowMethods } from "@workspace/types/dashboard";
import ApiCardLayout from "./api-card-layout";

type Api = {
    api: string;
    method: string;
};

export default function AllApi({ method, apiList }: { method: allowMethods; apiList: Api[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredApiList = apiList.filter((item) => {
        const query = searchQuery.trim().toLowerCase();

        return item.api.toLowerCase().includes(query) || item.method.toLowerCase().includes(query);
    });

    const isAll = method === "all";

    return (
        <div className="w-full min-w-0 flex flex-col px-6 lg:px-10 py-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <span>Workspace</span>
                        <span>/</span>
                        <span className="text-gray-700">{isAll ? "All APIs" : `${method.toUpperCase()} APIs`}</span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{isAll ? "API Overview" : `${method.toUpperCase()} APIs`}</h1>

                        <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-2.5 py-1 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50 animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            <span className="text-xs font-semibold">{apiList.length} Active</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">
                        {isAll ? "Manage and monitor all your API endpoints in one place." : `Manage all your ${method.toUpperCase()} endpoints.`}
                    </p>
                </div>

                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors shadow-sm shrink-0">
                    <Plus size={17} />
                    Add API
                </button>
            </div>

            <Separator className="my-7 bg-gray-200" />

            {/* Statistics Cards */}
            {isAll && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-800">Request Overview</h2>
                        <span className="text-xs text-gray-400">By HTTP method</span>
                    </div>

                    <ApiCardLayout />
                </div>
            )}

            {/* API List Section */}
            <div className="flex flex-col gap-5">
                {isAll ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">All Endpoints Endpoints</h2>
                            <p className="text-xs text-gray-500 mt-1">
                                {filteredApiList.length} of {apiList.length} endpoints
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-full sm:w-72">
                                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center gap-2">
                        <div className="w-1/2">
                            <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        </div>
                    </div>
                )}

                {/* Table */}
                {filteredApiList.length > 0 ? (
                    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                        <ApiListTable api={filteredApiList} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-5 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
                        <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                            {searchQuery ? <Search size={22} className="text-gray-400" /> : <Activity size={22} className="text-gray-400" />}
                        </div>

                        <h3 className="text-sm font-semibold text-gray-800">{searchQuery ? "No matching endpoints" : "No APIs found"}</h3>

                        <p className="text-sm text-gray-500 mt-1 text-center max-w-sm">
                            {searchQuery
                                ? `No endpoints match "${searchQuery}". Try a different search term.`
                                : "There are no API endpoints configured here yet."}
                        </p>

                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="mt-4 text-sm font-medium cursor-pointer bg-gray-800  text-white px-4 py-2 rounded-lg hover:underline">
                                Clear search
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
