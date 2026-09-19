import { ItemContainer, ItemData, Notch } from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import { portfolioData } from "data/portfolioData";
import Video from "elements/components/video";
import { useEffect, useRef, useState } from "react";
import Text from "elements/components/text";

const ActiveItem = () => {
    const { currentPortfolioIndex, popupOpen } = useStore();

    const activeItem = portfolioData[currentPortfolioIndex];
    const [loadedItem, setLoadedItem] = useState(activeItem);

    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    return (
        <ItemContainer>
            <Image
                src={activeItem.image}
                alt={activeItem.title}
                onLoad={() => setLoadedItem(activeItem)}
                loading="eager"
                fadeInOnLoad
            />

            {activeItem === loadedItem && loadedItem.video && (
                <Video
                    src={loadedItem.video}
                    poster={loadedItem.image}
                    ariaLabel={loadedItem.title}
                    videoRef={videoRef}
                />
            )}

            {!isLandscapeLgMax && (
                <ItemData>
                    <Notch>
                        <Text
                            bold
                            fontSize="0.875rem"
                            textAlign="right"
                            whiteSpace="nowrap"
                            color="white"
                            lineHeight="1"
                        >
                            {loadedItem.title}
                        </Text>
                    </Notch>
                </ItemData>
            )}
        </ItemContainer>
    );
};

export default ActiveItem;
