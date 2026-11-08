import { styled } from "styled-components";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { transition } from "styles/variables";

export const StyledVideo = styled.video<{
    $width?: string;
    $height?: string;
}>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    max-width: 100%;
`;

export const PlayButton = styled(Button)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    cursor: pointer;
    z-index: 9;
`;

export const PlayIcon = styled(Icon)<{ $isHidden: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(8px);
    opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
    transition: opacity ${transition.defaultIn};
`;
