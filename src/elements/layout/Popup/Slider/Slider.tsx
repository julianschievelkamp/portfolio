import { SliderContainer, InnerSliderContainer } from "./Slider.styles";
import SliderThumbnail from "./SliderThumbnail/SliderThumbnail";
import { useStore } from "hooks/useStore";
import { useSliderFocus } from "hooks/useSliderFocus";
import { portfolioData } from "data/portfolioData";

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
                        <SliderThumbnail
                            key={item.title}
                            item={item}
                            index={index}
                            isActive={index === activeIndex}
                            onSelect={setActiveIndex}
                            onItemFocus={handleItemFocus}
                        />
                    );
                })}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
