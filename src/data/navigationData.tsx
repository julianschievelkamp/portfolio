import Julian from "elements/pages/julian";
import Impressum from "elements/pages/impressum";
import Portfolio from "elements/pages/portfolio";

export type Page = {
    name: string;
    path: string;
    element: React.ReactNode;
};

export type Link = {
    name: string;
    path: string;
};

export const pages: { [key: string]: Page } = {
    portfolio: {
        name: "Portfolio",
        path: "/",
        element: <Portfolio />,
    },
    julian: {
        name: "Julian",
        path: "/julian",
        element: <Julian />,
    },
    impressum: {
        name: "Impressum",
        path: "/impressum",
        element: <Impressum />,
    },
};

export const links: { [key: string]: Link } = {
    instagram: {
        name: "Instagram",
        path: "https://www.instagram.com/julianschievelkamp/",
    },
};
