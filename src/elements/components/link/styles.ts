import styled from "styled-components";
import { Theme, transition } from "styles/variables";

export const StyledLink = styled.a<{ theme: Theme; $underline: boolean }>`
    color: ${({ theme }) => theme.text};
    text-decoration: ${({ $underline }) => ($underline ? "underline" : "none")};
    transition: ${transition.fast};

    &:hover {
        color: ${({ theme }) => theme.hover};
        transition: ${transition.fastest};
    }
`;
