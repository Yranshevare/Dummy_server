"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileJson, Cookie, Code2, Save } from "lucide-react";
import type { apiData } from "@workspace/types/api-type";
import { Method } from "../type";
import Section from "./components/Section";
import TextInput from "./components/TextInput";
import makeError from "../util/makeError";
import AddFieldButton from "./components/AddFieldButton";
import addRecordField from "../util/addRecordField";
import TextArea from "./components/TextArea";
import Query from "./Query";
import Body from "./body";
import GetCookies from "./get-cookies";
import SetCookies from "./set-cookies";
import Header from "./header";
import Basic from "./basic";

export const methods: Method[] = ["get", "post", "put", "patch", "delete"];

export default function Builder({ params }: { params: Promise<{ method: string; route: string }> }) {
    const router = useRouter();

    const [method, setMethod] = useState<Method>("get");
    const [route, setRoute] = useState("");

    const [query, setQuery] = useState<Record<string, any>>({});
    const [body, setBody] = useState<Record<string, any>>({});
    const [getCookies, setGetCookies] = useState<Record<string, any>>({});
    const [setCookies, setSetCookies] = useState<Record<string, any>>({});

    const [response, setResponse] = useState("{}");
    const [responseStatus, setResponseStatus] = useState(200);
    const [latency, setLatency] = useState("");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadRoute() {
            const { method: routeMethod, route: routeName } = await params;

            if (cancelled) return;

            const decodedRoute = decodeURIComponent(routeName);

            setMethod(methods.includes(routeMethod.toLowerCase() as Method) ? (routeMethod.toLowerCase() as Method) : "get");

            setRoute(decodedRoute);

            // Automatically identify dynamic route parameters.
            const matches = decodedRoute.match(/:([a-zA-Z0-9_]+)/g) || [];

            const initialParams: Record<string, string> = {};

            matches.forEach((match) => {
                initialParams[match.slice(1)] = "";
            });
        }

        loadRoute();

        return () => {
            cancelled = true;
        };
    }, [params]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        let parsedResponse: any;

        try {
            parsedResponse = JSON.parse(response);
        } catch {
            setFormError("Response must contain valid JSON.");
            return;
        }

        if (!route.trim()) {
            setFormError("API route is required.");
            return;
        }

        if (responseStatus < 100 || responseStatus > 599) {
            setFormError("Enter a valid HTTP response status.");
            return;
        }

        const configuredApi: apiData = {
            method: method.toUpperCase() as apiData["method"],
            latency: latency ? Number(latency) : undefined,
            response: parsedResponse,
            responseStatus,
            // params: Object.keys(paramsData).length > 0 ? paramsData : undefined,
            query: Object.keys(query).length > 0 ? query : undefined,
            body: Object.keys(body).length > 0 ? body : undefined,
            getCookies: Object.keys(getCookies).length > 0 ? getCookies : undefined,
            setCookies: Object.keys(setCookies).length > 0 ? setCookies : undefined,
        };

        console.log("API Configuration:", configuredApi);

        // TODO: Call your API provider's create/save function here.
        // Example:
        // await addApi(route, configuredApi);

        alert("Configuration generated successfully. Check console.");
    };

    return (
        <div className="w-full min-w-0 flex flex-col px-6 lg:px-10 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-6">
                <span>Workspace</span>
                <span>/</span>
                <span>{method ? method : "All APIs"}</span>
                <span>/</span>
                <span className="text-gray-700">Configure API</span>
            </div>

            {/* Header */}
            <Header method={method} />

            <div className="my-7 border-t border-gray-200" />

            <form onSubmit={handleSubmit} className="space-y-7">
                {/* Basic Configuration */}
                <Basic method={method} route={route} setMethod={setMethod} setRoute={setRoute} />

                {/* Query */}
                <Section title="Query Parameters" description="Configure query string fields and their validation" icon={Code2} optional>
                    {Object.entries(query).map(([key, field]) => (
                        <Query key={key} field={field} setQuery={setQuery} />
                    ))}

                    <AddFieldButton
                        label="Add Query Parameter"
                        onClick={() =>
                            setQuery((prev) =>
                                addRecordField(prev, {
                                    type: { type: "string", error: makeError() },
                                    required: false,
                                    error: makeError(),
                                })
                            )
                        }
                    />
                </Section>

                {/* Body */}
                <Section title="Request Body" description="Define request payload fields and validation rules" icon={FileJson} optional>
                    {Object.entries(body).map(([key, field]) => (
                        <Body key={key} field={field} setBody={setBody} />
                    ))}

                    <AddFieldButton
                        label="Add Body Field"
                        onClick={() =>
                            setBody((prev) =>
                                addRecordField(prev, {
                                    type: {
                                        type: "string",
                                        error: makeError(),
                                    },
                                    required: false,
                                    error: makeError(),
                                })
                            )
                        }
                    />
                </Section>

                {/* Get Cookies */}
                <Section title="Get Cookies" description="Define cookies expected in incoming requests" icon={Cookie} optional>
                    {Object.entries(getCookies).map(([key, cookie]) => (
                        <GetCookies key={key} cookie={cookie} setGetCookies={setGetCookies} />
                    ))}

                    <AddFieldButton
                        label="Add Get Cookie"
                        onClick={() =>
                            setGetCookies((prev) =>
                                addRecordField(prev, {
                                    type: { type: "string", error: makeError() },
                                    required: false,
                                    error: makeError(),
                                })
                            )
                        }
                    />
                </Section>

                {/* Set Cookies */}
                <Section title="Set Cookies" description="Configure cookies sent in the API response" icon={Cookie} optional>
                    {Object.entries(setCookies).map(([key, cookie]) => (
                        <SetCookies key={key} cookie={cookie} setSetCookies={setSetCookies} />
                    ))}

                    <AddFieldButton
                        label="Add Set Cookie"
                        onClick={() =>
                            setSetCookies((prev) =>
                                addRecordField(prev, {
                                    value: "",
                                    path: "/",
                                    httpOnly: false,
                                    secure: false,
                                    sameSite: "lax",
                                })
                            )
                        }
                    />
                </Section>

                {/* Response */}
                <Section title="Expected Response" description="Define the response returned by this endpoint" icon={FileJson}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextInput
                            label="Response Status"
                            type="number"
                            value={responseStatus}
                            onChange={(v) => setResponseStatus(Number(v))}
                            placeholder="200"
                        />

                        <TextInput label="Latency (ms)" type="number" value={latency} onChange={setLatency} placeholder="120" />
                    </div>

                    <TextArea
                        label="Response Body (JSON)"
                        value={response}
                        onChange={setResponse}
                        rows={9}
                        placeholder={'{\n  "success": true,\n  "data": {}\n}'}
                    />
                </Section>

                {/* Submit */}
                {formError && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">{formError}</div>}

                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-200 pt-5">
                    <p className="text-xs text-gray-400">Review your configuration before submitting.</p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 shadow-sm"
                        >
                            <Save size={16} />
                            Save Configuration
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
