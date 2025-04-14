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
                {portfolioData.map(({ title, image, imageSet }, index) => {
                    return (
                        <PortfolioItem
                            key={title + index}
                            onClick={() => {
                                setCurrentPortfolioIndex(index);
                                setPopupOpen(true);
                            }}
                        >
                            <Image
                                width="100%"
                                src={image}
                                srcSet={imageSet}
                                sizes={imageSet && thumbnailSize}
                                alt={title}
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
