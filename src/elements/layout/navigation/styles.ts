import Text from "elements/components/text";
import styled from "styled-components";

export const StyledNavigation = styled.div`
    margin-bottom: 3rem;
    margin-left: 0.5rem;
`;

export const NavElement = styled.div`
    margin-bottom: 0.5rem;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const StyledText = styled(Text)<{ $isActive: boolean }>`
    display: inline-block;
    background-color: ${({ $isActive }) => $isActive && "#ffca00"};
    padding: 0.25rem 0.5rem;
`;
