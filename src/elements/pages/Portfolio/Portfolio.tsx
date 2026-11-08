import {
    PortfolioCaption,
    PortfolioFigure,
    PortfolioGrid,
    PortfolioItem,
    PortfolioListItem,
} from "./Portfolio.styles";
import Image from "elements/components/Image/Image";
import { useStore } from "hooks/useStore";
import { getAltText, getCaption, portfolioData } from "data/portfolioData";
import Popup from "elements/layout/Popup/Popup";
import { queries, thumbnailSize } from "styles/variables";
import { useMediaQuery } from "hooks/useMediaQuery";

const Portfolio = () => {
    const isMd = useMediaQuery(queries.md);
    const { setActiveIndex, setPopupOpen, sidebarOpen } = useStore();

    return (
        <>
            <PortfolioGrid role="list">
                {portfolioData.map((item, index) => {
                    return (
                        <PortfolioListItem key={item.title}>
                            <PortfolioFigure>
                                <PortfolioItem
                                    ariaLabel={`Show ${item.title}`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setPopupOpen(true);
                                    }}
                                    tabIndex={!isMd && sidebarOpen ? -1 : 0}
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
                                </PortfolioItem>
                                <PortfolioCaption>
                                    {getCaption(item)}
                                </PortfolioCaption>
                            </PortfolioFigure>
                        </PortfolioListItem>
                    );
                })}
            </PortfolioGrid>

            <Popup />
        </>
    );
};

export default Portfolio;
