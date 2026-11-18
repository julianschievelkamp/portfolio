import { Artwork, StyledActiveItem, ItemFigure } from "./ActiveItem.styles";
import Image from "elements/components/Image/Image";
import { useActiveItem } from "hooks/useActiveItem";
import { getAltText } from "data/portfolioData";
import Video from "elements/components/Video/Video";
import { usePinchZoom } from "hooks/usePinchZoom";
import { useStore } from "hooks/useStore";
import { useEffect, useRef } from "react";
import ClickAreas from "./ClickAreas/ClickAreas";
import Caption from "./Caption/Caption";

const ActiveItem = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const { loadedItem, isItemRevealed, setLoadedImage } = useActiveItem();

    const pinchZoomRef = usePinchZoom<HTMLDivElement>();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!popupOpen) {
            videoRef.current?.pause();
        }
    }, [popupOpen]);

    if (!loadedItem) return null;

    return (
        <StyledActiveItem>
            <ItemFigure $isItemRevealed={isItemRevealed}>
                <ClickAreas />

                <Artwork ref={pinchZoomRef}>
                    <Image
                        src={loadedItem.image}
                        alt={getAltText(loadedItem)}
                        onLoad={() => setLoadedImage(loadedItem.image)}
                        onError={() => setLoadedImage(loadedItem.image)}
                        width="100%"
                        height="100%"
                    />

                    {loadedItem.video && (
                        <Video
                            videoRef={videoRef}
                            key={loadedItem.video}
                            src={loadedItem.video}
                            audio={loadedItem.audio}
                            ariaLabel={loadedItem.title}
                            width="100%"
                            height="100%"
                        />
                    )}
                </Artwork>

                <Caption loadedItem={loadedItem} />
            </ItemFigure>
        </StyledActiveItem>
    );
};

export default ActiveItem;
