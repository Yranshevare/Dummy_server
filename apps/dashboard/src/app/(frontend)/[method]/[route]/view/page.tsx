import SpecificApi from "@/module/method/route/view/ui/page";
import { allowMethods } from "@workspace/types/dashboard";
import React from "react";

type paramsType = Promise<{ method: allowMethods; route: string }>;

export default function page({ params }: { params: paramsType }) {
    return <SpecificApi params={params} />;
}
