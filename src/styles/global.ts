import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import { Theme } from "styles/variables";

export default createGlobalStyle<{ theme?: Theme }>`
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
        height: var(--100vh);
        overflow: hidden;
    }

    .no-transition * {
        transition: none !important;
    }
`;

/* see https://stackoverflow.com/questions/58886797/how-to-access-the-real-100vh-on-ios-in-css */
export const set100vh = () => {
    let value = "100vh";

    if (window.innerHeight) {
        value = `${window.innerHeight}px`;
    }

    document.documentElement.style.setProperty("--100vh", value);
};

set100vh();

let resizeTimer: ReturnType<typeof setTimeout>;

window.addEventListener("resize", () => {
    set100vh();

    document.body.classList.add("no-transition");

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        document.body.classList.remove("no-transition");
    }, 400);
});
