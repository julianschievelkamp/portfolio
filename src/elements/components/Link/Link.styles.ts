import { styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledLink = styled.a<{ $underline: boolean }>`
    position: relative;
    color: black;
    text-decoration: ${({ $underline }) => ($underline ? "underline" : "none")};
    transition: color ${transition.default};

    &:hover,
    &:focus-visible {
        color: ${colors.highlight};
        transition: color ${transition.fast};
    }
`;
