import { SliderContainer, InnerSliderContainer } from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import Div from "elements/components/div";
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
                        <Div
                            key={item.title}
                            margin="0 0.25rem 0 0"
                            height="3rem"
                            width="3rem"
                            overflow="hidden"
                            onClick={() => setCurrentPortfolioIndex(index)}
                            opacity={index === currentPortfolioIndex ? 1 : 0.5}
                        >
                            <Image
                                width="100%"
                                src={item.image}
                                srcSet={item.imageSet}
                                sizes={item.imageSet && thumbnailSize}
                                alt={item.title}
                            />
                        </Div>
                    );
                })}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
