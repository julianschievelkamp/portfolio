import { ItemContainer, ItemData, Notch } from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import Video from "elements/components/video";
import { useEffect, useRef, useState } from "react";
import Text from "elements/components/text";
import { languageData } from "data/languageData";

const ActiveItem = () => {
    const { currentPortfolioIndex, popupOpen } = useStore();

    const activeItem = portfolioData[currentPortfolioIndex];
    const [loadedItem, setLoadedItem] = useState(activeItem);
    const [loadingIndicator, setLoadingIndicator] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (activeItem !== loadedItem) {
            timer = setTimeout(() => {
                setLoadingIndicator(true);
            }, 500);
        } else {
            setLoadingIndicator(false);
        }

        return () => clearTimeout(timer);
    }, [activeItem, loadedItem]);

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
                fadeInOnLoad
            />

            {activeItem === loadedItem && loadedItem.video && (
                <Video
                    src={loadedItem.video}
                    poster={loadedItem.image}
                    ariaLabel={loadedItem.title}
                    videoRef={videoRef}
                    width="100%"
                    height="100%"
                />
            )}

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
                        {loadingIndicator
                            ? languageData.loading
                            : loadedItem.title}
                    </Text>
                </Notch>
            </ItemData>
        </ItemContainer>
    );
};

export default ActiveItem;
