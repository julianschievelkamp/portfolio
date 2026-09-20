import { PortfolioItem, StyledPortfolio } from "./styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import Popup from "elements/layout/popup";
import { thumbnailSize } from "styles/variables";

const Portfolio = () => {
    const { setCurrentPortfolioIndex, setPopupOpen } = useStore();

    return (
        <>
            <StyledPortfolio>
                {portfolioData.map((item, index) => {
                    return (
                        <PortfolioItem
                            key={item.title + index}
                            onClick={() => {
                                setCurrentPortfolioIndex(index);
                                setPopupOpen(true);
                            }}
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
