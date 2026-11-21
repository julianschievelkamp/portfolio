/// <reference types="vite/client" />
import { styled } from "styled-components";

import chevronLeft from "assets/icons/chevron-left.svg?raw";
import chevronRight from "assets/icons/chevron-right.svg?raw";
import { colors, queries } from "styles/variables";
import { createIconCursor } from "utils/createIconCursor";

export const Previous = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    left: 0;
    transform: translateX(-100%);

    cursor: ${createIconCursor(chevronLeft, {
        color: colors.secondary,
        size: 48,
    })};

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;

export const Next = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    right: 0;
    transform: translateX(100%);

    cursor: ${createIconCursor(chevronRight, {
        color: colors.secondary,
        size: 48,
    })};

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;
