import { ItemContainer, ItemInfo } from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import Video from "elements/components/video";
import { useEffect, useRef, useState } from "react";
import Notch from "./notch";
import Headline from "elements/components/headline";

const ActiveItem = () => {
    const { currentPortfolioIndex, popupOpen } = useStore();
    const activeItem = portfolioData[currentPortfolioIndex];

    const [loadedItem, setLoadedItem] = useState(activeItem);
    const [isInfoOn, setIsInfoOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isVolumeOn, setIsVolumeOn] = useState(true);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    useEffect(() => {
        setIsInfoOn(false);
        setIsVideoOn(true);
        setIsVolumeOn(true);
    }, [loadedItem]);

    return (
        <ItemContainer>
            <Image
                src={activeItem.image}
                alt={activeItem.title}
                onLoad={() => setLoadedItem(activeItem)}
                fadeInOnLoad
            />

            {activeItem === loadedItem && loadedItem.video && isVideoOn && (
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

            <ItemInfo $isVisible={isInfoOn}>
                <Headline type="h2" color="white" fontSize="0.875rem">
                    {loadedItem.title} / {loadedItem.year}
                </Headline>
            </ItemInfo>

            <Notch
                activeItem={activeItem}
                loadedItem={loadedItem}
                isVideoOn={isVideoOn}
                setIsVideoOn={setIsVideoOn}
                isVolumeOn={isVolumeOn}
                setIsVolumeOn={setIsVolumeOn}
                isInfoOn={isInfoOn}
                setIsInfoOn={setIsInfoOn}
            />
        </ItemContainer>
    );
};

export default ActiveItem;
