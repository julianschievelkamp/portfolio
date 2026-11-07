import Julian from "elements/pages/julian";
import Impressum from "elements/pages/impressum";
import Portfolio from "elements/pages/portfolio";

export type Page = {
    name: string;
    heading: string;
    path: string;
    element: React.ReactNode;
};

export const pages: { [key: string]: Page } = {
    portfolio: {
        name: "Portfolio",
        heading: "Julian Schievelkamp – Fine Art Photography",
        path: "/",
        element: <Portfolio />,
    },
    julian: {
        name: "Julian",
        heading: "About Julian Schievelkamp",
        path: "/julian/",
        element: <Julian />,
    },
    impressum: {
        name: "Impressum",
        heading: "Impressum",
        path: "/impressum/",
        element: <Impressum />,
    },
};

type Link = {
    name: string;
    path: string;
};

export const links: { [key: string]: Link } = {
    instagram: {
        name: "Instagram",
        path: "https://www.instagram.com/julianschievelkamp/",
    },
    vogue: {
        name: "PhotoVogue",
        path: "https://www.vogue.com/photovogue/photographers/71498",
    },
};
