import { NavLink } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, useSidebar } from "./ui/sidebar";
import { Trash2, GamepadDirectional, ArrowRightLeft, Wrench, Download, Upload, Settings, PanelLeftClose, PanelLeft } from "lucide-react";
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
            <div className=" mt-2">
                <Separator className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            </div>
            <SidebarContent className="mt-2 ">
                <div className="flex flex-col items-start ">
                    {methods.map((method) => (
                        <SidebarGroup key={method.name} className="w-full ">
                            <NavLink
                                to={method.url}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 text-sm p-3   rounded-full duration-300
                                    ${isActive ? "font-bold bg-gray-800 text-white" : "hover:bg-gray-200 hover:font-bold"}`
                                }
                            >
                                <method.icon className="h-5 w-5 shrink-0" />
                                <span className="group-data-[collapsible=icon]:hidden">{method.name}</span>
                            </NavLink>
                        </SidebarGroup>
                    ))}
                </div>
            </SidebarContent>
            <div className=" mt-2">
                <Separator className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            </div>
            <SidebarFooter>
                <NavLink
                    to={"/settings"}
                    className={({ isActive }) =>
                        `flex items-center gap-2 text-sm p-3 rounded-full duration-300  ${isActive ? "font-bold bg-gray-800 text-white  " : "hover:bg-gray-200 hover:font-bold"}`
                    }
                >
                    <Settings className="h-5 font-bold shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </NavLink>
            </SidebarFooter>
        </Sidebar>
    );
}


