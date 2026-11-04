import React from "react";
import SearchBar from "../../../components/search-bar";
import { Separator } from "../../../components/ui/separator";
import { Plus } from "lucide-react";
import ApiListTable from "../../../components/api-list-table";

const api = [
    {
        id: 1,
        api: "/api/users",
        method: "GET",
    },
    {
        id: 2,
        api: "/api/users",
        method: "GET",
    },
    {
        id: 3,
        api: "/api/users",
        method: "GET",
    },
    {
        id: 4,
        api: "/api/users",
        method: "GET",
    },
];

export default function Get() {
    return (
        <div className="w-full flex flex-col items-center mx-5">
            <div className="w-full flex justify-between my-5">
                <div className="flex gap-5 items-center">
                    <h1 className="font-bold">GET API</h1>
                    <div className="text-sm flex items-center gap-2 bg-green-100 py-1 px-3 rounded-full text-green-800">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        <span>6 active API</span>
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

            <ApiListTable api={api} />
        </div>
    );
}
