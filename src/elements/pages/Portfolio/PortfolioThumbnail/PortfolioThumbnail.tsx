import { memo } from "react";
import {
    PortfolioButton,
    PortfolioCaption,
    PortfolioFigure,
} from "./PortfolioThumbnail.styles";
import Image from "elements/components/Image/Image";
import type { PortfolioItem } from "data/portfolioData";
import { getAltText, getCaption } from "utils/portfolioText";
import { thumbnailSize } from "styles/variables";

export interface PortfolioThumbnailProps {
    item: PortfolioItem;
    index: number;
    onSelect: (index: number) => void;
}

// memo: Kein Neurendern, solange item, index und onSelect gleich bleiben.
const PortfolioThumbnail = memo(
    ({ item, index, onSelect }: PortfolioThumbnailProps) => {
        return (
            <PortfolioFigure>
                <PortfolioButton
                    aria-label={`Show ${item.title}`}
                    onClick={() => onSelect(index)}
                />

                <Image
                    width="100%"
                    src={item.image}
                    srcSet={item.imageSet}
                    sizes={thumbnailSize}
                    alt={getAltText(item)}
                    margin={item.thumbnailMargin}
                    aspectRatio={item.aspectRatio}
                    loading="lazy"
                    fadeInOnLoad
                />

                <PortfolioCaption>{getCaption(item)}</PortfolioCaption>
            </PortfolioFigure>
        );
    },
);

export default PortfolioThumbnail;
