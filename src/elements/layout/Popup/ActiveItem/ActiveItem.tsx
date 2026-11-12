import {
    ItemTitle,
    Artwork,
    StyledActiveItem,
    ItemFigure,
    ItemCaption,
} from "./ActiveItem.styles";
import Image from "elements/components/Image/Image";
import { useActiveItem } from "hooks/useActiveItem";
import { getAltText } from "data/portfolioData";
import Video from "elements/components/Video/Video";
import { usePinchZoom } from "hooks/usePinchZoom";
import ClickAreas from "./ClickAreas/ClickAreas";
import { colors } from "styles/variables";
import Text from "elements/components/Text/Text";

const ActiveItem = () => {
    const pinchZoomRef = usePinchZoom<HTMLDivElement>();
    const { loadedItem, isItemRevealed, setLoadedImage } = useActiveItem();

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
                            key={loadedItem.title}
                            src={loadedItem.video}
                            poster={loadedItem.image}
                            ariaLabel={loadedItem.title}
                            width="100%"
                            height="100%"
                        />
                    )}
                </Artwork>

                <ItemCaption>
                    <ItemTitle fontSize="0.875rem">
                        {loadedItem.title}, {loadedItem.year}
                    </ItemTitle>
                    <Text fontSize="0.875rem" color={colors.secondary}>
                        {loadedItem.type}
                    </Text>
                </ItemCaption>
            </ItemFigure>
        </StyledActiveItem>
    );
};

export default ActiveItem;
