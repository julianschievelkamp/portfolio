import { PortfolioItem, StyledPortfolio } from "./styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import Popup from "elements/layout/popup";
import { queries, thumbnailSize } from "styles/variables";
import { useMediaQuery } from "hooks/useMediaQuery";

const Portfolio = () => {
    const { setCurrentPortfolioIndex, setPopupOpen, popupOpen, sidebarOpen } =
        useStore();
    const isMd = useMediaQuery(queries.md);

    return (
        <>
            <StyledPortfolio>
                {portfolioData.map((item, index) => {
                    return (
                        <PortfolioItem
                            key={item.title}
                            aria-label={item.title}
                            onClick={() => {
                                setCurrentPortfolioIndex(index);
                                setPopupOpen(true);
                            }}
                            tabIndex={
                                popupOpen || (!isMd && sidebarOpen) ? -1 : 0
                            }
                        >
                            <Image
                                width="100%"
                                src={item.image}
                                srcSet={item.imageSet}
                                sizes={item.imageSet && thumbnailSize}
                                alt={item.title}
                                margin={item.thumbnailMargin}
                                fadeInOnLoad
                            />
                        </PortfolioItem>
                    );
                })}
            </StyledPortfolio>

            <Popup />
        </>
    );
};

export default Portfolio;
