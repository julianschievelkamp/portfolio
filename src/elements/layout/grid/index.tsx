import { PortfolioItem } from "data/types";
import { GridItem, StyledGrid } from "./styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";

export interface GridProps {
    items: PortfolioItem[];
}

const Grid = ({ items }: GridProps) => {
    const { setCurrentPortfolioIndex, setPopupOpen } = useStore();

    return (
        <StyledGrid>
            {items.map(({ title, image }, index) => {
                return (
                    <GridItem
                        key={title + index}
                        onClick={() => {
                            setCurrentPortfolioIndex(index);
                            setPopupOpen(true);
                        }}
                    >
                        <Image src={image} alt={title} />
                    </GridItem>
                );
            })}
        </StyledGrid>
    );
};

export default Grid;
