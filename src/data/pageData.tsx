import { Page } from "./types";

import About from "elements/pages/about";
import Impressum from "elements/pages/impressum";
import Portfolio from "elements/pages/portfolio";

export const pageData: Page[] = [
    {
        name: "Portfolio",
        content: <Portfolio />,
    },
    {
        name: "About",
        content: <About />,
    },
    {
        name: "Impressum",
        content: <Impressum />,
    },
];
