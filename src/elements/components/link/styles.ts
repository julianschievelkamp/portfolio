import { styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledLink = styled.a<{ $underline: boolean }>`
    color: black;
    text-decoration: ${({ $underline }) => ($underline ? "underline" : "none")};
    transition: ${transition.fast};
    outline-color: ${colors.yellow};

    &:hover {
        color: ${colors.yellow};
        transition: ${transition.fastest};
    }
`;
