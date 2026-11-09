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
    tabIndex: number;
    onSelect: (index: number) => void;
}

// Mit memo löst ein Umschalten der Sidebar nur dann ein Neurendern aus,
// wenn sich der tabIndex tatsächlich ändert.
const PortfolioThumbnail = memo(
    ({ item, index, tabIndex, onSelect }: PortfolioThumbnailProps) => {
        return (
            <PortfolioFigure>
                <PortfolioButton
                    tabIndex={tabIndex}
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
