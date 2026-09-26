import { SliderContainer, InnerSliderContainer, SliderItem } from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import { thumbnailSize } from "styles/variables";
import { useEffect, useState } from "react";

const Slider = () => {
    const { currentPortfolioIndex, setCurrentPortfolioIndex } = useStore();
    const [selectedIndex, setSelectedIndex] = useState(currentPortfolioIndex);

    useEffect(() => {
        setSelectedIndex(currentPortfolioIndex);
    }, [currentPortfolioIndex]);

    return (
        <SliderContainer>
            <InnerSliderContainer $selectedIndex={selectedIndex}>
                {portfolioData.map((item, index) => {
                    return (
                        <SliderItem
                            key={item.title}
                            aria-label={item.title}
                            onClick={() => setCurrentPortfolioIndex(index)}
                            onFocus={(e) => {
                                // only if focused via tab
                                if (e.target.matches(":focus-visible")) {
                                    setSelectedIndex(index);
                                }
                            }}
                        >
                            <Image
                                width="100%"
                                src={item.image}
                                srcSet={item.imageSet}
                                sizes={item.imageSet && thumbnailSize}
                                alt={item.title}
                                margin={item.thumbnailMargin}
                                opacity={
                                    index === currentPortfolioIndex ? 1 : 0.5
                                }
                            />
                        </SliderItem>
                    );
                })}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
