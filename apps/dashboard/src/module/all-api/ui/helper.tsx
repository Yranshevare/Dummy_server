"use client";

import React from "react";
import { useAllApi } from "../provider/all-api";
import { Loader2 } from "lucide-react";
import type { allowMethods } from "@workspace/types/dashboard";
import AllApi from "./page";
import Loader from "@/components/loader";

export default function Api({ method }: { method: allowMethods}) {
    const { apiList, loading } = useAllApi();

    if (loading) return <Loader/>

    return <AllApi method={method} apiList={apiList[method]} />;
}
