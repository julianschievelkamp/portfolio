import { memo } from "react";

import type { PortfolioItem } from "data/portfolioData";
import Image from "elements/components/Image/Image";
import { thumbnailSize } from "styles/variables";

import { SliderItem, SliderListItem } from "./SliderThumbnail.styles";

interface SliderThumbnailProps {
    index: number;
    isActive: boolean;
    item: PortfolioItem;
    onSelect: (index: number) => void;
}

// memo: only old and new active thumbnails re-render (callbacks are referentially stable).
const SliderThumbnail = memo(
    ({ index, isActive, item, onSelect }: SliderThumbnailProps) => (
        <SliderListItem>
            <SliderItem
                aria-label={`Show ${item.title}`}
                onClick={() => onSelect(index)}
                aria-current={isActive}
                // The user navigates with arrow keys instead of tab
                tabIndex={-1}
                $isActive={isActive}
            >
                <Image
                    width="100%"
                    src={item.image}
                    srcSet={item.imageSet}
                    sizes={thumbnailSize}
                    // Decorative: the button already carries the aria-label, the description is in the portfolio grid
                    alt=""
                    margin={item.thumbnailMargin}
                    aspectRatio={item.aspectRatio}
                    loading="lazy"
                    fadeInOnLoad
                />
            </SliderItem>
        </SliderListItem>
    ),
);

export default SliderThumbnail;
