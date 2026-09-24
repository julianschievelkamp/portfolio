import { SliderContainer, InnerSliderContainer, SliderItem } from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import { thumbnailSize, transition } from "styles/variables";
import { useEffect, useState } from "react";

const Slider = () => {
    const { currentPortfolioIndex, setCurrentPortfolioIndex, popupOpen } =
        useStore();
    const [hasOpenedPopup, setHasOpenedPopup] = useState(false);

    useEffect(() => {
        setHasOpenedPopup(popupOpen);
    }, [popupOpen]);

    return (
        <SliderContainer>
            <InnerSliderContainer
                $currentPortfolioIndex={currentPortfolioIndex}
                $transition={hasOpenedPopup ? transition.fast : undefined}
            >
                {portfolioData.map((item, index) => {
                    return (
                        <SliderItem
                            key={item.title}
                            aria-label={item.title}
                            onClick={() => setCurrentPortfolioIndex(index)}
                            $opacity={index === currentPortfolioIndex ? 1 : 0.5}
                        >
                            <Image
                                width="100%"
                                src={item.image}
                                srcSet={item.imageSet}
                                sizes={item.imageSet && thumbnailSize}
                                alt={item.title}
                                margin={item.thumbnailMargin}
                                fadeInOnLoad
                            />
                        </SliderItem>
                    );
                })}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
