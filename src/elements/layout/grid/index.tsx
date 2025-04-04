import { PortfolioItem } from "data/types";
import { GridItem, StyledGrid } from "./styles";
import Image from "elements/components/image";

export interface GridProps {
    items: PortfolioItem[];
}

const Grid = ({ items }: GridProps) => {
    return (
        <StyledGrid>
            {items.map(({ title, src }) => {
                return (
                    <GridItem key={title}>
                        <Image src={src} alt={title} />
                    </GridItem>
                );
            })}
        </StyledGrid>
    );
};

export default Grid;
