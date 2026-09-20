import { styled } from "styled-components";
import { transition } from "styles/variables";

export const StyledImage = styled.img<{
    $imageLoaded: boolean;
    $margin?: string;
}>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    opacity: ${({ $imageLoaded }) => ($imageLoaded ? 1 : 0)};
    margin: ${({ $margin }) => $margin};
    max-width: 100%;
    transition: ${transition.fast};

    pointer-events: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;
