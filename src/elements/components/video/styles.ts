import { styled } from "styled-components";

export const StyledVideo = styled.video`
    object-fit: cover;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    max-width: 100%;

    &::-internal-media-controls-download-button {
        display: none;
    }
`;
