import { ItemFigure, StyledActiveItem } from "./ActiveItem.styles";
import Image from "elements/components/Image/Image";
import { useActiveItem } from "hooks/useActiveItem";
import { getAltText } from "data/portfolioData";
import Video from "elements/components/Video/Video";
import Notch from "./Notch/Notch";
import ItemInfo from "./ItemInfo/ItemInfo";
import { usePinchZoom } from "hooks/usePinchZoom";

const ActiveItem = () => {
    const pinchZoomRef = usePinchZoom<HTMLElement>();

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

    if (!loadedItem) return null;

    return (
        <StyledActiveItem $isItemRevealed={isItemRevealed}>
            <ItemFigure ref={pinchZoomRef} onClick={() => setIsInfoOn(false)}>
                <Image
                    src={loadedItem.image}
                    alt={getAltText(loadedItem)}
                    onLoad={markImageLoaded}
                    onError={markImageLoaded}
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

                <ItemInfo loadedItem={loadedItem} isInfoOn={isInfoOn} />
            </ItemFigure>

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
