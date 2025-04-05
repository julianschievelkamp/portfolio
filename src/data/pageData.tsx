import Grid from "elements/layout/grid";
import { Page } from "./types";
import { portfolioData } from "./portfolioData";

export const pageData: Page[] = [
    {
        name: "Portfolio",
        content: <Grid items={portfolioData} />,
    },
    {
        name: "About",
        content: <></>,
    },
];
