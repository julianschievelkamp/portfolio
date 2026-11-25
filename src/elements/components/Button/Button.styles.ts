import { css, styled } from "styled-components";

import { colors, queries, transition } from "styles/variables";

const hoverFocusStyles = css`
    svg {
        fill: ${colors.highlight};
        transition: fill ${transition.fast};
    }
`;

export const StyledButton = styled.button`
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    @media ${queries.hover} {
        &:hover {
            ${hoverFocusStyles}
        }
    }

    &:focus-visible {
        ${hoverFocusStyles}
    }
`;
