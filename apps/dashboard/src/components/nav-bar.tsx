"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./ui/sidebar";

import { Trash2, GamepadDirectional, ArrowRightLeft, Wrench, Download, Upload, Settings } from "lucide-react";

import { Separator } from "./ui/separator";

const methods = [
    { name: "All APIs", icon: GamepadDirectional, url: "/" },
    { name: "GET", icon: Upload, url: "/get" },
    { name: "POST", icon: Download, url: "/post" },
    { name: "PUT", icon: ArrowRightLeft, url: "/put" },
    { name: "PATCH", icon: Wrench, url: "/patch" },
    { name: "DELETE", icon: Trash2, url: "/delete" },
];

export default function NavBar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-3">
                <div className="flex items-center gap-5 group-data-[collapsible=icon]:justify-center">
                    <img src="/standby-logo.jpg" alt="logo" className="h-10 w-10 rounded-lg shrink-0" />

                    <div className="group-data-[collapsible=icon]:hidden">
                        <h1 className="text-xl font-bold">Standby</h1>
                        <p className="text-sm text-gray-500">API Workshop</p>
                    </div>
                </div>
            </SidebarHeader>

            <div className="mt-2">
                <Separator className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            </div>

            <SidebarContent className="mt-2">
                <div className="flex flex-col items-start">
                    {methods.map((method) => {
                        const isActive = method.url === "/" ? pathname === "/" : pathname === method.url || pathname.startsWith(`${method.url}/`);

                        return (
                            <SidebarGroup key={method.name} className="w-full">
                                <Link
                                    href={method.url}
                                    className={`flex items-center gap-2 text-sm p-3 rounded-full duration-300
                    ${isActive ? "font-bold bg-gray-800 text-white" : "hover:bg-gray-200 hover:font-bold"}`}
                                >
                                    <method.icon className="h-5 w-5 shrink-0" />

                                    <span className="group-data-[collapsible=icon]:hidden">{method.name}</span>
                                </Link>
                            </SidebarGroup>
                        );
                    })}
                </div>
            </SidebarContent>

            <div className="mt-2">
                <Separator className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            </div>

            <SidebarFooter>
                <Link
                    href="/settings"
                    className={`flex items-center gap-2 text-sm p-3 rounded-full duration-300
            ${
                pathname === "/settings" || pathname.startsWith("/settings/")
                    ? "font-bold bg-gray-800 text-white"
                    : "hover:bg-gray-200 hover:font-bold"
            }`}
                >
                    <Settings className="h-5 font-bold shrink-0" />

                    <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </Link>
            </SidebarFooter>
        </Sidebar>
    );
}
