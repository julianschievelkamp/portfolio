import {
    InnerWrapper,
    ItemFigure,
    StyledActiveItem,
} from "./ActiveItem.styles";
import Image from "elements/components/Image/Image";
import { useActiveItem } from "hooks/useActiveItem";
import { getAltText } from "data/portfolioData";
import Video from "elements/components/Video/Video";
import ItemButtons from "./ItemButtons/ItemButtons";
import ItemInfo from "./ItemInfo/ItemInfo";
import { usePinchZoom } from "hooks/usePinchZoom";
import { useVideoPlayback } from "hooks/useVideoPlayback";

const ActiveItem = () => {
    const {
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
    } = useActiveItem();

    const pinchZoomRef = usePinchZoom<HTMLElement>();
    const { toggleVideo } = useVideoPlayback(videoRef);

    if (!loadedItem) return null;

    return (
        <StyledActiveItem>
            <InnerWrapper $isItemRevealed={isItemRevealed}>
                <ItemFigure ref={pinchZoomRef}>
                    <Image
                        src={loadedItem.image}
                        alt={getAltText(loadedItem)}
                        onLoad={markImageLoaded}
                        onError={markImageLoaded}
                        width="100%"
                        height="100%"
                    />

                    {loadedItem.video && isImageLoaded && (
                        <Video
                            src={loadedItem.video}
                            poster={loadedItem.image}
                            ariaLabel={loadedItem.title}
                            videoRef={videoRef}
                            muted={!isVolumeOn}
                            onClick={toggleVideo}
                            width="100%"
                            height="100%"
                            // DEBUG: opacity über isVideoOn
                        />
                    )}

                    <ItemInfo loadedItem={loadedItem} isInfoOn={isInfoOn} />
                </ItemFigure>

                <ItemButtons
                    loadedItem={loadedItem}
                    isVideoOn={isVideoOn}
                    setIsVideoOn={setIsVideoOn}
                    isVolumeOn={isVolumeOn}
                    setIsVolumeOn={setIsVolumeOn}
                    isInfoOn={isInfoOn}
                    setIsInfoOn={setIsInfoOn}
                />
            </InnerWrapper>
        </StyledActiveItem>
    );
};

export default ActiveItem;
