import { styled } from "styled-components";
import Button from "../Button/Button";
import { colors, transition } from "styles/variables";

export const StyledVideo = styled.video<{
    $width?: string;
    $height?: string;
}>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    max-width: 100%;
    cursor: pointer;
`;

export const PlayButton = styled(Button)<{ $isVisible: boolean }>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
    transition:
        opacity ${transition.default},
        visibility ${transition.default};
    border-radius: 100px;
    backdrop-filter: blur(8px);
    background-color: ${colors.playButton};

    html:has([data-pinching]) & {
        opacity: 0;
        visibility: hidden;
    }
`;
