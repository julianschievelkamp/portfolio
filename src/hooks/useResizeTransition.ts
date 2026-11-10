import { useEffect } from "react";

// Deaktiviert CSS-Transitions, solange die Fensterbreite verändert wird
// (Höhenänderungen durch die mobile Adressleiste beim Scrollen werden ignoriert)
export const useResizeTransition = () => {
    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;
        let lastWidth = window.innerWidth;

        const handleResize = () => {
            if (window.innerWidth === lastWidth) {
                return;
            }

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
