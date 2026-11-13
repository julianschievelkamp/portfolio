import { useEffect } from "react";
import { useStore } from "./useStore";
import { useAbsoluteOverlay } from "./useAbsoluteOverlay";
import { useMediaQuery } from "./useMediaQuery";
import { useScrollLock } from "./useScrollLock";
import { queries } from "styles/variables";

export const useSidebarOverlay = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);
    const sidebarRef = useAbsoluteOverlay<HTMLElement>();
    const isMd = useMediaQuery(queries.md);

    // Auf Mobile sperrt die offene Sidebar das Scrollen der gesamten Seite
    useScrollLock(sidebarOpen && !isMd);

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
