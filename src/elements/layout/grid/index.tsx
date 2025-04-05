import { PortfolioItem } from "data/types";
import { GridItem, StyledGrid } from "./styles";
import Image from "elements/components/image";

export interface GridProps {
    items: PortfolioItem[];
}

const Grid = ({ items }: GridProps) => {
    return (
        <StyledGrid>
            {items.map(({ title, image }, index) => {
                return (
                    <GridItem key={title + index}>
                        <Image src={image} alt={title} />
                    </GridItem>
                );
            })}
        </StyledGrid>
    );
};

export default Grid;
