import { ItemContainer, StyledActiveItem } from "./styles";
import Image from "elements/components/image";
import { useActiveItem } from "hooks/useActiveItem";
import { getAltText } from "data/portfolioData";
import Video from "elements/components/video";
import Notch from "../notch";
import ItemInfo from "../item-info";

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

    if (!loadedItem) return null;

    return (
        <StyledActiveItem $isItemRevealed={isItemRevealed}>
            <ItemContainer onClick={() => setIsInfoOn(false)}>
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
