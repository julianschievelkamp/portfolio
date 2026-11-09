import { memo } from "react";
import {
    PortfolioButton,
    PortfolioCaption,
    PortfolioFigure,
} from "./PortfolioThumbnail.styles";
import Image from "elements/components/Image/Image";
import { getAltText, getCaption, type PortfolioItem } from "data/portfolioData";
import { thumbnailSize } from "styles/variables";

export interface PortfolioThumbnailProps {
    item: PortfolioItem;
    index: number;
    onSelect: (index: number) => void;
}

// Mit memo löst ein Neurendern der Seite keine Neurenderung der Thumbnails aus,
// solange item, index und onSelect unverändert bleiben.
const PortfolioThumbnail = memo(
    ({ item, index, onSelect }: PortfolioThumbnailProps) => {
        return (
            <PortfolioFigure>
                <PortfolioButton
                    ariaLabel={`Show ${item.title}`}
                    onClick={() => onSelect(index)}
                />

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
                <PortfolioCaption>{getCaption(item)}</PortfolioCaption>
            </PortfolioFigure>
        );
    },
);

export default PortfolioThumbnail;
