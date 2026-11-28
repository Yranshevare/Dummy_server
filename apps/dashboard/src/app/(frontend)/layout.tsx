import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavBar from "@/components/nav-bar";
import { AllApiProvider } from "@/module/all-api/provider/all-api";
import { Suspense } from "react";

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
                    <Suspense fallback={<div className="h-16 w-full animate-pulse bg-muted" />}>
                        <NavBar />
                    </Suspense>
                    <SidebarTrigger />
                    <AllApiProvider>{children}</AllApiProvider>
                </SidebarProvider>
            </body>
        </html>
    );
}
