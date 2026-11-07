"use client";

import ApiListTable from "@/components/api-list-table";
import SearchBar from "@/components/search-bar";
import { Separator } from "@base-ui/react";
import { Plus } from "lucide-react";

export default function AllApi({ method, apiList }: { method: string; apiList: { api: string; method: string }[] }) {
    return (
        <div className="w-full flex flex-col items-center mx-5">
            <div className="w-full flex justify-between my-5">
                <div className="flex gap-5 items-center">
                    <h1 className="font-bold">{method.toUpperCase()} API</h1>
                    <div className="text-sm flex items-center gap-2 bg-green-100 py-1 px-3 rounded-full text-green-800">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        <span>{apiList.length} active API</span>
                    </div>
                </div>
                <button className="pr-5 pl-3 py-1 hover:cursor-pointer hover:bg-gray-600 duration-300 flex items-center gap-2 bg-gray-800 text-white rounded-full text-sm">
                    <Plus size={20} /> <span>Add API</span>
                </button>
            </div>
            <div className="w-full mt-2 ">
                <Separator className="h-px bg-linear-to-r from-transparent via-gray-500 to-transparent" />
            </div>
            <div className="w-1/2 my-10">
                <SearchBar />
            </div>
            {apiList.length > 0 ? <ApiListTable api={apiList} /> : <div>No API found</div>}
        </div>
    );
}
