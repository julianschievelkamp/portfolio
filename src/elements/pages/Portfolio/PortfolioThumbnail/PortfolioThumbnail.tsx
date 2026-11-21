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

// memo: Kein Neurendern, solange item, index und onSelect gleich bleiben.
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
                loading="lazy"
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
