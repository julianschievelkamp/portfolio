import About from "elements/pages/about";
import Impressum from "elements/pages/impressum";
import Portfolio from "elements/pages/portfolio";

export type Page = {
    name: string;
    path: string;
    element: React.ReactNode;
};

export const pageData: Page[] = [
    {
        name: "Portfolio",
        path: "/",
        element: <Portfolio />,
    },
    {
        name: "About",
        path: "/about",
        element: <About />,
    },
    {
        name: "Impressum",
        path: "/impressum",
        element: <Impressum />,
    },
];
