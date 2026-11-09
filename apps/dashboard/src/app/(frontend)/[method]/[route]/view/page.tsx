"use client";

import { useAllApi } from "@/module/all-api/provider/all-api";
import { allowMethods } from "@workspace/types/dashboard";
import React, { useEffect } from "react";

export default function Page({ params }: { params: Promise<{ method: allowMethods; route: string }> }) {
    const { getApi, postApi, putApi, patchApi, deleteApi, loading } = useAllApi();
    useEffect(() => {
        (async function () {
            const { method, route } = await params;

            const api = decodeURIComponent(route as string)  as string;
            

            switch (method) {
                case "get":
                    console.log(getApi[api]);
                    break;
                case "post":
                    console.log(postApi[api]);
                    break;
                case "put":
                    console.log(putApi[api]);
                    break;
                case "patch":
                    console.log(patchApi[api]);
                    break;
                case "delete":
                    console.log(deleteApi[api]);
                    break;
            }
            
        })();
    }, [params, loading]);

    return <div>Hello</div>;
}
