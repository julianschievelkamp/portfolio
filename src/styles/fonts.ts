import { css } from "styled-components";

import PlayfairDisplay from "assets/fonts/PlayfairDisplay.woff2";
import PoppinsLight from "assets/fonts/Poppins-Light.woff2";
import PoppinsBold from "assets/fonts/Poppins-Bold.woff2";

export default css`
    @font-face {
        font-family: "PlayfairDisplay";
        font-style: normal;
        font-display: swap;
        src: url(${PlayfairDisplay}) format("woff2");
    }

    @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-display: swap;
        src: url(${PoppinsLight}) format("woff2");
    }

    @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: url(${PoppinsBold}) format("woff2");
    }
`;
