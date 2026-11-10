import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import { transition } from "./variables";

interface GlobalStyleProps {
    $isPageLocked: boolean;
}

export default createGlobalStyle<GlobalStyleProps>`
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

    html, body {
        margin: 0;
        padding: 0;
        font-size: 100%;
        width: 100vw;
        overflow-x: hidden;
        overflow-y: ${({ $isPageLocked }) => ($isPageLocked ? "hidden" : "scroll")};
        /* Sperrt den nativen Pinch-Zoom der gesamten Seite, Scrollen bleibt erhalten.
           Nur das ActiveItem ist über usePinchZoom zoombar. */
        touch-action: pan-x pan-y;
        transition: background-color ${transition.default};
        position: relative;
    }

    /* Während das ActiveItem gezoomt wird (data-pinching aus usePinchZoom),
       färbt sich die Seite passend zum Popup schwarz */
    html:has([data-pinching]),
    html:has([data-pinching]) body {
        background-color: black;
    }

    :focus-visible {
        outline: 0;
    }

    .no-transition * {
        transition: none !important;
    }
`;
