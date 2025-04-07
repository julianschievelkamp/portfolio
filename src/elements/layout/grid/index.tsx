import { GridItem, StyledGrid } from "./styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";

const Grid = () => {
    const { setCurrentPortfolioIndex, setPopupOpen } = useStore();

    return (
        <StyledGrid>
            {portfolioData.map(({ title, image }, index) => {
                return (
                    <GridItem
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
                    </GridItem>
                );
            })}
        </StyledGrid>
    );
};

export default Grid;
