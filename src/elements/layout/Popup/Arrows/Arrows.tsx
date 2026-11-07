import { Arrow } from "./Arrows.styles";
import { useStore } from "hooks/useStore";
import Icon from "elements/components/Icon/Icon";

const Arrows = () => {
    const { currentPortfolioIndex, setCurrentPortfolioIndex } = useStore();

    return (
        <>
            <Arrow
                ariaLabel="Previous Artwork"
                onClick={() =>
                    setCurrentPortfolioIndex(currentPortfolioIndex - 1)
                }
            >
                <Icon name="chevronLeft" size="4rem" />
            </Arrow>
            <Arrow
                $isRight
                ariaLabel="Next Artwork"
                onClick={() =>
                    setCurrentPortfolioIndex(currentPortfolioIndex + 1)
                }
            >
                <Icon name="chevronRight" size="4rem" />
            </Arrow>
        </>
    );
};

export default Arrows;
