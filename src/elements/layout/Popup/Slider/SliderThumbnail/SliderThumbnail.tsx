import { memo, type FocusEvent } from "react";
import { SliderItem, SliderListItem } from "./SliderThumbnail.styles";
import Image from "elements/components/Image/Image";
import { getAltText, type PortfolioItem } from "data/portfolioData";
import { thumbnailSize } from "styles/variables";

export interface SliderThumbnailProps {
    item: PortfolioItem;
    index: number;
    isActive: boolean;
    onSelect: (index: number) => void;
    onItemFocus: (e: FocusEvent<HTMLElement>, index: number) => void;
}

// Mit memo rendern beim Weiterschalten nur das alte und das neue aktive
// Thumbnail neu, sofern onSelect und onItemFocus referenzstabil sind.
const SliderThumbnail = memo(
    ({ item, index, isActive, onSelect, onItemFocus }: SliderThumbnailProps) => {
        return (
            <SliderListItem>
                <SliderItem
                    ariaLabel={`Show ${item.title}`}
                    onClick={() => onSelect(index)}
                    onFocus={(e) => onItemFocus(e, index)}
                    ariaCurrent={isActive}
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
                    />
                </SliderItem>
            </SliderListItem>
        );
    },
);

SliderThumbnail.displayName = "SliderThumbnail";

export default SliderThumbnail;
