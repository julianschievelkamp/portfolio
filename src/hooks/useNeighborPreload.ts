import { useEffect } from "react";

import { portfolioData } from "data/portfolioData";

// Preloads the images of the previous and next item so switching reacts instantly.
// Only starts once the current item is done, so its loading is not slowed down.
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
