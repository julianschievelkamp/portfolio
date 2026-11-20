import { Artwork, StyledActiveItem, ItemFigure } from "./ActiveItem.styles";
import Image from "elements/components/Image/Image";
import { useActiveItem } from "hooks/useActiveItem";
import Video from "elements/components/Video/Video";
import { usePinchZoom } from "hooks/usePinchZoom/usePinchZoom";
import { useStore } from "hooks/useStore";
import ClickAreas from "./ClickAreas/ClickAreas";
import Caption from "./Caption/Caption";

const ActiveItem = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const { loadedItem, isItemRevealed, setLoadedImage } = useActiveItem();

    const pinchZoomRef = usePinchZoom<HTMLDivElement>();

    if (!loadedItem) return null;

    return (
        <StyledActiveItem>
            <ItemFigure $isItemRevealed={isItemRevealed}>
                <ClickAreas />

                <Artwork ref={pinchZoomRef}>
                    <Image
                        src={loadedItem.image}
                        alt={loadedItem.alt}
                        onLoad={() => setLoadedImage(loadedItem.image)}
                        onError={() => setLoadedImage(loadedItem.image)}
                        width="100%"
                        height="100%"
                    />

                    {loadedItem.video && (
                        <Video
                            key={loadedItem.video}
                            src={loadedItem.video}
                            audio={loadedItem.audio}
                            isActive={popupOpen}
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
