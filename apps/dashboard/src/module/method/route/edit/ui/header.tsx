import React from "react";
import { methodStyles } from "../style/style";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Header({ method }: { method: string }) {
    const router = useRouter();
    return (
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
    );
}
