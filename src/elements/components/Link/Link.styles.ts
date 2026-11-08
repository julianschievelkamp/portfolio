import { styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledLink = styled.a<{ $underline: boolean }>`
    color: black;
    text-decoration: ${({ $underline }) => ($underline ? "underline" : "none")};
    transition: color ${transition.default};

    &:hover,
    &:focus-visible {
        color: ${colors.primary};
        transition: color ${transition.fast};
    }
`;
