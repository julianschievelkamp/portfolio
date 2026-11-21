import { useEffect } from "react";

import { portfolioData } from "data/portfolioData";

// Lädt die Bilder des vorherigen und nächsten Items vor, damit das Weiterschalten sofort reagiert.
// Startet erst, wenn das aktuelle Item fertig ist, um dessen Laden nicht auszubremsen.
export const useNeighborPreload = (activeIndex: number, enabled: boolean) => {
    useEffect(() => {
        if (!enabled || activeIndex < 0) return;

        const count = portfolioData.length;
        const neighbors = [
            portfolioData[(activeIndex - 1 + count) % count],
            portfolioData[(activeIndex + 1) % count],
        ];

        neighbors.forEach((item) => {
            if (!item) return;

            const preloader = new window.Image();
            preloader.src = item.image;
        });
    }, [activeIndex, enabled]);
};
