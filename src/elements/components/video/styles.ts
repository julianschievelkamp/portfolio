import { styled } from "styled-components";
import Button from "../button";
import Icon from "../icon";

export const StyledVideo = styled.video<{ $aspectRatio?: string }>`
    object-fit: cover;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    max-width: 100%;
    cursor: pointer;
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
`;

export const PlayButton = styled(Button)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
`;

export const PlayIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(8px);
    background: rgb(0, 0, 0, 0.1);
`;
