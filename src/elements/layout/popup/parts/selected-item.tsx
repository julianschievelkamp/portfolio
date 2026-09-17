import {
    OuterWrapper,
    CloseTrigger,
    InnerWrapper,
    ItemContainer,
} from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import { portfolioData } from "data/portfolioData";
import Video from "elements/components/video";
import { useEffect, useRef, useState } from "react";
import Arrows from "./arrows";
import ItemData from "./item-data";

const SelectedItem = () => {
    const { setPopupOpen, currentPortfolioIndex, popupOpen } = useStore();

    const isLandscape = useMediaQuery(queries.landscape);
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    const activeItem = portfolioData[currentPortfolioIndex];
    const [currentItemLoaded, setCurrentItemLoaded] = useState(activeItem);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    return (
        <OuterWrapper>
            <CloseTrigger onClick={() => setPopupOpen(false)} />
            <InnerWrapper>
                {isLandscape && !isLandscapeLgMax && <Arrows />}

                <ItemContainer>
                    <Image
                        src={activeItem.image}
                        alt={activeItem.title}
                        onLoad={() => setCurrentItemLoaded(activeItem)}
                        fadeInOnLoad
                    />

                    {activeItem.video && activeItem === currentItemLoaded && (
                        <Video
                            src={activeItem.video}
                            poster={activeItem.image}
                            ariaLabel={activeItem.title}
                            videoRef={videoRef}
                        />
                    )}

                    {!isLandscapeLgMax && <ItemData />}
                </ItemContainer>
            </InnerWrapper>
        </OuterWrapper>
    );
};

export default SelectedItem;
