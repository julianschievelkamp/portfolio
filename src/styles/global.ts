import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";

interface GlobalStyleProps {
    // Sperrt das Scrollen der Seite, solange ein Overlay geöffnet ist
    $scrollLocked?: boolean;
}

export default createGlobalStyle<GlobalStyleProps>`
    ${fonts};

    :root {
        --100svh: 100vh;
        --100lvh: 100vh;
    }

    @supports (height: 100svh) {
        :root {
            --100svh: 100svh;
        }
    }

    /* Großer Viewport: reicht auf iOS bis hinter die eingeblendete Adressleiste */
    @supports (height: 100lvh) {
        :root {
            --100lvh: 100lvh;
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
        /* clip statt hidden: erzeugt keinen eigenen Scroll-Container auf body,
           der auf iOS position: fixed und die Adressleiste stört */
        overflow-x: clip;
        background-color: white;
        overflow-y: ${({ $scrollLocked }) => ($scrollLocked ? "hidden" : "visible")};
    }

    .no-transition * {
        transition: none !important;
    }
`;
