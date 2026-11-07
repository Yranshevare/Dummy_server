"use client";

import React from "react";
import { useAllApi } from "../provider/all-api";
import { Loader2 } from "lucide-react";
import AllApi from "./page";

export default function Api({ method }: { method: "get" | "post" | "put" | "patch" | "delete" }) {
    const { apiList, loading } = useAllApi();

    if (loading) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center text-gray-500">
                <Loader2 className="animate-spin" size={30} />
            </div>
        );
    }
    return <AllApi method="put" apiList={apiList[method]} />;
}
