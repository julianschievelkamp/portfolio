import { styled } from "styled-components";

export const StyledList = styled.ul<{ $margin: string }>`
    margin: 0;
    padding-left: 1rem;
    margin: ${({ $margin }) => $margin};
`;

export const ListItem = styled.li`
    line-height: 1.5;
`;
