import { useEffect } from "react";
import { SIDEBAR_TOGGLE_ID } from "elements/layout/Sidebar/sidebarIds";
import { useStore } from "./useStore";

// Schließt die geöffnete Sidebar per Escape und gibt den Fokus an den Toggle zurück
export const useSidebarEscape = () => {
    const { sidebarOpen, setSidebarOpen } = useStore();

    useEffect(() => {
        if (!sidebarOpen) {
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSidebarOpen(false);
                document.getElementById(SIDEBAR_TOGGLE_ID)?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [sidebarOpen, setSidebarOpen]);
};
