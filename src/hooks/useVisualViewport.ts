import { useEffect, useState } from "react";

// Liefert, ob die Seite aktuell per vergrößert ist
export const useVisualViewport = (): boolean => {
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const viewport = window.visualViewport;

        if (!viewport) {
            return;
        }

        // Ein Zoom-Wechsel löst ein resize-Event des Visual Viewports aus
        const update = () => setIsZoomed(Math.abs(viewport.scale - 1) > 0.05);

        update();
        viewport.addEventListener("resize", update);

        return () => viewport.removeEventListener("resize", update);
    }, []);

    return isZoomed;
};
