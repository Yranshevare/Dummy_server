"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Plus, Globe, ArrowRight, Route } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const methods = [
    { label: "GET", value: "get", color: "text-green-600 bg-green-50" },
    { label: "POST", value: "post", color: "text-blue-600 bg-blue-50" },
    { label: "PUT", value: "put", color: "text-orange-600 bg-orange-50" },
    { label: "PATCH", value: "patch", color: "text-purple-600 bg-purple-50" },
    { label: "DELETE", value: "delete", color: "text-red-600 bg-red-50" },
];

export default function AddButton() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("");
    const [method, setMethod] = useState("get");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedRoute = route.trim();

        if (!trimmedRoute) {
            setError("Please enter an API route.");
            return;
        }

        if (!trimmedRoute.startsWith("/")) {
            setError("Route must start with /");
            return;
        }

        if (/\s/.test(trimmedRoute)) {
            setError("Route cannot contain spaces.");
            return;
        }

        setError("");

        router.push(`/${method}/${encodeURIComponent(trimmedRoute)}/edit`);

        setOpen(false);
        setRoute("");
        setMethod("get");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors shadow-sm shrink-0">
                    <Plus size={17} />
                    Add API
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden gap-0">
                {/* Header */}
                <DialogHeader className="p-6 pb-5 border-b border-gray-100">
                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                        <Globe size={20} className="text-gray-700" />
                    </div>

                    <DialogTitle className="text-lg font-bold tracking-tight text-gray-900">Configure API Route</DialogTitle>

                    <DialogDescription className="text-sm text-gray-500">
                        Enter an endpoint and select its HTTP method to view its configuration.
                    </DialogDescription>
                </DialogHeader>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Route */}
                    <div className="space-y-2">
                        <label htmlFor="api-route" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            <Route size={15} className="text-gray-400" />
                            API Route
                        </label>

                        <div className="relative">
                            <input
                                id="api-route"
                                type="text"
                                value={route}
                                onChange={(e) => {
                                    setRoute(e.target.value);
                                    setError("");
                                }}
                                placeholder="/api/users/:id"
                                autoComplete="off"
                                className={`w-full h-11 px-3.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-gray-900/10 ${
                                    error ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-gray-400"
                                }`}
                            />
                        </div>

                        <p className="text-xs text-gray-400">Enter the exact route configured in your workspace.</p>

                        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
                    </div>

                    {/* Method */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            <Globe size={15} className="text-gray-400" />
                            HTTP Method
                        </label>

                        <Select value={method} onValueChange={(value) => setMethod(value as string)}>
                            <SelectTrigger className="w-full h-11 border-gray-200 rounded-lg text-sm focus:ring-gray-900/10">
                                <SelectValue placeholder="Select HTTP method" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {methods.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            <span className={`text-[11px] font-bold px-2 py-1 rounded ${item.color}`}>{item.label}</span>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Preview */}
                    {route.trim() && (
                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">Endpoint Preview</p>

                            <div className="flex items-center gap-2 min-w-0">
                                <span
                                    className={`text-[10px] font-bold px-2 py-1 rounded shrink-0 ${methods.find((m) => m.value === method)?.color}`}
                                >
                                    {method.toUpperCase()}
                                </span>

                                <code className="text-xs text-gray-700 truncate">{route.trim()}</code>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-lg">
                            Cancel
                        </Button>

                        <Button type="submit" className="rounded-lg bg-gray-900 hover:bg-gray-700 text-white gap-2">
                            Continue
                            <ArrowRight size={15} />
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
