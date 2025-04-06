import styled from "styled-components";

export const StyledImage = styled.img`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    max-width: 100%;
    pointer-events: none;
`;
