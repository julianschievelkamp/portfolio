import Link from "elements/components/link";
import Text from "elements/components/text";
import { styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledNavigation = styled.nav`
    margin-bottom: 3rem;
    margin-left: 0.5rem;
`;

export const Label = styled(Text)`
    color: ${colors.secondary};
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

export const NavLink = styled(Link)<{ $isActive: boolean }>`
    display: block;

    p {
        display: inline-block;
        background-color: ${({ $isActive }) => $isActive && colors.yellow};
        padding: 0.25rem 0.5rem;
    }

    &:hover {
        p {
            color: ${({ $isActive }) => !$isActive && colors.yellow};
            transition: ${transition.fastest};
        }
    }
`;
