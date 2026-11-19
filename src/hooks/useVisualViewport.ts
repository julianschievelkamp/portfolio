import { useEffect, useState } from "react";
import { isViewportZoomed } from "utils/isViewportZoomed";

export const useVisualViewport = (): boolean => {
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const viewport = window.visualViewport;

        if (!viewport) {
            return;
        }

        const update = () => setIsZoomed(isViewportZoomed());

        update();
        viewport.addEventListener("resize", update);

        return () => viewport.removeEventListener("resize", update);
    }, []);

    return isZoomed;
};
