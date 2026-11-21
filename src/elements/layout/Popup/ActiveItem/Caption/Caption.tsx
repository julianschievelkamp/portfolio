import type { PortfolioItem } from "data/portfolioData";
import Text from "elements/components/Text/Text";
import { useMediaQuery } from "hooks/useMediaQuery";
import { colors, queries } from "styles/variables";

import { StyledCaption, Title } from "./Caption.styles";

interface CaptionProps {
    loadedItem: PortfolioItem;
}

const Caption = ({ loadedItem }: CaptionProps) => {
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    return (
        <StyledCaption>
            <Title
                textAlign={isLandscapeLgMax ? "left" : "right"}
                whiteSpace="nowrap"
            >
                {loadedItem.title}, {loadedItem.year}
            </Title>
            <Text
                color={colors.secondary}
                textAlign={isLandscapeLgMax ? "left" : "right"}
                whiteSpace="nowrap"
            >
                {loadedItem.type}
            </Text>
        </StyledCaption>
    );
};

export default Caption;
