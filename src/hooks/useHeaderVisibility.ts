import { useState, useEffect } from "react";
import { queries } from "styles/variables";
import { useMediaQuery } from "./useMediaQuery";
import { useStore } from "./useStore";

// Bereich am Seitenanfang, in dem der Header immer sichtbar bleibt
const TOP_OFFSET = 120;
// Zusammenhängende Scroll-Strecke nach unten, ab der der Header ausgeblendet wird
const HIDE_DISTANCE = 50;
// Zusammenhängende Scroll-Strecke nach oben, ab der der Header eingeblendet wird
const SHOW_DISTANCE = 50;
// Zeitfenster nach einer Viewport-Änderung (z. B. iOS-Adressleiste), in dem Scroll-Werte ignoriert werden
const RESIZE_SETTLE_MS = 200;

// Liefert die Scrollposition begrenzt auf den gültigen Bereich,
// damit der Gummiband-Effekt (Overscroll) auf iOS keine Richtungswechsel vortäuscht
const getClampedScrollY = () => {
    const maxScrollY = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
    );

    return Math.min(Math.max(window.scrollY, 0), maxScrollY);
};

export const useHeaderVisibility = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const isMd = useMediaQuery(queries.md);

    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
        // Auf Desktop und bei geöffneter Sidebar wird nicht auf das Scrollen reagiert
        if (isMd || sidebarOpen) return;

        let lastScrollY = getClampedScrollY();
        // Strecke, die seit dem letzten Richtungswechsel zurückgelegt wurde (positiv = nach unten)
        let distance = 0;
        let frameId = 0;
        let ignoreUntil = 0;

        const update = () => {
            frameId = 0;

            const scrollY = getClampedScrollY();
            const delta = scrollY - lastScrollY;

            lastScrollY = scrollY;

            // Während sich der Viewport verändert, nur die Referenzposition nachführen
            if (performance.now() < ignoreUntil) {
                distance = 0;

                return;
            }

            if (scrollY <= TOP_OFFSET) {
                distance = 0;
                setVisible(true);

                return;
            }

            if (delta === 0) return;

            // Bei einem Richtungswechsel beginnt die Strecke von vorn
            if (Math.sign(delta) !== Math.sign(distance)) distance = 0;

            distance += delta;

            if (distance >= HIDE_DISTANCE) {
                setVisible(false);
            } else if (distance <= -SHOW_DISTANCE) {
                setVisible(true);
            }
        };

        // Scroll-Events auf einen Durchlauf pro Frame bündeln
        const handleScroll = () => {
            if (!frameId) frameId = requestAnimationFrame(update);
        };

        // Viewport-Änderungen (Adressleiste, Rotation) erzeugen unzuverlässige Scroll-Werte
        const handleResize = () => {
            ignoreUntil = performance.now() + RESIZE_SETTLE_MS;
            lastScrollY = getClampedScrollY();
            distance = 0;
        };

        const viewport = window.visualViewport;

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);
        viewport?.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            viewport?.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
        };
    }, [sidebarOpen, isMd]);

    return {
        // Bei geöffneter Sidebar ist der Header immer sichtbar
        isVisible: sidebarOpen || isVisible,
    };
};
