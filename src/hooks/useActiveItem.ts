import { useEffect, useRef, useState } from "react";
import { portfolioData } from "data/portfolioData";
import { useStore } from "hooks/useStore";
import { usePreloadedItem } from "hooks/usePreloadedItem";

// Kapselt die Logik des aktiven Popup-Items: Vorladen, Einblenden sowie die
// Zustände von Info, Video und Ton.
export const useActiveItem = () => {
    const { currentPortfolioIndex, popupOpen } = useStore();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const activeItem = portfolioData[currentPortfolioIndex];
    const loadedItem = usePreloadedItem(activeItem);

    const [previousItem, setPreviousItem] = useState(loadedItem);
    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [isItemRevealed, setIsItemRevealed] = useState(false);

    const [isInfoOn, setIsInfoOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isVolumeOn, setIsVolumeOn] = useState(true);

    // Wird beim Laden und bei Ladefehlern aufgerufen, damit das ActiveItem nicht unsichtbar bleibt
    const markImageLoaded = () => {
        if (loadedItem) setLoadedImage(loadedItem.image);
    };

    // Das Bild des angezeigten Items ist vollständig geladen
    const isImageLoaded = !!loadedItem && loadedImage === loadedItem.image;

    // Das gewählte Item ist angezeigt und sein Bild vollständig geladen
    const isItemReady = popupOpen && isImageLoaded && loadedItem === activeItem;

    // Beim Item-Wechsel werden die Zustände direkt beim Rendern zurückgesetzt
    if (previousItem !== loadedItem) {
        setPreviousItem(loadedItem);
        setIsInfoOn(false);
        setIsVideoOn(true);
        setIsVolumeOn(true);
    }

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

    useEffect(() => {
        if (!popupOpen) {
            videoRef.current?.pause();
        }
    }, [popupOpen]);

    return {
        loadedItem,
        isItemRevealed,
        isImageLoaded,
        markImageLoaded,
        videoRef,
        isInfoOn,
        setIsInfoOn,
        isVideoOn,
        setIsVideoOn,
        isVolumeOn,
        setIsVolumeOn,
    };
};
