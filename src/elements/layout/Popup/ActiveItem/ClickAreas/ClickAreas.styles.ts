/// <reference types="vite/client" />
import chevronLeft from "assets/icons/chevron-left.svg?raw";
import chevronRight from "assets/icons/chevron-right.svg?raw";

import { createIconCursor } from "styles/createIconCursor";
import { styled } from "styled-components";
import { colors } from "styles/variables";

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
