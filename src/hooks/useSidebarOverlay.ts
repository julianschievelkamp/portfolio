import { useEffect } from "react";
import { useStore } from "./useStore";
import { useAbsoluteOverlay } from "./useAbsoluteOverlay";

export const useSidebarOverlay = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);
    const sidebarRef = useAbsoluteOverlay<HTMLElement>();

    // Schließt die geöffnete Sidebar per Escape und gibt den Fokus an den Toggle zurück
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

    return sidebarRef;
};
