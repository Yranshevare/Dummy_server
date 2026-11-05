import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.tsx";
import NavBar from "./components/nav-bar.tsx";
import DataProvider from "./lib/data-provider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <SidebarProvider style={{ "--sidebar-width-icon": "4rem" } as React.CSSProperties}>
                <NavBar />
                <SidebarTrigger />
                <DataProvider>
                    <App />
                </DataProvider>
            </SidebarProvider>
        </BrowserRouter>
    </StrictMode>
);
