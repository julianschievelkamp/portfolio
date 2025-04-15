import About from "elements/pages/about";
import Impressum from "elements/pages/impressum";
import Portfolio from "elements/pages/portfolio";

export type Page = {
    name: string;
    path: string;
    element: React.ReactNode;
};

export const pageData: { [key: string]: Page } = {
    portfolio: {
        name: "Portfolio",
        path: "/",
        element: <Portfolio />,
    },
    about: {
        name: "About",
        path: "/about",
        element: <About />,
    },
    impressum: {
        name: "Impressum",
        path: "/impressum",
        element: <Impressum />,
    },
};
