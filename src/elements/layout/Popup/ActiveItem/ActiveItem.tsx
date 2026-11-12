import {
    InnerWrapper,
    ItemFigure,
    StyledActiveItem,
} from "./ActiveItem.styles";
import Image from "elements/components/Image/Image";
import { useActiveItem } from "hooks/useActiveItem";
import { getAltText } from "data/portfolioData";
import Video from "elements/components/Video/Video";
import ItemInfo from "./ItemInfo/ItemInfo";
import { usePinchZoom } from "hooks/usePinchZoom";
import ClickAreas from "./ClickAreas/ClickAreas";
import { useEffect, useRef } from "react";
import { useStore } from "hooks/useStore";

const ActiveItem = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const { loadedItem, isItemRevealed, isImageLoaded, setLoadedImage } =
        useActiveItem();

    const pinchZoomRef = usePinchZoom<HTMLElement>();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const toggleVideo = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    };

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    if (!loadedItem) return null;

    return (
        <StyledActiveItem>
            <InnerWrapper $isItemRevealed={isItemRevealed}>
                <ClickAreas />

                <ItemFigure ref={pinchZoomRef}>
                    <Image
                        src={loadedItem.image}
                        alt={getAltText(loadedItem)}
                        onLoad={() => setLoadedImage(loadedItem.image)}
                        onError={() => setLoadedImage(loadedItem.image)}
                        width="100%"
                        height="100%"
                    />

                    {loadedItem.video && isImageLoaded && (
                        <Video
                            videoRef={videoRef}
                            src={loadedItem.video}
                            poster={loadedItem.image}
                            ariaLabel={loadedItem.title}
                            onClick={() => toggleVideo()}
                            width="100%"
                            height="100%"
                        />
                    )}

                    <ItemInfo loadedItem={loadedItem} />
                </ItemFigure>
            </InnerWrapper>
        </StyledActiveItem>
    );
};

export default ActiveItem;
