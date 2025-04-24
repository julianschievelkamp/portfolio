import { SliderContainer, InnerSliderContainer, SliderItem } from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import { thumbnailSize } from "styles/variables";

const Slider = () => {
    const { popupOpen, currentPortfolioIndex, setCurrentPortfolioIndex } =
        useStore();

    return (
        <SliderContainer>
            <InnerSliderContainer
                $opacity={popupOpen ? 1 : 0}
                $currentPortfolioIndex={currentPortfolioIndex}
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
                            />
                        </SliderItem>
                    );
                })}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
