import Grid from "elements/layout/grid";
import { Page } from "./types";
import { images, videos } from "./portfolioData";

export const pageData: Page[] = [
    {
        name: "Portfolio",
        content: <Grid items={images} />,
    },
    {
        name: "Motion",
        content: <Grid items={videos} />,
    },
    {
        name: "Julian",
        content: <></>,
    },
];
