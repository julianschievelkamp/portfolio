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

const ActiveItem = () => {
    const pinchZoomRef = usePinchZoom<HTMLElement>();
    const { loadedItem, isItemRevealed, setLoadedImage } = useActiveItem();

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

                    {loadedItem.video && (
                        <Video
                            key={loadedItem.title}
                            src={loadedItem.video}
                            poster={loadedItem.image}
                            ariaLabel={loadedItem.title}
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
