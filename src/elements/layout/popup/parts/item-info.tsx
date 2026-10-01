import { StyledItemInfo } from "../styles";
import { PortfolioItem } from "data/portfolioData";
import Headline from "elements/components/headline";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useRef } from "react";

export interface ItemInfoProps {
    loadedItem: PortfolioItem;
    isInfoOn: boolean;
    setIsInfoOn: (infoOn: boolean) => void;
}

const ItemInfo = ({ loadedItem, isInfoOn, setIsInfoOn }: ItemInfoProps) => {
    const ref = useRef(null);

    useOnClickOutside(ref, () => setIsInfoOn(false));

    return (
        <StyledItemInfo $isVisible={isInfoOn} ref={ref}>
            <Headline type="h2" color="white" fontSize="0.875rem">
                {loadedItem.title} / {loadedItem.year}
            </Headline>
        </StyledItemInfo>
    );
};

export default ItemInfo;
