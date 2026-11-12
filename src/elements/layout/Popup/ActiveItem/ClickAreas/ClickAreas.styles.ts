/// <reference types="vite/client" />
import chevronLeft from "assets/icons/chevron-left.svg?raw";
import chevronRight from "assets/icons/chevron-right.svg?raw";
import close from "assets/icons/close.svg?raw";
import { styled } from "styled-components";
import { colors } from "styles/variables";
import { createIconCursor } from "./createIconCursor";

export const Previous = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    left: 0;
    transform: translateX(-100%);
    cursor: ${createIconCursor(chevronLeft, {
        size: 48,
        color: colors.secondary,
    })};
`;

export const Next = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    right: 0;
    transform: translateX(100%);
    cursor: ${createIconCursor(chevronRight, {
        size: 48,
        color: colors.secondary,
    })};
`;

export const Close = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    cursor: ${createIconCursor(close, { size: 32, color: colors.secondary })};
`;
