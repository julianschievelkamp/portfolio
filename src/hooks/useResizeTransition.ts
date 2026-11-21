import { useEffect } from "react";

// Disables transitions on width changes or orientation changes (height changes caused by the address bar do not count)
export const useResizeTransition = () => {
    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;
        let lastWidth = window.innerWidth;

        const disableTransitions = () => {
            if (!document.body.classList.contains("no-transition")) {
                document.body.classList.add("no-transition");
            }

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                document.body.classList.remove("no-transition");
            }, 400);
        };

        const handleResize = () => {
            if (window.innerWidth === lastWidth) {
                return;
            }

            lastWidth = window.innerWidth;
            disableTransitions();
        };

        const handleOrientationChange = () => {
            lastWidth = window.innerWidth;
            disableTransitions();
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleOrientationChange);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener(
                "orientationchange",
                handleOrientationChange,
            );
            clearTimeout(resizeTimer);
        };
    }, []);
};
