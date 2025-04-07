import Grid from "elements/layout/grid";
import About from "elements/layout/about";
import { Page } from "./types";

export const pageData: Page[] = [
    {
        name: "Portfolio",
        content: <Grid />,
    },
    {
        name: "About",
        content: <About />,
    },
];
