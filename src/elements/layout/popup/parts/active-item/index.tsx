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
    const [previousItem, setPreviousItem] = useState(activeItem);
    const loadedItem = usePreloadedItem(activeItem);

    // Bleibt nach dem ersten Laden des Bildes dauerhaft true, damit nur einmal eingeblendet wird
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isInfoOn, setIsInfoOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isVolumeOn, setIsVolumeOn] = useState(true);

    // Beim Item-Wechsel werden die Zustände direkt beim Rendern zurückgesetzt
    if (previousItem !== activeItem) {
        setPreviousItem(activeItem);
        setIsInfoOn(false);
        setIsVideoOn(true);
        setIsVolumeOn(true);
    }

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    return (
        <StyledActiveItem $isLoaded={isImageLoaded}>
            <ItemContainer onClick={() => setIsInfoOn(false)}>
                <Image
                    src={loadedItem.image}
                    alt={getAltText(loadedItem)}
                    aspectRatio={loadedItem.aspectRatio}
                    width="100%"
                    height="100%"
                    onLoad={() => setIsImageLoaded(true)}
                    loading="lazy"
                />

                {loadedItem.video && isVideoOn && (
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
