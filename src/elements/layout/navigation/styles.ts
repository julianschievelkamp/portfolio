import Link from "elements/components/link";
import Text from "elements/components/text";
import styled from "styled-components";
import { Theme, transition } from "styles/variables";

export const StyledNavigation = styled.nav`
    margin-bottom: 3rem;
    margin-left: 0.5rem;
`;

export const Label = styled(Text)<{ theme: Theme }>`
    color: ${({ theme }) => theme.secondary};
`;

export const NavList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-left: 0.5rem;
`;

export const NavElement = styled.li`
    margin-bottom: 0.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const NavLink = styled(Link)<{ $isActive: boolean; theme: Theme }>`
    display: block;

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
`;
