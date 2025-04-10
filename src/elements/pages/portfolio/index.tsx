import { PortfolioItem, StyledPortfolio } from "./styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import Popup from "elements/layout/popup";

const Portfolio = () => {
    const { setCurrentPortfolioIndex, setPopupOpen } = useStore();

    return (
        <>
            <StyledPortfolio>
                {portfolioData.map(({ title, image }, index) => {
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
