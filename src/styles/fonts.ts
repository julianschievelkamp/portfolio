import { css } from "styled-components";

import PlayfairDisplay from "assets/fonts/PlayfairDisplay-VariableFont_wght.ttf";
import Poppins from "assets/fonts/Poppins-Light.ttf";
import PoppinsBold from "assets/fonts/Poppins-Bold.ttf";

export default css`
    @font-face {
        font-family: "PlayfairDisplay";
        font-style: normal;
        src: url(${PlayfairDisplay}) format("truetype");
    }

    @font-face {
        font-family: "Poppins";
        font-style: normal;
        src: url(${Poppins}) format("truetype");
    }

    @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: bold;
        src: url(${PoppinsBold}) format("truetype");
    }
`;
