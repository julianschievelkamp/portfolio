import { styled } from "styled-components";

import Button from "elements/components/Button/Button";
import { colors, transition, visuallyHidden } from "styles/variables";

export const PortfolioFigure = styled.figure`
    overflow: clip;
    position: relative;
    margin: 0;

    span {
        background-color: ${colors.placeholder};
    }
`;

// The image is deliberately not inside the button so reader modes keep it.
export const PortfolioButton = styled(Button)`
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;

    + img {
        transition: transform ${transition.default};
    }

    &:hover + img,
    &:focus-visible + img {
        transform: scale(1.05);
    }
`;

export const PortfolioCaption = styled.figcaption`
    ${visuallyHidden}
`;
