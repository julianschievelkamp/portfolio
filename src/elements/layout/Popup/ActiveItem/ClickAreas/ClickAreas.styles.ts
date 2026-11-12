import { css, styled } from "styled-components";

const arrowStyles = css`
    background: blue;
    position: absolute;
    width: 100vw;
    height: 100%;
    cursor: pointer;
`;

export const Previous = styled.div`
    ${arrowStyles}

    left: 0;
    transform: translateX(-100%);
`;

export const Next = styled.div`
    ${arrowStyles}

    right: 0;
    transform: translateX(100%);
`;

export const Close = styled.div`
    background: red;
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    cursor: pointer;
`;
