import { styled } from "styled-components";

import Button from "elements/components/Button/Button";
import { PINCHING_ATTRIBUTE } from "styles/global";
import { colors } from "styles/variables";

export const StyledVideo = styled.video<{
    $height?: string;
    $isVisible: boolean;
    $width?: string;
}>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    max-width: 100%;
    cursor: pointer;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    transition: opacity 1s;
`;

export const PlayButton = styled(Button)<{ $isVisible: boolean }>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    border-radius: 100px;
    backdrop-filter: blur(8px);
    background-color: ${colors.playButton};

    &:focus-visible {
        opacity: 1;
    }

    html[${PINCHING_ATTRIBUTE}] & {
        opacity: 0;
    }
`;
