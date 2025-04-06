import styled from "styled-components";
import { transition } from "styles/variables";

export const StyledImage = styled.img<{ $imageLoaded: boolean }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    opacity: ${({ $imageLoaded }) => ($imageLoaded ? 1 : 0)};
    max-width: 100%;
    pointer-events: none;
    transition: ${transition.fast};
`;
