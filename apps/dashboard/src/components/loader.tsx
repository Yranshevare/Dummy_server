import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center text-gray-500">
            <Loader2 className="animate-spin" size={30} />
        </div>
    );
}
