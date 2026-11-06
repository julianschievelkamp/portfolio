import { SliderContainer, InnerSliderContainer, SliderItem } from "./styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import { thumbnailSize } from "styles/variables";
import { useState } from "react";

const Slider = () => {
    const { currentPortfolioIndex, setCurrentPortfolioIndex } = useStore();
    // Per Tab fokussiertes Item samt Index, zu dem der Fokus entstanden ist
    const [focus, setFocus] = useState<{
        index: number;
        baseIndex: number;
    } | null>(null);

    // Der Fokus gilt nur, solange sich der aktuelle Index nicht geändert hat
    const selectedIndex =
        focus?.baseIndex === currentPortfolioIndex
            ? focus.index
            : currentPortfolioIndex;

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
                                // Nur wenn per Tab fokussiert wird
                                if (e.target.matches(":focus-visible")) {
                                    setFocus({
                                        index,
                                        baseIndex: currentPortfolioIndex,
                                    });
                                }
                            }}
                            $imageOpacity={
                                index === currentPortfolioIndex ? 1 : 0.5
                            }
                        >
                            <Image
                                width="100%"
                                src={item.image}
                                srcSet={item.imageSet}
                                sizes={item.imageSet && thumbnailSize}
                                alt={item.title}
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
