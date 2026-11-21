import { styled } from "styled-components";
import { queries } from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledCaption = styled.figcaption`
    position: absolute;
    right: 0;
    top: 100%;
    padding-top: 0.25rem;
    z-index: -1;

    @media ${queries.landscapeLgMax} {
        top: 100%;
        left: 100%;
        right: auto;
        width: max-content;
        transform-origin: top left;
        transform: rotate(-90deg);
    }
`;

export const Title = styled(Text)`
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
`;
