import { useEffect, useState } from "react";

import { portfolioData } from "data/portfolioData";
import { useNeighborPreload } from "hooks/useNeighborPreload";
import { usePreloadedItem } from "hooks/usePreloadedItem";
import { useStore } from "hooks/useStore";

export const useActiveItem = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const activeIndex = useStore((state) => state.activeIndex);

    const activeItem = portfolioData[activeIndex];
    const loadedItem = usePreloadedItem(activeItem);

    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [isItemRevealed, setIsItemRevealed] = useState(false);

    // The image of the displayed item is fully loaded
    const isImageLoaded = !!loadedItem && loadedImage === loadedItem.image;
    // The selected item is displayed and its image is fully loaded
    const isItemReady = popupOpen && isImageLoaded && loadedItem === activeItem;

    useNeighborPreload(activeIndex, isItemReady);

    // Reset on closing so the ActiveItem fades in again the next time it opens
    if (!popupOpen && isItemRevealed) {
        setIsItemRevealed(false);
    }

    useEffect(() => {
        if (!isItemReady) return;

        // A frame with opacity 0 must be rendered so the transition takes effect
        const frame = requestAnimationFrame(() => setIsItemRevealed(true));

        return () => cancelAnimationFrame(frame);
    }, [isItemReady]);

    return {
        loadedItem,
        isItemRevealed,
        setLoadedImage,
    };
};
