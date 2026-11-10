import { useState, useEffect, useRef } from "react";
import { queries } from "styles/variables";
import { useMediaQuery } from "./useMediaQuery";
import { useStore } from "./useStore";

export const useMenuVisibility = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const isMd = useMediaQuery(queries.md);

    const [isVisible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        if (isMd) return;

        const controlMenu = () => {
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

        return () => window.removeEventListener("scroll", controlMenu);
    }, [sidebarOpen, isMd]);

    return {
        isVisible,
    };
};
