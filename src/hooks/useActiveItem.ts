import { useEffect, useState } from "react";
import { portfolioData } from "data/portfolioData";
import { useStore } from "hooks/useStore";
import { usePreloadedItem } from "hooks/usePreloadedItem";

// Kapselt die Logik des aktiven Popup-Items: Vorladen und Einblenden
export const useActiveItem = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const activeIndex = useStore((state) => state.activeIndex);

    const activeItem = portfolioData[activeIndex];
    const loadedItem = usePreloadedItem(activeItem);

    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [isItemRevealed, setIsItemRevealed] = useState(false);

    // Das Bild des angezeigten Items ist vollständig geladen
    const isImageLoaded = !!loadedItem && loadedImage === loadedItem.image;
    // Das gewählte Item ist angezeigt und sein Bild vollständig geladen
    const isItemReady = popupOpen && isImageLoaded && loadedItem === activeItem;

    // Beim Schließen wird zurückgesetzt, damit das ActiveItem beim nächsten Öffnen wieder einblendet
    if (!popupOpen && isItemRevealed) {
        setIsItemRevealed(false);
    }

    useEffect(() => {
        if (!isItemReady) return;

        // Ein Frame mit opacity 0 muss gerendert sein, damit die Transition greift
        const frame = requestAnimationFrame(() => setIsItemRevealed(true));

        return () => cancelAnimationFrame(frame);
    }, [isItemReady]);

    return {
        loadedItem,
        isItemRevealed,
        isImageLoaded,
        setLoadedImage,
    };
};
