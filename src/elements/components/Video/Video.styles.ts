import { styled } from "styled-components";

import Button from "elements/components/Button/Button";
import { PINCH_SETTLING_ATTRIBUTE, PINCHING_ATTRIBUTE } from "styles/global";
import { colors, transition } from "styles/variables";

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

/* Needs a relative positioned parent */
export const PlayButton = styled(Button)<{ $isVisible: boolean }>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100px;
    backdrop-filter: blur(8px);
    background-color: ${colors.playButton};
    transition:
        opacity ${transition.default},
        visibility ${transition.default};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

    &:focus-visible {
        opacity: 1;
    }

    /* Hidden while the artwork glides back after pinching. Otherwise the button
       reappears at the top edge on the black background, and Safari keeps that color
       for the status bar until the dialog closes */
    html[${PINCHING_ATTRIBUTE}] &,
    html[${PINCH_SETTLING_ATTRIBUTE}] & {
        transition:
            opacity ${transition.fast},
            visibility ${transition.fast};
        opacity: 0;
        visibility: hidden;
    }
`;
