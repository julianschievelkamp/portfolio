import { StyledItemInfo } from "../styles";
import { PortfolioItem } from "data/portfolioData";
import Headline from "elements/components/headline";

export interface ItemInfoProps {
    loadedItem: PortfolioItem;
    isInfoOn: boolean;
}

const ItemInfo = ({ loadedItem, isInfoOn }: ItemInfoProps) => {
    return (
        <StyledItemInfo $isVisible={isInfoOn}>
            <Headline type="h2" color="white" fontSize="0.875rem">
                {loadedItem.title} / {loadedItem.year}
            </Headline>
        </StyledItemInfo>
    );
};

export default ItemInfo;
