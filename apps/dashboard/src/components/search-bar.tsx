import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="group flex items-center rounded-full focus-within:bg-gray-50 border-3 border-gray-200  px-3  transition-all duration-200 focus-within:border-gray-200 focus-within:shadow-[0_0_5px_rgba(0,0,0,0.15)]">

            <input className="w-full h-10 outline-none bg-transparent text-sm text-gray-700" placeholder="Search..." />

            <Search className="h-6 w-6 text-gray-700 " />
        </div>
    );
}
