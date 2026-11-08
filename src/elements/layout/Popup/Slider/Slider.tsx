import {
    SliderContainer,
    InnerSliderContainer,
    SliderItem,
} from "./Slider.styles";
import Image from "elements/components/Image/Image";
import { useStore } from "hooks/useStore";
import { useSliderFocus } from "hooks/useSliderFocus";
import { getAltText, portfolioData } from "data/portfolioData";
import { thumbnailSize } from "styles/variables";

const Slider = () => {
    const { activeIndex, setActiveIndex } = useStore();
    const { containerRef, focusedIndex, handleItemFocus, handleBlur } =
        useSliderFocus();

    return (
        <SliderContainer ref={containerRef} onBlur={handleBlur}>
            <InnerSliderContainer $focusedIndex={focusedIndex}>
                {portfolioData.map((item, index) => {
                    return (
                        <SliderItem
                            key={item.title}
                            ariaLabel={item.title}
                            onClick={() => setActiveIndex(index)}
                            onFocus={(e) => handleItemFocus(e, index)}
                            $imageOpacity={index === activeIndex ? 1 : 0.5}
                        >
                            <Image
                                width="100%"
                                src={item.image}
                                srcSet={item.imageSet}
                                sizes={item.imageSet && thumbnailSize}
                                alt={getAltText(item)}
                                margin={item.thumbnailMargin}
                                aspectRatio={item.aspectRatio}
                                loading="lazy"
                            />
                        </SliderItem>
                    );
                })}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
