import { Theme } from "data/types";
import Text from "elements/components/text";
import styled from "styled-components";
import { transition } from "styles/variables";

export const StyledNavigation = styled.div`
    margin-bottom: 3rem;
    margin-left: 0.5rem;
`;

export const NavElement = styled.div<{ $isActive: boolean; theme: Theme }>`
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
    cursor: pointer;

    p {
        display: inline-block;
        background-color: ${({ $isActive, theme }) => $isActive && theme.hover};
        padding: 0.25rem 0.5rem;
    }

    &:hover {
        p {
            color: ${({ $isActive, theme }) => !$isActive && theme.hover};
            transition: ${transition.fastest};
        }
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Label = styled(Text)<{ theme: Theme }>`
    color: ${({ theme }) => theme.secondary};
`;
