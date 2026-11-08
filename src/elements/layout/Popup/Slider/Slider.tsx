import {
    SliderContainer,
    InnerSliderContainer,
    SliderItem,
} from "./Slider.styles";
import Image from "elements/components/Image/Image";
import { useStore } from "hooks/useStore";
import { getAltText, portfolioData } from "data/portfolioData";
import { thumbnailSize } from "styles/variables";
import { useEffect, useRef, useState } from "react";

const Slider = () => {
    const { currentPortfolioIndex, setCurrentPortfolioIndex } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedIndex, setSelectedIndex] = useState(currentPortfolioIndex);
    const [prevPortfolioIndex, setPrevPortfolioIndex] = useState(
        currentPortfolioIndex,
    );

    // Bei Änderung des aktuellen Index wird der selectedIndex sofort angeglichen
    if (prevPortfolioIndex !== currentPortfolioIndex) {
        setPrevPortfolioIndex(currentPortfolioIndex);
        setSelectedIndex(currentPortfolioIndex);
    }

    // Liegt der Fokus bereits im Slider, folgt er dem per Tastatur gewechselten Index,
    // damit von dort aus weitergetabbt werden kann
    useEffect(() => {
        const container = containerRef.current;

        if (!container?.contains(document.activeElement)) return;

        const buttons = container.querySelectorAll("button");

        buttons[currentPortfolioIndex]?.focus({ preventScroll: true });
    }, [currentPortfolioIndex]);

    return (
        <SliderContainer ref={containerRef}>
            <InnerSliderContainer $selectedIndex={selectedIndex}>
                {portfolioData.map((item, index) => {
                    return (
                        <SliderItem
                            key={item.title}
                            ariaLabel={item.title}
                            onClick={() => setCurrentPortfolioIndex(index)}
                            onFocus={(e) => {
                                // Nur wenn per Tab fokussiert wird
                                if (e.target.matches(":focus-visible")) {
                                    setSelectedIndex(index);
                                }
                            }}
                            $imageOpacity={
                                [currentPortfolioIndex, selectedIndex].includes(
                                    index,
                                )
                                    ? 1
                                    : 0.5
                            }
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
