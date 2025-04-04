import Text from "elements/components/text";
import styled from "styled-components";

export const StyledNavigation = styled.div`
    margin-bottom: 2rem;
`;

export const Label = styled.div``;

export const NavElement = styled.div`
    margin-bottom: 1rem;
    cursor: pointer;
`;

export const StyledText = styled(Text)<{ $isActive: boolean }>`
    display: inline-block;
    background-color: ${({ $isActive }) => $isActive && "#ffca00"};
    padding: 0.25rem 0.5rem;
`;
