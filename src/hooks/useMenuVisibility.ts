import { useState, useEffect, useRef } from "react";
import { useStore } from "./useStore";

// Ab dieser Scrollposition darf das Menü ausgeblendet werden
const HIDE_OFFSET = 120;
// Mindeststrecke nach unten, bevor das Menü ausgeblendet wird
const HIDE_THRESHOLD = 10;
// Mindeststrecke nach oben, bevor das Menü eingeblendet wird
const SHOW_THRESHOLD = 20;

export const useMenuVisibility = () => {
    const [isVisible, setVisible] = useState(true);
    // Die letzte Scrollposition wird als Ref gehalten, damit kein Re-Render nötig ist
    const lastScrollY = useRef(0);
    const sidebarOpen = useStore((state) => state.sidebarOpen);

    useEffect(() => {
        let frame = 0;

        const updateVisibility = () => {
            const maxScrollY = Math.max(
                document.documentElement.scrollHeight - window.innerHeight,
                0,
            );
            // Overscroll (Bounce-Effekt auf iOS) an Anfang und Ende herausfiltern,
            // sonst blendet das Zurückfedern das Menü fälschlich ein
            const scrollY = Math.min(Math.max(window.scrollY, 0), maxScrollY);

            if (sidebarOpen || scrollY <= HIDE_OFFSET) {
                setVisible(true);
            } else if (scrollY >= lastScrollY.current + HIDE_THRESHOLD) {
                // Beim Scrollen nach unten das Menü ausblenden
                setVisible(false);
            } else if (scrollY + SHOW_THRESHOLD <= lastScrollY.current) {
                // Beim Scrollen nach oben das Menü einblenden
                setVisible(true);
            } else {
                // Strecke zu kurz: Referenzposition beibehalten, damit sich
                // kleine Bewegungen aufsummieren können
                return;
            }

            // Aktuelle Scrollposition für den nächsten Scroll-Vorgang merken
            lastScrollY.current = scrollY;
        };

        const controlMenu = () => {
            // Höchstens einmal pro Frame auswerten
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(updateVisibility);
        };

        window.addEventListener("scroll", controlMenu, { passive: true });

        return () => {
            window.removeEventListener("scroll", controlMenu);
            cancelAnimationFrame(frame);
        };
    }, [sidebarOpen]);

    return {
        isVisible,
    };
};
