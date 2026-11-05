import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavBar from "@/components/nav-bar";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Standby | API Workshop",
    description: "API Workshop",
    icons: {
        icon: "/standby-logo.jpg",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${poppins.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col font-poppins">
                <SidebarProvider style={{ "--sidebar-width-icon": "4rem" } as React.CSSProperties}>
                    <NavBar />
                    <SidebarTrigger />
                    {children}
                </SidebarProvider>
            </body>
        </html>
    );
}
