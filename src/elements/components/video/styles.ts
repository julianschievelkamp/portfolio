import { styled } from "styled-components";
import Button from "../button";
import Icon from "../icon";

export const StyledVideo = styled.video`
    object-fit: cover;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    max-width: 100%;
`;

export const PlayButton = styled(Button)`
    position: absolute;
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    cursor: pointer;
    z-index: 9;
`;

export const PlayIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(8px);
    background: rgb(0, 0, 0, 0.1);
`;
