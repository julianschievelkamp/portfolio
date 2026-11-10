import { useEffect, useRef } from "react";
import { queries } from "styles/variables";
import { useMediaQuery } from "./useMediaQuery";

// Hält ein absolut positioniertes Element per Ref auf Höhe der Scroll-Position,
// um ein fixiertes Element zu simulieren (nur in mobilen Layouts)
export const useAbsoluteOverlay = <T extends HTMLElement>() => {
    const elementRef = useRef<T>(null);
    const isMd = useMediaQuery(queries.md);

    useEffect(() => {
        const element = elementRef.current;

        if (!element || isMd) {
            return;
        }

        const updatePosition = () => {
            element.style.top = `${window.scrollY}px`;
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition, { passive: true });

        return () => {
            window.removeEventListener("scroll", updatePosition);
            element.style.top = "";
        };
    }, [isMd]);

    return elementRef;
};
