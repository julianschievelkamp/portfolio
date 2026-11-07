import { ItemContainer, StyledActiveItem } from "./styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { usePreloadedItem } from "hooks/usePreloadedItem";
import { getAltText, portfolioData } from "data/portfolioData";
import Video from "elements/components/video";
import { useEffect, useRef, useState } from "react";
import Notch from "../notch";
import ItemInfo from "../item-info";

const ActiveItem = () => {
    const { currentPortfolioIndex, popupOpen } = useStore();

    const activeItem = portfolioData[currentPortfolioIndex];
    const loadedItem = usePreloadedItem(activeItem);

    const [previousItem, setPreviousItem] = useState(loadedItem);
    const [loadedImage, setLoadedImage] = useState<string | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    const [isInfoOn, setIsInfoOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isVolumeOn, setIsVolumeOn] = useState(true);

    // Beim Item-Wechsel werden die Zustände direkt beim Rendern zurückgesetzt
    if (previousItem !== loadedItem) {
        setPreviousItem(loadedItem);
        setIsInfoOn(false);
        setIsVideoOn(true);
        setIsVolumeOn(true);
    }

    // Beim Schließen wird zurückgesetzt, damit das Popup beim nächsten Öffnen wieder einblendet
    if (!popupOpen && isRevealed) {
        setIsRevealed(false);
    }

    // Das Bild des angezeigten Items ist vollständig geladen
    const isImageLoaded = !!loadedItem && loadedImage === loadedItem.image;

    // Das gewählte Item ist angezeigt und sein Bild vollständig geladen
    const isReady = popupOpen && isImageLoaded && loadedItem === activeItem;

    useEffect(() => {
        if (!isReady) return;

        // Ein Frame mit opacity 0 muss gerendert sein, damit die Transition greift
        const frame = requestAnimationFrame(() => setIsRevealed(true));

        return () => cancelAnimationFrame(frame);
    }, [isReady]);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    if (!loadedItem) return null;

    return (
        <StyledActiveItem $isRevealed={isRevealed}>
            <ItemContainer onClick={() => setIsInfoOn(false)}>
                <Image
                    src={loadedItem.image}
                    alt={getAltText(loadedItem)}
                    onLoad={() => setLoadedImage(loadedItem.image)}
                    onError={() => setLoadedImage(loadedItem.image)}
                    width="100%"
                    height="100%"
                />

                {loadedItem.video && isVideoOn && isImageLoaded && (
                    <Video
                        src={loadedItem.video}
                        poster={loadedItem.image}
                        ariaLabel={loadedItem.title}
                        videoRef={videoRef}
                        muted={!isVolumeOn}
                        width="100%"
                        height="100%"
                    />
                )}
            </ItemContainer>

            <ItemInfo loadedItem={loadedItem} isInfoOn={isInfoOn} />

            <Notch
                loadedItem={loadedItem}
                isVideoOn={isVideoOn}
                setIsVideoOn={setIsVideoOn}
                isVolumeOn={isVolumeOn}
                setIsVolumeOn={setIsVolumeOn}
                isInfoOn={isInfoOn}
                setIsInfoOn={setIsInfoOn}
            />
        </StyledActiveItem>
    );
};

export default ActiveItem;
