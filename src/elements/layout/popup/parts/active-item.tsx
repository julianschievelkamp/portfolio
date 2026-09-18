import { ItemContainer } from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import { portfolioData } from "data/portfolioData";
import Video from "elements/components/video";
import { useEffect, useRef, useState } from "react";
import ItemData from "./item-data";

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
                fadeInOnLoad
            />

            {loadedItem.video && (
                <Video
                    src={loadedItem.video}
                    poster={loadedItem.image}
                    ariaLabel={loadedItem.title}
                    videoRef={videoRef}
                />
            )}

            {!isLandscapeLgMax && <ItemData loadedItem={loadedItem} />}
        </ItemContainer>
    );
};

export default ActiveItem;
