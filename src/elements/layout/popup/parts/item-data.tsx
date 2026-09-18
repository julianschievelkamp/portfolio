import Text from "elements/components/text";
import { Notch, PaletteItem, StyledItemData } from "../styles";
import { PortfolioItem } from "data/portfolioData";

export interface ItemDataProps {
    loadedItem: PortfolioItem;
}

const ItemData = ({ loadedItem }: ItemDataProps) => {
    return (
        <StyledItemData>
            <Notch>
                {loadedItem.palette.map((color) => {
                    return <PaletteItem key={color} $background={color} />;
                })}

                <Text
                    bold
                    textAlign="right"
                    margin="0 0 0 0.25rem"
                    whiteSpace="nowrap"
                    color="white"
                    lineHeight="1"
                >
                    {loadedItem.title}
                </Text>
            </Notch>
        </StyledItemData>
    );
};

export default ItemData;
