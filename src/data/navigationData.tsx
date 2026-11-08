import Julian from "elements/pages/Julian/Julian";
import Impressum from "elements/pages/Impressum/Impressum";
import Portfolio from "elements/pages/Portfolio/Portfolio";
import { title as titleImpressum } from "pages/impressum/+title";
import { title as titleJulian } from "pages/julian/+title";
import { title as titleIndex } from "pages/index/+title";

export type Page = {
    name: string;
    heading: string;
    path: string;
    element: React.ReactNode;
};

export const pages: { [key: string]: Page } = {
    portfolio: {
        name: "Portfolio",
        heading: titleIndex().toUpperCase(),
        path: "/",
        element: <Portfolio />,
    },
    julian: {
        name: "Julian",
        heading: titleJulian().toUpperCase(),
        path: "/julian/",
        element: <Julian />,
    },
    impressum: {
        name: "Impressum",
        heading: titleImpressum().toUpperCase(),
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
