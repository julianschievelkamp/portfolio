import { useState, useEffect, useRef } from "react";
import { useStore } from "./useStore";

export const useMenuVisibility = () => {
    const [isVisible, setVisible] = useState(true);
    // Die letzte Scrollposition wird als Ref gehalten, damit kein Re-Render nötig ist
    const lastScrollY = useRef(0);
    const sidebarOpen = useStore((state) => state.sidebarOpen);

    useEffect(() => {
        const controlMenu = (e: Event) => {
            const target = e.target as HTMLElement;

            if (
                !sidebarOpen &&
                target.scrollTop > 120 &&
                target.scrollTop > lastScrollY.current
            ) {
                // Beim Scrollen nach unten das Menü ausblenden
                setVisible(false);
            } else if (
                sidebarOpen ||
                target.scrollTop <= 120 ||
                target.scrollTop + 20 <= lastScrollY.current
            ) {
                // Beim Scrollen nach oben das Menü einblenden
                setVisible(true);
            }

            // Aktuelle Scrollposition für den nächsten Scroll-Vorgang merken
            lastScrollY.current = target.scrollTop;
        };

        const pageContainer = document.getElementById("page-container");

        pageContainer?.addEventListener("scroll", controlMenu);

        return () => {
            pageContainer?.removeEventListener("scroll", controlMenu);
        };
    }, [sidebarOpen]);

    return {
        isVisible,
    };
};
