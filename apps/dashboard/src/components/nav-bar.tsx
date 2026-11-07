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
        color: "text-gray-600",
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

    const isActiveRoute = (url: string) => (url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(`${url}/`));

    return (
        <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white">
            {/* Branding */}
            <SidebarHeader className="px-4 py-5">
                <Link href="/" className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <div className="shrink-0 rounded-xl overflow-hidden shadow-sm">
                        <img src="/standby-logo.jpg" alt="Standby logo" className="h-10 w-10 object-cover" />
                    </div>

                    <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                        <h1 className="text-lg font-bold tracking-tight text-gray-900">Standby</h1>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">API WORKSHOP</p>
                    </div>
                </Link>
            </SidebarHeader>

            <div className="px-3">
                <Separator className="bg-gray-200" />
            </div>

            {/* Navigation */}
            <SidebarContent className="px-3 py-5">
                <SidebarGroup className="p-0">
                    <div className="px-3 mb-3 flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                        <LayoutDashboard size={14} className="text-gray-400" />
                        <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">Workspace</span>
                    </div>

                    <div className="space-y-1">
                        {methods.map((method) => {
                            const isActive = method.url === "/" ? pathname === "/" : pathname === method.url || pathname.startsWith(`${method.url}/`);

                            return (
                                <SidebarGroup key={method.name} className="w-full">
                                    <Link
                                        href={method.url}
                                        className={`flex items-center gap-2 text-sm p-3 rounded-full duration-300
                    ${isActive ? "font-bold bg-gray-800 text-white" : "hover:bg-gray-200 hover:font-bold"}`}
                                    >
                                        <method.icon className={`${isActive ? "text-white" : method.color} h-5 w-5 shrink-0`} />

                                        <span className="group-data-[collapsible=icon]:hidden">{method.name}</span>

                                        {isActive && (
                                            <ChevronRight size={15} className="ml-auto text-gray-400 group-data-[collapsible=icon]:hidden" />
                                        )}
                                    </Link>
                                </SidebarGroup>
                            );
                        })}
                    </div>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="px-3 pb-4">
                <Separator className="mb-3 bg-gray-200" />

                <Link
                    href="/settings"
                    title="Settings"
                    className={`flex items-center gap-2 text-sm p-3 rounded-full duration-300
                    ${isActiveRoute("/settings") ? "font-bold bg-gray-800 text-white" : "hover:bg-gray-200 hover:font-bold"}`}
                >
                    <Settings size={19} className="shrink-0" strokeWidth={1.8} />

                    <span className="font-medium group-data-[collapsible=icon]:hidden">Settings</span>
                </Link>

                <div className="mt-3 px-3 py-3 rounded-xl bg-gray-50 border border-gray-100 group-data-[collapsible=icon]:hidden">
                    <p className="text-xs font-semibold text-gray-700">Standby API Workshop</p>
                    <p className="text-[11px] text-gray-400 mt-1">Manage your API configurations</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
