"use client";

import React from "react";
import { useAllApi } from "../provider/all-api";
import { Loader2 } from "lucide-react";
import type { allowMethods } from "@workspace/types/dashboard";
import AllApi from "./page";

export default function Api({ method }: { method: allowMethods}) {
    const { apiList, loading } = useAllApi();

    if (loading) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center text-gray-500">
                <Loader2 className="animate-spin" size={30} />
            </div>
        );
    }
    return <AllApi method={method} apiList={apiList[method]} />;
}
