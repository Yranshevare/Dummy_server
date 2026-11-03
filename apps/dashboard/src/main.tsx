import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.tsx";
import NavBar from "./components/nav-bar.tsx";
// import { AppSidebar } from "./components/ui/";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SidebarProvider>
            <NavBar />
            <main>
                <SidebarTrigger />
                <App />
            </main>
        </SidebarProvider>
    </StrictMode>
);
