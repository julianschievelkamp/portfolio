import { memo } from "react";

import type { PortfolioItem } from "data/portfolioData";
import Image from "elements/components/Image/Image";
import { thumbnailSize } from "styles/variables";

import {
    PortfolioButton,
    PortfolioCaption,
    PortfolioFigure,
} from "./PortfolioThumbnail.styles";

interface PortfolioThumbnailProps {
    index: number;
    item: PortfolioItem;
    onSelect: (index: number) => void;
}

// memo: no re-render as long as item, index and onSelect stay the same.
const PortfolioThumbnail = memo(
    ({ index, item, onSelect }: PortfolioThumbnailProps) => (
        <PortfolioFigure>
            <PortfolioButton
                aria-label={`Show ${item.title}`}
                onClick={() => onSelect(index)}
            />

            <Image
                alt={item.alt}
                aspectRatio={item.aspectRatio}
                fadeInOnLoad
                fetchPriority={index === 0 ? "high" : undefined}
                loading={index < 12 ? "eager" : "lazy"}
                margin={item.thumbnailMargin}
                sizes={thumbnailSize}
                src={item.image}
                srcSet={item.imageSet}
                width="100%"
            />

            <PortfolioCaption>{`${item.title}, ${item.year} – ${item.type}`}</PortfolioCaption>
        </PortfolioFigure>
    ),
);

export default PortfolioThumbnail;
