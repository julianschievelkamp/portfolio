import { keyframes, styled } from "styled-components";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { transition, TRANSITION_DEFAULT } from "styles/variables";

export const StyledVideo = styled.video`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

export const PlayIcon = styled(Icon)<{ $isHidden: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(8px);
    animation: ${fadeIn} ${transition.fast};
    opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
    transition: opacity ${TRANSITION_DEFAULT}ms ease-in;
`;
