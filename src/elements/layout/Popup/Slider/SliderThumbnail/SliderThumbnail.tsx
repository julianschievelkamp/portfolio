import { memo } from "react";
import { SliderItem, SliderListItem } from "./SliderThumbnail.styles";
import Image from "elements/components/Image/Image";
import type { PortfolioItem } from "data/portfolioData";
import { getAltText } from "utils/portfolioText";
import { thumbnailSize } from "styles/variables";

export interface SliderThumbnailProps {
    item: PortfolioItem;
    index: number;
    isActive: boolean;
    onSelect: (index: number) => void;
}

// memo: Nur alte und neue aktive Thumbnails rendern neu (Callbacks referenzstabil).
const SliderThumbnail = memo(
    ({ item, index, isActive, onSelect }: SliderThumbnailProps) => {
        return (
            <SliderListItem>
                <SliderItem
                    ariaLabel={`Show ${item.title}`}
                    onClick={() => onSelect(index)}
                    ariaCurrent={isActive}
                    // Roving Tabindex: Nur das aktive Item liegt in der Tab-Reihenfolge
                    tabIndex={isActive ? 0 : -1}
                    $isActive={isActive}
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
                        fadeInOnLoad
                    />
                </SliderItem>
            </SliderListItem>
        );
    },
);

export default SliderThumbnail;
