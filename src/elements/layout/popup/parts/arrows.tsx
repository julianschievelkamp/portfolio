import { Arrow } from "../styles";
import { useStore } from "hooks/useStore";
import { mapIndex } from "utils/utils";
import { portfolioData } from "data/portfolioData";
import Button from "elements/components/button";
import Icon from "elements/components/icon";

const Arrows = () => {
    const { currentPortfolioIndex, setCurrentPortfolioIndex } = useStore();

    return (
        <>
            <Arrow>
                <Button
                    ariaLabel="Previous"
                    onClick={() =>
                        setCurrentPortfolioIndex(
                            mapIndex(
                                currentPortfolioIndex - 1,
                                portfolioData.length - 1,
                            ),
                        )
                    }
                >
                    <Icon name="chevronLeft" size="4rem" />
                </Button>
            </Arrow>
            <Arrow $isRight>
                <Button
                    ariaLabel="Next"
                    onClick={() =>
                        setCurrentPortfolioIndex(
                            mapIndex(
                                currentPortfolioIndex + 1,
                                portfolioData.length - 1,
                            ),
                        )
                    }
                >
                    <Icon name="chevronRight" size="4rem" />
                </Button>
            </Arrow>
        </>
    );
};

export default Arrows;
