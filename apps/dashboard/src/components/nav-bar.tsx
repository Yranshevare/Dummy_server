"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./ui/sidebar";

import { Trash2, GamepadDirectional, ArrowRightLeft, Wrench, Download, Upload, Settings, ChevronRight, LayoutDashboard } from "lucide-react";

import { Separator } from "./ui/separator";

const methods = [
    {
        name: "All APIs",
        icon: GamepadDirectional,
        url: "/",
        color: "text-gray-500",
    },
    {
        name: "GET",
        icon: Upload,
        url: "/get",
        color: "text-blue-600",
    },
    {
        name: "POST",
        icon: Download,
        url: "/post",
        color: "text-emerald-600",
    },
    {
        name: "PUT",
        icon: ArrowRightLeft,
        url: "/put",
        color: "text-amber-600",
    },
    {
        name: "PATCH",
        icon: Wrench,
        url: "/patch",
        color: "text-violet-600",
    },
    {
        name: "DELETE",
        icon: Trash2,
        url: "/delete",
        color: "text-red-600",
    },
];

export default function NavBar() {
    const pathname = usePathname();

    const isActiveRoute = (url: string) => {
        if (url === "/") return pathname === "/";
        return pathname === url || pathname.startsWith(`${url}/`);
    };

    return (
        <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white">
            {/* Branding */}
            <SidebarHeader className="px-4 py-5">
                <Link href="/" className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <div className="shrink-0 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                        <img src="/standby-logo.jpg" alt="Standby logo" className="h-10 w-10 object-cover" />
                    </div>

                    <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                        <h1 className="text-lg font-bold tracking-tight text-gray-900">Standby</h1>
                        <p className="text-[10px] font-semibold tracking-[0.16em] text-gray-400">API WORKSHOP</p>
                    </div>
                </Link>
            </SidebarHeader>

            <div className="px-3">
                <Separator className="bg-gray-100" />
            </div>

            {/* Navigation */}
            <SidebarContent className="px-3 py-6">
                <SidebarGroup className="p-0">
                    <div className="mb-3 flex items-center gap-2 px-3 group-data-[collapsible=icon]:justify-center">
                        <LayoutDashboard size={14} className="shrink-0 text-gray-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 group-data-[collapsible=icon]:hidden">
                            Workspace
                        </span>
                    </div>

                    <div className="space-y-1">
                        {methods.map((method) => {
                            const isActive = isActiveRoute(method.url);
                            const Icon = method.icon;

                            return (
                                <Link
                                    key={method.name}
                                    href={method.url}
                                    title={method.name}
                                    className={`
                                        group flex items-center gap-3 rounded-xl px-3 py-2.5
                                        text-sm transition-all duration-200
                                        group-data-[collapsible=icon]:justify-center
                                        ${
                                            isActive
                                                ? "bg-gray-900 font-semibold text-white shadow-sm"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }
                                    `}
                                >
                                    <Icon
                                        size={19}
                                        strokeWidth={1.8}
                                        className={`
                                            shrink-0 transition-colors
                                            ${isActive ? "text-white" : `${method.color} group-hover:text-gray-800`}
                                        `}
                                    />

                                    <span className="flex-1 group-data-[collapsible=icon]:hidden">{method.name}</span>

                                    {isActive && <ChevronRight size={15} className="shrink-0 text-gray-400 group-data-[collapsible=icon]:hidden" />}
                                </Link>
                            );
                        })}
                    </div>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="px-3 pb-4">
                <Separator className="mb-3 bg-gray-100" />

                <Link
                    href="/settings"
                    title="Settings"
                    className={`
                        flex items-center gap-3 rounded-xl px-3 py-2.5
                        text-sm transition-all duration-200
                        group-data-[collapsible=icon]:justify-center
                        ${
                            isActiveRoute("/settings")
                                ? "bg-gray-900 font-semibold text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                    `}
                >
                    <Settings size={19} strokeWidth={1.8} className="shrink-0" />

                    <span className="font-medium group-data-[collapsible=icon]:hidden">Settings</span>

                    {isActiveRoute("/settings") && <ChevronRight size={15} className="ml-auto text-gray-400 group-data-[collapsible=icon]:hidden" />}
                </Link>

                <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 group-data-[collapsible=icon]:hidden">
                    <p className="text-xs font-semibold text-gray-700">Standby API Workshop</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-gray-400">Manage your API configurations</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
