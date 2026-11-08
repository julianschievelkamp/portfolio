import { useEffect } from "react";

// Deaktiviert CSS-Transitions, solange die Fenstergröße verändert wird
export const useResizeTransition = () => {
    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;

        const handleResize = () => {
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
