import { useEffect, useRef } from "react";

// Hält ein absolut positioniertes Element per Ref auf Höhe der Scroll-Position,
// um ein fixiertes Element zu simulieren
export const useFixedAbsolute = <T extends HTMLElement>() => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const updatePosition = () => {
            if (elementRef.current) {
                elementRef.current.style.top = `${window.scrollY}px`;
            }
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition, { passive: true });

        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    return elementRef;
};
