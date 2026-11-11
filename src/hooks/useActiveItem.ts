import { useEffect, useRef, useState } from "react";
import { portfolioData } from "data/portfolioData";
import { useStore } from "hooks/useStore";
import { usePreloadedItem } from "hooks/usePreloadedItem";

// Kapselt die Logik des aktiven Popup-Items: Vorladen, Einblenden sowie die
// Zustände von Info, Video und Ton.
export const useActiveItem = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const popupOpen = useStore((state) => state.popupOpen);
    const activeIndex = useStore((state) => state.activeIndex);

    const activeItem = portfolioData[activeIndex];
    const loadedItem = usePreloadedItem(activeItem);

    const [previousItem, setPreviousItem] = useState(loadedItem);
    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [isItemRevealed, setIsItemRevealed] = useState(false);

    const [isInfoOn, setIsInfoOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isVolumeOn, setIsVolumeOn] = useState(true);

    // Wird beim Laden und bei Ladefehlern aufgerufen, damit das ActiveItem nicht unsichtbar bleibt
    const markImageLoaded = () => {
        if (loadedItem) setLoadedImage(loadedItem.image);
    };

    // Das Bild des angezeigten Items ist vollständig geladen
    const isImageLoaded = !!loadedItem && loadedImage === loadedItem.image;

    // Das gewählte Item ist angezeigt und sein Bild vollständig geladen
    const isItemReady = popupOpen && isImageLoaded && loadedItem === activeItem;

    // Beim Item-Wechsel Zustände zurücksetzen
    if (previousItem !== loadedItem) {
        setPreviousItem(loadedItem);
        setIsInfoOn(false);
        setIsVideoOn(false);
    }

    // Beim Schließen wird zurückgesetzt, damit das ActiveItem beim nächsten Öffnen wieder einblendet
    if (!popupOpen && isItemRevealed) {
        setIsItemRevealed(false);
    }

    // Beim Schließen wird das Video gestoppt; der Effect unten pausiert daraufhin das Element
    if (!popupOpen && isVideoOn) {
        setIsVideoOn(false);
    }

    useEffect(() => {
        if (!isItemReady) return;

        // Ein Frame mit opacity 0 muss gerendert sein, damit die Transition greift
        const frame = requestAnimationFrame(() => setIsItemRevealed(true));

        return () => cancelAnimationFrame(frame);
    }, [isItemReady]);

    useEffect(() => {
        if (isVideoOn) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    }, [isVideoOn]);

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
