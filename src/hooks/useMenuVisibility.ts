import { useState, useEffect, useRef } from "react";
import { useStore } from "./useStore";

export const useMenuVisibility = () => {
    const [isVisible, setVisible] = useState(true);
    // Die letzte Scrollposition wird als Ref gehalten, damit kein Re-Render nötig ist
    const lastScrollY = useRef(0);
    const sidebarOpen = useStore((state) => state.sidebarOpen);

    useEffect(() => {
        const controlMenu = () => {
            // Gescrollt wird über html/body, daher die Position des Fensters lesen
            const scrollY = window.scrollY;

            if (
                !sidebarOpen &&
                scrollY > 120 &&
                scrollY > lastScrollY.current
            ) {
                // Beim Scrollen nach unten das Menü ausblenden
                setVisible(false);
            } else if (
                sidebarOpen ||
                scrollY <= 120 ||
                scrollY + 20 <= lastScrollY.current
            ) {
                // Beim Scrollen nach oben das Menü einblenden
                setVisible(true);
            }

            // Aktuelle Scrollposition für den nächsten Scroll-Vorgang merken
            lastScrollY.current = scrollY;
        };

        window.addEventListener("scroll", controlMenu, { passive: true });

        return () => {
            window.removeEventListener("scroll", controlMenu);
        };
    }, [sidebarOpen]);

    return {
        isVisible,
    };
};
