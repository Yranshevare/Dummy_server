"use client";

import Loader from "@/components/loader";
import { useAllApi } from "@/module/all-api/provider/all-api";
import { apiData } from "@workspace/types/api-type";
import { allowMethods } from "@workspace/types/dashboard";
import { Activity, ArrowLeft, Clock, Code2, Cookie, FileJson, Globe, Search, ShieldAlert, Terminal } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ApiObjType extends apiData {
    api: string;
}

// --------------------------------------------------
// Reusable UI Components
// --------------------------------------------------

function MethodBadge({ method }: { method: string }) {
    const styles: Record<string, string> = {
        GET: "bg-green-50 text-green-700 border-green-200",
        POST: "bg-blue-50 text-blue-700 border-blue-200",
        PUT: "bg-orange-50 text-orange-700 border-orange-200",
        PATCH: "bg-purple-50 text-purple-700 border-purple-200",
        DELETE: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-bold tracking-wide ${
                styles[method.toUpperCase()] || "bg-gray-100 text-gray-700 border-gray-200"
            }`}
        >
            {method.toUpperCase()}
        </span>
    );
}

function Section({
    title,
    description,
    icon: Icon,
    count,
    children,
}: {
    title: string;
    description?: string;
    icon: React.ElementType;
    count?: number;
    children: React.ReactNode;
}) {
    return (
        <section className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                        <Icon size={18} />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
                        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
                    </div>
                </div>

                {count !== undefined && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                        {count} {count === 1 ? "Item" : "Items"}
                    </span>
                )}
            </div>

            <div className="p-5">{children}</div>
        </section>
    );
}

function JsonViewer({ data }: { data: any }) {
    let formatted = "";

    try {
        formatted = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    } catch {
        formatted = String(data);
    }

    return (
        <div className="rounded-lg bg-gray-950 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
                <div className="flex items-center gap-2 text-gray-400">
                    <Code2 size={14} />
                    <span className="text-xs font-medium">JSON</span>
                </div>

                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Response Data</span>
            </div>

            <pre className="p-4 text-xs sm:text-sm text-green-300 overflow-x-auto leading-6 whitespace-pre-wrap break-words">
                <code>{formatted ?? "No data available"}</code>
            </pre>
        </div>
    );
}

function ErrorDetails({ error }: { error: any }) {
    if (!error) return null;

    return (
        <details className="group mt-3 border border-red-100 rounded-lg bg-red-50/50 overflow-hidden">
            <summary className="flex items-center justify-between px-3 py-2.5 cursor-pointer list-none">
                <div className="flex items-center gap-2 text-red-700">
                    <ShieldAlert size={15} />
                    <span className="text-xs font-semibold">Error Configuration</span>
                </div>

                <div className="flex items-center gap-2">
                    {error.responseStatus && <span className="text-xs font-bold text-red-700">{error.responseStatus}</span>}
                    <span className="text-xs text-red-400 group-open:rotate-180 transition-transform">▼</span>
                </div>
            </summary>

            <div className="border-t border-red-100 p-3 space-y-3">
                {error.responseStatus !== undefined && (
                    <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase mb-1">Response Status</p>
                        <span className="text-sm font-semibold text-red-700">{error.responseStatus}</span>
                    </div>
                )}

                {error.body !== undefined && (
                    <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase mb-2">Error Response Body</p>
                        <JsonViewer data={error.body} />
                    </div>
                )}
            </div>
        </details>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-11 w-11 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                <Search size={19} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">{message}</p>
            <p className="text-xs text-gray-400 mt-1">No configuration has been defined.</p>
        </div>
    );
}

// --------------------------------------------------
// Params and Query
// --------------------------------------------------

function SimpleConfigTable({ data, type }: { data: Record<string, any>; type: "params" | "query" }) {
    const entries = Object.entries(data || {});

    if (!entries.length) {
        return <EmptyState message="No parameters configured" />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-100 text-[11px] text-gray-400 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Key</th>
                        <th className="pb-3 font-semibold">Type</th>
                        <th className="pb-3 font-semibold">Required</th>
                    </tr>
                </thead>

                <tbody>
                    {entries.map(([key, value]) => (
                        <tr key={key} className="border-b last:border-0 border-gray-100">
                            <td className="py-3 pr-3">
                                <code className="text-xs font-semibold text-gray-800">{key}</code>
                            </td>

                            <td className="py-3 pr-3">
                                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                    {type === "params" ? "string" : value.type?.type || "any"}
                                </span>
                            </td>

                            <td className="py-3">
                                {value.required ? (
                                    <span className="text-xs text-green-700 font-medium">Required</span>
                                ) : (
                                    <span className="text-xs text-gray-400">Optional</span>
                                )}

                                <ErrorDetails error={value.error} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// --------------------------------------------------
// Request Body (Supports Nested Objects)
// --------------------------------------------------

function BodyFields({ data, depth = 0 }: { data: Record<string, any>; depth?: number }) {
    const entries = Object.entries(data || {});

    if (!entries.length) {
        return <EmptyState message="No body fields configured" />;
    }

    return (
        <div className="space-y-3">
            {entries.map(([key, field]) => {
                const fieldType = field.type?.type || "unknown";
                const nestedFields = field.type?.body || {};
                const hasNestedFields = Object.keys(nestedFields).length > 0;

                return (
                    <div key={key} className={`rounded-lg border border-gray-200 overflow-hidden ${depth > 0 ? "bg-white" : "bg-gray-50/70"}`}>
                        <div className="p-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <code className="text-sm font-semibold text-gray-800">{key}</code>

                                    <span className="text-[11px] px-2 py-0.5 rounded bg-gray-200 text-gray-600">{fieldType}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {field.required ? (
                                        <span className="text-[11px] font-medium text-green-700 bg-green-50 border border-green-100 px-2 py-1 rounded">
                                            Required
                                        </span>
                                    ) : (
                                        <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-1 rounded">Optional</span>
                                    )}
                                </div>
                            </div>

                            {field.equals && (
                                <div className="mt-3 p-2.5 rounded-md bg-blue-50 border border-blue-100">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">Equals Validation</p>
                                    <p className="text-xs text-blue-800">
                                        Expected value: <code className="font-semibold">{JSON.stringify(field.equals.value)}</code>
                                    </p>
                                    <ErrorDetails error={field.equals.error} />
                                </div>
                            )}

                            {hasNestedFields && (
                                <div className="mt-3 border-l-2 border-gray-200 pl-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Nested Properties</p>

                                    <BodyFields data={nestedFields} depth={depth + 1} />
                                </div>
                            )}

                            <ErrorDetails error={field.error} />
                            {field.type?.error && <ErrorDetails error={field.type.error} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// --------------------------------------------------
// Cookies
// --------------------------------------------------

function CookieSection({ data, type }: { data: Record<string, any>; type: "get" | "set" }) {
    const entries = Object.entries(data || {});

    if (!entries.length) {
        return <EmptyState message="No cookies configured" />;
    }

    return (
        <div className="divide-y divide-gray-100">
            {entries.map(([key, cookie]) => (
                <div key={key} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <code className="text-sm font-semibold text-gray-800">{key}</code>

                        {type === "get" && (
                            <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded">{cookie.type?.type || "string"}</span>
                        )}
                    </div>

                    {type === "get" ? (
                        <>
                            <p className="text-xs text-gray-500">{cookie.required ? "Required cookie" : "Optional cookie"}</p>

                            {cookie.equals && <p className="text-xs text-blue-700 mt-2">Expected value: {JSON.stringify(cookie.equals.value)}</p>}

                            <ErrorDetails error={cookie.error} />
                            {cookie.type?.error && <ErrorDetails error={cookie.type.error} />}
                            {cookie.equals?.error && <ErrorDetails error={cookie.equals.error} />}
                        </>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                            {[
                                ["Path", cookie.path || "/"],
                                ["Max Age", cookie.maxAge ?? "Not set"],
                                ["Same Site", cookie.sameSite || "Not set"],
                                ["Http Only", cookie.httpOnly ? "Yes" : "No"],
                                ["Secure", cookie.secure ? "Yes" : "No"],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <p className="text-[10px] text-gray-400 uppercase font-semibold">{label}</p>
                                    <p className="text-xs text-gray-700 mt-1 font-medium">{String(value)}</p>
                                </div>
                            ))}

                            <div className="col-span-2 sm:col-span-3">
                                <p className="text-[10px] text-gray-400 uppercase font-semibold">Value</p>
                                <code className="text-xs text-gray-700 mt-1 block break-all">{cookie.value}</code>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// --------------------------------------------------
// Main Page
// --------------------------------------------------

export default function Page({
    params,
}: {
    params: Promise<{
        method: allowMethods;
        route: string;
    }>;
}) {
    const { getApi, postApi, putApi, patchApi, deleteApi, loading } = useAllApi();

    const [apiData, setApiData] = useState<ApiObjType | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function fetchApi() {
            if (loading) return;

            try {
                const { method, route } = await params;
                const api = decodeURIComponent(route);

                const apiMaps: Record<string, Record<string, apiData>> = {
                    get: getApi,
                    post: postApi,
                    put: putApi,
                    patch: patchApi,
                    delete: deleteApi,
                };

                const selectedApi = apiMaps[method]?.[api];

                if (!selectedApi) {
                    if (!cancelled) {
                        setApiData(null);
                        setNotFound(true);
                    }
                    return;
                }

                if (!cancelled) {
                    setApiData({
                        ...selectedApi,
                        api,
                    });
                    setNotFound(false);
                }
            } catch (error) {
                console.error("Failed to load API details:", error);

                if (!cancelled) {
                    setApiData(null);
                    setNotFound(true);
                }
            }
        }

        fetchApi();

        return () => {
            cancelled = true;
        };
    }, [params, loading, getApi, postApi, putApi, patchApi, deleteApi]);

    if (loading || (!apiData && !notFound)) {
        return <Loader />;
    }

    if (notFound || !apiData) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-6">
                <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <Activity size={24} className="text-gray-400" />
                </div>

                <h2 className="text-lg font-semibold text-gray-900">API Not Found</h2>

                <p className="text-sm text-gray-500 mt-1 text-center">The requested API endpoint does not exist or has been removed.</p>

                <Link href="/" className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black">
                    <ArrowLeft size={16} />
                    Back to Workspace
                </Link>
            </div>
        );
    }

    const hasParams = Object.keys(apiData.params || {}).length > 0;
    const hasQuery = Object.keys(apiData.query || {}).length > 0;
    const hasBody = Object.keys(apiData.body || {}).length > 0;
    const hasGetCookies = Object.keys(apiData.getCookies || {}).length > 0;
    const hasSetCookies = Object.keys(apiData.setCookies || {}).length > 0;

    const hasRequestConfig = hasParams || hasQuery || hasBody || hasGetCookies || hasSetCookies;

    return (
        <div className="w-full min-w-0 flex flex-col px-6 lg:px-10 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center flex-wrap gap-2 text-xs text-gray-400 font-medium mb-6">
                <Link href="/" className="hover:text-gray-700">
                    Workspace
                </Link>
                <span>/</span>
                <Link href="/all-api" className="hover:text-gray-700">
                    All APIs
                </Link>
                <span>/</span>
                <span className="text-gray-700 font-semibold">{apiData.api}</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                <div className="min-w-0 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <MethodBadge method={apiData.method} />

                        <span className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 rounded-full px-2.5 py-1 font-semibold">
                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                            Configured
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 break-all">{apiData.api}</h1>

                    <p className="text-sm text-gray-500">View and manage the configuration of this API endpoint.</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>
                </div>
            </div>

            <div className="my-7 border-t border-gray-200" />

            {/* Overview Cards */}
            <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-800 mb-4">Endpoint Overview</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500 font-medium">HTTP Method</p>
                            <Globe size={17} className="text-gray-400" />
                        </div>
                        <div className="mt-3">
                            <MethodBadge method={apiData.method} />
                        </div>
                    </div>

                    <div className="p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500 font-medium">Response Status</p>
                            <Activity size={17} className="text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold tracking-tight text-gray-900 mt-2">{apiData.responseStatus ?? "—"}</p>
                    </div>

                    <div className="p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500 font-medium">Latency</p>
                            <Clock size={17} className="text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold tracking-tight text-gray-900 mt-2">
                            {apiData.latency !== undefined ? `${apiData.latency} ms` : "Not available"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Request Configuration */}
            <div className="space-y-5">
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Request Configuration</h2>
                    <p className="text-xs text-gray-500 mt-1">Parameters and configurations required by this endpoint.</p>
                </div>

                {hasRequestConfig ? (
                    <div className="grid grid-cols-1  gap-5 items-start">
                        {hasParams && (
                            <Section
                                title="Route Parameters"
                                description="Dynamic URL parameters"
                                icon={Globe}
                                count={Object.keys(apiData.params!).length}
                            >
                                <SimpleConfigTable data={apiData.params!} type="params" />
                            </Section>
                        )}

                        {hasQuery && (
                            <Section
                                title="Query Parameters"
                                description="URL query string configuration"
                                icon={Search}
                                count={Object.keys(apiData.query!).length}
                            >
                                <SimpleConfigTable data={apiData.query!} type="query" />
                            </Section>
                        )}

                        {hasBody && (
                            <Section
                                title="Request Body"
                                description="Expected request payload and validations"
                                icon={FileJson}
                                count={Object.keys(apiData.body!).length}
                            >
                                <BodyFields data={apiData.body!} />
                            </Section>
                        )}

                        {hasGetCookies && (
                            <Section
                                title="Get Cookies"
                                description="Cookies required from incoming requests"
                                icon={Cookie}
                                count={Object.keys(apiData.getCookies!).length}
                            >
                                <CookieSection data={apiData.getCookies!} type="get" />
                            </Section>
                        )}

                        {hasSetCookies && (
                            <Section
                                title="Set Cookies"
                                description="Cookies configured in the response"
                                icon={Cookie}
                                count={Object.keys(apiData.setCookies!).length}
                            >
                                <CookieSection data={apiData.setCookies!} type="set" />
                            </Section>
                        )}
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-xl bg-white">
                        <EmptyState message="No request configuration" />
                    </div>
                )}
            </div>

            {/* Response Configuration */}
            <div className="mt-9 space-y-5">
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Response Configuration</h2>
                    <p className="text-xs text-gray-500 mt-1">Expected response returned by this endpoint.</p>
                </div>

                <Section title="Response Body" description="Configured API response" icon={Terminal}>
                    <JsonViewer data={apiData.response} />
                </Section>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-200 pt-5">
                <p className="text-xs text-gray-400">API Configuration Overview</p>

                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Activity size={13} />
                    Endpoint Details
                </span>
            </div>
        </div>
    );
}
