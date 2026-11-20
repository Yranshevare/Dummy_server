import React from "react";
import Section from "./components/Section";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import { Globe, Settings2 } from "lucide-react";
import { Method } from "../type";
import { methods } from "./page";

export default function Basic({
    method,
    route,
    setRoute,
    setMethod,
}: {
    method: Method;
    route: string;
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    setMethod: React.Dispatch<React.SetStateAction<Method>>;
}) {
    return (
        <Section title="Basic Configuration" description="Endpoint route and HTTP method" icon={Settings2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <TextInput label="API Route" value={route} onChange={setRoute} placeholder="/api/users/:id" />
                </div>

                <SelectInput label="HTTP Method" value={method} onChange={(v) => setMethod(v as Method)} options={methods} />
            </div>

            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center gap-2 min-w-0">
                <Globe size={15} className="text-gray-400 shrink-0" />
                <code className="text-xs text-gray-600 break-all">
                    {method.toUpperCase()} {route || "/your-route"}
                </code>
            </div>
        </Section>
    );
}
