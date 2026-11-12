import { styled } from "styled-components";

export const StyledVideo = styled.video<{
    $width?: string;
    $height?: string;
}>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    max-width: 100%;
    cursor: pointer;
`;
