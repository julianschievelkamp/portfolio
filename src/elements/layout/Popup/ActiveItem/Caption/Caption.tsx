import { colors } from "styles/variables";
import { StyledCaption, Title } from "./Caption.styles";
import Text from "elements/components/Text/Text";
import { PortfolioItem } from "data/portfolioData";

export interface CaptionProps {
    loadedItem: PortfolioItem;
}

const Caption = ({ loadedItem }: CaptionProps) => {
    return (
        <StyledCaption>
            <Title>
                {loadedItem.title}, {loadedItem.year}
            </Title>
            <Text color={colors.secondary}>{loadedItem.type}</Text>
        </StyledCaption>
    );
};

export default Caption;
