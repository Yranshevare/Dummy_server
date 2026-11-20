"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Settings2, Globe, FileJson, Cookie, Code2, Save } from "lucide-react";
import type { apiData } from "@workspace/types/api-type";
import { Method } from "../type";
import Section from "./Section";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import removeRecordField from "../util/removeRecordField";
import renameRecordField from "../util/renameRecordField";
import updateRecordField from "../util/updateRecordField";
import makeError from "../util/makeError";
import Toggle from "./Toggle";
import ErrorEditor from "./ErrorEditor";
import AddFieldButton from "./AddFieldButton";
import addRecordField from "../util/addRecordField";
import { labelClass, methodStyles } from "../style/style";
import TextArea from "./TextArea";

const methods: Method[] = ["get", "post", "put", "patch", "delete"];

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

    // --------------------------------------------------
    // Submit
    // --------------------------------------------------

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
                <span>All APIs</span>
                <span>/</span>
                <span className="text-gray-700">Configure API</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-md border text-xs font-bold ${methodStyles[method]}`}>{method.toUpperCase()}</span>

                        <span className="text-xs text-gray-400">New Endpoint Configuration</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Configure API</h1>

                    <p className="text-sm text-gray-500 mt-1">Define request parameters, validations, cookies and response.</p>
                </div>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 shrink-0"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>
            </div>

            <div className="my-7 border-t border-gray-200" />

            <form onSubmit={handleSubmit} className="space-y-7">
                {/* Basic Configuration */}
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

                {/* Query */}
                <Section title="Query Parameters" description="Configure query string fields and their validation" icon={Code2} optional>
                    {Object.entries(query).map(([key, field]) => (
                        <div key={key} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-semibold text-gray-800">Query Field</p>

                                <button
                                    type="button"
                                    onClick={() => setQuery((prev) => removeRecordField(prev, key))}
                                    className="text-gray-400 hover:text-red-600"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <TextInput
                                    label="Field Name"
                                    value={key}
                                    onChange={(v) => setQuery((prev) => renameRecordField(prev, key, v))}
                                    placeholder="page"
                                />

                                <SelectInput
                                    label="Data Type"
                                    value={field.type?.type || "string"}
                                    onChange={(v) =>
                                        setQuery((prev) =>
                                            updateRecordField(prev, key, {
                                                ...field,
                                                type: {
                                                    ...field.type,
                                                    type: v,
                                                    error: field.type?.error || makeError(),
                                                },
                                            })
                                        )
                                    }
                                    options={["string", "number", "boolean"]}
                                />
                            </div>

                            <Toggle
                                label="Required"
                                checked={field.required}
                                onChange={(v) => setQuery((prev) => updateRecordField(prev, key, { ...field, required: v }))}
                            />

                            <ErrorEditor
                                title="Query Validation Error"
                                value={field.error || makeError()}
                                onChange={(v) => setQuery((prev) => updateRecordField(prev, key, { ...field, error: v }))}
                            />

                            <ErrorEditor
                                title="Type Validation Error"
                                value={field.type?.error || makeError()}
                                onChange={(v) =>
                                    setQuery((prev) =>
                                        updateRecordField(prev, key, {
                                            ...field,
                                            type: { ...field.type, error: v },
                                        })
                                    )
                                }
                            />
                        </div>
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
                        <div key={key} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-gray-800">Body Field</p>

                                <button
                                    type="button"
                                    onClick={() => setBody((prev) => removeRecordField(prev, key))}
                                    className="text-gray-400 hover:text-red-600"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <TextInput
                                    label="Field Name"
                                    value={key}
                                    onChange={(v) => setBody((prev) => renameRecordField(prev, key, v))}
                                    placeholder="username"
                                />

                                <SelectInput
                                    label="Data Type"
                                    value={field.type?.type || "string"}
                                    onChange={(v) =>
                                        setBody((prev) =>
                                            updateRecordField(prev, key, {
                                                ...field,
                                                type: {
                                                    ...field.type,
                                                    type: v,
                                                    error: field.type?.error || makeError(),
                                                },
                                            })
                                        )
                                    }
                                    options={["string", "number", "boolean", "json", "url"]}
                                />
                            </div>

                            <Toggle
                                label="Required"
                                checked={field.required}
                                onChange={(v) => setBody((prev) => updateRecordField(prev, key, { ...field, required: v }))}
                            />

                            {/* Equals */}
                            <div className="border border-gray-100 rounded-lg p-3 space-y-3">
                                <Toggle
                                    label="Enable Equals Validation"
                                    description="Require this field to match a specific value"
                                    checked={!!field.equals}
                                    onChange={(v) =>
                                        setBody((prev) =>
                                            updateRecordField(prev, key, {
                                                ...field,
                                                equals: v ? { value: "", error: makeError() } : undefined,
                                            })
                                        )
                                    }
                                />

                                {field.equals && (
                                    <>
                                        <TextInput
                                            label="Expected Value"
                                            value={typeof field.equals.value === "string" ? field.equals.value : JSON.stringify(field.equals.value)}
                                            onChange={(v) =>
                                                setBody((prev) =>
                                                    updateRecordField(prev, key, {
                                                        ...field,
                                                        equals: { ...field.equals, value: v },
                                                    })
                                                )
                                            }
                                            placeholder="Expected value"
                                        />

                                        <ErrorEditor
                                            title="Equals Validation Error"
                                            value={field.equals.error || makeError()}
                                            onChange={(v) =>
                                                setBody((prev) =>
                                                    updateRecordField(prev, key, {
                                                        ...field,
                                                        equals: { ...field.equals, error: v },
                                                    })
                                                )
                                            }
                                        />
                                    </>
                                )}
                            </div>

                            {/* Nested body */}
                            {field.type?.type === "json" && (
                                <div>
                                    <label className={labelClass}>Nested Properties (JSON)</label>

                                    <textarea
                                        key={key}
                                        defaultValue={JSON.stringify(field.type.body || {}, null, 2)}
                                        onBlur={(e) => {
                                            try {
                                                const nested = JSON.parse(e.target.value);

                                                if (nested === null || typeof nested !== "object" || Array.isArray(nested)) {
                                                    throw new Error("Expected an object");
                                                }

                                                setBody((prev) =>
                                                    updateRecordField(prev, key, {
                                                        ...field,
                                                        type: {
                                                            ...field.type,
                                                            body: nested,
                                                        },
                                                    })
                                                );
                                            } catch {
                                                e.target.setCustomValidity("Enter a valid JSON object.");
                                                e.target.reportValidity();
                                            }
                                        }}
                                        className="w-full min-h-28 p-3 rounded-lg border border-gray-200 text-xs font-mono outline-none focus:border-gray-400"
                                        placeholder={'{\n  "name": {\n    "required": true\n  }\n}'}
                                    />

                                    <p className="text-[11px] text-gray-400 mt-1">
                                        Enter nested body fields as a JSON object using the body field structure.
                                    </p>
                                </div>
                            )}

                            <ErrorEditor
                                title="Body Field Error"
                                value={field.error || makeError()}
                                onChange={(v) => setBody((prev) => updateRecordField(prev, key, { ...field, error: v }))}
                            />

                            <ErrorEditor
                                title="Data Type Error"
                                value={field.type?.error || makeError()}
                                onChange={(v) =>
                                    setBody((prev) =>
                                        updateRecordField(prev, key, {
                                            ...field,
                                            type: { ...field.type, error: v },
                                        })
                                    )
                                }
                            />
                        </div>
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
                        <div key={key} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="text-xs font-semibold text-gray-800">Cookie</p>
                                <button
                                    type="button"
                                    onClick={() => setGetCookies((prev) => removeRecordField(prev, key))}
                                    className="text-gray-400 hover:text-red-600"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <TextInput
                                    label="Cookie Name"
                                    value={key}
                                    onChange={(v) => setGetCookies((prev) => renameRecordField(prev, key, v))}
                                    placeholder="sessionId"
                                />

                                <SelectInput
                                    label="Data Type"
                                    value={cookie.type?.type || "string"}
                                    onChange={(v) =>
                                        setGetCookies((prev) =>
                                            updateRecordField(prev, key, {
                                                ...cookie,
                                                type: { ...cookie.type, type: v },
                                            })
                                        )
                                    }
                                    options={["string", "number", "boolean"]}
                                />
                            </div>

                            <Toggle
                                label="Required"
                                checked={cookie.required}
                                onChange={(v) => setGetCookies((prev) => updateRecordField(prev, key, { ...cookie, required: v }))}
                            />

                            <Toggle
                                label="Enable Equals Validation"
                                checked={!!cookie.equals}
                                onChange={(v) =>
                                    setGetCookies((prev) =>
                                        updateRecordField(prev, key, {
                                            ...cookie,
                                            equals: v ? { value: "", error: makeError() } : undefined,
                                        })
                                    )
                                }
                            />

                            {cookie.equals && (
                                <>
                                    <TextInput
                                        label="Expected Value"
                                        value={cookie.equals.value}
                                        onChange={(v) =>
                                            setGetCookies((prev) =>
                                                updateRecordField(prev, key, {
                                                    ...cookie,
                                                    equals: { ...cookie.equals, value: v },
                                                })
                                            )
                                        }
                                    />

                                    <ErrorEditor
                                        title="Equals Error"
                                        value={cookie.equals.error || makeError()}
                                        onChange={(v) =>
                                            setGetCookies((prev) =>
                                                updateRecordField(prev, key, {
                                                    ...cookie,
                                                    equals: { ...cookie.equals, error: v },
                                                })
                                            )
                                        }
                                    />
                                </>
                            )}

                            <ErrorEditor
                                title="Cookie Error"
                                value={cookie.error || makeError()}
                                onChange={(v) => setGetCookies((prev) => updateRecordField(prev, key, { ...cookie, error: v }))}
                            />

                            <ErrorEditor
                                title="Type Error"
                                value={cookie.type?.error || makeError()}
                                onChange={(v) =>
                                    setGetCookies((prev) =>
                                        updateRecordField(prev, key, {
                                            ...cookie,
                                            type: { ...cookie.type, error: v },
                                        })
                                    )
                                }
                            />
                        </div>
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
                        <div key={key} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-gray-800">Response Cookie</p>
                                <button
                                    type="button"
                                    onClick={() => setSetCookies((prev) => removeRecordField(prev, key))}
                                    className="text-gray-400 hover:text-red-600"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <TextInput
                                    label="Cookie Name"
                                    value={key}
                                    onChange={(v) => setSetCookies((prev) => renameRecordField(prev, key, v))}
                                    placeholder="token"
                                />

                                <TextInput
                                    label="Cookie Value"
                                    value={cookie.value}
                                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, value: v }))}
                                    placeholder="Cookie value"
                                />

                                <TextInput
                                    label="Path"
                                    value={cookie.path ?? ""}
                                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, path: v || undefined }))}
                                    placeholder="/"
                                />

                                <TextInput
                                    label="Max Age (seconds)"
                                    type="number"
                                    value={cookie.maxAge ?? ""}
                                    onChange={(v) =>
                                        setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, maxAge: v === "" ? undefined : Number(v) }))
                                    }
                                    placeholder="3600"
                                />

                                <SelectInput
                                    label="Same Site"
                                    value={cookie.sameSite || "lax"}
                                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, sameSite: v }))}
                                    options={["strict", "lax", "none"]}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <Toggle
                                    label="HTTP Only"
                                    checked={!!cookie.httpOnly}
                                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, httpOnly: v }))}
                                />

                                <Toggle
                                    label="Secure"
                                    checked={!!cookie.secure}
                                    onChange={(v) => setSetCookies((prev) => updateRecordField(prev, key, { ...cookie, secure: v }))}
                                />
                            </div>
                        </div>
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
