import { useEffect } from "react";
import { useStore } from "./useStore";

// Schließt die geöffnete Sidebar per Escape und gibt den Fokus an den Toggle zurück
export const useSidebarControls = () => {
    const { sidebarOpen, setSidebarOpen } = useStore();

    useEffect(() => {
        if (!sidebarOpen) {
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSidebarOpen(false);
                document.getElementById("sidebar-toggle")?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [sidebarOpen, setSidebarOpen]);
};
