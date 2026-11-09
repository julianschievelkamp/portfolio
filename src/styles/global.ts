import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";

export default createGlobalStyle`
    ${fonts};

    :root {
        --100svh: 100vh;
    }

    @supports (height: 100svh) {
        :root {
            --100svh: 100svh;
        }
    }  

    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    :focus-visible {
        outline: 0;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-size: 100%;
        width: 100vw;
        height: var(--100svh);
        overflow: hidden;
        background-color: white;
    }

    .no-transition * {
        transition: none !important;
    }
`;
