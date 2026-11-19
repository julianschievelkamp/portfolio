import { styled } from "styled-components";
import { queries } from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledTitle = styled(Text)`
    text-transform: uppercase;
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
    font-size: 1.25rem;

    @media ${queries.md} {
        font-size: 1.5rem;
    }
`;
