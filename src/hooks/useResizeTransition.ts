import { useEffect } from "react";

// Deaktiviert CSS-Transitions, solange die Fensterbreite verändert wird
export const useResizeTransition = () => {
    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;
        let lastWidth = window.innerWidth;

        const handleResize = () => {
            // Reine Höhenänderungen ignorieren, z. B. die beim Scrollen
            // ein- und ausklappende Browserleiste auf iOS
            if (window.innerWidth === lastWidth) return;

            lastWidth = window.innerWidth;

            if (!document.body.classList.contains("no-transition")) {
                document.body.classList.add("no-transition");
            }

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                document.body.classList.remove("no-transition");
            }, 400);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);
};
