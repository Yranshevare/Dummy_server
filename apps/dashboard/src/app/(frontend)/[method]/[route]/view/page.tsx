"use client";

import { useAllApi } from "@/module/all-api/provider/all-api";
import { allowMethods } from "@workspace/types/dashboard";
import React, { useEffect } from "react";

export default function Page({ params }: { params: Promise<{ method: allowMethods; route: string }> }) {
    const { getApi, postApi, putApi, patchApi, deleteApi } = useAllApi();
    useEffect(() => {
        (async function () {
            const { method, route } = await params;

            console.log(method);
            console.log(decodeURIComponent(route as string));
            if(method === "get"){
                console.log(getApi);
            }
            
        })();
    }, [params]);

    return <div>Hello</div>;
}
