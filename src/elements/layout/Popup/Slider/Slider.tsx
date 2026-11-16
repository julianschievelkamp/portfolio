import { SliderContainer, InnerSliderContainer } from "./Slider.styles";
import SliderThumbnail from "./SliderThumbnail/SliderThumbnail";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";

const Slider = () => {
    const activeIndex = useStore((state) => state.activeIndex);
    const setActiveIndex = useStore((state) => state.setActiveIndex);

    return (
        <SliderContainer>
            <InnerSliderContainer role="list" $activeIndex={activeIndex}>
                {portfolioData.map((item, index) => {
                    return (
                        <SliderThumbnail
                            key={item.title}
                            item={item}
                            index={index}
                            isActive={index === activeIndex}
                            onSelect={setActiveIndex}
                        />
                    );
                })}
            </InnerSliderContainer>
        </SliderContainer>
    );
};

export default Slider;
