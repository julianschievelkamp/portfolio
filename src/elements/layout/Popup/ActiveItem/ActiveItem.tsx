import Image from "elements/components/Image/Image";
import Video from "elements/components/Video/Video";
import { useActiveItem } from "hooks/useActiveItem";
import { usePinchZoom } from "hooks/usePinchZoom/usePinchZoom";
import { useStore } from "hooks/useStore";

import { Artwork, ItemFigure, StyledActiveItem } from "./ActiveItem.styles";
import Caption from "./Caption/Caption";
import ClickAreas from "./ClickAreas/ClickAreas";

const ActiveItem = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const { isItemRevealed, loadedItem, setLoadedImage } = useActiveItem();

    const pinchZoomRef = usePinchZoom<HTMLDivElement>();

    if (!loadedItem) return null;

    return (
        <StyledActiveItem>
            <ItemFigure $isItemRevealed={isItemRevealed}>
                <ClickAreas />

                <Artwork ref={pinchZoomRef}>
                    <Image
                        alt={loadedItem.alt}
                        height="100%"
                        src={loadedItem.image}
                        width="100%"
                        onError={() => setLoadedImage(loadedItem.image)}
                        onLoad={() => setLoadedImage(loadedItem.image)}
                    />

                    {loadedItem.video && (
                        <Video
                            key={loadedItem.video}
                            ariaLabel={loadedItem.title}
                            audio={loadedItem.audio}
                            height="100%"
                            isActive={popupOpen}
                            src={loadedItem.video}
                            width="100%"
                        />
                    )}
                </Artwork>

                <Caption loadedItem={loadedItem} />
            </ItemFigure>
        </StyledActiveItem>
    );
};

export default ActiveItem;
