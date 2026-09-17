import Text from "elements/components/text";
import { PaletteItem } from "../styles";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import Div from "elements/components/div";

const ItemData = () => {
    const { currentPortfolioIndex } = useStore();
    const activeItem = portfolioData[currentPortfolioIndex];

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
            {activeItem.palette.map((color) => {
                return <PaletteItem key={color} $background={color} />;
            })}

            <Text
                bold
                textAlign="right"
                margin="0 0 0 0.25rem"
                whiteSpace="nowrap"
            >
                {activeItem.title}
            </Text>
        </Div>
    );
};

export default ItemData;
