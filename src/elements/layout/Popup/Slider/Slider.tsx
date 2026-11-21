import { portfolioData } from "data/portfolioData";
import { useStore } from "hooks/useStore";

import { InnerSliderContainer, SliderContainer } from "./Slider.styles";
import SliderThumbnail from "./SliderThumbnail/SliderThumbnail";

const Slider = () => {
    const activeIndex = useStore((state) => state.activeIndex);
    const setActiveIndex = useStore((state) => state.setActiveIndex);

    return (
        <SliderContainer>
            <InnerSliderContainer $activeIndex={activeIndex} role="list">
                {portfolioData.map((item, index) => (
                    <SliderThumbnail
                        key={item.title}
                        index={index}
                        isActive={index === activeIndex}
                        item={item}
                        onSelect={setActiveIndex}
                    />
                ))}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
