"use client";

import React, { useEffect } from "react";

export default function Page({ params }: { params: Promise<{ method: string; route: string }> }) {
    useEffect(() => {
        (async function () {
            const { method, route } = await params;

            console.log(method);
            console.log(decodeURIComponent(route as string));
        })();
    }, [params]);

    return <div>Hello</div>;
}
