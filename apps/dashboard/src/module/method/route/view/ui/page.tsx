"use client";
import Loader from "@/components/loader";
import { useAllApi } from "@/module/all-api/provider/all-api";
import { apiData } from "@workspace/types/api-type";
import { allowMethods } from "@workspace/types/dashboard";
import { Activity, ArrowLeft, Clock, Cookie, FileJson, Globe,  Search, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import MethodBadge from "./MethodBadge";
import SimpleConfigTable from "./SimpleConfigTable";
import Section from "./Section";
import BodyFields from "./BodyFields";
import CookieSection from "./CookieSection";
import EmptyState from "./EmptyState";
import JsonViewer from "./JsonViewer";
import Link from "next/link";

interface ApiObjType extends apiData {
    api: string;
}

export default function SpecificApi({
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

    const hasQuery = Object.keys(apiData.query || {}).length > 0;
    const hasBody = Object.keys(apiData.body || {}).length > 0;
    const hasGetCookies = Object.keys(apiData.getCookies || {}).length > 0;
    const hasSetCookies = Object.keys(apiData.setCookies || {}).length > 0;

    const hasRequestConfig =  hasQuery || hasBody || hasGetCookies || hasSetCookies;

    return (
        <div className="w-full min-w-0 flex flex-col px-6 lg:px-10 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center flex-wrap gap-2 text-xs text-gray-400 font-medium mb-6">
                <Link href="/" className="hover:text-gray-700">
                    Workspace
                </Link>
                <span>/</span>
                <Link href="/all-api" className="hover:text-gray-700">
                    {apiData.method}
                </Link>
                <span>/</span>
                <span className="text-gray-700 font-semibold">View</span>
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