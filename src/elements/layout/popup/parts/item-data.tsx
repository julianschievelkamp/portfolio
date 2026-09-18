import Text from "elements/components/text";
import { PaletteItem } from "../styles";
import { PortfolioItem } from "data/portfolioData";
import Div from "elements/components/div";

export interface ItemDataProps {
    loadedItem: PortfolioItem;
}

const ItemData = ({ loadedItem }: ItemDataProps) => {
    return (
        <Div
            position="absolute"
            width="100%"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            overflow="hidden"
            margin="0.25rem 0 0 0"
        >
            {loadedItem.palette.map((color) => {
                return <PaletteItem key={color} $background={color} />;
            })}

            <Text
                bold
                textAlign="right"
                margin="0 0 0 0.25rem"
                whiteSpace="nowrap"
            >
                {loadedItem.title}
            </Text>
        </Div>
    );
};

export default ItemData;
