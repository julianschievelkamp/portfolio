import { useState, useEffect } from "react";
import { useStore } from "./useStore";

export const useMenu = () => {
    const [isVisible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { sidebarOpen } = useStore();

    useEffect(() => {
        const controlMenu = (e: Event) => {
            const target = e.target as HTMLElement;

            if (
                !sidebarOpen &&
                target.scrollTop > 120 &&
                target.scrollTop > lastScrollY
            ) {
                // Beim Scrollen nach unten das Menü ausblenden
                setVisible(false);
            } else if (
                sidebarOpen ||
                target.scrollTop <= 120 ||
                target.scrollTop + 20 <= lastScrollY
            ) {
                // Beim Scrollen nach oben das Menü einblenden
                setVisible(true);
            }

            // Aktuelle Scrollposition für den nächsten Scroll-Vorgang merken
            setLastScrollY(target.scrollTop);
        };

        const pageContainer = document.getElementById("page-container");

        pageContainer?.addEventListener("scroll", controlMenu);

        return () => {
            pageContainer?.removeEventListener("scroll", controlMenu);
        };
    });

    return {
        isVisible,
    };
};
