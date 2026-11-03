import { Separator } from "./ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./ui/sidebar";

import { ArrowDownToLine, Plus, Replace, Pencil, Trash2, GamepadDirectional, ArrowRightLeft, Wrench, Download, Upload } from "lucide-react";

const methods = [
    { name: "All APIs", icon: GamepadDirectional },
    { name: "GET", icon: Upload },
    { name: "POST", icon: Download },
    { name: "PUT", icon: ArrowRightLeft },
    { name: "PATCH", icon: Wrench },
    { name: "DELETE", icon: Trash2 },
];
export default function NavBar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-5">
                    <img src="/standby-logo.jpg" alt="logo" className="h-10 w-10 rounded-lg" />
                    <div>
                        <h1 className="text-xl font-bold">Standby</h1>
                        <p className="text-sm text-gray-500">API Workshop</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="mt-5">
                <div className="flex flex-col items-start">
                    {methods.map((method) => (
                        <SidebarGroup key={method.name} className="w-full">
                            <div className="flex items-center gap-2 text-sm">
                                <method.icon className="h-5 font-bold"/>
                                <span>{method.name}</span>
                            </div>
                        </SidebarGroup>
                    ))}
                </div>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
