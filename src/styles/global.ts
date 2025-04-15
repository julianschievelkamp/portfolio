import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import { Theme, transition } from "styles/variables";

export default createGlobalStyle<{ theme?: Theme }>`
    ${fonts};

    :root {
        --100vh: 100vh;
    }

    @supports (height: 100svh) {
        :root {
            --100vh: 100svh;
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
        height: var(--100vh);
        overflow: hidden;
        background-color: ${({ theme }) => theme.body};
        transition: background-color ${transition.fast};
    }

    .no-transition * {
        transition: none !important;
    }
`;

let resizeTimer: ReturnType<typeof setTimeout>;

if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
        document.body.classList.add("no-transition");

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            document.body.classList.remove("no-transition");
        }, 400);
    });
}
