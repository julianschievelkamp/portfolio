import { useEffect, useState } from "react";

import type { PortfolioItem } from "data/portfolioData";

// Returns the most recently fully loaded item; new images are preloaded in advance.
export const usePreloadedItem = (activeItem?: PortfolioItem) => {
    const [loadedItem, setLoadedItem] = useState(activeItem);

    useEffect(() => {
        if (!activeItem || activeItem === loadedItem) return;

        let cancelled = false;
        const preloader = new window.Image();
        preloader.src = activeItem.image;

        preloader
            .decode()
            // Also switch on load errors so the UI does not get stuck
            .catch(() => undefined)
            .then(() => {
                if (!cancelled) setLoadedItem(activeItem);
            });

        // When switching quickly, outdated loading operations are discarded
        return () => {
            cancelled = true;
        };
    }, [activeItem, loadedItem]);

    return loadedItem;
};
