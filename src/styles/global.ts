import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import { transition } from "./variables";

interface GlobalStyleProps {
    $isPageLocked: boolean;
}

export default createGlobalStyle<GlobalStyleProps>`
    ${fonts};

    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-size: 100%;
        width: 100vw;
        position: relative;
        touch-action: pan-y;
        overflow-x: hidden;
        overflow-y: ${({ $isPageLocked }) => ($isPageLocked ? "hidden" : "scroll")};
        transition: background-color ${transition.default};
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
