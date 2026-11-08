import {
    SliderContainer,
    InnerSliderContainer,
    SliderItem,
    SliderListItem,
} from "./Slider.styles";
import Image from "elements/components/Image/Image";
import { useStore } from "hooks/useStore";
import { useSliderFocus } from "hooks/useSliderFocus";
import { getAltText, portfolioData } from "data/portfolioData";
import { thumbnailSize } from "styles/variables";

const Slider = () => {
    const activeIndex = useStore((state) => state.activeIndex);
    const setActiveIndex = useStore((state) => state.setActiveIndex);
    const { containerRef, focusedIndex, handleItemFocus, handleBlur } =
        useSliderFocus();

    return (
        <SliderContainer ref={containerRef} onBlur={handleBlur}>
            <InnerSliderContainer role="list" $focusedIndex={focusedIndex}>
                {portfolioData.map((item, index) => {
                    return (
                        <SliderListItem key={item.title}>
                            <SliderItem
                                ariaLabel={`Show ${item.title}`}
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
                        </SliderListItem>
                    );
                })}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
