import { colors, queries } from "styles/variables";
import { StyledCaption, Title } from "./Caption.styles";
import Text from "elements/components/Text/Text";
import type { PortfolioItem } from "data/portfolioData";
import { useMediaQuery } from "hooks/useMediaQuery";

export interface CaptionProps {
    loadedItem: PortfolioItem;
}

const Caption = ({ loadedItem }: CaptionProps) => {
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    return (
        <StyledCaption>
            <Title
                whiteSpace="nowrap"
                textAlign={isLandscapeLgMax ? "left" : "right"}
            >
                {loadedItem.title}, {loadedItem.year}
            </Title>
            <Text
                whiteSpace="nowrap"
                textAlign={isLandscapeLgMax ? "left" : "right"}
                color={colors.secondary}
            >
                {loadedItem.type}
            </Text>
        </StyledCaption>
    );
};

export default Caption;
