import { styled } from "styled-components";

import Text from "elements/components/Text/Text";
import { queries } from "styles/variables";

export const StyledTitle = styled(Text)`
    text-transform: uppercase;
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
    font-size: 1.25rem;

    @media ${queries.md} {
        font-size: 1.5rem;
    }
`;
